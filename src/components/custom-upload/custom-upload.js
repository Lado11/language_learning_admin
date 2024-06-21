import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./custom-upload.css";
import { Form, Image, Upload } from "antd";
import uploadImg from "../../assets/images/uploadImg.svg";
import { Colors } from "../../assets/colors";
import uploadIcon from "../../assets/images/wordUpload.png";
import { beforeUpload } from "../../screens/utils/helper";
import remove_icon from "../../assets/images/remove_icon.png";

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
  const [learningLanguageFile, setLearningLanguageFile] = useState();
  const [showLearningLanguageUpload, setShowLearningLanguageUpload] =
    useState();

  const props = {
    accept: ".png,.svg,.jpg",
    onRemove: (file) => {
      const index = image?.indexOf(file);
      const newFileList = image?.slice();
      newFileList?.splice(index, 1);
    },
  };


  // const handlePreview = async (file) => {
  //   console.log(file,"file");
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  // };

  const handleChange = (info) =>{
    setIamge(info.fileList)
    setFileList(info.file);
    setPreviewImage(info.fileList)
  }
 
  return (
    <div className="custom-upload">
       <Form.Item
        name={"words image"}
        rules={[{ required: true }]}
      >
         {learningLanguageFile != null || fileList != null ? (
                  <div className="imgae_upload_design">
                    <div className="remove_icon_div">
                      <img
                        src={remove_icon}
                        onClick={() => {
                          setFileList(null)
                          setLearningLanguageFile(null);
                        }}
                      />
                    </div>
                    <div className="imgae_name">
                    <Image src={image?.[0]?.thumbUrl}/>
                    </div>
                  </div>
                ) : (
                  <Upload
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    {...props}
                    maxCount={1}
                    listType="picture"
                    className="upload-list-inline"
                  >
                    {learningLanguageFile && showLearningLanguageUpload ? null : (
                      <img src={uploadIcon}  />
                    )}
                  </Upload>
                )}
      {/* <Upload
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
      )} */}
      </Form.Item>
    </div>
  );
};
