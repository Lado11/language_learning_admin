import { useEffect, useState } from "react"
import { getIdWordsThunk, wordsIdLoading, wordsIdResponse } from "../../../store/slices/words/getId-words";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomAntdButton, CustomAntdButtonDelete, CustomAntdInput, CustomAntdSelect, CustomSpin, CustomUpload } from "../../../components";
import CustomModal from "../../../components/custom-modal/custom-modal";
import { deleteWordsDeleteResponse, getWordsDeleteThunk, wordsDeleteLoading, wordsDeleteResponse } from "../../../store/slices/words/delete_words-slice";
import { Colors } from "../../../assets/colors";
import { deleteWordUpdateResponse, wordsUpdateLoading, wordsUpdateResponseData, wordsUpdateThunk } from "../../../store/slices/words/update-words-slice";
import { Form, Upload } from "antd";
import uploadIcon from "../../../assets/images/uploadImg.png";
import remove_icon from "../../../assets/images//remove_icon.png"
import { Waveform } from "../words-create-screen/components/create-words-add/music-player";
import logo from "../../../assets/images/Item (1).png"
import { wordlevel } from "../../../data";
import { categoryGetThunk, getCategoryGetData, learningLanguages, learningLanguagesThunk } from "../../../store/slices";
import { useTranslation } from "react-i18next";
import "./words-update.css"
import { beforeUpload, props } from "../../utils/helper";
import logoVoice from "../../../assets/images/Vector (4).png"

export const WordsUpdate = () => {
    const [form] = Form.useForm();
    const formData = new FormData();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [showVoice, setShowVoice] = useState(false);
    const wordId = localStorage.getItem("wordId");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileListVoice, setFileListVoice] = useState();
    const [showCategoryUpload, setCatgeoryShowUpload] = useState();
    const [fileList, setFileList] = useState([]);
    const [learningLanguageWordSelectedValue, setLearningLanguageWordSelectedValue] = useState();
    const [audio, setAudio] = useState();
    const [categoryShow, setCategoryShow] = useState();
    const wordsIdData = useSelector(wordsIdResponse);
    const wordsIdLoad = useSelector(wordsIdLoading);
    const wordDeleteData = useSelector(wordsDeleteResponse);
    const deleteWordLoading = useSelector(wordsDeleteLoading);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const categoryData = useSelector(getCategoryGetData)?.data?.list;
    const learningLanguagesData = useSelector(learningLanguages);
    const updateWordsResponse = useSelector(wordsUpdateResponseData);
    const updateWordsLoading = useSelector(wordsUpdateLoading);
    const array = [];

    const skipNative = {
        skip: 0,
        limit: 12,
    };


    useEffect(() => {
        dispatch(learningLanguagesThunk(skipNative));
        dispatch(categoryGetThunk(skipNative));
    }, []);

    const handleChange = (info) => {
        setCategoryShow(info.file);
        setCatgeoryShowUpload(info.fileList[0]);
        if (!info.fileList[0]) {
            info.file = "";
        }
    };
