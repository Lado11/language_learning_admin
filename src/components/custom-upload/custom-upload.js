import React from "react";
import "./custom-upload.css";
import { Form} from "antd";
import remove_icon from "../../assets/images/remove_icon.png";
import { ImageUpload } from "../../screens/category-screen/category-screen-create-from";
import { fileToDataString } from "../../helper/file-build";


export const CustomUpload = ({ setCategoryShow, setPreviewimgUrl, previewImgUrl, setSelectedImage, selectedImage , required = true}) => {

  const handleFileChange = async (
    event
  ) => {
    const file = event.target.files;
    setSelectedImage(file?.[0]);
    if (!file) {
      return;
    }
    try {
      const imgUrl = await fileToDataString(file?.[0]);
      setPreviewimgUrl(imgUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="custom-upload">
      <Form.Item
        name={"words image"}
        rules={[{ required: required }]}
      >
        {previewImgUrl?.length ?
          <div className="imgae_upload_design">
            <div className="remove_icon_div">
              <img
                className="remove_button"
                src={remove_icon}
                onClick={() => {
                  setPreviewimgUrl("")
                  setCategoryShow(null);
                }}
              />
            </div>
            <div className="imgae_name">
              <div className="image_wrapper">
                <p>{selectedImage?.name}</p>
                <img className="imageItem" src={previewImgUrl} />
              </div>
            </div>
          </div> : <ImageUpload onChange={handleFileChange} />}

      </Form.Item>
    </div>
  );
};
