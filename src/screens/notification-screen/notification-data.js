import { UserSubscription } from "./notification-typing";

export const userSubsriptionData = [
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

export const deviceTpesData = [
  {
    key: 1,
    title: "Android"
  },
  {
    key: 2,
    title: "IOS"
  },
  {
    key: 3,
    title: "General"
  }]


export const templeteTpesData = [
  {
    key: 1,
    title: "Template 1"
  },
  {
    key: 2,
    title: "Template 2"
  },
  {
    key: 3,
    title: "Default"
  }]

  export const tabsType = Object.freeze({
    TABSFIRST: 1,
    TABSSECOND: 2,
  })