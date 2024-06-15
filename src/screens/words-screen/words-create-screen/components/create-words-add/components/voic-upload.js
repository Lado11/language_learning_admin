import React, { useState } from "react";
import "./voic-upload-style.css";
import voicUploadIcon from "../../../../../../assets/images/Item.png";
import { Image, Upload } from "antd";
import { beforeUpload } from "../../../../../utils/helper";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export const VoiceUpload = ({setIamge,image,fileListVoice,setFileListVoice}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const props = {
    accept:"audio/*",
    onRemove: (file) => {
      const index = image?.indexOf(file);
      const newFileList = image?.slice();
      newFileList?.splice(index, 1);
    },
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = (info) =>{
    setIamge(info.fileList)
    setFileListVoice(info.file);
  }

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
        width: "100%",
      }}
      type="button"
    >
      <img src={voicUploadIcon}/>
    </button>
  );
  return (
    <div className="custom-upload">
      <Upload
      {...props}
      beforeUpload={beforeUpload}
        listType="picture-card"
        fileList={image}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {image?.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>

      )
};


// return (
//   <div className="voice-upload-container">
//     <div className="voice-upload-box">
//       <input
//         type="file"
//         onChange={handleFileChange}
//         id="voiceUpload"
//         style={{ display: "none" }}
//       />
//       <label htmlFor="voiceUpload" className="voice-upload-label">
//         <div className="voice-upload-text">Voice Upload </div>
//         <img src={voicUploadIcon} />
//       </label>
//     </div>
//   </div>
// );

// accept="audio/*"
