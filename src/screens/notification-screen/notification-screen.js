import React, { useState } from "react";
import { Colors } from "../../assets/colors/colors";
import "./notification-screen-style.css";
import { Form } from "antd";
import { NotificationScreenInput } from "./components/notification-screen-input";
import { NotificationScreenTextArea } from "./components";
import { CustomAntdButton } from "../../components";
import { SelectNotification } from "./components/select-notification";
import { userSubsriptionData, deviceTpesData } from "./notification-data";

export const NotificationScreen = () => {
  const [device, setDevice] = useState();
  const [user, setUser] = useState();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
          <p className="notificationScreenSendFieldsTitle">Send Notification</p>
         <div className="nothSection">
         <SelectNotification data={deviceTpesData} defaultValue={"User Device"} />
          <div className="notificationMiddle">
            <SelectNotification data={userSubsriptionData} defaultValue={"User Subscription "} />
          </div>
          <NotificationScreenInput name={"id"} placeholder={"User ID*"} />
          <NotificationScreenTextArea
            name={"message"}
            placeholder={"Message Here..."}
          />
         </div>
         <CustomAntdButton
            title="Send"
            background={Colors.PURPLE}
          // loading={nativeUpdateLoading}
          />
      </Form>
    </div>
  );
};
