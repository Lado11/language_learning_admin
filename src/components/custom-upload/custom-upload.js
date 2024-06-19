import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./custom-upload.css";
import { Form, Image, Upload } from "antd";
import uploadImg from "../../assets/images/uploadImg.svg";
import { Colors } from "../../assets/colors";
import uploadIcon from "../../assets/images/wordUpload.png";
import { beforeUpload } from "../../screens/utils/helper";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export const CustomUpload = ({fileList,setFileList,setIamge,image}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const props = {
    accept: ".png,.svg,.jpg",
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
    setFileList(info.file);
  }

  
  return (
    <div className="custom-upload">
       <Form.Item
        name={"words image"}
        rules={[{ required: true }]}
      >
      <Upload
      {...props}
      beforeUpload={beforeUpload}
        listType="picture-card"
        fileList={image}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {image?.length >= 1 ? null :   <img  src={uploadIcon}/>}
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
      </Form.Item>
    </div>
  );
};
