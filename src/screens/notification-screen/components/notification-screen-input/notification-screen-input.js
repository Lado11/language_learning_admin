import React from "react";
import { Input } from "antd";
import { Colors } from "../../../../assets/colors/colors";
import "./notification-screen-style.css";
import { Form } from "antd";

export const NotificationScreenInput = ({ name, placeholder }) => {
  return (
    <div className="notificationScreenInputField">
      <Form.Item
        name={name}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input
          placeholder={placeholder}
          style={{ backgroundColor: Colors.INPUT_BACKGROUND }}
          className="notificationScreenInput"
        />
      </Form.Item>
    </div>
  );
};
