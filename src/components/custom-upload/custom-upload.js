import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./custom-upload.css";
import { Image, Upload } from "antd";
import uploadImg from "../../assets/images/uploadImg.svg";
import { Colors } from "../../assets/colors";
import uploadIcon from "../../assets/images/upload-voice-icon.svg";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export const CustomUpload = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState();

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
        width: "100%",
      }}
      type="button"
    >
      <div
        style={{
          marginTop: 8,
          paddingBottom: 15,
        }}
      >
        <div className="uploadTitleLine">
          <p
            className="upload-button-text"
            style={{ color: Colors.LIGHT_GRAY_WITH_ALFA }}
          >
            Photo Upload
          </p>
          <img src={uploadIcon} className="custom-upload-icon" />
        </div>
        <img src={uploadImg} className="upload-img" />
      </div>
    </button>
  );
  return (
    <div className="custom-upload">
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList?.length >= 1 ? null : uploadButton}
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
  );
};
