import React, { useEffect, useState } from "react";
import { Form, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import uploadIcon from "../../assets/images/uploadImg.png";
import { CustomAntdButton } from "../../components/custom-antd-button/custom-antd-button";
import { Colors } from "../../assets/colors";
import { useNavigate } from "react-router-dom";
import { CustomAntdButtonDelete, CustomAntdInput } from "../../components";
import remove_icon from "../../assets/images/remove_icon.png";
import {
  categoryDeleteThunk,
  categoryUpdateThunk,
  deleteCategoryDeleteBool,
  deleteCategoryUpdateBool,
  deleteNativeUpdateBool,
  getCategoryDeleteBool,
  getCategoryDeleteLoading,
  getCategoryUpdateBool,
  getCategoryUpdateLoading,
} from "../../store/slices";

import { categoryGetIdThunk, getCategoryGetIdResponse } from "../../store/slices/category/get-id-category";
import CustomModal from "../../components/custom-modal/custom-modal";

export const CategoryUpdate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryId = localStorage.getItem("categoryId");
  const formData = new FormData();
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryShow, setCategoryShow] = useState();
  const [showCategoryUpload, setCatgeoryShowUpload] = useState();
  const nativeLanguageData = useSelector(getCategoryGetIdResponse)?.data;
  const catgeoryUpdateLoading = useSelector(getCategoryDeleteLoading);
  const categoryUpdateBool = useSelector(getCategoryUpdateBool);
  const categoryDeleteBool = useSelector(getCategoryDeleteBool);
  const categoryUpdateLoading = useSelector(getCategoryUpdateLoading);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const onFinish = (values) => {
    if (values.image.file != "") {
      formData.append("localization", values.localization);
      formData.append("name", values.name);
      categoryShow && formData.append("image", categoryShow);
      formData.append("id", nativeLanguageData.id);
      formData.append("active", nativeLanguageData?.active);
      dispatch(categoryUpdateThunk(formData));
      form.resetFields();
      setCategoryShow("");
    } else {
      console.log(values, "values");
    }
  };

  useEffect(() => {
    dispatch(categoryGetIdThunk(categoryId));
  }, []);

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
      localization: nativeLanguageData?.localization,
      name: nativeLanguageData?.name,
      image: nativeLanguageData?.imageFile?.path,
    });
  }, [nativeLanguageData]);

  useEffect(() => {
    if (categoryUpdateBool === true || categoryDeleteBool === true ) {
      navigate("/category");
    }
    dispatch(deleteCategoryDeleteBool());
    dispatch(deleteCategoryUpdateBool());
  }, [categoryUpdateBool,categoryDeleteBool]);

  const showModal = () => {
    setIsModalOpen(true);
};
  const onTab = () => {
    dispatch(categoryDeleteThunk(categoryId))
  }

  return (
    <div className="nativeLanguageScreenMainDiv">
      <p className="nativeLanguageTitle">Update Category</p>
      <CustomModal isModalOpen={isModalOpen}  setIsModalOpen={setIsModalOpen} onTab={onTab}/>

      <Form
        autoComplete="off"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <p>Category Name</p>
        <CustomAntdInput name="localization" placeholder="Food" />
        <p>localication string*</p>
        <CustomAntdInput name="name" placeholder="localication string*" />
        <p>Category Icon</p>
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
          <CustomAntdButton
            title="Update"
            background={Colors.PURPLE}
            loading={categoryUpdateLoading}
          />
          <div className="deleteButton">
            <CustomAntdButtonDelete
              loading={catgeoryUpdateLoading}
              title="Delete"
              background={Colors.GRAY_COLOR}
              onClick={() => {
                showModal()
              }}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
