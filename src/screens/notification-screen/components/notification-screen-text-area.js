import React from "react";
import { Input } from "antd";
import "./notification-screen-text-area-style.css";
import { Colors } from "../../../assets/colors/colors";
import { Form } from "antd";

const { TextArea } = Input;

export const NotificationScreenTextArea = ({ name, placeholder }) => (
  <>
    <Form.Item
      style={{ width: "100%" }}
      name={name}
      rules={[
        {
          required: true,
          message: `Please input  ${name}!`,
        },
      ]}
    >
      <TextArea
      
        rows={4}
        placeholder={placeholder}
        className="notificationScreenTextArea"
        style={{ backgroundColor: Colors.WHITE, }}
      />
    </Form.Item>
  </>
);
