import { useEffect, useRef, useState } from "react"
import { getIdWordsThunk, wordsIdLoading, wordsIdResponse } from "../../../store/slices/words/getId-words";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomAntdButton, CustomAntdButtonDelete, CustomAntdInput, CustomAntdSelect, CustomAsyncPaginate, CustomSpin } from "../../../components";
import CustomModal from "../../../components/custom-modal/custom-modal";
import { deleteWordsDeleteResponse, getWordsDeleteThunk, wordsDeleteLoading, wordsDeleteResponse } from "../../../store/slices/words/delete_words-slice";
import { Colors } from "../../../assets/colors";
import { deleteWordUpdateResponse, wordsUpdateLoading, wordsUpdateResponseData, wordsUpdateThunk } from "../../../store/slices/words/update-words-slice";
import { Form } from "antd";
import remove_icon from "../../../assets/images//remove_icon.png"
import { Waveform } from "../words-create-screen/components/create-words-add/music-player";
import { wordlevel } from "../../../data";
import { categoryGetThunk, getCategoryGetData, learningLanguages, learningLanguagesThunk } from "../../../store/slices";
import { useTranslation } from "react-i18next";
import "./words-update.css"
import logoVoice from "../../../assets/images/Vector (4).png"
import { ShowImage } from "../../category-screen/category-update";
import { ImageUpload } from "../../category-screen/category-screen-create-from";
import { fileToDataString } from "../../../helper/file-build";
import { filesGetIdThunk, getfilesGetIdResponse, getfilesGetIdloading } from "../../../store/slices/files/get-id-files";
import { getvoiceGetIdResponse, getvoiceGetIdloading, voiceGetIdThunk } from "../../../store/slices/files/get-id-voice";
import axios from "axios";

