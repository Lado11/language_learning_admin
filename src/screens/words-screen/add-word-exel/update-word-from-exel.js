import { Form, Upload } from "antd";
import { CustomAntdButton, CustomAntdSelect } from "../../../components";
import { Colors } from "../../../assets/colors";
import { SelectLearningLang } from "../../learning-language-screen/select-learning-lang";
import { getLearnLanguagesLoading, learnLanguageSelectedLanguages, learningLanguages, learningLanguagesThunk, nativeLanguageGetThunk, removeAllLanguages, removeLanguagesItem } from "../../../store/slices";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import uploadIcon from "../../../assets/images/exelupload.png";
import { createExelWordsThunk } from "../../../store/slices/words/post-exel-word";
import { updateExelWordsLoadingData, updateExelWordsThunk } from "../../../store/slices/words/put-exel-word";
import { beforeUpload } from "../../utils/helper";


export const UpdateExelFromWord = () => {
    
        const [form] = Form.useForm();
        const dispatch = useDispatch();
        const { t } = useTranslation();
        const formData = new FormData();
        const [categoryShow, setCategoryShow] = useState();
        const [showCategoryUpload, setCatgeoryShowUpload] = useState();
        const [fileList, setFileList] = useState([]);
        const [learningLanguageWordSelectedValue, setLearningLanguageWordSelectedValue] = useState();
        const languages = useSelector(learnLanguageSelectedLanguages);
        const learningLanguagesData = useSelector(learningLanguages);
        const learnLanguagesLoading = useSelector(getLearnLanguagesLoading);
        const updateWordLoading = useSelector(updateExelWordsLoadingData);
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
                _id: lang._id,
                label: lang.name.toLowerCase(),
                value: lang.name,
            };
        });
    
    
        useEffect(() => {
            dispatch(nativeLanguageGetThunk(skipNative));
        }, []);
    
        const onFinish = (values) => {
            languages.forEach((item, ind) => {
                formData.append(`translates[${ind}]`, item._id);
            });
            categoryShow && formData.append("excel", categoryShow)
            // formData.append("language", learningLanguageWordSelectedValue?._id)
            dispatch(updateExelWordsThunk(formData));
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
            accept: ".xlsx,.xls",
            onRemove: (file) => {
                const index = fileList?.indexOf(file);
                const newFileList = fileList?.slice();
                newFileList?.splice(index, 1);
            },
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
                            <p className="nativeLanguageTitle ">Update Words From Excel</p>
    
                            <CustomAntdSelect 
                             name={"Learning Language"}
                            //   rules={true}
                                className="wordsSelectExel"
                                optinData={filteredResponse}
                                selected={learningLanguageWordSelectedValue}
                                setSelected={setLearningLanguageWordSelectedValue}
                                defaultValue={t("LEARNING_LANGUAGE")}
                                color={Colors.LIGHT_GRAY}
                            />
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
                                        <img src={uploadIcon} className="uploadExel" />
                                    )}
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                {/* {contextHolder} */}
                                <CustomAntdButton
                                    title="Update"
                                    background={Colors.PURPLE}
                                loading={updateWordLoading}
                                />
                            </Form.Item>
                        </div>
                        <div className="learnLanguageSelectedLanguages">
                            <p className="selectLanguageTitle">Native Language</p>
                            <SelectLearningLang name={"Native Language"} rules={true} dataLanguages={languages} onDelete={(id) => {
                                dispatch(removeLanguagesItem(id));
                            }} />
                        </div>
                    </div>
                </Form>
    
            </div>
    )
}