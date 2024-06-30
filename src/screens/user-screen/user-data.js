import { UserInfo, UserRole, UserSubscription } from "./user-typing"

export const dataUser = [
    {
        key: UserSubscription.SUBSCRIBED,
        title: "Subscribed"
    },
    {
        key: UserSubscription.UNSUBSCRIBED,
        title: "Unsubscribed"
    },
    {
        key: UserSubscription.All,
        title: "All"
    }]

export const dataPhone = [
    {
        key: UserInfo.VERFIED,
        title: "Verified"
    },
    {
        key: UserInfo.UNVERFIED,
        title: "UnVerified"
    },
    {
        key: UserInfo.All,
        title: "All"
    }]
export const dataEmail = [
    {
        key: UserInfo.VERFIED,
        title: "Verified"
    },
    {
        key: UserInfo.UNVERFIED,
        title: "UnVerified"
    },
    {
        key: UserInfo.All,
        title: "All"
    }
]

export const dataRole = [
    {
        key: UserRole.ADMIN,
        title: "Admin"
    },
    {
        key: UserRole.OPERATOR,
        title: "Operator"
    },
    {
        key: UserRole.USER,
        title: "User"
    },
    {
        key: UserRole.All,
        title: "All"
    }]

export const tableHeaderData = [
    {
        id: "_id",
        title: "Id",
    },
    {
        title: "User",
        id: "firstName",
        key: "firstName",
    },
    {
        title: "Email",
        id: "email",
        key: "email",
    },
    {
        title: "Phone",
        id: "phoneNumber",
        key: "phoneNumber",
    },
    {
        title: "Device ID",
        id: "phoneNumber",
        key: "devices",
    },
    {
        title: "Country",
        id: "phoneNumber",
        key: "devices",
    },
    {
        title: "Status",
        id: "phoneNumber",
        key: "devices",
    },    
];