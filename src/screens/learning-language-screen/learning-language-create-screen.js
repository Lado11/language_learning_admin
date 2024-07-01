import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CustomAntdButton, CustomAntdInput, CustomErrorSection } from "../../components";
import { Colors } from "../../assets/colors";
import "../../global-styles/global-styles.css";
import "./learning-language-screen-style.css";
import {
  createLearnLanguageThunk,
  deleteLerningCreateResponse,
  learnLanguageCreateResponse,
  removeAllCreateSelectedLanguages,
  learnLanguageSelectedLanguages,
  removeLanguagesItem,
  removeAllLanguages,
  learnLanguageCreateLoading,
} from "../../store/slices";
import { Success } from "../../components";
import { SelectLearningLang } from "./select-learning-lang";
import { ImageUpload } from "../category-screen/category-screen-create-from";
import { fileToDataString } from "../../helper/file-build";
import remove_icon from "../../assets/images/remove_icon.png";
import { loadOptions } from "../../helper/loadOptions";
import { nativeGetUrl } from "./learning-langauge-constant";

export const LearningLanguageCreateScreen = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const formData = new FormData();
  const languages = useSelector(learnLanguageSelectedLanguages);
  const languageLoading = useSelector(learnLanguageCreateLoading);
  const createLearnLanguageResponse = useSelector(learnLanguageCreateResponse);
  const messageError = createLearnLanguageResponse?.message;
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedImage, setSelectedImage] = useState();
  const [previewImgUrl, setPreviewimgUrl] = useState("");

  const onFinish = (values) => {
    if (values.learningLanguageImage.file != "") {
      formData.append("nameEng", values.nameEng);
      formData.append("name", values.name);
      selectedImage && formData.append("image", selectedImage);
      languages.forEach((item, ind) => {
        formData.append(`nativeLanguages[${ind}]`, item.value);
      });
      dispatch(createLearnLanguageThunk(formData));
    } else {
      console.log(values);
    }
  };

  useEffect(() => {
    if (createLearnLanguageResponse?.success === true) {
      form.resetFields();
      dispatch(removeAllLanguages())
      setPreviewimgUrl("")
      dispatch(deleteLerningCreateResponse());
    }
  }, [createLearnLanguageResponse?.success])


  useEffect(() => {
    createLearnLanguageResponse?.success === true && Success({ messageApi });
    dispatch(removeAllCreateSelectedLanguages());
  }, [createLearnLanguageResponse?.success]);


  const onRemove = () => {
    dispatch(deleteLerningCreateResponse());
  }

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
    const { options, hasMore } = await loadOptions(inputValue, loadedOptions, { page }, nativeGetUrl);
    return {
      options: options,
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    };
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
              <div className="uploadLangInput">
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
              
              {/* <AsyncPaginate loadOptions={loadOptions}/> */}
              <div className="learnLanguageSelectedLanguages">
                <p className="selectLanguageTitle">Native Language</p>
                <SelectLearningLang loadOptions={handleLoadOptions} current={0} name={"Native Language"} rules={true} dataLanguages={languages} onDelete={(id) => {
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
