import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNativeCreateSuccess,
  clearNativeCreateResponse,
  selectNativeCreateSuccess,
  selectNativeCreateResponse,
  selectNativeCreateLoading,
  createNativeLanguage,
} from "../../store/slices/native-language/native-language-create";
import { CustomAntdButton, CustomAntdInput, CustomErrorSection, Success } from "../../components";
import { Colors } from "../../assets/colors";
import { ImageUpload } from "../category-screen/category-screen-create-from";
import removeIcon from "../../assets/images/remove_icon.png";
import { fileToDataString } from "../../helper/file-build";
import "../../global-styles/global-styles.css";
import "./native-language-style.css";

export const NativeLanguageCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formData = new FormData();
  const isNativeCreateSuccess = useSelector(selectNativeCreateSuccess);
  const nativeLanguageResponse = useSelector(selectNativeCreateResponse);
  const isLoading = useSelector(selectNativeCreateLoading);
  const errorMessage = nativeLanguageResponse?.message;
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedImage, setSelectedImage] = useState();
  const [previewImgUrl, setPreviewImgUrl] = useState("");

  // Handle form submission
  const handleFinish = (values) => {
    if (values.image.file !== "") {
      formData.append("nameEng", values.nameEng);
      formData.append("name", values.name);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      dispatch(createNativeLanguage(formData));
    } else {
      console.log(values);
    }
  };

  // Clear error message
  const handleRemoveError = () => {
    dispatch(clearNativeCreateResponse());
  };

  // Handle file input change
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (!file) {
      return;
    }
    try {
      const imgUrl = await fileToDataString(file);
      setPreviewImgUrl(imgUrl);
    } catch (error) {
      console.error(error);
    }
  };

  // Clear form and state on success
  useEffect(() => {
    if (isNativeCreateSuccess) {
      form.resetFields();
      setPreviewImgUrl("");
      dispatch(clearNativeCreateResponse());
    }
  }, [isNativeCreateSuccess, dispatch, form]);

  // Show success message
  useEffect(() => {
    if (isNativeCreateSuccess) {
      Success({ messageApi });
      dispatch(clearNativeCreateSuccess());
    }
  }, [isNativeCreateSuccess, messageApi, dispatch]);

  return (
    <div className="nativeLanguageCreateScreenMainDiv">
      {errorMessage && <CustomErrorSection error={errorMessage} onTab={handleRemoveError} />}
      <p className="categoryCreateTitle">Add Native Language</p>
      <Form
        className="formAntd"
        autoComplete="off"
        form={form}
        name="create-native-language"
        onFinish={handleFinish}
      >
        <div className="nativeInput">
          <CustomAntdInput rules={true} name="nameEng" placeholder="Language English Name*" />
          <CustomAntdInput rules={true} name="name" placeholder="Native Name*" />
        </div>
        <Form.Item name="image" rules={[{ required: true }]}>
          {previewImgUrl ? (
            <div className="imgae_upload_design">
              <div className="remove_icon_div">
                <img
                  className="remove_button"
                  src={removeIcon}
                  alt="Remove"
                  onClick={() => setPreviewImgUrl("")}
                />
              </div>
              <div className="imgae_name">
                <div className="image_wrapper">
                  <p>{selectedImage?.name}</p>
                  <img className="imageItem" src={previewImgUrl} />
                </div>
              </div>
            </div>
          ) : (
            <ImageUpload onChange={handleFileChange} />
          )}
        </Form.Item>
        <Form.Item>
          {contextHolder}
          <CustomAntdButton title="Add" background={Colors.PURPLE} loading={isLoading} />
        </Form.Item>
      </Form>
    </div>
  );
};