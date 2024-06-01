import React, { useEffect, useState } from "react";
import "./learning-language-screen-style.css";
import { Form, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import uploadIcon from "../../assets/images/uploadImg.png";
import remove_icon from "../../assets/images/remove_icon.png";
import { Colors } from "../../assets/colors";
import { useNavigate } from "react-router-dom";
import {
  CustomAntdButtonDelete,
  CustomAntdInput,
  CustomAntdButton,
} from "../../components";
import {
  addLearnLanguageSelectedLanguages,
  deleteLearnBool,
  deleteLearnUpdateBool,
  getLearnLanguageByIdResponse,
  getNativeGetloading,
  getUpdatedLanguages,
  getUpdatedLearnLanguageBool,
  getUpdatedLearnLanguageLoading,
  learnLangBool,
  learnLanguageByIdThunk,
  learnLanguageDeleteLoading,
  learnLanguageDeleteThunk,
  learnLanguageUpdateThunk,
  nativeLanguageGetThunk,
  removeSelectedLanguagesItem,
  removeUpdateLanguagesItem,
} from "../../store/slices";
import { useTranslation } from "react-i18next";
import { SelectLanguage } from "./components";
import CustomModal from "../../components/custom-modal/custom-modal";
import { SelectLearningLang } from "./select-learning-lang";

export const LearningLanguageUpdate = () => {
  const fileList = [];
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();
  const deleteBool = useSelector(learnLangBool);
  const learningId = localStorage.getItem("learningId");
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [learningLanguageFileList, setLearningLanguageFileList] = useState([]);
  const [learningLanguageFile, setLearningLanguageFile] = useState();
  const [showLearningLanguageUpload, setShowLearningLanguageUpload] =
    useState();
  const updateBool = useSelector(getUpdatedLearnLanguageBool);
  const learningLanguageData = useSelector(getLearnLanguageByIdResponse);
  const deleteLerningLoading = useSelector(learnLanguageDeleteLoading);
  const updateLearningLoading = useSelector(getUpdatedLearnLanguageLoading);
  const learningData = learningLanguageData?.data;
  const lerningLangAllData = useSelector(getUpdatedLanguages);
  const updateSelect = useSelector(getUpdatedLanguages);
  const updateSelectedLanguages = useSelector(getUpdatedLanguages);
  const nativeLanguagesLoading = useSelector(getNativeGetloading);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFinish = (values) => {
    if (values.image.file != "") {
      formData.append("nameEng", values.nameEng);
      formData.append("name", values.name);
      learningLanguageFile && formData.append("image", learningLanguageFile);
      formData.append("id", learningData.id);
      formData.append("active", learningData?.active);
      lerningLangAllData.forEach((item, ind) => {
        formData.append(`nativeLanguages[${ind}]`, item._id);
      });
      dispatch(learnLanguageUpdateThunk(formData));
      form.resetFields();
      setLearningLanguageFile("");
    } else {
      console.log(values, "values");
    }
  };

  const onDelete = () => {
    dispatch(learnLanguageDeleteThunk(learningData?.id));
  };

  const handleChange = (info) => {
    setLearningLanguageFile(info.file);
    setShowLearningLanguageUpload(info.fileList[0]);
    if (!info.fileList[0]) {
      info.file = "";
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const beforeUpload = () => {
    return false;
  };

  const props = {
    accept: ".png",
    onRemove: (file) => {
      const index = learningLanguageFileList?.indexOf(file);
      const newFileList = learningLanguageFileList?.slice();
      newFileList?.splice(index, 1);
    },
  };
  const data = {
    skip: 0,
    limit: 12,
  };
  useEffect(() => {
    dispatch(nativeLanguageGetThunk(data));
  }, []);

  useEffect(() => {
    dispatch(learnLanguageByIdThunk(learningId));
    dispatch(addLearnLanguageSelectedLanguages());
  }, [learningLanguageData?.data?.nativeLanguages?.length]);

  useEffect(() => {
    form.setFieldsValue({
      nameEng: learningData?.nameEng,
      name: learningData?.name,
      image: learningData?.imageFile?.path,
    });
  }, [learningData]);

  useEffect(() => {
    if (deleteBool === true || updateBool === true) {
      navigate("/learning-language");
    }
    dispatch(deleteLearnBool());
    dispatch(deleteLearnUpdateBool());
  }, [deleteBool, updateBool]);

  return (
    <div
      className="learnLanguageUpdateScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div className="learningLanguageUpdateFormDiv">
        <CustomModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onTab={onDelete}
        />
        <p className="nativeLanguageTitle">{t("UPDATE_LEARNING_LANGUAGE")}</p>
        <Form
          autoComplete="off"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className="formAntd"
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
            {learningLanguageFile != null || fileList != null ? (
              <div className="imgae_upload_design">
                <div className="remove_icon_div">
                  <img
                    src={remove_icon}
                    onClick={() => {
                      setLearningLanguageFileList(null);
                      setLearningLanguageFile(null);
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
                onChange={handleChange}
                beforeUpload={beforeUpload}
                {...props}
                maxCount={1}
                listType="picture"
                className="upload-list-inline"
              >
                {learningLanguageFile && showLearningLanguageUpload ? null : (
                  <img src={uploadIcon} className="upload" />
                )}
              </Upload>
            )}
          </Form.Item>

          <Form.Item>
            <CustomAntdButton
              title="Update"
              background={Colors.PURPLE}
              loading={updateLearningLoading}
            />
            <div className="deleteButton">
              <CustomAntdButtonDelete
                loading={deleteLerningLoading}
                title="Delete"
                background={Colors.GRAY_COLOR}
                onClick={() => {
                  showModal();
                }}
              />
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className="learnLanguageSelectedLanguages">
      <SelectLearningLang dataLanguages={updateSelect} onDelete={(id) => {
          dispatch(removeSelectedLanguagesItem(id));
        }} />
        {/* <SelectLanguage dataLanguages={updateSelect} />
        <SelectLanguage
          languages={updateSelectedLanguages}
          onDelete={(id) => {
            dispatch(removeUpdateLanguagesItem(id));
          }}
          loading={nativeLanguagesLoading}
        /> */}
      </div>
    </div>
  );
};
