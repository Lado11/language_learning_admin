import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CustomAntdButton } from "../../components/custom-antd-button/custom-antd-button";
import { Colors } from "../../assets/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomAntdButtonDelete, CustomAntdInput, CustomErrorSection, CustomSpin } from "../../components";
import remove_icon from "../../assets/images/remove_icon.png";
import {
  categoryDeleteThunk,
  categoryUpdateThunk,
  deleteCategoryDeleteResponse,
  deleteCategoryUpdateResponse,
  getCategoryDeleteData,
  getCategoryDeleteLoading,
  getCategoryUpdateData,
  getCategoryUpdateLoading,
} from "../../store/slices";
import { categoryGetIdThunk, getCategoryGetIdResponse, getCategoryGetIdloading } from "../../store/slices/category/get-id-category";
import CustomModal from "../../components/custom-modal/custom-modal";
import { filesGetIdThunk, getfilesGetIdResponse, getfilesGetIdloading } from "../../store/slices/files/get-id-files";
import { fileToDataString } from "../../helper/file-build";
import { ImageUpload } from "./category-screen-create-from";

export const ShowImage = ({ title, src, onClick ,loading}) => {
  return (
    <div className="imgae_upload_design">
      <div className="remove_icon_div">
        <img
          className="remove_button"
          src={remove_icon}
          onClick={onClick}
        />
      </div>
      {loading ? <CustomSpin color={Colors.GRAY_COLOR} size={37}/> :<div className="imgae_name">
        <p>{title}</p>
        <img className="imageItem" src={src} />
      </div>}
    </div>
  )
}

export const CategoryUpdate = () => {
  let location = useLocation();
  const categoryId = location?.pathname.slice(10);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryShow, setCategoryShow] = useState();
  const nativeLanguageData = useSelector(getCategoryGetIdResponse)?.data;
  const catgeoryUpdateLoading = useSelector(getCategoryDeleteLoading);
  const categoryUpdateLoading = useSelector(getCategoryUpdateLoading);
  const categoryDeleteResponse = useSelector(getCategoryDeleteData);
  const categoryUpdateResponse = useSelector(getCategoryUpdateData);
  const catgeoryLoadingId = useSelector(getCategoryGetIdloading);
  const [selectedImage, setSelectedImage] = useState();
  const [previewImgUrl, setPreviewimgUrl] = useState("");
  const [imageUrls, setImageUrls] = useState({});
  const categoryImageResponse = useSelector(getfilesGetIdResponse);
  const categoryImageLoading = useSelector(getfilesGetIdloading)


  const onFinish = (values) => {
    if (values.image.file != "") {
      formData.append("localization", values.localization);
      formData.append("name", values.name);
      selectedImage && formData.append("image", selectedImage);
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

  useEffect(() => {
    // Preload image URLs
    if (nativeLanguageData) {
      fetchImage(nativeLanguageData.imageFile?._id);
    }
  }, [nativeLanguageData]);

  const fetchImage = (imageFileId) => {
    if (!imageUrls[imageFileId]) {
      dispatch(filesGetIdThunk(imageFileId));
    }
  };

  useEffect(() => {
    // Update imageUrls state with fetched image URLs
    if (categoryImageResponse?.data?.url) {
      setImageUrls((prevUrls) => ({
        ...prevUrls,
        [categoryImageResponse.data.fileId]: categoryImageResponse.data.url,
      }));
    }
  }, [categoryImageResponse]);
  
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
    <div className="nativeLanguageCreateScreenMainDiv">
      <div>
        {categoryDeleteResponse?.message && <CustomErrorSection error={categoryDeleteResponse?.message} onTab={onRemove} />}
        <p className="categoryUpdateTitle">Update Category</p>
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
                <p className="categoryInputTitle">Category Name</p>
                <CustomAntdInput name="localization" placeholder="Category Name*" min={3} />
              </div>
              <div className="update_category_input left">
                <p className="categoryInputTitle">localication string*</p>
                <CustomAntdInput min={3} name="name" placeholder="localication string*" />
              </div>
            </div>
            <p className="categoryInputTitle">Category Icon</p>
            <Form.Item
              name="image"
              rules={[{ required: true }]}
            >
              {previewImgUrl?.length > 1 ? (
                <ShowImage title={selectedImage?.name}
                  src={previewImgUrl}
                  onClick={() => {
                    setPreviewimgUrl(".")
                    setCategoryShow(null);
                  }} />
              ) : nativeLanguageData?.imageFile && !previewImgUrl ? (
                <ShowImage title={nativeLanguageData?.imageFile?.description} loading={categoryImageLoading} src={imageUrls[nativeLanguageData?.imageFile?._id]} onClick={() => {
                  setPreviewimgUrl(".")
                  setCategoryShow(null);
                }} />
              ) : (
                <ImageUpload onChange={handleFileChange} />
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
