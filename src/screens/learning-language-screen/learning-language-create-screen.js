import React, { useState, useEffect } from "react";
import { Form, Upload, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CustomAntdButton, CustomAntdInput, CustomErrorSection, CustomUploadElement } from "../../components";
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
import { Success } from "../../components";
import { SelectLearningLang } from "./select-learning-lang";
import { beforeUpload } from "../utils/helper";
import { page0, page12 } from "../../constants/constants";
import { ConstPagiantion, } from "../../constants/const-pagination";
import { ImageUpload } from "../category-screen/category-screen-create-from";
import { fileToDataString } from "../../helper/file-build";
import remove_icon from "../../assets/images/remove_icon.png";

export const LearningLanguageCreateScreen = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const formData = new FormData();
  const [learningLanguageFileList, setLearningLanguageFileList] = useState([]);
  const [learningLanguageFile, setLearningLanguageFile] = useState();
  const [showLearningLanguageUpload, setShowLearningLanguageUpload] = useState();
  const languages = useSelector(learnLanguageSelectedLanguages);
  const languageLoading = useSelector(learnLanguageCreateLoading);
  const createLearnLanguageResponse = useSelector(learnLanguageCreateResponse);
  const messageError = createLearnLanguageResponse?.message;
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedImage, setSelectedImage] = useState();
  const [previewImgUrl, setPreviewimgUrl] = useState("");
  const [categoryShow, setCategoryShow] = useState();

  useEffect(() => {
    dispatch(nativeLanguageGetThunk(ConstPagiantion(page0, page12)));
  }, []);

  const onFinish = (values) => {
    if (values.learningLanguageImage.file != "") {
      formData.append("nameEng", values.nameEng);
      formData.append("name", values.name);
      selectedImage && formData.append("image", selectedImage);
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
      setPreviewimgUrl("")
      setCategoryShow(null);
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
    // createLearnLanguageResponse?.success === false &&
    //   Error({ messageApi, messageError });
    // dispatch(deleteLerningCreateResponse());
    dispatch(removeAllCreateSelectedLanguages());
  }, [createLearnLanguageResponse?.success]);


  const onRemove = () => {
    dispatch(deleteLerningCreateResponse());
  }
  const props = {
    accept: ".png,.svg,.jpg",
    onRemove: (file) => {
      const index = learningLanguageFileList.indexOf(file);
      const newFileList = learningLanguageFileList.slice();
      newFileList.splice(index, 1);
    },
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

  return (
    <div
      // className="authScreenMainDiv learnLanguageCreateScreenMainDiv"
      className="nativeLanguageScreenMainDiv"
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
            <div className="updateSection">
              <div>
                {messageError && <CustomErrorSection error={messageError} onTab={onRemove} />}
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
                  {previewImgUrl?.length ?
                    <div className="imgae_upload_design">
                      <div className="remove_icon_div">
                        <img
                          className="remove_button"
                          src={remove_icon}
                          onClick={() => {
                            setPreviewimgUrl("")
                            setCategoryShow(null);
                          }}
                        />
                      </div>
                      <div className="imgae_name">
                        <div className="image_wrapper">
                          <p>{selectedImage?.name}</p>
                          <img className="imageItem" src={previewImgUrl} />
                        </div>
                      </div>
                    </div> : <ImageUpload onChange={handleFileChange} />}
                </Form.Item>
              </div>
              <div className="learnLanguageSelectedLanguages">
                <p className="selectLanguageTitle">Native Language</p>
                <SelectLearningLang name={"Native Language"} rules={true} dataLanguages={languages} onDelete={(id) => {
                  dispatch(removeLanguagesItem(id));
                }} />
              </div>
            </div>
            <Form.Item>
              {contextHolder}
              <div className="addButton">
                <CustomAntdButton loading={languageLoading} title="Add" background={Colors.PURPLE} />
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
