import { useEffect, useRef, useState } from "react"
import { getIdWordsThunk, wordsIdLoading, wordsIdResponse } from "../../../store/slices/words/getId-words";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomAntdButton, CustomAntdButtonDelete, CustomAntdInput, CustomAsyncPaginate, CustomSpin } from "../../../components";
import CustomModal from "../../../components/custom-modal/custom-modal";
import { deleteWordsDeleteResponse, getWordsDeleteThunk, wordsDeleteLoading, wordsDeleteResponse } from "../../../store/slices/words/delete_words-slice";
import { Colors } from "../../../assets/colors";
import { deleteWordUpdateResponse, wordsUpdateLoading, wordsUpdateResponseData, wordsUpdateThunk } from "../../../store/slices/words/update-words-slice";
import { Form } from "antd";
import remove_icon from "../../../assets/images//remove_icon.png"
import { Waveform } from "../words-create-screen/components/create-words-add/music-player";
import { wordlevel } from "../../../data";
import { useTranslation } from "react-i18next";
import "./words-update.css"
import logoVoice from "../../../assets/images/Vector (4).png"
import { ShowImage } from "../../category-screen/category-update";
import { ImageUpload } from "../../category-screen/category-screen-create-from";
import { fileToDataString } from "../../../helper/file-build";
import { filesGetIdThunk, getfilesGetIdResponse, getfilesGetIdloading } from "../../../store/slices/files/get-id-files";
import { getvoiceGetIdResponse, getvoiceGetIdloading, voiceGetIdThunk } from "../../../store/slices/files/get-id-voice";
import { categoryUrl, learningLanguageUrl } from "../../learning-language-screen/learning-langauge-constant";
import { loadOptions } from "../../../helper/loadOptions";
import { customStylesCategory } from "../../../global-styles/loadOptionsStyles";
import { WordsLevel } from "../words-typing";
import { AsyncPaginate } from "react-select-async-paginate";
import _isEqual from 'lodash/isEqual';

