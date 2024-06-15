import { Form, Upload, message } from "antd";
import { Colors } from "../../../assets/colors";
import { CustomAntdButton, CustomAntdSelect, Error, Success } from "../../../components";
import uploadIcon from "../../../assets/images/exelupload.png";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./add-word-exel.css";
import { SelectLearningLang } from "../../learning-language-screen/select-learning-lang";
import { useDispatch, useSelector } from "react-redux";
import { getLearnLanguagesLoading, learnLanguageSelectedLanguages, learningLanguages, learningLanguagesThunk, nativeLanguageGetThunk, removeAllLanguages, removeLanguagesItem } from "../../../store/slices";
import { createExelWordsLoadingData, createExelWordsResponseData, createExelWordsThunk, deleteAddWordExelResponse } from "../../../store/slices/words/post-exel-word";
import { beforeUpload } from "../../utils/helper";

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
    const learnLanguagesLoading = useSelector(getLearnLanguagesLoading);
    const addWordFormExelLoading = useSelector(createExelWordsLoadingData);
    const addWordExel = useSelector(createExelWordsResponseData);
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
        formData.append("language", learningLanguageWordSelectedValue?._id)
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
                        <p className="nativeLanguageTitle "> Add Words From Excel</p>

                        <CustomAntdSelect
                        name={"Learning Language"}
                            rules={"true"}
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
                            {contextHolder}
                            <CustomAntdButton
                                title="Add"
                                background={Colors.PURPLE}
                            loading={addWordFormExelLoading}
                            />
                        </Form.Item>
                    </div>
                    <div className="learnLanguageSelectedLanguages">
                        <p className="selectLanguageTitle">Native Language</p>
                        <SelectLearningLang rules={true} name={"Native Language"} dataLanguages={languages} onDelete={(id) => {
                            dispatch(removeLanguagesItem(id));
                        }} />
                    </div>
                </div>
            </Form>

        </div>
    )

}