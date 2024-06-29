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

