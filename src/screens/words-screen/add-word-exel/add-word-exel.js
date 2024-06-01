import { Form, Upload } from "antd";
import { Colors } from "../../../assets/colors";
import { CustomAntdButton, CustomAntdSelect } from "../../../components";
import uploadIcon from "../../../assets/images/exelupload.png";
import { useEffect, useState } from "react";
import remove_icon from "../../../assets/images/remove_icon.png";
import { useTranslation } from "react-i18next";
import "./add-word-exel.css";
import { SelectLearningLang } from "../../learning-language-screen/select-learning-lang";
import { useDispatch, useSelector } from "react-redux";
import { getLearnLanguagesLoading, learnLanguageSelectedLanguages, learningLanguages, learningLanguagesThunk, nativeLanguageGetThunk, removeLanguagesItem } from "../../../store/slices";

export const AddWordExel = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [categoryShow, setCategoryShow] = useState();
    const [showCategoryUpload, setCatgeoryShowUpload] = useState();
    const [fileList, setFileList] = useState([]);
    const [ learningLanguageWordSelectedValue,setLearningLanguageWordSelectedValue ] = useState();
    const languages = useSelector(learnLanguageSelectedLanguages);
    const learningLanguagesData = useSelector(learningLanguages);
    console.log(learningLanguagesData,"lerning")
    const learnLanguagesLoading = useSelector(getLearnLanguagesLoading);
    const pageLength = 12;
    const skipNative = {
        skip: 0,
        limit: 12,
    };
   
    useEffect(() => {
      dispatch(learningLanguagesThunk(skipNative));
    }, []);

    const filteredResponse = learningLanguagesData?.data?.list.map((lang) => {
        return {
            _id: lang.id,
            label: lang.name.toLowerCase(),
            value: lang.name,
        };
    });

    const data = [
        {
            value: "1",
            label: "admin",
        },
        {
            value: "2",
            label: "client",
        },
        {
            value: "3",
            label: "operator",
        },
    ];

  

    useEffect(() => {
       
        dispatch(nativeLanguageGetThunk(skipNative));
    }, []);

    const onFinish = (values) => {
        // if (values.image.file != "") {
        //   formData.append("nameEng", values.nameEng);
        //   formData.append("name", values.name);
        //   categoryShow && formData.append("image", categoryShow);
        //   formData.append("id", nativeLanguageData.id);
        //   formData.append("active", nativeLanguageData?.active);
        //   dispatch(nativeLanguageUpdateThunk(formData));
        //   form.resetFields();
        //   setCategoryShow("");
        // } else {
        //   console.log(values, "values");
        // }
    };

    const handleChange = (info) => {
        console.log(info,"log info")
        setCategoryShow(info.file);
        setCatgeoryShowUpload(info.fileList[0]);
        if (!info.fileList[0]) {
            info.file = "";
        }
    };

    const beforeUpload = () => {
        return false;
    };

    const props = {
        
        accept: "application/vnd.ms-excel",
        onRemove: (file) => {
            const index = fileList?.indexOf(file);
            const newFileList = fileList?.slice();
            newFileList?.splice(index, 1);
        },
    };

    return (
        <div className="nativeLanguageCreateScreenMainDiv addWordExel">
            <p className="nativeLanguageTitle "> Add Words From Excel</p>
            <Form
                autoComplete="off"
                form={form}
                name="control-hooks"
                onFinish={onFinish}
            >
                <div className="wordExelAdd">
                    <div>
                        <CustomAntdSelect
                            className="wordsSelectExel"
                            optinData={filteredResponse}
                            selected={learningLanguageWordSelectedValue}
                            setSelected={setLearningLanguageWordSelectedValue}
                            defaultValue={t("LEARNING_LANGUAGE")}
                            color={Colors.LIGHT_GRAY}
                        />
                        <Form.Item
                            name="image"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Upload
                                onChange={handleChange}
                                beforeUpload={beforeUpload}
                                {...props}
                                maxCount={1}
                                listType="picture"
                                className="upload-list-inline"
                            >
                                {categoryShow && showCategoryUpload ? null : (
                                    <img src={uploadIcon} className="uploadExel" />
                                )}
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            {/* {contextHolder} */}
                            <CustomAntdButton
                                title="Add"
                                background={Colors.PURPLE}
                            // loading={nativeUpdateLoading}
                            />
                        </Form.Item>
                    </div>
                    <div className="learnLanguageSelectedLanguages">
                        <p className="selectLanguageTitle">Native Language</p>
                        <SelectLearningLang dataLanguages={languages} onDelete={(id) => {
                            dispatch(removeLanguagesItem(id));
                        }} />
                    </div>
                </div>
            </Form>

        </div>
    )

}