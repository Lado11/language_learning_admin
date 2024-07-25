import React, { useEffect, useState } from "react";
import { Colors } from "../../assets/colors/colors";
import "./notification-screen-style.css";
import { Checkbox, Form, Tabs, message } from "antd";
import { NotificationScreenInput } from "./components/notification-screen-input";
import { NotificationScreenTextArea } from "./components";
import { CustomAntdButton, CustomErrorSection, Success } from "../../components";
import { SelectNotification } from "./components/select-notification";
import { userSubsriptionData, deviceTpesData, templeteTpesData, tabsType } from "./notification-data";
import { useDispatch, useSelector } from "react-redux";
import { deletesendEmailNotificationResponse, getsendEmailNotificationData, sendEmailNotification } from "../../store/slices/notification/send_email_notification";
import { deletesendPushNotificationResponse, getsendPushNotificationData, sendPushNotification } from "../../store/slices/notification/send_push_notification";
import { UserDevice, UserSubscription } from "./notification-typing";
import { useForm } from "antd/es/form/Form";

export const NotificationScreen = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [tabs, setTabs] = useState(1);
  const [deviceTypes, setDeviceTypes] = useState()
  const [userSub, setUserSub] = useState()
  const [templete, setTemplete] = useState()
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const sendPushNothRes = useSelector(getsendPushNotificationData);
  const emailNothRes = useSelector(getsendEmailNotificationData)
  const errorMessage = sendPushNothRes?.message ? sendPushNothRes?.message : emailNothRes?.message;

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
    }

    if (userSub !== UserSubscription.All && !values.userId) {
      pushNotificvationData.isSubscribed = userSub;
    }
    if (deviceTypes && !values.userId && deviceTypes !== UserDevice.GENERAL) {
      pushNotificvationData.osType = deviceTypes;
    }

    if (tabs != 1) {
      pushNotificvationData.template = templete;
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


  useEffect(() => {
    if (sendPushNothRes?.success === true) {
      Success({ messageApi });
      dispatch(deletesendPushNotificationResponse());
    }else if(emailNothRes?.success === true){
      Success({ messageApi });
      dispatch(deletesendEmailNotificationResponse());
    }
  }, [sendPushNothRes,emailNothRes, messageApi, dispatch]);


  const onChangeTabs = (key) => {
    setTabs(key)
    setDeviceTypes("")
    setChecked(false)
    setUserSub()
    setTemplete("")
    form.resetFields()
  };

  const handleRemoveError = () => {
    dispatch(deletesendPushNotificationResponse());
    dispatch(deletesendEmailNotificationResponse());
  };

  const array = [{ label: "Push", id: 1 }, { label: "Email", id: 2 }];
  return (
    <div
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >

      <div>
      {errorMessage && <CustomErrorSection error={errorMessage} onTab={handleRemoveError} />}

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
                      </div>  </> : null}

                  </div>
                  <div className="exportCheckBoxSection">
                    <Checkbox setChecked={checked} onChange={onChangeCheckBox}>With User ID</Checkbox>
                  </div>
                  {checked === true ? <NotificationScreenInput name={"userId"} placeholder={"User ID*"} /> : null}

                  <NotificationScreenTextArea
                    name={"body"}
                    placeholder={"Message Here..."}
                  />
                  <Form.Item>
                    {contextHolder}

                    <CustomAntdButton
                      title="Send"
                      background={Colors.PURPLE}
                    // loading={nativeUpdateLoading}
                    />
                  </Form.Item>
                </Form>,
              };
            })}
          />
        </div>
      </div>

    </div>
  );
};
