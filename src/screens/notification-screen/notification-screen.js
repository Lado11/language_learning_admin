import React, { useState } from "react";
import { Colors } from "../../assets/colors/colors";
import "./notification-screen-style.css";
import { Checkbox, Form, Tabs } from "antd";
import { NotificationScreenInput } from "./components/notification-screen-input";
import { NotificationScreenTextArea } from "./components";
import { CustomAntdButton } from "../../components";
import { SelectNotification } from "./components/select-notification";
import { userSubsriptionData, deviceTpesData, templeteTpesData, tabsType } from "./notification-data";
import { useDispatch } from "react-redux";
import { sendEmailNotification } from "../../store/slices/notification/send_email_notification";
import { sendPushNotification } from "../../store/slices/notification/send_push_notification";
import { UserSubscription } from "./notification-typing";
import { useForm } from "antd/es/form/Form";

export const NotificationScreen = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [tabs, setTabs] = useState(1);
  const [deviceTypes, setDeviceTypes] = useState()
  const [userSub, setUserSub] = useState()
  const [templete, setTemplete] = useState()
  const [form] = Form.useForm();
  const onChangeTemplete = (e) => {
    setTemplete(e.target.value)
  }

  const onChangeDevice = (e) => {
    setDeviceTypes(e.target.value)
  }

  const onChangeUserSub = (e) => {
    setUserSub(e.target.value)
  }

  const onFinish = (values) => {
    
    let pushNotificvationData = {
      title: values.title,
      body: values.body,
      userId: values.userId,
      // template: templete
    }

    if (userSub !== UserSubscription.All && !values.userId) {
      pushNotificvationData.isSubscribed = userSub;
    }
    if (deviceTypes && !values.userId) {
      pushNotificvationData.osType = deviceTypes;
    }

    if(tabs != 1){
      pushNotificvationData.templete = templete;
    }

    if (tabs === tabsType.TABSFIRST) {
      dispatch(sendPushNotification(pushNotificvationData));
    } else {
      dispatch(sendEmailNotification(pushNotificvationData));
    }
  };

  const onChangeCheckBox = (e) => {
    setChecked(e.target.checked)
  };

  const onChangeTabs = (key) => {
    setTabs(key)
    setDeviceTypes("")
    setChecked(false)
    setUserSub()
    setTemplete("")
    form.resetFields()
  };

  const array = [{ label: "Push", id: 1 }, { label: "Email", id: 2 }];
console.log(userSub,"userrr");
  return (
    <div
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div>
        <p className="notificationScreenSendFieldsTitle"> Notification</p>
        <div className="notificationTabs">
          <Tabs
            className="notificationSection"
            onChange={onChangeTabs}
            type="card"
            items={array?.map((item, i) => {
              return {
                label: item.label,
                key: item.id,
                children: <Form
                  form={form}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <div className="nothSection">
                    <NotificationScreenInput name={"title"} placeholder={"Title*"} />
                    {tabs != 1 ? <div className="inputBottom">
                      <SelectNotification onChange={onChangeTemplete} value={templete} data={templeteTpesData} defaultValue={"Template"} />
                    </div> : null}
                    {checked === false ? <>
                      {tabs === 1 ?
                        <div className="inputBottom">
                          <SelectNotification value={deviceTypes} onChange={onChangeDevice} data={deviceTpesData} defaultValue={"Device type"} />  </div> : null}

                      <div className="userSubsriptionSection">
                        <SelectNotification onChange={onChangeUserSub} value={userSub} data={userSubsriptionData} defaultValue={"User Subscription"} />

                      </div>                    </> : null}


                  </div>
                  <div className="exportCheckBoxSection">
                    <Checkbox setChecked={checked} onChange={onChangeCheckBox}>With User ID</Checkbox>
                  </div>
                  {checked === true ? <NotificationScreenInput name={"userId"} placeholder={"User ID*"} /> : null}

                  <NotificationScreenTextArea
                    name={"body"}
                    placeholder={"Message Here..."}
                  />
                  <CustomAntdButton
                    title="Send"
                    background={Colors.PURPLE}
                  // loading={nativeUpdateLoading}
                  />
                </Form>,
              };
            })}
          />
        </div>
      </div>

    </div>
  );
};
