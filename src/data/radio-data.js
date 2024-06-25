
export const UserSubscription = Object.freeze({
  SUBSCRIBED: true,
  UNSUBSCRIBED: false,
  All:-1
})

export const UserInfo = Object.freeze({
  VERFIED: true,
  UNVERFIED: false,
  All:-1
})

export const UserRole = Object.freeze({
  ADMIN: 0,
  OPERATOR: 1,
  USER: 2,
  All:-1
})

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


export const devicesData = [
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

  export const UploadStatus = Object.freeze({
    PROCESSED: 0,
    SUCCESS: 1,
    ERROR: 2,
    All:-1
  })

export const statufsUpload = [
  {
    _id: 1,
    key: UploadStatus.PROCESSED,
    title: "Processed words"
  },
  {
    _id: 2,
    key: UploadStatus.SUCCESS,
    title: "Success count"
  },
  {
    _id: 3,
    key: UploadStatus.ERROR,
    title: "Error count"
  },
  {
    _id: 4,
    key: UploadStatus.All,
    title: "All"
  }]

  export const TypeGroup = Object.freeze({
    CREATE: 0,
    UPDATE: 1,
   
  })


export const typeGroup = [
  {
    _id: 1,
    key: TypeGroup.CREATE,
    title: "Create words"
  },
  {
    _id: 2,
    key: TypeGroup.UPDATE,
    title: "Update words"
  },
]



export const dataUserSub = [
  {
    _id: 1,
    label: "Subscribed ",
    value: "Subscribed"
  },
  {
    _id: 2,
    label: "Unsubscribed ",
    value: "Unsubscribed"
  },
  {
    _id: 3,
    label: "All ",
    value: "All"
  },

]

export const phoneSelect = [
  {
    _id: 7,
    label: "Verified ",
    value: "Verified"
  },
  {
    _id: 8,
    label: "Unverified ",
    value: "Unverified"
  },
  {
    _id: 9,
    label: "All ",
    value: "All"
  },
]

export const emailSelect = [
  {
    _id: 4,
    label: "Verified ",
    value: "Verified"
  },
  {
    _id: 5,
    label: "Unverified ",
    value: "Unverified"
  },
  {
    _id: 6,
    label: "All ",
    value: "All"
  },
]

export const WordsLevel = Object.freeze({
  BEGINNER: 0,
  INTERMIDATE: 1,
  ADVANCED: 2,
  All:-1
})

export const level = [
  {
    _id: 1,
    key: WordsLevel.BEGINNER,
    title: "Beginner"
  },
  {
    _id: 2,
    key: WordsLevel.INTERMIDATE,
    title: "Intermediate"
  },
  {
    _id: 3,
    key: WordsLevel.ADVANCED,
    title: "Advanced"
  },
  {
    _id: 4,
    key: WordsLevel.All,
    title: "All"
  },
  ]