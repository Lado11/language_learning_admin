import React from "react";
import { Colors } from "../../assets/colors/colors";
import "./notification-screen-style.css";
import { NotificationScreenTextArea } from "./components/notification-screen-text-area/notification-screen-text-area";
import { NotificationScreenInput } from "./components";
import { CustomButton } from "../../components/custom-button/custom-button";
import icSendIcon from "../../assets/images/ic_send.svg";
import { Form } from "antd";

export const NotificationScreen = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="authScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="notificationScreenSendFieldsDiv">
          <p className="notificationScreenSendFieldsTitle">Send Notification</p>
          <NotificationScreenInput name={"id"} placeholder={"User ID*"} />
          <NotificationScreenTextArea
            name={"message"}
            placeholder={"Message Here..."}
          />
          <CustomButton buttonTitle="Send" buttonIcon={icSendIcon} />
        </div>
      </Form>
    </div>
  );
};
