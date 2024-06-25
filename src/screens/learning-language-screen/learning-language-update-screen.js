import React, { useEffect, useState } from "react";
import "./learning-language-screen-style.css";
import { Form, Select, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import uploadIcon from "../../assets/images/uploadImg.png";
import remove_icon from "../../assets/images/remove_icon.png";
import { Colors } from "../../assets/colors";
import { useNavigate } from "react-router-dom";
import logoVoice from "../../assets/images/Vector (4).png"

import {
  CustomAntdButtonDelete,
  CustomAntdInput,
  CustomAntdButton,
  CustomSpin,
  CustomUploadElement,
} from "../../components";
import {
  deleteLearnBool,
  deleteLearnResponse,
  deleteLearnUpdateBool,
  deleteLearnUpdateResponse,
  getLearnLanguageByIdLoading,
  getLearnLanguageByIdResponse,
  getNativeGetResponse,
  getUpdatedLanguages,
  getUpdatedLearnLanguageBool,
  getUpdatedLearnLanguageLoading,
  getUpdatedLearnLanguageResponse,
  learnLangBool,
  learnLanguageByIdThunk,
  learnLanguageDeleteLoading,
  learnLanguageDeleteResponse,
  learnLanguageDeleteThunk,
  learnLanguageUpdateThunk,
  learningLanguages,
  learningLanguagesThunk,
  nativeLanguageGetThunk,
  removeAllLanguages,
  removeSelectedLanguagesItem,
} from "../../store/slices";
import { useTranslation } from "react-i18next";
import CustomModal from "../../components/custom-modal/custom-modal";
import { SelectLearningLang } from "./select-learning-lang";
import { beforeUpload, props } from "../utils/helper";
import { ConstPagiantion } from "../../constants/const-pagination";
import { page0, page12 } from "../../constants/constants";
const { Option } = Select;

export const LearningLanguageUpdate = () => {
  const [fileList, setFileList] = useState([]);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loadingLanguageId = useSelector(getLearnLanguageByIdLoading);
const leraningLangugaeUpdateResponse = useSelector(getUpdatedLearnLanguageResponse);
const learningLanguageDeleteResposne = useSelector(learnLanguageDeleteResponse);
  const onFinish = (values) => {
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
  };


  const onDelete = () => {
    dispatch(learnLanguageDeleteThunk(learningData?.id));
  };

  const handleChange = (info) => {
    setLearningLanguageFile(info.file);
    setShowLearningLanguageUpload(info.fileList?.[0]);
    if (!info.fileList?.[0]) {
      info.file = "";
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(nativeLanguageGetThunk(ConstPagiantion(page0,page12)));
  }, []);

  useEffect(() => {
    dispatch(learnLanguageByIdThunk(learningId));
  }, [learningId]);

  useEffect(() => {
    form.setFieldsValue({
      nameEng: learningData?.nameEng,
      name: learningData?.name,
      image: learningData?.imageFile?.path,
    });
  }, [learningData]);

  useEffect(() => {
    if (leraningLangugaeUpdateResponse?.success === true || learningLanguageDeleteResposne?.success === true) {
      navigate("/learning-language");
    }
    dispatch(removeAllLanguages())
    dispatch(deleteLearnResponse());
    dispatch(deleteLearnUpdateResponse());
  }, [leraningLangugaeUpdateResponse?.success, learningLanguageDeleteResposne?.success]);

  
  


  return (
    <div
      // className="learnLanguageUpdateScreenMainDiv"
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      {loadingLanguageId ? <div className="CustomSpinUpdate">
        <CustomSpin size={120} color={Colors.GRAY_COLOR} />
      </div> : <>  <div className="learningLanguageUpdateFormDiv">
        <CustomModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onTab={onDelete}
        />
        <Form
          autoComplete="off"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        // className="formAntd"
        >
  
          <div className="createLearningLangRow">
            <div className="updateSection">
              <p className="nativeLanguageTitle">{t("UPDATE_LEARNING_LANGUAGE")}</p>

              <p className="inputTitle">{t("LANGUAGE_ENGLISH_NAME")}</p>
              <CustomAntdInput
                rules={true}
                name="nameEng"
                placeholder=" Language English Name*"
              />
              <p className="inputTitle">{t("NATIVE_NAME")}</p>

              <CustomAntdInput rules={true} name="name" placeholder="Native Name*" />
              <p className="inputTitle">{t("LANGUAGE_ICON")}</p>

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
                          setFileList(null)
                          // setLearningLanguageFileList(null);
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
                  <CustomUploadElement title={"Upload Language Icon"} />

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
            </div>
            <div className="learnLanguageSelectedLanguages">
              <p className="inputTitle marginBottom">Native Language</p>
              <SelectLearningLang  name={"Native Language"} dataLanguages={lerningLangAllData} onDelete={(id) => {
                dispatch(removeSelectedLanguagesItem(id));
              }} />
            </div>
          </div>
        </Form>
      </div>
      </>}
    </div>
  );
};
