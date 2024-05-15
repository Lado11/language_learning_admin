import React, { useState } from "react";
import { Form, Upload } from "antd";
import { useDispatch } from "react-redux";
import uploadImage from "../../assets/images/uploadImg.png";
import { CustomAntdButton, CustomAntdInput } from "../../components";
import { Colors } from "../../assets/colors";
import "../../global-styles/global-styles.css";
import { SelectLanguage } from "./components/";

export const LearningLanguageCreateScreen = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formData = new FormData();
  const [learningLanguageFileList, setLearningLanguageFileList] = useState([]);
  const [learningLanguageFile, setLearningLanguageFile] = useState();
  const [showLearningLanguageUpload, setShowLearningLanguageUpload] =
    useState();

  const onFinish = (values) => {
    if (values.learningLanguageImg.file != "") {
      formData.append("name", values.learningLanguageImg);
      formData.append("localization", values.learningLanguageImg);
      formData.append("image", learningLanguageFile);
      // dispatch(categoryCreateThunk(formData));
      form.resetFields();
      setLearningLanguageFile("");
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
      className="authScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE, flexDirection: "row" }}
    >
      <div>
        <p className="nativeLanguageTitle">Add Learning Language</p>
        <Form
          autoComplete="off"
          form={form}
          name="createLearningLanguage"
          onFinish={onFinish}
        >
          <div className="createScreenRowInputs">
            <CustomAntdInput
              name="learningLanguageName"
              placeholder="Language English Name*"
            />
            <CustomAntdInput name="nativeName" placeholder=" Native Name*" />
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
            <CustomAntdButton title="Add" background={Colors.PURPLE} />
          </Form.Item>
        </Form>
      </div>
      <div style={{ width: "44%" }}>
        <SelectLanguage />
      </div>
    </div>
  );
};
