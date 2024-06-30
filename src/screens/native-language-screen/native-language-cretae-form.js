import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNativeCreateBool,
  deleteNativeCreateResponse,
  getNativeCreateBool,
  getNativeCreateData,
  getNativeCreateLoading,
  nativeLanguageCreateThunk,
} from "../../store/slices/native-language/native-language-create";
import { CustomAntdButton } from "../../components/custom-antd-button/custom-antd-button";
import { Colors } from "../../assets/colors";
import { CustomAntdInput, CustomErrorSection } from "../../components";
import { Success } from "../../components/custom-message/custom-message";
import { ImageUpload } from "../category-screen/category-screen-create-from";
import remove_icon from "../../assets/images/remove_icon.png";
import { fileToDataString } from "../../helper/file-build";

export const NativeLanguageCretae = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formData = new FormData();
  const nativeCreateBool = useSelector(getNativeCreateBool);
  const [fileList, setFileList] = useState([]);
  const [categoryShow, setCategoryShow] = useState();
  const nativeLanguageData = useSelector(getNativeCreateData);
  const [messageApi, contextHolder] = message.useMessage();
  const craeteLoading = useSelector(getNativeCreateLoading);
  const messageError = nativeLanguageData?.message;
  const [selectedImage, setSelectedImage] = useState();
  const [previewImgUrl, setPreviewimgUrl] = useState("");
  const str = messageError?.toString()


  const onFinish = (values) => {
    if (values.image.file != "") {
      formData.append("nameEng", values.nameEng);
      formData.append("name", values.name);
      selectedImage && formData.append("image", selectedImage);
      dispatch(nativeLanguageCreateThunk(formData));
    } else {
      console.log(values, "values");
    }
  };

  const onRemove = () => {
    dispatch(deleteNativeCreateResponse())
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

  useEffect(() => {
    dispatch(deleteNativeCreateBool());
  }, [nativeCreateBool]);

  useEffect(() => {
    if (nativeLanguageData?.success === true) {
      form.resetFields();
      setCategoryShow("");
      setPreviewimgUrl("")
      setCategoryShow(null);
      dispatch(deleteNativeCreateResponse());
    }
  }, [nativeLanguageData?.success])

  useEffect(() => {
    nativeLanguageData?.success === true && Success({ messageApi });
  }, [nativeLanguageData?.success]);


  return (
    <div className="nativeLanguageCreateScreenMainDiv">
      {str != null ? <CustomErrorSection error={str} onTab={onRemove} /> : null}
      <p className="categoryCraeteTitle">Add Native Language</p>
      <Form
        className="formAntd"
        autoComplete="off"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <div className="nativeInput">
          <CustomAntdInput rules={true} name="nameEng" placeholder=" Language English Name*" />
          <CustomAntdInput rules={true} name="name" placeholder="Native Name*" />
        </div>
        <Form.Item
          name="image"
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
        <Form.Item>
          {contextHolder}
          <CustomAntdButton
            title="Add"
            background={Colors.PURPLE}
            loading={craeteLoading}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
