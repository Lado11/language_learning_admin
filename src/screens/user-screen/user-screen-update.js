import { useEffect, useState } from "react";
import { deleteUserDeleteResponse, deleteUserUpdateResponse, getUserDeleteData, getUserDeleteLoading, getUserGetByIdData, getUserGetByIdLoading, getUserUpdateData, getUserUpdateLoading, getUserUpdateMessages, userDeleteThunk, userGetByIdThunk, userUpdateThunk } from "../../store/slices";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { CustomAntdButton, CustomAntdButtonDelete, CustomAntdInput, CustomAntdSelect, CustomSpin, Error, Success } from "../../components";
import { DatePicker, Form, Space, message } from "antd";
import { Colors } from "../../assets/colors";
import CsutomSwitch from "../../components/custom-switch/custom-switch";
import { UserValue } from "../../data/custom-table-columns";
import CustomModal from "../../components/custom-modal/custom-modal";
import { UserRole } from "./user-typing";

export const UserScreenUpdate = () => {
    let location = useLocation();
    const userId = location?.pathname.slice(6);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [phoneState, setphoneState] = useState();
    const [emailState, setemailState] = useState();
    const [userDeleteState, setuserDeleteState] = useState();
    const [subscribeState, setsubscribeState] = useState();
    const [calendar, setCalendar] = useState();
    dayjs.extend(customParseFormat);
    const dateFormat = 'YYYY/MM/DD';
    const [selected, setSelected] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userIdData = useSelector(getUserGetByIdData);
    const messageError = useSelector(getUserUpdateMessages);
    const userUpdateResponse = useSelector(getUserUpdateData)
    const userUpdateLoading = useSelector(getUserUpdateLoading);
    const userDeleteLoading = useSelector(getUserDeleteLoading);
    const userDeleteResponse = useSelector(getUserDeleteData);
    const userLoadingId = useSelector(getUserGetByIdLoading);
    const userList = userIdData?.data;
    let newEmail = "";
    let newPhone = "";
    let phone = false;
    let email = false;
    let subscribe = false;
    let deleteUser = false;

    const showModal = () => {
        setIsModalOpen(true);
    };
    const onChange = (date, dateString) => {
        setCalendar(date?.format(dateFormat))
    };
    const onTab = () => {
        dispatch(userDeleteThunk(userList?.id,));
    };


    const getUserRoleType = (status) => {
        switch (status) {
            case UserRole.ADMIN:
                return "Admin";
            case UserRole.OPERATOR:
                return "Operator";
            case UserRole.USER:
            default:
                return "User";
        }
    };

    const getUserRoleTypeLabel = (status) => {
        switch (status) {
            case UserRole.ADMIN:
                return 0;
            case UserRole.OPERATOR:
                return 1;
            case UserRole.USER:
            default:
                return 2;
        }
    };


    const onFinish = (values) => {
        if (values.email !== userList.email) {
            newEmail = values.email;
        } else {
            newEmail = undefined;
        }

        if (values.phoneNumber !== userList.phoneNumber) {
            newPhone = values.phoneNumber;
        } else {
            newPhone = undefined;
        }

        if (userList.phoneNumberVerified === true && phoneState === true) {
            phone = true;
        } else if(userList.phoneNumberVerified === false && phoneState === true ){
            phone = true;
        }else if(userList.phoneNumberVerified === true && phoneState === undefined){
            phone = true;
        }else{
            phone = false;
        }

        if (userList.emailVerified === true && emailState === true ) {
            email = true;
        } else if(userList.emailVerified === false && emailState === true ){
            email = true;
        }else if(userList.emailVerified === true && emailState === undefined){
            email = true;
        }else{
            email = false;
        }
        
        if (userList.isSubscribed === true && subscribeState === true) {
            subscribe = true;
        } else if( userList.isSubscribed === false && subscribeState === true){
            subscribe = true;
        }else if(userList.isSubscribed === true && subscribeState === undefined){
            subscribe = true;
        }else{
            subscribe = false;
        }
        
        if (userList.deleted === true && userDeleteState === true) {
            deleteUser = true;
        } else if( userList.deleted === false && userDeleteState === true){
            deleteUser = true;
        }else if(userList.deleted === true && userDeleteState === undefined){
            deleteUser = true;
        }else{
            deleteUser = false;
        }

        const data = {
            email: newEmail,
            phoneNumber: newPhone,
            firstName: values?.firstName,
            lastName: values?.lastName,
            password: values?.password,
            role: getUserRoleTypeLabel(values?.role),
            id: userList?.id,
            phoneNumberVerified: phone,
            emailVerified: email,
            deleted: deleteUser,
            isSubscribed: subscribe,
            subscriptionExpiresDt: calendar,
        }

        dispatch(userUpdateThunk(data))
    };
    

    useEffect(() => {
        form.setFieldsValue({
            firstName: userList?.firstName,
            email: userList?.email,
            password: userList?.password,
            phoneNumber: userList?.phoneNumber,
            lastName: userList?.lastName,
            role: getUserRoleType(userList?.role),
        });
    }, [userList]);

    useEffect(() => {
        dispatch(userGetByIdThunk(userId));
    }, []);

    useEffect(() => {
        if (userUpdateResponse?.success === true || userDeleteResponse?.success === true) {
            navigate("/user")
        }
        dispatch(deleteUserUpdateResponse());
        dispatch(deleteUserDeleteResponse());
    }, [userUpdateResponse?.success, userDeleteResponse?.success])

    useEffect(() => {
        userUpdateResponse?.success === true && Success({ messageApi });
        userUpdateResponse?.success === false && Error({ messageApi, messageError });
        dispatch(deleteUserUpdateResponse())
    }, [userUpdateResponse?.success,]);

    const onChangeBlockUser = (checked) => {
        setuserDeleteState(checked)
    };

    const onChangeEmail = (checked) => {
        setemailState(checked)
    };

    const onChangePhone = (checked) => {
        setphoneState(checked)
    };

    const onChangeSub = (checked) => {
        setsubscribeState(checked)
    };


    return (
        <div className="nativeLanguageCreateScreenMainDiv">
            <CustomModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onTab={onTab}
            />
            {userLoadingId ? <div className="CustomSpinUpdate">
                <CustomSpin size={120} color={Colors.GRAY_COLOR} />
            </div> : <Form
                autoComplete="off"
                form={form}
                name="category_create"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >
                <div className="useUpdateDivRow">

                    <div className="formColumn">
                        <div className="userHeader">
                            <p className="nativeLanguageTitle">Update User</p>
                        </div>
                        <div className="row borderBottom">
                            <div className="row">
                                <p className="inputTitle">Device ID:</p>
                                <p className="ietmColor">5555</p>
                            </div>
                            <div className="row idLeft">
                                <p className="inputTitle">ID:</p>
                                <p className="ietmColor">{userList?._id}</p>
                            </div>
                        </div>
                        <div className="row borderBottom">
                            <p className="inputTitle">Religion:</p>
                            <p className="ietmColor">54444</p>
                            <img alt="region_img" />
                        </div>
                        <div className="category_row_input_user">
                            <div>
                                <p className="inputTitle">Fisrt Name</p>
                                <CustomAntdInput
                                    name="firstName"
                                    placeholder=" First Name*"
                                    type="text"
                                    min={3}
                                />
                            </div>
                            <div className="left">
                                <div>
                                    <p className="inputTitle">Last Name</p>
                                    <CustomAntdInput
                                        name="lastName"
                                        placeholder="Last Name*"
                                        type="text"
                                        min={3}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className="category_row_input_user">
                            <div>
                                <p className="inputTitle">Phone Number</p>
                                <CustomAntdInput
                                    name="phoneNumber"
                                    placeholder=" First Name*"
                                    type="text"
                                    min={3}
                                />
                            </div>
                            <div className="left switchDiv">
                                <p className="switchTitle"> Verified</p>
                                <CsutomSwitch onChange={onChangePhone} backSelected={userList?.phoneNumberVerified} check={phoneState} setCheck={setphoneState} color={Colors.GREEN} />
                            </div>
                        </div>
                        <div className="category_row_input_user">
                            <div>
                                <p className="inputTitle">Email</p>
                                <CustomAntdInput
                                    name="email"
                                    placeholder=" First Name*"
                                    type="text"
                                    min={3}
                                />
                            </div>
                            <div className="left switchDiv">
                                <p className="switchTitle"> Verified</p>
                                <CsutomSwitch onChange={onChangeEmail} backSelected={userList?.emailVerified} check={emailState} setCheck={setemailState} color={Colors.GREEN} />
                            </div>
                        </div>
                        <div>
                            <p className="inputTitle">Password</p>
                            <CustomAntdInput name="password" placeholder=" Language English Name*" />
                        </div>
                        <div>
                            <p className="inputTitle">Role</p>
                            <CustomAntdSelect
                                name="role"
                                width={"420px"}
                                optinData={UserValue}
                                setSelected={setSelected}
                                selected={selected}
                                defaultValue="Role"
                            />
                        </div>
                        <div className="blockUserDiv">
                            <p className="deleteTitle">
                                Block User
                            </p>
                            <CsutomSwitch onChange={onChangeBlockUser} backSelected={userList?.deleted} check={userDeleteState} setCheck={setuserDeleteState} color={Colors.RED} />
                        </div>
                        <Form.Item>
                            {contextHolder}
                            <CustomAntdButton
                                title="Update"
                                background={Colors.PURPLE}
                                loading={userUpdateLoading}
                            />
                            <div className="deleteButton">
                                <CustomAntdButtonDelete
                                    loading={userDeleteLoading}
                                    title="Delete"
                                    background={Colors.GRAY_COLOR}
                                    onClick={() => {
                                        showModal();
                                    }}
                                />
                            </div>
                        </Form.Item>
                    </div>
                    <div className="subscribed">
                        <p className="nativeLanguageTitle">Subscriptipon</p>
                        <div className="switchDiv">
                            <p className="switchTitle">
                                Subscribed
                            </p>
                            <CsutomSwitch onChange={onChangeSub} check={subscribeState} backSelected={userList?.isSubscribed} setCheck={setsubscribeState} color={Colors.PURPLE} />
                        </div>
                        <div>
                            <p className="subscriptionTitle">
                                Subscription Date
                            </p>
                            <Space direction="vertical" size={12}>
                                {userList?.subscriptionStartDt != null ? <DatePicker disabled onChange={onChange} className="dataPicker" defaultValue={dayjs(userList?.subscriptionStartDt, dateFormat)} format={dateFormat} /> : <p>UnLimit</p>}
                            </Space>
                        </div>
                        <div>
                            <p className="subscriptionTitle">
                                Subscription  Expiry Date
                            </p>
                            <Space direction="vertical" size={12}>
                                {subscribeState === true ?
                                    <DatePicker onChange={onChange} className="dataPicker" format={dateFormat} /> : userList?.subscriptionExpiresDt != null ?
                                        <DatePicker onChange={onChange} className="dataPicker" format={dateFormat} defaultValue={dayjs(userList?.subscriptionExpiresDt, dateFormat)} /> : <p>UnLimit</p>}
                            </Space>
                        </div>
                    </div>
                </div>
            </Form>}
        </div>
    )
}