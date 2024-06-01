import React, { useState, useEffect } from "react";
import { Form, Upload, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import uploadImage from "../../assets/images/uploadImg.png";
import { CustomAntdButton, CustomAntdInput } from "../../components";
import { Colors } from "../../assets/colors";
import "../../global-styles/global-styles.css";
import "./learning-language-screen-style.css";
import { SelectLanguage } from "./components/";
import {
  createLearnLanguageThunk,
  deleteLerningCreateResponse,
  learnLanguageCreateResponse,
  removeAllCreateSelectedLanguages,
  nativeLanguageGetThunk,
  learnLanguageSelectedLanguages,
  removeLanguagesItem,
  getNativeGetResponse,
  removeAllLanguages,
} from "../../store/slices";
import { Error, Success } from "../../components";
import { useNavigate } from "react-router-dom";
import { SelectLearningLang } from "./select-learning-lang";

export const LearningLanguageCreateScreen = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const formData = new FormData();
  const [learningLanguageFileList, setLearningLanguageFileList] = useState([]);
  const [learningLanguageFile, setLearningLanguageFile] = useState();
  const [showLearningLanguageUpload, setShowLearningLanguageUpload] = useState();
  const languages = useSelector(learnLanguageSelectedLanguages);
  const nativeLanguageData = useSelector(getNativeGetResponse);
  const createLearnLanguageResponse = useSelector(learnLanguageCreateResponse);
  const messageError = createLearnLanguageResponse?.message;
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const data = {
      skip: 0,
      limit: 12,
    };
    dispatch(nativeLanguageGetThunk(data));
  }, []);

  const onFinish = (values) => {
    if (values.learningLanguageImage.file != "") {
      formData.append("nameEng", values.nameEng);
      formData.append("name", values.name);
      formData.append("image", learningLanguageFile);
      languages.forEach((item, ind) => {
        formData.append(`nativeLanguages[${ind}]`, item._id);
      });
      dispatch(createLearnLanguageThunk(formData));
      form.resetFields();
      setLearningLanguageFile("");
      dispatch(removeAllLanguages())
    } else {
      console.log(values);
    }
  };

  const handleChange = (info) => {
    setLearningLanguageFile(info.file);
    setShowLearningLanguageUpload(info.fileList[0]);
    if (!info.fileList[0]) {
      info.file = "";
    }
  };

  const beforeUpload = () => {
    return false;
  };

  useEffect(() => {
    createLearnLanguageResponse?.success === true && Success({ messageApi });
    createLearnLanguageResponse?.success === false &&
      Error({ messageApi, messageError });
    dispatch(deleteLerningCreateResponse());
    dispatch(removeAllCreateSelectedLanguages());
  }, [createLearnLanguageResponse?.success]);

  const props = {
    accept: ".png",
    onRemove: (file) => {
      const index = learningLanguageFileList.indexOf(file);
      const newFileList = learningLanguageFileList.slice();
      newFileList.splice(index, 1);
    },
  };

  return (
    <div
      className="authScreenMainDiv learnLanguageCreateScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE, flexDirection: "row" }}
    >
      <div className="learningLanguageUpdateFormDiv">
        <p className="nativeLanguageTitle">Add Learning Language</p>
        <Form
          autoComplete="off"
          form={form}
          name="createLearningLanguage"
          onFinish={onFinish}
          className="formAntd"
        >
          <div className="createScreenRowInputs">
            <CustomAntdInput name="name" placeholder="Language English Name*" />
            <CustomAntdInput name="nameEng" placeholder=" Native Name*" />
          </div>

          <Form.Item
            name="learningLanguageImage"
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
              {learningLanguageFile && showLearningLanguageUpload ? null : (
                <img src={uploadImage} className="upload" />
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            {contextHolder}
            <CustomAntdButton title="Add" background={Colors.PURPLE} />
          </Form.Item>
        </Form>
      </div>
      <div className="learnLanguageSelectedLanguages">
        <p className="selectLanguageTitle">Native Language</p>
        <SelectLearningLang dataLanguages={languages} onDelete={(id) => {
          dispatch(removeLanguagesItem(id));
        }} />
      </div>
    </div>
  );
};