export const WordsUpdate = () => {
    const words = useRef(1);
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
    const wordsIdLoad = useSelector(wordsIdLoading);
    const wordDeleteData = useSelector(wordsDeleteResponse);
    const deleteWordLoading = useSelector(wordsDeleteLoading);
    const updateWordsResponse = useSelector(wordsUpdateResponseData);
    const updateWordsLoading = useSelector(wordsUpdateLoading);
    const [selectedImage, setSelectedImage] = useState();
    const [previewImgUrl, setPreviewimgUrl] = useState("");

    const imageFileResponse = useSelector(getfilesGetIdResponse);
    const voiceResponse = useSelector(getvoiceGetIdResponse)
    const voiceLoading = useSelector(getvoiceGetIdloading)
   
    const wordsImageLoading = useSelector(getfilesGetIdloading);
    const [current, setCurrent] = useState(0)
    const [dynamicArrayForTranslates, setDynamicArrayForTranslates] = useState([]);


    useEffect(() => {
        dispatch(getIdWordsThunk(wordId));
    }, [])

    useEffect(() => {
        setStaticFieldsValues();
    }, [wordsIdData]);

    useEffect(() => {
        if (updateWordsResponse?.success === true || wordDeleteData?.success === true) {
            navigate("/words")
        }
        dispatch(deleteWordUpdateResponse())
        dispatch(deleteWordsDeleteResponse())

    }, [updateWordsResponse?.success, wordDeleteData?.success])

    useEffect(() => {
        if (wordsIdData) {
            dispatch(filesGetIdThunk(wordsIdData?.imageFile?._id));
        }
    }, [wordsIdData]);

    useEffect(() => {
        if (wordsIdData) {
            dispatch(voiceGetIdThunk(wordsIdData?.audioFile?._id));
        }
    }, [wordsIdData])


    const getLevelTypeLabel = (type) => {
        switch (type) {
            case WordsLevel.BEGINNER:
                return "Beginner";
            case WordsLevel.INTERMIDATE:
                return "Intermitade";
            case WordsLevel.ADVANCED:
            default:
                return "Adnvached";
        }
    };

    const name = wordsIdData?.language?.name
    const categoryName = wordsIdData?.category?.name
    const levelName = getLevelTypeLabel(wordsIdData?.level)

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            window: state.isSelected && "420px",
            backgroundColor: state.isSelected ? "#fff" : "#fff", // Background color for selected options
            color: state.isSelected ? Colors.PURPLE : "black", // Text color for selected options
            padding: "8px 12px", // Padding for options
            fontSize: "14px", // Font size for options
            height: "60px", // Height of each option
            borderRadius: "10px",
            border: "none",
        }),
        control: (provided) => ({
            ...provided,
            border: "none", // Border color
            minHeight: "60px", // Minimum height of the control
            boxShadow: "none", // Remove box shadow
            borderRadius: "10px",
            backgroundColor: "#F7F8FA"

        }),
    };

    const addFile = (e) => {
        const s = URL?.createObjectURL(e.target.files?.[0])
        setFileListVoice(e.target.files?.[0])
        setAudio(s)
    }

    const onFinish = (values) => {
        clearFormData(formData);
        formData.append("id", wordsIdData?._id)

        if (learningLanguageWordSelectedValue?.value !== undefined && learningLanguageWordSelectedValue?.value !== wordsIdData.language._id) {
            formData.append("language", learningLanguageWordSelectedValue?.value)
        }

        if (values.word !== undefined && values.word !== "" && values.word !== wordsIdData.word) {
            formData.append("word", values.word);
        }

        if (values.transcription !== undefined && values.transcription !== "" && values.transcription !== wordsIdData.transcription) {
            formData.append("transcription", values.transcription);
        }

        if (selectedLevel !== undefined && selectedLevel !== wordsIdData.level) {
            formData.append("level", selectedLevel);
        }

        if (selectedCategory !== undefined && selectedCategory !== wordsIdData.category._id) {
            formData.append("category", selectedCategory);
        }

        if (selectedImage) {
            formData.append("image", selectedImage);
        } 

        if (fileListVoice) {
            formData.append("audio", fileListVoice);
        }

        dynamicArrayForTranslates.forEach((translatesObject, translateIndex) => {
            const translateValue = values[translatesObject._id];
            
            if (translateValue !== undefined && translateValue !== "") {
                formData.append(`translates[${translateIndex}].nativeLanguage`, translatesObject._id);
                
                const textArr = translateValue.split(',').map(item => item.trim());
                textArr.forEach((translateText, textIndex) => {
                    formData.append(`translates[${translateIndex}].text[${textIndex}]`, translateText);
                });
            }
        });

        dispatch(wordsUpdateThunk(formData))
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onTab = () => {
        dispatch(getWordsDeleteThunk(wordId));
    };

    const setStaticFieldsValues = () => {
        form.setFieldsValue({
            language: wordsIdData?.language?.nameEng,
            category: wordsIdData?.category?.name,
            transcription: wordsIdData?.transcription,
            level: getLevelTypeLabel(wordsIdData?.level),
            word: wordsIdData?.word,
        });
        setDynamicArrayForTranslates(wordsIdData?.language?.nativeLanguages)
    }

    const createDynamicTranslateFields = () => {
        if (dynamicArrayForTranslates?.length > 0) {
          return (
            <div>
              <p className="wordsTitle">Translate</p>
              {dynamicArrayForTranslates?.map((item) => {
                let value = getTranslateValueById(item._id);
      
                //get name key for CustomAntdInput
                const name = `${item._id}`;
      
                //get translated language name
                const translatedLanguageName = item.nameEng;
      
                return (
                  <div key={item._id}>
                    <p className="wordsInputTitle">{translatedLanguageName}</p>
                    <CustomAntdInput
                      rules={true}
                      className="inputTranslate"
                      placeholder="Words*"
                      name={name}
                      type={"text"}
                      min={4}
                      defaultValue={value}
                      itemId={item._id} // Pass the _id as a different prop
                    />
                  </div>
                );
              })}
            </div>
          );
        } else {
          return <p>Some thing went wrong for dynamicArrayForTranslates</p>;
        }
      };
      

    const getTranslateValueById = (nativeLanguageId) => {
        if (!Array.isArray(wordsIdData.translates)) {
            return "";
        }
    
        for (const translateObject of wordsIdData.translates) {
            if (translateObject.nativeLanguage._id === nativeLanguageId) {
                if (Array.isArray(translateObject.text)) {
                    return translateObject.text.join(', ');
                } else {
                    return translateObject.text;
                }
            }
        }
    
        return "";
    };

    const clearFormData = (formData) => {
        const keys = Array.from(formData.keys());

        keys.forEach(key => {
            formData.delete(key);
        });
    };

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

    const handleLoadOptions = async (inputValue, loadedOptions, { page }) => {
        const { options, hasMore } = await loadOptions(inputValue, loadedOptions, { page, name }, learningLanguageUrl, learningLanguageWordSelectedValue,);
        return {
            options: options,
            hasMore: hasMore,
            additional: {
                page: page + 1,
            },
        };
    };

    const handleLoadOptionsCategory = async (inputValue, loadedOptions, { page }) => {
        const { options, hasMore } = await loadOptions(inputValue, loadedOptions, { page, categoryName }, categoryUrl,);
        return {
            options: options,
            hasMore: hasMore,

            additional: {
                page: page + 1,
            },
        };
    };

    const handleLoadOptionsLevel = async (inputValue, loadedOptions) => {
        const { options } = await loadOptions(inputValue, loadedOptions, { levelName });
        return {
            options: wordlevel,
        };
    };


    const onChangeLanguageForWord = (value) => {
        setLearningLanguageWordSelectedValue(value);
        setDynamicArrayForTranslates(value.nativeLanguages);
    }

    const onChangeCategory = (value) => {
        setSelectedCategory(value?.value)
    }
    const onChangeLevel = (value) => {
        setSelectedLevel(value?.value)
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
                                    <CustomAsyncPaginate defaultInputValue={wordsIdData?.language?.name} style={customStyles} onChange={onChangeLanguageForWord} current={current} placeholder="English" loadOptions={handleLoadOptions} />
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
                                        <div >
                                            <p>Level</p>
                                            <AsyncPaginate
                                                defaultInputValue={getLevelTypeLabel(wordsIdData?.level)}
                                                styles={customStylesCategory}
                                                placeholder={"Level"}
                                                onChange={onChangeLevel}
                                                loadOptions={handleLoadOptionsLevel}
                                                // Assuming `localData` is an array of local options
                                                options={wordlevel}
                                            />
                                        </div>
                                        <div className="categoryLeft">
                                            <p>Category</p>
                                            <CustomAsyncPaginate
                                                defaultInputValue={wordsIdData?.category?.name}
                                                style={customStylesCategory}
                                                onChange={onChangeCategory}
                                                current={current}
                                                placeholder="Category*"
                                                loadOptions={handleLoadOptionsCategory} />
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
                                        <ShowImage loading={wordsImageLoading} title={wordsIdData?.imageFile?.description} src={imageFileResponse?.data?.url} onClick={() => {
                                            setPreviewimgUrl(".")
                                            setCategoryShow(null);
                                        }} />
                                    ) : (
                                        <ImageUpload onChange={handleFileChange} />
                                    )}
                                </Form.Item>
                            </div>

                            <div className="lerning-language-section">
                                {createDynamicTranslateFields()}
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