export const WordsUpdate = () => {
    const words = useRef(1);
    console.log(words);
    let location = useLocation();
    const wordId = location?.pathname.slice(7);
    const [form] = Form.useForm();
    const formData = new FormData();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [showVoice, setShowVoice] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileListVoice, setFileListVoice] = useState();
    const [learningLanguageWordSelectedValue, setLearningLanguageWordSelectedValue] = useState();
    const [audio, setAudio] = useState();
    const [categoryShow, setCategoryShow] = useState();
    const wordsIdData = useSelector(wordsIdResponse)?.data;
    console.log(wordsIdData,"log id ");
    const wordsIdLoad = useSelector(wordsIdLoading);
    const wordDeleteData = useSelector(wordsDeleteResponse);
    const deleteWordLoading = useSelector(wordsDeleteLoading);
    const categoryData = useSelector(getCategoryGetData)?.data?.list;
    const learningLanguagesData = useSelector(learningLanguages);
    const updateWordsResponse = useSelector(wordsUpdateResponseData);
    const updateWordsLoading = useSelector(wordsUpdateLoading);
    const array = [];
    const [selectedImage, setSelectedImage] = useState();
    const [previewImgUrl, setPreviewimgUrl] = useState("");
    const voiceResponse = useSelector(getvoiceGetIdResponse)
    const voiceLoading = useSelector(getvoiceGetIdloading)
    const skipNative = {
        skip: 0,
        limit: 12,
    };
    const [imageUrls, setImageUrls] = useState({});
    const [voiceUrls, setVoiceUrls] = useState({}); 
    const categoryImageResponse = useSelector(getfilesGetIdResponse);
    const wordsImageLoading = useSelector(getfilesGetIdloading);
    const token = localStorage.getItem("token")
    const LIMIT = 10;
    const [current, setCurrent] = useState(0)
    const URL = process.env.REACT_APP_BASE_URL;

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          window: state.isSelected && "420px",
          backgroundColor: state.isSelected ? "#fff" : "#fff", // Background color for selected options
          color: state.isSelected ? "#fff" : "#fff", // Text color for selected options
          padding: "8px 12px", // Padding for options
          fontSize: "14px", // Font size for options
          height: "60px", // Height of each option
          borderRadius:"10px",
          border:"none",
        }),
        control: (provided) => ({
          ...provided,
          border:"none", // Border color
          minHeight: "60px", // Minimum height of the control
          boxShadow: "none", // Remove box shadow
          borderRadius:"10px",
          backgroundColor:"#F7F8FA"
    
        }),
      };
    useEffect(() => {
        dispatch(learningLanguagesThunk(skipNative));
        dispatch(categoryGetThunk(skipNative));
    }, []);

     const addFile = (e) => {
        const s = URL?.createObjectURL(e.target.files?.[0])
        setFileListVoice(e.target.files?.[0])
        setAudio(s)
    }

    const onFinish = (values) => {
        formData.append("id", wordsIdData?._id)
        values?.word != wordsIdData?.data?.word && formData.append("word", values?.word)
        formData.append("transcription", values?.transcription)
        formData.append("level", values?.level)
        formData.append("language", values?.language)
        formData.append("category", values?.category)
        selectedImage && formData.append("image", selectedImage);
        fileListVoice && formData.append("audio", fileListVoice)

        Object.keys(values).map((date, index) => {
            if (date.includes("translate")) {
                array.push(values[date])
            }
        })
        array?.map((values, ind) => {
            formData.append(`translates[${ind}].text[${0}]`, values);
        })
        wordsIdData?.data?.translates && wordsIdData?.data?.translates?.map((item, ind) => {
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
            language: wordsIdData?.language?.nameEng,
            category: wordsIdData?.category?.name,
            transcription: wordsIdData?.transcription,
            level: wordsIdData?.level === 0 ? "beginner" : wordsIdData?.level === 1 ? "intermediate" : wordsIdData?.level === 2 ? "advanced" : null,
            word: wordsIdData?.word,
        });
    }, [wordsIdData]);

    useEffect(() => {
        dispatch(getIdWordsThunk(wordId));
    }, [])

    useEffect(() => {
        if (updateWordsResponse?.success === true || wordDeleteData?.success === true) {
            navigate("/words")
        }
        dispatch(deleteWordUpdateResponse())
        dispatch(deleteWordsDeleteResponse())

    }, [updateWordsResponse?.success, wordDeleteData?.success])

    useEffect(() => {
        // Preload image URLs
        if (wordsIdData) {
            fetchImage(wordsIdData?.imageFile?._id);
        }
    }, [wordsIdData]);

    useEffect(() => {
        dispatch(voiceGetIdThunk(wordsIdData?.audioFile?._id));
    }, [wordsIdData])

    const fetchImage = (imageFileId) => {
        if (!imageUrls[imageFileId]) {
            dispatch(filesGetIdThunk(imageFileId));
        }
    };

    useEffect(() => {
        // Update imageUrls state with fetched image URLs
        if (categoryImageResponse) {
            setImageUrls((prevUrls) => ({
                ...prevUrls,
                [categoryImageResponse.data?.fileId]: categoryImageResponse.data?.url,
            }));
            setVoiceUrls((voice) => ({
                ...voice,
                [categoryImageResponse.data?.fileId]: categoryImageResponse.data?.url,
            }))
        }
    }, [categoryImageResponse]);


    const handleFileChange = async (
        event
    ) => {
        const file = event.target.files;
        setSelectedImage(file?.[0]);
        if (!file) {
            return;
        }
        try {
            const imgUrl = await fileToDataString(file?.[0]);
            setPreviewimgUrl(imgUrl);
        } catch (error) {
            console.log(error);
        }
    };

    async function loadOptionsLang(_search, loadedOptions, { page }) {
        const start = (page) * LIMIT; // Calculate start index for pagination
        const searchQuersy = _search !== undefined && _search != "" ? `?search=${_search}&` : '?';
        try {
            const response = await axios.get(
                `${URL}api/admin/language/learn${searchQuersy}skip=${start}&limit=${LIMIT}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include authorization token from localStorage
                    },
                }
            );
            const options = response.data.data.list.map((item) =>
            ({
                value: item._id,
                label: item.name,
                nameEng: item.nameEng,
                image: item?.imageFile
            }));
    
            return {
                options: options,
                hasMore: options.length === LIMIT,
                additional: {
                    page: page + 1,
                },
            };
        } catch (error) {
            console.error("Error fetching options:", error);
            return {
                options: [],
                hasMore: false,
            };
        }
    };
    
    const onChange = (value) => {
      setLearningLanguageWordSelectedValue(value?.value)
    }
    const customStylesCategory = {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#fff" : "#fff", // Background color for selected options
          color: state.isSelected ? "#fff" : "#fff", // Text color for selected options
          padding: "8px 12px", // Padding for options
          fontSize: "14px", // Font size for options
          height: "60px", // Height of each option
          borderRadius:"10px",
          border: "none",
        }),
        control: (provided) => ({
          ...provided,
          window:"206px",
          border: "1px solid #7D8FB326", // Border color
          minHeight: "60px", // Minimum height of the control
          boxShadow: "none", // Remove box shadow
          borderRadius:"10px",
          backgroundColor:"#fff"
    
        }),
      };

    async function loadOptionsCategory(_search, loadedOptions, { page }) {
        const start = (page) * LIMIT; // Calculate start index for pagination
        const searchQuersy = _search !== undefined && _search != "" ? `?search=${_search}&` : '?';
        try {
            const response = await axios.get(
                `${URL}api/admin/words/category${searchQuersy}skip=${start}&limit=${LIMIT}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include authorization token from localStorage
                    },
                }
            );
            const options = response.data.data.list.map((item) =>
            ({
                value: item._id,
                label: item.name,
                nameEng: item.nameEng,
                image: item?.imageFile
            }));
      
            return {
                options: options,
                hasMore: options.length === LIMIT,
                additional: {
                    page: page + 1,
                },
            };
        } catch (error) {
            console.error("Error fetching options:", error);
            return {
                options: [],
                hasMore: false,
            };
        }
      };
   
      
      const onChangeCategory = (value) => {
        setSelectedCategory(value?.value)
      }
      

    return (
        <div className="nativeLanguageCreateScreenMainDiv">
            {wordsIdLoad ? <div className="loadingDiv nativeLanguageScreenMainDiv">
                <CustomSpin size={64} color="gray" />
            </div> : <div>
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
                    ref={words}
                >

                    <div className="update-words-section">
                        <div className="update-words-row">
                            <div>
                                <p className="updateTitle">Update</p>
                                <div className="addWordsFirstSelect bigSelect">
                                <CustomAsyncPaginate defaultInputValue={wordsIdData?.language?.name} style={customStyles} onChange={onChange} current={current} placeholder="English" loadOptions={loadOptionsLang} />

                                    {/* <CustomAntdSelect
                                        rules={true}
                                        name="language"
                                        // className="wordsSelectExel"
                                        optinData={filteredResponse}
                                        selected={learningLanguageWordSelectedValue}
                                        setSelected={setLearningLanguageWordSelectedValue}
                                        defaultValue={t("LEARNING_LANGUAGE")}
                                        color={Colors.LIGHT_GRAY}
                                    /> */}
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
                                            <CustomAsyncPaginate defaultInputValue={wordsIdData?.category?.name} style={customStylesCategory} 
                                                    onChange={onChangeCategory} current={current} placeholder="Category*" loadOptions={loadOptionsCategory} />
                                            {/* <CustomAntdSelect
                                                rules={true}
                                                name="category"
                                                // width={172}
                                                defaultValue="Category*"
                                                optinData={filteredResponseCategory}
                                                setSelected={setSelectedCategory}
                                            /> */}
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
                                        <Waveform loading={voiceLoading} url={voiceResponse?.data?.url} />

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
                                    rules={[{
                                        required: true
                                    }]}
                                >
                                    {previewImgUrl?.length > 1 ? (
                                        <ShowImage title={selectedImage?.name}
                                            src={previewImgUrl}
                                            onClick={() => {
                                                setPreviewimgUrl(".")
                                                setCategoryShow(null);
                                            }} />
                                    ) : wordsIdData?.imageFile && !previewImgUrl ? (
                                        <ShowImage loading={wordsImageLoading} title={wordsIdData?.imageFile?.description} src={imageUrls[wordsIdData?.imageFile?._id]} onClick={() => {
                                            setPreviewimgUrl(".")
                                            setCategoryShow(null);
                                        }} />
                                    ) : (
                                        <ImageUpload onChange={handleFileChange} />
                                    )}
                                </Form.Item>
                            </div>

                            <div className="lerning-language-section">
                                {learningLanguageWordSelectedValue?.nativeLanguages?.length && <p className="wordsTitle">Translate</p>}
                                <div>
                                    {learningLanguageWordSelectedValue?.nativeLanguages?.length ?
                                        learningLanguageWordSelectedValue?.nativeLanguages.map((item, index) => {
                                            return (
                                                <div>
                                                    <p className="wordsInputTitle">{item?.nameEng}</p>
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
                                {!learningLanguageWordSelectedValue?.nativeLanguages?.length && wordsIdData?.translates && <p className="wordsTitle">Translate</p>}

                                {!learningLanguageWordSelectedValue?.nativeLanguages?.length && wordsIdData?.translates && wordsIdData?.translates?.map((item, index) => {
                                    return (
                                        <div>
                                            <p className="wordsInputTitle">{item?.nativeLanguage?.nameEng}</p>
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


                </Form>
            </div>}
        </div>
    )
}