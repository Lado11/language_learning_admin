import React, { useState, useEffect } from "react";
import { Colors } from "../../assets/colors";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  deleteUserCreateResponse,
  getUserCreateData,
  getUserCreateLoading,
  userCreateThunk,
} from "../../store/slices/user/create-user";
import {
  Error,
  Success,
  CustomAntdSelect,
  CustomAntdButton,
  CustomAntdInput,
  CustomErrorSection,
} from "../../components";
import "./user-screen.css";
import { UserValue } from "../../data/custom-table-columns";

export const UserCreateScreen = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const createUserData = useSelector(getUserCreateData);
  const userLoading = useSelector(getUserCreateLoading);
  const messageError = createUserData?.message;
  const str = messageError?.toString()

  const onRemove = () => {
    dispatch(deleteUserCreateResponse());
  }

  const onFinish = (values) => {
    const onFinshData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      role: selected,
    };
    dispatch(userCreateThunk(onFinshData));
  };

  useEffect(() => {
    if (createUserData?.success === true) {
      form.resetFields();
      setSelected("");
      dispatch(deleteUserCreateResponse());
    }
  }, [createUserData?.success])

  useEffect(() => {
    createUserData?.success === true && Success({ messageApi });
    // createUserData?.success === false && Error({ messageApi, messageError });
    // dispatch(deleteUserCreateResponse());
  }, [createUserData?.success]);

  

  return (
    <div
      className="nativeLanguageCreateScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
        {str != null ? <CustomErrorSection error={str} onTab={onRemove} /> : null}

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
        <div className="category_row_input_user">
          <CustomAntdInput
            name="firstName"
            placeholder=" First Name*"
            type="text"
            min={3}
          />
          <div className="left">
            <CustomAntdInput
              name="lastName"
              placeholder="Last Name*"
              type="text"
              min={3}
            />
          </div>
        </div>
        <div className="category_row_input_user">
          <CustomAntdInput
            name="phoneNumber"
            placeholder="Phone*"
            className="dddd"
            type="text"
            min={3}
          />
          <div className="left">
            <CustomAntdInput
              name="email"
              placeholder="Email*"
              type="email"
              min={3}
            />
          </div>
        </div>
        <div className="category_row_input_user">
          <CustomAntdInput
            name="password"
            placeholder="Password*"
            type="password"
            min={6}
          />
           <div className="left">
          <CustomAntdSelect
            user={true}
            optinData={UserValue}
            setSelected={setSelected}
            selected={selected}
            defaultValue="Role"
          />
          </div>
        </div>
        <Form.Item>
          {contextHolder}

          <CustomAntdButton title="Add" background={Colors.PURPLE} loading={userLoading} />
        </Form.Item>
      </Form>
    </div>
  );
};
