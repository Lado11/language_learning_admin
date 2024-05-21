import React, { useEffect, useState } from "react";
import { Form, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./learning-language-screen-style.css";
import {
  deleteNativeCreateBool,
  getNativeCreateBool,
} from "../../store/slices/native-language/native-language-create";
import uploadIcon from "../../assets/images/uploadImg.png";
import { CustomAntdButton } from "../../components/custom-antd-button/custom-antd-button";
import { Colors } from "../../assets/colors";
import { useNavigate } from "react-router-dom";
import { CustomAntdButtonDelete, CustomAntdInput } from "../../components";
import { getNativeGetResponse } from "../../store/slices/native-language/native-language-get";
import {
  deleteNativeDeleteBool,
  getNativeDeleteBool,
  nativeLanguageDeleteThunk,
} from "../../store/slices/native-language/native-language-delete";
import remove_icon from "../../assets/images/remove_icon.png";
import { nativeLanguageUpdateThunk } from "../../store/slices";
import { useTranslation } from "react-i18next";
import { learningLanguages } from "../../store/slices/learn-language/learn-languages-slice";
import { SelectLanguage } from "./components";

export const LearningLanguageUpdate = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();
  const nativeCreateBool = useSelector(getNativeCreateBool);
  const deleteBool = useSelector(getNativeDeleteBool);
  const [fileList, setFileList] = useState([]);
  const [categoryShow, setCategoryShow] = useState();
  const [showCategoryUpload, setCatgeoryShowUpload] = useState();
  const learningLanguageData = useSelector(learningLanguages);
  const learningData = learningLanguageData?.data?.list?.[0];
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const onFinish = (values) => {
    if (values.image.file != "") {
      formData.append("nameEng", values.nameEng);
      formData.append("name", values.name);
      categoryShow
        ? formData.append("image", categoryShow)
        : formData.append("image", learningData?.imageFile);
      formData.append("id", learningData.id);
      formData.append("active", learningData?.active);
      dispatch(nativeLanguageUpdateThunk(formData));
      form.resetFields();
      setCategoryShow("");
    } else {
      console.log(values, "values");
    }
  };

  useEffect(() => {
    if (nativeCreateBool === true) {
    }
    dispatch(deleteNativeCreateBool());
  }, [nativeCreateBool]);

  const handleChange = (info) => {
    setCategoryShow(info.file);
    setCatgeoryShowUpload(info.fileList[0]);
    if (!info.fileList[0]) {
      info.file = "";
    }
  };

  const beforeUpload = () => {
    return false;
  };

  const props = {
    accept: ".png",
    onRemove: (file) => {
      const index = fileList?.indexOf(file);
      const newFileList = fileList?.slice();
      newFileList?.splice(index, 1);
    },
  };

  const defaultImgae = {};

  useEffect(() => {
    form.setFieldsValue({
      nameEng: learningData?.nameEng,
      name: learningData?.name,
      image: learningData?.imageFile?.path,
    });
  }, [learningData]);

  useEffect(() => {
    if (deleteBool === true) {
      navigate("/native-language");
    }
    dispatch(deleteNativeDeleteBool());
  }, [deleteBool]);

  return (
    <div
      className="learnLanguageUpdateScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div className="learningLanguageUpdateFormDiv">
        <p className="nativeLanguageTitle">{t("UPDATE_LEARNING_LANGUAGE")}</p>
        <Form
          autoComplete="off"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <p>{t("LANGUAGE_ENGLISH_NAME")}</p>
          <CustomAntdInput
            name="nameEng"
            placeholder=" Language English Name*"
          />
          <p>{t("NATIVE_NAME")}</p>

          <CustomAntdInput name="name" placeholder="Native Name*" />

          <p>{t("LANGUAGE_ICON")}</p>

          <Form.Item
            name="image"
            rules={[
              {
                required: true,
              },
            ]}
          >
            {categoryShow != null || fileList != null ? (
              <div className="imgae_upload_design">
                <div className="remove_icon_div">
                  <img
                    src={remove_icon}
                    onClick={() => {
                      setFileList(null);
                      setCategoryShow(null);
                    }}
                  />
                </div>
                <div className="imgae_name">
                  <p>{learningData?.imageFile?.description}</p>
                  <img src={`${baseUrl}${learningData?.imageFile?.path}`} />
                </div>
              </div>
            ) : (
              <Upload
                // defaultFileList={[nativeData?.imageFile]}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                {...props}
                maxCount={1}
                listType="picture"
                className="upload-list-inline"
              >
                {categoryShow && showCategoryUpload ? null : (
                  <img src={uploadIcon} className="upload" />
                )}
              </Upload>
            )}
          </Form.Item>

          <Form.Item>
            <CustomAntdButton title="Update" background={Colors.PURPLE} />
            <div className="deleteButton">
              <CustomAntdButtonDelete
                title="Delete"
                background={Colors.GRAY_COLOR}
                onClick={() => {
                  dispatch(nativeLanguageDeleteThunk(learningData?.id));
                }}
              />
            </div>
          </Form.Item>
        </Form>
      </div>
      <div style={{ width: "44%" }}>
        <SelectLanguage />
      </div>
    </div>
  );
};
