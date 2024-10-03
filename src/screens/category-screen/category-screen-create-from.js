import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CustomAntdButton, CustomErrorSection, CustomUploadElement } from "../../components";
import { Colors } from "../../assets/colors";
import { CustomAntdInput } from "../../components";
import { categoryCreateThunk, deleteCategoryCreateResponse, getCategoryCreateData, getCategoryCreateLoading } from "../../store/slices/category/category-create";
import { useTranslation } from "react-i18next";
import { Success } from "../../components/custom-message/custom-message";
import { fileToDataString } from "../../helper/file-build";
import remove_icon from "../../assets/images/remove_icon.png";


export const ImageUpload = ({ onChange }) => {
  return (
    <div className="file-upload">
      <div className="imageUpload">
        <CustomUploadElement title={"Upload Category Icon "} />
      </div>
      <form >
        <input type="file" onChange={onChange} accept="image/*" />
      </form>
    </div>
  )
}

export const CategoryCreate = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formData = new FormData();
  const [messageApi, contextHolder] = message.useMessage();
  const [categoryShow, setCategoryShow] = useState();
  const categoryCreateData = useSelector(getCategoryCreateData);
  const catgeoryCreateLoading = useSelector(getCategoryCreateLoading);
  const [selectedImage, setSelectedImage] = useState();
  const [previewImgUrl, setPreviewimgUrl] = useState("");
  const messageError = categoryCreateData?.message;
  const str = messageError?.toString()

  const onFinish = (values) => {
    if (values.category_image.file != "") {
      formData.append("name", values.category_name);
      formData.append("localization", values.category_string);
      selectedImage && formData.append("image", selectedImage);
      dispatch(categoryCreateThunk(formData));
    } else {
      console.log(values, "values");
    }
  };

  const onValuesChange = (changedValues, allValues) => {
    if (changedValues.category_name) {
      const categoryNameLowerCase = changedValues.category_name.toLowerCase();
      form.setFieldsValue({
        category_string: `category.${categoryNameLowerCase}`,
      });
    }
  };

  useEffect(() => {
    if (categoryCreateData?.success === true) {
      form.resetFields();
      setCategoryShow("");
      setPreviewimgUrl("")
      setCategoryShow(null);
      dispatch(deleteCategoryCreateResponse());
    }
  }, [categoryCreateData?.success])

  useEffect(() => {
    categoryCreateData?.success === true && Success({ messageApi });
  }, [categoryCreateData?.success]);

  const onRemove = () => {
    dispatch(deleteCategoryCreateResponse());
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

  return (
    <div className="nativeLanguageCreateScreenMainDiv">
      {str != null ? <CustomErrorSection error={str} onTab={onRemove} /> : null}
      <p className="categoryCreateTitle">Add Category</p>
      <Form
        autoComplete="off"
        form={form}
        name="category_create"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        className="formAntd"
      >
        <div className="category_row_input_user">
          <CustomAntdInput name="category_name" rules={true} placeholder="Category Name*" min={3} />
          <div className="left">
            <CustomAntdInput min={3} rules={true} name="category_string" placeholder="localication string*" />
          </div>
        </div>

        <Form.Item
          name="category_image"
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
        {contextHolder}
        <Form.Item>
          <CustomAntdButton loading={catgeoryCreateLoading} title={t("ADD")} background={Colors.PURPLE} />
        </Form.Item>
      </Form>
    </div>
  );
};
