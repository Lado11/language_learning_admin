import React, { useEffect, useState } from "react";
import { Form, Upload, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNativeCreateBool,
  deleteNativeCreateResponse,
  getNativeCreateBool,
  getNativeCreateData,
  getNativeCreateLoading,
  nativeLanguageCreateThunk,
} from "../../store/slices/native-language/native-language-create";
import uploadImage from "../../assets/images/uploadImg.png";
import { CustomAntdButton } from "../../components/custom-antd-button/custom-antd-button";
import { Colors } from "../../assets/colors";
import { useNavigate } from "react-router-dom";
import { CustomAntdInput } from "../../components";
import { Error, Success } from "../../components/custom-message/custom-message";

export const NativeLanguageCretae = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();
  const nativeCreateBool = useSelector(getNativeCreateBool);
  const [fileList, setFileList] = useState([]);
  const [categoryShow, setCategoryShow] = useState();
  const [showCategoryUpload, setCatgeoryShowUpload] = useState();
  const nativeLanguageData = useSelector(getNativeCreateData);
  const [messageApi, contextHolder] = message.useMessage();

  const craeteLoading = useSelector(getNativeCreateLoading);
  const onFinish = (values) => {
    if (values.image.file != "") {
      formData.append("nameEng", values.nameEng);
      formData.append("name", values.name);
      formData.append("image", categoryShow);
      dispatch(nativeLanguageCreateThunk(formData));
      form.resetFields();
      setCategoryShow("");
    } else {
      console.log(values, "values");
    }
  };

  useEffect(() => {
    if (nativeCreateBool === true) {
    }
    dispatch(deleteNativeCreateBool());
  }, [nativeCreateBool]);

  const handleChange = (info) => {
    setCategoryShow(info.file);
    setCatgeoryShowUpload(info.fileList[0]);
    if (!info.fileList[0]) {
      info.file = "";
    }
  };
  const beforeUpload = () => {
    return false;
  };
  const messageError = nativeLanguageData?.message;

  useEffect(() => {
    nativeLanguageData?.success === true && Success({ messageApi });
    nativeLanguageData?.success === false &&
      Error({ messageApi, messageError });
    dispatch(deleteNativeCreateResponse());
  }, [nativeLanguageData?.success]);

  const props = {
    accept: ".png",
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
    },
  };

  return (
    <div className="nativeLanguageCreateScreenMainDiv">
      <p className="nativeLanguageTitle">Add Native Language</p>
      <Form
      className="formAntd"
        autoComplete="off"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      
      >
        <div className="nativeInput">
          <CustomAntdInput name="nameEng" placeholder=" Language English Name*" />
          <CustomAntdInput name="name" placeholder="Native Name*" />
        </div>

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
              <img src={uploadImage} className="upload" />
            )}
          </Upload>
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
