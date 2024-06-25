import React, { useEffect, useState } from "react";
import { Form, Upload, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CustomAntdButton, CustomErrorSection, CustomUploadElement } from "../../components";
import { Colors } from "../../assets/colors";
import { CustomAntdInput } from "../../components";
import { categoryCreateThunk, deleteCategoryCreateResponse, getCategoryCreateData, getCategoryCreateLoading } from "../../store/slices/category/category-create";
import { useTranslation } from "react-i18next";
import { Success } from "../../components/custom-message/custom-message";
import { beforeUpload } from "../utils/helper";

export const CategoryCretae = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formData = new FormData();
  const [messageApi, contextHolder] = message.useMessage();
  const [categoryFileList, setCategoryFileList] = useState([]);
  const [categoryShow, setCategoryShow] = useState();
  const [showCategoryUpload, setCatgeoryShowUpload] = useState();
  const categoryCreateData = useSelector(getCategoryCreateData);
  const catgeoryCreateLoading = useSelector(getCategoryCreateLoading);

  const onFinish = (values) => {
    if (values.category_image.file != "") {
      formData.append("name", values.category_name);
      formData.append("localization", values.category_string);
      formData.append("image", categoryShow);
      dispatch(categoryCreateThunk(formData));
    } else {
      console.log(values, "values");
    }
  };

  useEffect(() => {
    if (categoryCreateData?.success === true) {
      form.resetFields();
      setCategoryShow("");
      dispatch(deleteCategoryCreateResponse());
    }
  }, [categoryCreateData?.success])

  const handleChange = (info) => {
    setCategoryShow(info.file);
    setCatgeoryShowUpload(info.fileList[0]);
    if (!info.fileList[0]) {
      info.file = "";
    }
  };

  const messageError = categoryCreateData?.message;

  useEffect(() => {
    categoryCreateData?.success === true && Success({ messageApi });
    // categoryCreateData?.success === false &&
    //   Error({ messageApi, messageError });
    // dispatch(deleteCategoryCreateResponse());
  }, [categoryCreateData?.success]);


  const props = {
    accept: ".png,.svg,.jpg",
    onRemove: (file) => {
      const index = categoryFileList.indexOf(file);
      const newFileList = categoryFileList.slice();
      newFileList.splice(index, 1);
    },
  };
  const str = messageError?.toString()
  const onRemove = () => {
    dispatch(deleteCategoryCreateResponse());
  }

  return (
    <div className="categoryScreenMainDiv">
      {str != null ? <CustomErrorSection error={str} onTab={onRemove} /> : null}
      <p className="nativeLanguageTitle">Add Category</p>
      <Form
        autoComplete="off"
        form={form}
        name="category_create"
        onFinish={onFinish}
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
        </Form.Item>
        {contextHolder}
        <Form.Item>
          <CustomAntdButton  loading={catgeoryCreateLoading} title={t("ADD")} background={Colors.PURPLE} />
        </Form.Item>
      </Form>
    </div>
  );
};
