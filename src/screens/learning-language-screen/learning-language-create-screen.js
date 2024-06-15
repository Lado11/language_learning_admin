import React, { useState, useEffect } from "react";
import { Form, Upload, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import uploadImage from "../../assets/images/uploadImg.png";
import { CustomAntdButton, CustomAntdInput } from "../../components";
import { Colors } from "../../assets/colors";
import "../../global-styles/global-styles.css";
import "./learning-language-screen-style.css";
import {
  createLearnLanguageThunk,
  deleteLerningCreateResponse,
  learnLanguageCreateResponse,
  removeAllCreateSelectedLanguages,
  nativeLanguageGetThunk,
  learnLanguageSelectedLanguages,
  removeLanguagesItem,
  removeAllLanguages,
  learnLanguageCreateLoading,
} from "../../store/slices";
import { Error, Success } from "../../components";
import { SelectLearningLang } from "./select-learning-lang";
import { beforeUpload } from "../utils/helper";

export const LearningLanguageCreateScreen = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const formData = new FormData();
  const [learningLanguageFileList, setLearningLanguageFileList] = useState([]);
  const [learningLanguageFile, setLearningLanguageFile] = useState();
  const [showLearningLanguageUpload, setShowLearningLanguageUpload] = useState();
  const languages = useSelector(learnLanguageSelectedLanguages);
  console.log(languages,"log languages");
  const languageLoading = useSelector(learnLanguageCreateLoading);
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

    } else {
      console.log(values);
    }
  };

  useEffect(() => {
    if (createLearnLanguageResponse?.success === true) {
      form.resetFields();
      setLearningLanguageFile("");
      dispatch(removeAllLanguages())
      dispatch(deleteLerningCreateResponse());
    }
  }, [createLearnLanguageResponse?.success])

  const handleChange = (info) => {
    setLearningLanguageFile(info.file);
    setShowLearningLanguageUpload(info.fileList?.[0]);
    if (!info.fileList?.[0]) {
      info.file = "";
    }
  };


  useEffect(() => {
    createLearnLanguageResponse?.success === true && Success({ messageApi });
    createLearnLanguageResponse?.success === false &&
      Error({ messageApi, messageError });
    dispatch(deleteLerningCreateResponse());
    dispatch(removeAllCreateSelectedLanguages());
  }, [createLearnLanguageResponse?.success]);

  const props = {
    accept: ".png,.svg,.jpg",
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
        <Form
          autoComplete="off"
          form={form}
          name="createLearningLanguage"
          onFinish={onFinish}
          // className="formAntd"
        >
        <div className="createLearningLangRow">
        <div>
        <p className="nativeLanguageTitle">Add Learning Language</p>

         <div className="createScreenRowInputs">
            <CustomAntdInput rules={true} name="name" placeholder="Language English Name*" />
            <CustomAntdInput rules={true} name="nameEng" placeholder=" Native Name*" />
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
            <CustomAntdButton loading={languageLoading} title="Add" background={Colors.PURPLE} />
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
      
    </div>
  );
};
