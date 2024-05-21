import React, { useEffect, useState } from "react";
import { Form, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNativeCreateBool,
  getNativeCreateBool,
} from "../../store/slices/native-language/native-language-create";
import uploadIcon from "../../assets/images/uploadImg.png";
import { CustomAntdButton } from "../../components/custom-antd-button/custom-antd-button";
import { Colors } from "../../assets/colors";
import { useNavigate } from "react-router-dom";
import { CustomAntdButtonDelete, CustomAntdInput } from "../../components";
import {
  deleteNativeDeleteBool,
  getNativeDeleteBool,
  getNativeDeleteloading,
  nativeLanguageDeleteThunk,
} from "../../store/slices/native-language/native-language-delete";
import remove_icon from "../../assets/images/remove_icon.png";
import { deleteNativeUpdateBool, getNativeUpdateBool, getNativeUpdateLoading, nativeLanguageUpdateThunk } from "../../store/slices";
import {
  getNativeGetIdResponse,
  nativeLanguageGetIdThunk,
} from "../../store/slices/native-language/get-id-native-language";

export const UpdateNativeLanguage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nativeId = localStorage.getItem("nativeId");
  const formData = new FormData();
  const nativeCreateBool = useSelector(getNativeCreateBool);
  const deleteBool = useSelector(getNativeDeleteBool);
  const [fileList, setFileList] = useState([]);
  const [categoryShow, setCategoryShow] = useState();
  const [showCategoryUpload, setCatgeoryShowUpload] = useState();
  const nativeLanguageData = useSelector(getNativeGetIdResponse)?.data;
  const nativeUpdateLoading = useSelector(getNativeUpdateLoading);
  const nativeDeleteLoading = useSelector(getNativeDeleteloading);
  const nativeUpdateBool = useSelector(getNativeUpdateBool)
  console.log(nativeUpdateBool, "log bool")

  const baseUrl = process.env.REACT_APP_BASE_URL;
  // console.log(`${baseUrl}${nativeData?.imageFile?.path}`, "baseUrl");

  const onFinish = (values) => {
    if (values.image.file != "") {
      formData.append("nameEng", values.nameEng);
      formData.append("name", values.name);
      categoryShow && formData.append("image", categoryShow);
      formData.append("id", nativeLanguageData.id);
      formData.append("active", nativeLanguageData?.active);
      dispatch(nativeLanguageUpdateThunk(formData));
      form.resetFields();
      setCategoryShow("");
    } else {
      console.log(values, "values");
    }
  };

  useEffect(() => {
    dispatch(nativeLanguageGetIdThunk(nativeId));
  }, []);

  // useEffect(() => {
  //   if (nativeCreateBool === true) {
  //   }
  //   dispatch(deleteNativeCreateBool());
  // }, [nativeCreateBool]);

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

  const props = {
    accept: ".png",
    onRemove: (file) => {
      const index = fileList?.indexOf(file);
      const newFileList = fileList?.slice();
      newFileList?.splice(index, 1);
    },
  };


  useEffect(() => {
    form.setFieldsValue({
      nameEng: nativeLanguageData?.nameEng,
      name: nativeLanguageData?.name,
      image: nativeLanguageData?.imageFile?.path,
    });
  }, [nativeLanguageData]);

  useEffect(() => {
    if (deleteBool === true || nativeUpdateBool === true) {
      navigate("/native-language");
    }
    dispatch(deleteNativeDeleteBool());
    dispatch(deleteNativeUpdateBool())
  }, [deleteBool, nativeUpdateBool]);

  return (
    <div className="nativeLanguageScreenMainDiv">
      <p className="nativeLanguageTitle">Update Native Language</p>
      <Form
        autoComplete="off"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <p>Language english name</p>
        <CustomAntdInput name="nameEng" placeholder=" Language English Name*" />
        <p>Native Name</p>
        <CustomAntdInput name="name" placeholder="Native Name*" />
        <p>Language Icon</p>
        <Form.Item
          name="image"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {categoryShow != null || fileList != null ? (
            <div className="imgae_upload_design">
              <div className="remove_icon_div">
                <img
                  src={remove_icon}
                  onClick={() => {
                    setFileList(null);
                    setCategoryShow(null);
                  }}
                />
              </div>
              <div className="imgae_name">
                <p>{nativeLanguageData?.imageFile?.description}</p>
                <img src={`${baseUrl}${nativeLanguageData?.imageFile?.path}`} />
              </div>
            </div>
          ) : (
            <Upload
              // defaultFileList={[nativeData?.imageFile]}
              onChange={handleChange}
              beforeUpload={beforeUpload}
              {...props}
              maxCount={1}
              listType="picture"
              className="upload-list-inline"
            >
              {categoryShow && showCategoryUpload ? null : (
                <img src={uploadIcon} className="upload" />
              )}
            </Upload>
          )}
        </Form.Item>

        <Form.Item>
          <CustomAntdButton title="Update" background={Colors.PURPLE} loading={nativeUpdateLoading} />
          <div className="deleteButton">
            <CustomAntdButtonDelete
              loading={nativeDeleteLoading}
              title="Delete"
              background={Colors.GRAY_COLOR}
              onClick={() => {
                dispatch(nativeLanguageDeleteThunk(nativeLanguageData?.id));
              }}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
