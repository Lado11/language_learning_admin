import React, { useState } from "react";
import { Form, Upload } from "antd";
import { useDispatch } from "react-redux";
import uploadImage from "../../assets/images/uploadImg.png";
import { CustomAntdButton } from "../../components";
import { Colors } from "../../assets/colors";
import { CustomAntdInput } from "../../components";
import { categoryCreateThunk } from "../../store/slices/category/category-create";
import { useTranslation } from "react-i18next";

export const CategoryCretae = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formData = new FormData();
  const [categoryFileList, setCategoryFileList] = useState([]);
  const [categoryShow, setCategoryShow] = useState();
  const [showCategoryUpload, setCatgeoryShowUpload] = useState();
  const { t } = useTranslation();

  const onFinish = (values) => {
    if (values.category_image.file != "") {
      formData.append("name", values.category_name);
      formData.append("localization", values.category_string);
      formData.append("image", categoryShow);
      dispatch(categoryCreateThunk(formData));
      form.resetFields();
      setCategoryShow("");
    } else {
      console.log(values, "values");
    }
  };

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
      const index = categoryFileList.indexOf(file);
      const newFileList = categoryFileList.slice();
      newFileList.splice(index, 1);
    },
  };

  return (
    <div className="categoryScreenMainDiv">
      <p className="nativeLanguageTitle">Add Category</p>
      <Form
        autoComplete="off"
        form={form}
        name="category_create"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <div className="category_row_input">
          <CustomAntdInput name="category_name" placeholder="Category Name*" />
          <CustomAntdInput
            name="category_string"
            placeholder="localication string*"
          />
        </div>

        <Form.Item
          name="category_image"
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
          <CustomAntdButton title={t("ADD")} background={Colors.PURPLE} />
        </Form.Item>
      </Form>
    </div>
  );
};
