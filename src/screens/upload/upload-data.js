import { UploadType, UploadStatus } from "./upload-typing"

export const statusUpload = [
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

export const typeUpload = [
    {
      _id: 1,
      key: UploadType.CREATE,
      title: "Create words"
    },
    {
      _id: 2,
      key: UploadType.UPDATE,
      title: "Update words"
    },
  ]
  
  