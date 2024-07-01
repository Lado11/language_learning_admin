import { Form, Upload, message } from "antd";
import { Colors } from "../../../assets/colors";
import { CustomAntdButton, CustomAsyncPaginate, Error, Success } from "../../../components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./add-word-exel.css";
import { SelectLearningLang } from "../../learning-language-screen/select-learning-lang";
import { useDispatch, useSelector } from "react-redux";
import { learnLanguageSelectedLanguages, learningLanguages, learningLanguagesThunk, nativeLanguageGetThunk, removeAllLanguages, removeLanguagesItem } from "../../../store/slices";
import { createExelWordsLoadingData, createExelWordsResponseData, createExelWordsThunk, deleteAddWordExelResponse } from "../../../store/slices/words/post-exel-word";
import { beforeUpload } from "../../utils/helper";
import { listItemCountForShow } from "../../../constants/constants";
import { ConstPagiantion } from "../../../constants/const-pagination";
import axios from "axios";
import logoVoice from "../../../assets/images/Vector (4).png";

export const AddWordExel = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const formData = new FormData();
    const [categoryShow, setCategoryShow] = useState();
    const [showCategoryUpload, setCatgeoryShowUpload] = useState();
    const [fileList, setFileList] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [learningLanguageWordSelectedValue, setLearningLanguageWordSelectedValue] = useState();
    const languages = useSelector(learnLanguageSelectedLanguages);
    const learningLanguagesData = useSelector(learningLanguages);
    const addWordFormExelLoading = useSelector(createExelWordsLoadingData);
    const addWordExel = useSelector(createExelWordsResponseData);
    const token = localStorage.getItem("token")
    const LIMIT = 10;
    const [current, setCurrent] = useState(0)
    const URL = process.env.REACT_APP_BASE_URL;

    const filteredResponse = learningLanguagesData?.data?.list.map((lang) => {
        return {
            _id: lang._id,
            label: lang.name.toLowerCase(),
            value: lang.name,
        };
    });


    async function loadOptions(_search, loadedOptions, { page }) {
        const start = (page) * LIMIT; // Calculate start index for pagination
        const searchQuersy = _search !== undefined && _search != "" ? `?search=${_search}&` : '?';
        try {
            const response = await axios.get(
                `${URL}api/admin/language/native${searchQuersy}skip=${start}&limit=${LIMIT}`,
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



    const onFinish = (values) => {
        languages.forEach((item, ind) => {
            formData.append(`translates[${ind}]`, item.value);
        });
        categoryShow && formData.append("excel", categoryShow)
        formData.append("language", learningLanguageWordSelectedValue)
        dispatch(createExelWordsThunk(formData));
        form.resetFields();
        setCategoryShow("");
        dispatch(removeAllLanguages())
    };

    const handleChange = (info) => {
        setCategoryShow(info.file);
        setCatgeoryShowUpload(info.fileList[0]);
        if (!info.fileList[0]) {
            info.file = "";
        }
    };

    const props = {
        accept: ".xlsx , .xls",
        onRemove: (file) => {
            const index = fileList?.indexOf(file);
            const newFileList = fileList?.slice();
            newFileList?.splice(index, 1);
        },
    };
    const messageError = addWordExel?.message;

    useEffect(() => {
        addWordExel?.success === true && Success({ messageApi });
        addWordExel?.success === false && Error({ messageApi, messageError });
        dispatch(deleteAddWordExelResponse());
    }, [addWordExel?.success]);

    useEffect(() => {
        dispatch(nativeLanguageGetThunk(ConstPagiantion(0, listItemCountForShow)));
    }, []);

    useEffect(() => {
        dispatch(learningLanguagesThunk(ConstPagiantion(0, listItemCountForShow)));
    }, []);

    const onChange = (value) => {
        setLearningLanguageWordSelectedValue(value?.value)
    }

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          with:"100%",
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

    return (
        <div className="nativeLanguageCreateScreenMainDiv ">
            <Form
                autoComplete="off"
                form={form}
                name="control-hooks"
                onFinish={onFinish}
            >
                <div className="wordExelAdd ">
                    <div className="addWordExel">
                        <div>
                            <p className="nativeLanguageTitle "> Add Words From Excel</p>
                            <CustomAsyncPaginate style={customStyles} onChange={onChange} current={current} placeholder="English" loadOptions={loadOptionsLang} />
                            {/* <CustomAntdSelect
                                name={"Learning Language"}
                                rules={"true"}
                                className="wordsSelectExel"
                                optinData={filteredResponse}
                                selected={learningLanguageWordSelectedValue}
                                setSelected={setLearningLanguageWordSelectedValue}
                                defaultValue={t("LEARNING_LANGUAGE")}
                                color={Colors.LIGHT_GRAY}
                            /> */}
                            <Form.Item
                                name="image"
                                rules={[{ required: true }]}>
                                <Upload
                                    onChange={handleChange}
                                    beforeUpload={beforeUpload}
                                    {...props}
                                    maxCount={1}
                                    listType="picture"
                                    className="upload-list-inline"
                                >
                                    {categoryShow && showCategoryUpload ? null : (
                                        <div className="exelUploadLanguage">
                                            <div className="uploadElemntRow">
                                                <p className="titleVoiceUpload">
                                                    Excel Upload
                                                </p>
                                                <img src={logoVoice} className="uploadIcon" />
                                            </div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </div>
                        <div className="learnLanguageSelectedLanguages">
                            <p className="selectLanguageTitle">Native Language</p>
                            <SelectLearningLang loadOptions={loadOptions} current={current} rules={true} name={"Native Language"} dataLanguages={languages} onDelete={(id) => {
                                dispatch(removeLanguagesItem(id));
                            }} />
                        </div>
                    </div>

                    <Form.Item>
                        {contextHolder}
                        <CustomAntdButton
                            title="Add"
                            background={Colors.PURPLE}
                            loading={addWordFormExelLoading}
                        />
                    </Form.Item>

                </div>
            </Form>
        </div>
    )

}