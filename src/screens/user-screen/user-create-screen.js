import { Colors } from "../../assets/colors";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CustomAntdButton } from "../../components/custom-antd-button/custom-antd-button";
import { CustomSelect, CustomAntdInput } from "../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./user-screen.css";
import { useTranslation } from "react-i18next";

export const UserCreateScreen = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();
  const [categoryFileList, setCategoryFileList] = useState([]);
  const [categoryShow, setCategoryShow] = useState();
  const [showCategoryUpload, setCatgeoryShowUpload] = useState();

  const onFinish = (values) => {
    if (values.category_image.file != "") {
      formData.append("name", values.category_name);
      formData.append("localization", values.category_string);
      formData.append("image", categoryShow);
      // dispatch(categoryCreateThunk(formData));
      form.resetFields();
      setCategoryShow("");
    } else {
      console.log(values, "values");
    }
  };
  return (
    <div
      className="authScreenFilesDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <p className="screensTitleStyle">Add User</p>
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
          <CustomAntdInput name="first_name" placeholder=" First Name*" />
          <CustomAntdInput name="last_name" placeholder="Last Name*" />
        </div>
        <div className="category_row_input">
          <CustomAntdInput name="phone" placeholder="Phone*" />
          <CustomAntdInput name="email" placeholder="Email*" />
        </div>
        <div className="category_row_input">
          <CustomAntdInput name="password" placeholder="Password*" />
          <CustomSelect title={t("SUBSCRIPTION")} />
        </div>

        <Form.Item
          name="category_image"
          rules={[
            {
              required: true,
            },
          ]}
        ></Form.Item>

        <Form.Item>
          <CustomAntdButton title="Add" background={Colors.PURPLE} />
        </Form.Item>
      </Form>
    </div>
  );
};