const [myusic,setMyusci] = useState()
    const addFile = (e) => {
        console.log(e.target.files,"e")
        const s = URL?.createObjectURL(e.target.files?.[0])
        setFileListVoice(e.target.files?.[0])
        setAudio(s)
    }

 

    const filteredResponseCategory = categoryData?.map((lang) => {
        return {
            _id: lang._id,
            label: lang.name.toLowerCase(),
            value: lang.name,
        };
    });
    const filteredResponse = learningLanguagesData?.data?.list?.map((lang) => {
        return {
            _id: lang._id,
            label: lang.name.toLowerCase(),
            value: lang.name,
            nativeLanguages: lang?.nativeLanguages

        };
    });
    const onFinish = (values) => {
        formData.append("id", wordsIdData?.data?._id)
        values?.word != wordsIdData?.data?.word  && formData.append("word", values?.word)
        formData.append("transcription", values?.transcription)
        formData.append("level", values?.level)
        formData.append("language", values?.language)
        formData.append("category", values?.category)
        categoryShow && formData.append("image", categoryShow)
        fileListVoice && formData.append("audio", fileListVoice)

        Object.keys(values).map((date, index) => {
          if (date.includes("translate")) {
            array.push(values[date])
          }
        })
        array?.map((values, ind) => {
          formData.append(`translates[${ind}].text[${0}]`, values);
        })
        wordsIdData?.data?.translates && wordsIdData?.data?.translates?.map((item,ind)=>{
            formData.append(`translates[${ind}].nativeLanguage`, item?.nativeLanguage?._id);
        })
        learningLanguageWordSelectedValue && learningLanguageWordSelectedValue?.nativeLanguages.forEach((item, ind) => {
          formData.append(`translates[${ind}].nativeLanguage`, item?._id);
        });
        dispatch(wordsUpdateThunk(formData))

    };

    
    const showModal = () => {
        setIsModalOpen(true);
    };
    const onTab = () => {
        dispatch(getWordsDeleteThunk(wordId));
    };

    useEffect(() => {
        form.setFieldsValue({
            language: wordsIdData?.data?.language?.nameEng,
            category: wordsIdData?.data?.category?.name,
            transcription: wordsIdData?.data?.transcription,
            level: wordsIdData?.data?.level=== 0 ? "beginner" :wordsIdData?.data?.level=== 1 ? "intermediate" : wordsIdData?.data?.level === 2 ? "advanced" : null ,
            word: wordsIdData?.data?.word,
        });
    }, [wordsIdData?.data]);

    useEffect(() => {
        dispatch(getIdWordsThunk(wordId));
    }, [])



    useEffect(()=>{
        if(updateWordsResponse?.success === true || wordDeleteData?.success === true){
        navigate("/words")
        }
        dispatch(deleteWordUpdateResponse())
        dispatch(deleteWordsDeleteResponse())

    },[updateWordsResponse?.success,wordDeleteData?.success])


    return (
        <div className="nativeLanguageCreateScreenMainDiv">
             <CustomModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onTab={onTab}
                />
                  {/* {wordsIdLoad  && <div className="CustomSpinUpdate"> <CustomSpin size={120} color={Colors.GRAY_COLOR} /> </div> } */}
            <Form
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
               
          <div className="update-words-section">
             <div>
               <p>Update</p>
                <div className="addWordsFirstSelect bigSelect">
                    <CustomAntdSelect
                        rules={true}
                        name="language"
                        // className="wordsSelectExel"
                        optinData={filteredResponse}
                        selected={learningLanguageWordSelectedValue}
                        setSelected={setLearningLanguageWordSelectedValue}
                        defaultValue={t("LEARNING_LANGUAGE")}
                        color={Colors.LIGHT_GRAY}
                    />
                </div>
                <div className="updateWordsAddInputs">
                    <div className="rowInputWords">
                        <div>
                            <p>Words</p>
                            <CustomAntdInput
                                placeholder="Words*"
                                name="word"
                                type={"text"}
                                min={4}
                                rules={true}
                            />
                        </div>
                        <div className="inputLeft">
                            <p>Transcribe</p>
                            <CustomAntdInput
                                placeholder="Transcribe*"
                                name="transcription"
                                type={"text"}
                                min={4}
                                message={"This field is required"}
                                rules={true}

                            />
                        </div>
                    </div>
                    <div className="rowInputWords">
                        <div>
                            <p>Level</p>
                            <CustomAntdSelect
                                rules={true}
                                name="level"
                                // width={172}
                                defaultValue="Level*"
                                optinData={wordlevel}
                                setSelected={setSelectedLevel}
                            />
                        </div>
                        <div>
                            <p>Category</p>
                            <CustomAntdSelect
                            rules={true}
                                name="category"
                                // width={172}
                                defaultValue="Category*"
                                optinData={filteredResponseCategory}
                                setSelected={setSelectedCategory}
                            />
                        </div>
                    </div>
                </div>
                <p>Audio</p>
                <Form.Item
                    // name="Audio"
                    rules={[{
                            required: true,
                        }]}>

                    {showVoice === false ? <div className="imgae_upload_design_voice">
                        <div className="remove_icon_div">
                            <img
                                src={remove_icon}
                                onClick={() => {
                                    setAudio("")
                                    setShowVoice(!showVoice)
                                }}
                            />
                        </div>
                        <Waveform url={wordsIdData?.data?.audioFile?.path} />
                    </div> :
                        <>
                            {audio ? <div className="imgae_upload_design_voice">
                                <div className="remove_icon_div">
                                    <img
                                        src={remove_icon}
                                        onClick={() => {
                                            setAudio(null)
                                        }}
                                    />
                                </div>
                                <Waveform url={audio} />


                            </div> : <div className="file-upload">
                            <div className="voiceUpload">
          <p className="titleVoiceUpload">
            Voice Upload
          </p>
          <img src={logoVoice} />
        </div>
                                <input accept="audio/*" type='file' onChange={addFile} />
                            </div>}
                        </>
                    }
                </Form.Item>
                <p>Image</p>
                <Form.Item
                    // name="image"
                    rules={[ {
                            required: true}]}
                >
                    {categoryShow != null || fileList != null ? (
                        <div className="imgae_upload_design">
                            <div className="remove_icon_div">
                                <img
                                    src={remove_icon}
                                    onClick={() => {
                                        setFileList(null);
                                        setCategoryShow(null);
                                    }}
                                />
                            </div>
                            <div className="imgae_name">
                                <p>{wordsIdData?.data?.imageFile?.description}</p>
                                <img src={`${baseUrl}${wordsIdData?.data?.imageFile?.path}`} />
                            </div>
                        </div>
                    ) : (
                        <Upload
                            onChange={handleChange}
                            beforeUpload={beforeUpload}
                            {...props}
                            maxCount={1}
                            listType="picture"
                            className="upload-list-inline"
                        >
                            {categoryShow && showCategoryUpload ? null : (
                                <img src={uploadIcon} className="upload" />
                            )}
                        </Upload>
                    )}
                </Form.Item>



                <CustomAntdButton title="Update"
                    loading={updateWordsLoading}
                    background={Colors.PURPLE} />
                <div className="deleteButton">

                    <CustomAntdButtonDelete
                        loading={deleteWordLoading}
                        title="Delete"
                        background={Colors.GRAY_COLOR}
                        onClick={() => {
                            showModal();
                        }}
                    />
                </div>
               </div>
              <div className="lerning-language-section">
              { learningLanguageWordSelectedValue?.nativeLanguages?.length && <p>Translate</p>}
              <div>
               { learningLanguageWordSelectedValue?.nativeLanguages?.length ?
                learningLanguageWordSelectedValue?.nativeLanguages.map((item, index) => {
                    return (
                        <div>
                          <p>{item?.nameEng}</p>
                          <CustomAntdInput
                            key={item}
                            rules={true}
                            className="inputTranslate"
                            placeholder="Words*"
                            name={`nativeInpust${index}`}
                            type={"text"}
                            min={4}
                          />
                        </div>
                      )
                }) : null}
               </div>
              { !learningLanguageWordSelectedValue?.nativeLanguages?.length  && wordsIdData?.data?.translates  &&<p>Translate</p>}

                {!learningLanguageWordSelectedValue?.nativeLanguages?.length  && wordsIdData?.data?.translates && wordsIdData?.data?.translates?.map((item, index) => {
                    return (
                        <div>
                            <p>{item?.nativeLanguage?.nameEng}</p>
                            <CustomAntdInput
                                key={item}
                                // rules={true}
                                className="inputTranslate"
                                placeholder="Words*"
                                name={`translate${index}`}
                                type={"text"}
                                min={4}
                                defaultValue={item.text?.map((language) => {
                                    return `${language}`
                                })}
                            />
                        </div>
                    )
                })}
              </div>
             </div>

            </Form>
        </div>
    )
}