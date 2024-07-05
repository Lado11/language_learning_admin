import { useEffect, useRef, useState } from "react"
import { getIdWordsThunk, wordsIdLoading, wordsIdResponse } from "../../../store/slices/words/getId-words";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomAntdButton, CustomAntdButtonDelete, CustomAntdInput, CustomAntdSelect, CustomAsyncPaginate, CustomErrorSection, CustomSpin } from "../../../components";
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
    const [current, setCurrent] = useState(0)
    

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
            color: state.isSelected ?  Colors.PURPLE : "black", // Text color for selected options
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
        const newWord = values.word !== wordsIdData?.word ? values.email : undefined;
        const newTranslate = values?.transcription !== wordsIdData?.transcription ? values?.transcription : undefined;
        formData.append("id", wordsIdData?._id)
        newWord != undefined &&  formData.append("word", newWord)
        newTranslate != undefined && formData.append("transcription",newTranslate)
        selectedLevel && formData.append("level", selectedLevel)
        formData.append("language", wordsIdData?.language?._id && !learningLanguageWordSelectedValue ? wordsIdData?.language?._id : learningLanguageWordSelectedValue?.value)
        selectedCategory && formData.append("category", selectedCategory )
        selectedImage && formData.append("image", selectedImage);
        fileListVoice && formData.append("audio", fileListVoice)

        Object.keys(values).map((date, index) => {
            if (date.includes("translate")) {
                array.push(values[date])
            }
        })

        array?.map((values, ind) => {
            values != undefined &&    formData.append(`translates[${ind}].text[${0}]`, values);
        })

        Object.keys(values).map((date, index) => {
            if (date.includes("nativeInpust")) {
                array.push(values[date])
            }
        })

        array?.map((values, ind) => {
            values != undefined &&    formData.append(`translates[${ind}].text[${0}]`, values);
        })

        // !learningLanguageWordSelectedValue && wordsIdData?.translates?.map((item, ind) => {
        //     formData.append(`translates[${ind}].nativeLanguage`, item?.nativeLanguage?._id);
        // })

        learningLanguageWordSelectedValue?.nativeLanguages.map((item, ind) => {
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
            level: getLevelTypeLabel(wordsIdData?.level),
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
    

    const handleLoadOptions = async (inputValue, loadedOptions, { page }) => {
    const { options, hasMore } = await loadOptions(inputValue, loadedOptions, { page,name }, learningLanguageUrl,learningLanguageWordSelectedValue,);
        return {
          options: options,
          hasMore: hasMore,
          additional: {
            page: page + 1,
          },
        };
      };
   
      
      const handleLoadOptionsCategory = async (inputValue, loadedOptions, { page }) => {
        const { options, hasMore } = await loadOptions(inputValue, loadedOptions, { page,categoryName}, categoryUrl,);
        return {
          options: options,
          hasMore: hasMore,
      
          additional: {
            page: page + 1,
          },
        };
      };

      const handleLoadOptionsLevel = async (inputValue, loadedOptions) => {
        const { options } = await loadOptions(inputValue, loadedOptions,{levelName});
        return {
          options: wordlevel,
        };
      };
    
    

    const onChange = (value) => {
        setLearningLanguageWordSelectedValue(value)
    }

    const onChangeCategory = (value) => {
        setSelectedCategory(value?.value)
    }
    const onChangeLevel = (value) => {
        setSelectedLevel(value?.value)
    }

    const handleRemoveError = () => {
        // dispatch(clearNativeCreateResponse());
      };

    return (
        <div className="nativeLanguageCreateScreenMainDiv">
                  {/* {errorMessage && <CustomErrorSection error={errorMessage} onTab={handleRemoveError} />} */}

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
                                    <CustomAsyncPaginate defaultInputValue={wordsIdData?.language?.name} style={customStyles} onChange={onChange} current={current} placeholder="English" loadOptions={handleLoadOptions} />

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
                                                                                {/* <CustomAsyncPaginate 
                                                defaultInputValue={getLevelTypeLabel(wordsIdData?.level)}
                                                style={customStylesCategory}
                                                onChange={onChangeLevel}
                                                current={current} 
                                                placeholder="Level"
                                                loadOptions={handleLoadOptionsLevel} /> */}
                                           

                                            {/* <CustomAntdSelect
                                                rules={true}
                                                name="level"
                                                // width={172}
                                                defaultValue="Level*"
                                                optinData={wordlevel}
                                                setSelected={setSelectedLevel}
                                            /> */}
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
                                                        key={item?._id}
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