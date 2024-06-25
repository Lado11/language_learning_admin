import React, { useEffect, useState } from "react";
import { Form, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CustomAntdButton } from "../../components/custom-antd-button/custom-antd-button";
import { Colors } from "../../assets/colors";
import { useNavigate } from "react-router-dom";
import { CustomAntdButtonDelete, CustomAntdInput, CustomErrorSection, CustomSpin, CustomUploadElement } from "../../components";
import remove_icon from "../../assets/images/remove_icon.png";
import {
  categoryDeleteThunk,
  categoryUpdateThunk,
  deleteCategoryDeleteResponse,
  deleteCategoryUpdateResponse,
  getCategoryDeleteBool,
  getCategoryDeleteData,
  getCategoryDeleteLoading,
  getCategoryUpdateBool,
  getCategoryUpdateData,
  getCategoryUpdateLoading,
} from "../../store/slices";
import { categoryGetIdThunk, getCategoryGetIdResponse, getCategoryGetIdloading } from "../../store/slices/category/get-id-category";
import CustomModal from "../../components/custom-modal/custom-modal";
import { beforeUpload, props } from "../utils/helper";

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
  const categoryDeleteResponse = useSelector(getCategoryDeleteData);
  const categoryUpdateResponse = useSelector(getCategoryUpdateData);
  const catgeoryLoadingId = useSelector(getCategoryGetIdloading);
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

  useEffect(() => {
    form.setFieldsValue({
      localization: nativeLanguageData?.localization,
      name: nativeLanguageData?.name,
      image: nativeLanguageData?.imageFile?.path,
    });
  }, [nativeLanguageData]);

  useEffect(() => {
    if (categoryUpdateResponse?.success === true || categoryDeleteResponse?.success === true) {
      navigate("/category");
      dispatch(deleteCategoryDeleteResponse());
      dispatch(deleteCategoryUpdateResponse());


    }
  }, [categoryUpdateResponse?.success, categoryDeleteResponse?.success]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const onTab = () => {
    dispatch(categoryDeleteThunk(categoryId))
  }
  const onRemove = () => {
    dispatch(deleteCategoryDeleteResponse());
  }

  return (
    <div className="nativeLanguageScreenMainDiv">
      <div>
        {categoryDeleteResponse?.message && <CustomErrorSection error={categoryDeleteResponse?.message} onTab={onRemove} />}
        <p className="nativeLanguageTitle">Update Category</p>
        <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onTab={onTab} />
        {catgeoryLoadingId ? <div className="CustomSpinUpdate">
          <CustomSpin size={120} color={Colors.GRAY_COLOR} />
        </div> :
          <Form
            autoComplete="off"
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            className="formAntd"

          >
            <div className="category_row_input_user">
              <div className="update_category_input">
                <p>Category Name</p>
                <CustomAntdInput name="localization" placeholder="Category Name*" min={3} />
              </div>
              <div className="update_category_input left">
                <p>localication string*</p>
                <CustomAntdInput min={3} name="name" placeholder="localication string*" />
              </div>
            </div>

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
                      className="remove_button"
                      src={remove_icon}
                      onClick={() => {
                        setFileList();
                        setCategoryShow();
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
                  onChange={handleChange}
                  beforeUpload={beforeUpload}
                  {...props}
                  maxCount={1}
                  listType="picture"
                  className="upload-list-inline"
                >
                  {categoryShow && showCategoryUpload ? null : (
                 <CustomUploadElement title={"Upload Category Icon "} />
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
          </Form>}
      </div>
    </div>
  );
};
