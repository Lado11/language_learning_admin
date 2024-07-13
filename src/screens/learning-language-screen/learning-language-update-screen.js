import React, { useEffect, useState } from "react";
import "./learning-language-screen-style.css";
import { Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../assets/colors";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CustomAntdButtonDelete,
  CustomAntdInput,
  CustomAntdButton,
  CustomSpin,
} from "../../components";
import {
  deleteLearnResponse,
  deleteLearnUpdateResponse,
  getLearnLanguageByIdLoading,
  getLearnLanguageByIdResponse,
  getUpdatedLanguages,
  getUpdatedLearnLanguageLoading,
  getUpdatedLearnLanguageResponse,
  learnLanguageByIdThunk,
  learnLanguageDeleteLoading,
  learnLanguageDeleteResponse,
  learnLanguageDeleteThunk,
  learnLanguageUpdateThunk,
  removeAllLanguages,
  removeSelectedLanguagesItem,
} from "../../store/slices";
import { useTranslation } from "react-i18next";
import CustomModal from "../../components/custom-modal/custom-modal";
import { SelectLearningLang } from "./select-learning-lang";
import { ShowImage } from "../category-screen/category-update";
import { ImageUpload } from "../category-screen/category-screen-create-from";
import { fileToDataString } from "../../helper/file-build";
import { filesGetIdThunk, getfilesGetIdResponse, getfilesGetIdloading } from "../../store/slices/files/get-id-files";
import { nativeGetUrl } from "./learning-langauge-constant";
import { loadOptions } from "../../helper/loadOptions";

const { Option } = Select;

export const LearningLanguageUpdate = () => {
  let location = useLocation();
  const learningId = location?.pathname.slice(19);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();
  const [learningLanguageFile, setLearningLanguageFile] = useState();
  useState();
  const learningLanguageData = useSelector(getLearnLanguageByIdResponse);
  const deleteLerningLoading = useSelector(learnLanguageDeleteLoading);
  const updateLearningLoading = useSelector(getUpdatedLearnLanguageLoading);
  const learningData = learningLanguageData?.data;
  const lerningLangAllData = useSelector(getUpdatedLanguages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [previewImgUrl, setPreviewimgUrl] = useState("");
  const [categoryShow, setCategoryShow] = useState();
  const loadingLanguageId = useSelector(getLearnLanguageByIdLoading);
  const leraningLangugaeUpdateResponse = useSelector(getUpdatedLearnLanguageResponse);
  const learningLanguageDeleteResposne = useSelector(learnLanguageDeleteResponse);
  const [current, setCurrent] = useState(0)
  const [imageUrls, setImageUrls] = useState({});
  const categoryImageResponse = useSelector(getfilesGetIdResponse);
  const learnignLanguageImageUpdate = useSelector(getfilesGetIdloading);

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

  useEffect(() => {
    // Preload image URLs
    if (learningData) {
      fetchImage(learningData.imageFile?._id);
    }
  }, [learningData]);

  const fetchImage = (imageFileId) => {
    if (!imageUrls[imageFileId]) {
      dispatch(filesGetIdThunk(imageFileId));
    }
  };

  useEffect(() => {
    // Update imageUrls state with fetched image URLs
    if (categoryImageResponse?.data?.url) {
      setImageUrls((prevUrls) => ({
        ...prevUrls,
        [categoryImageResponse.data.fileId]: categoryImageResponse.data.url,
      }));
    }
  }, [categoryImageResponse]);

  const onFinish = (values) => {
    clearFormData(formData)
    formData.append("id", learningData?._id)

    if (values.nameEng !== undefined && values.nameEng !== "" && values.nameEng !== learningData.nameEng) {
      formData.append("nameEng", values.nameEng);
    }

    if (values.name !== undefined && values.name !== "" && values.name !== learningData.name) {
      formData.append("name", values.name);
    }

    if (values.active !== undefined && values.active !== "" && values.active !== learningData.active) {
      formData.append("active", values.active);
    }

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    lerningLangAllData.forEach((item, ind) => {
      console.log(item,"item");
      formData.append(`nativeLanguages[${ind}]`, item._id ?  item._id : item.value);
    });

    dispatch(learnLanguageUpdateThunk(formData));
    setLearningLanguageFile("");
  };

  const onDeleteLang = () => {
    dispatch(learnLanguageDeleteThunk(learningData?.id));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const clearFormData = (formData) => {
    const keys = Array.from(formData.keys());

    keys.forEach(key => {
        formData.delete(key);
    });
  };

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

   const handleLoadOptions = async (inputValue, loadedOptions, { page }) => {
    const { options, hasMore } = await loadOptions(inputValue, loadedOptions, { page }, nativeGetUrl);
    return {
      options: options,
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <div
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      {loadingLanguageId ? <div className="CustomSpinUpdate">
        <CustomSpin size={120} color={Colors.GRAY_COLOR} />
      </div> : <>  <div className="learningLanguageUpdateFormDiv">
        <CustomModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onTab={onDeleteLang}
        />
        <Form
          autoComplete="off"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <div className="createLearningLangRow">
            <div className="updateSection">
              <div className="update-language-right-section">

                <p className="nativeLanguageTitle">{t("UPDATE_LEARNING_LANGUAGE")}</p>
                <p className="inputTitle">{t("LANGUAGE_ENGLISH_NAME")}</p>
                <CustomAntdInput
                  rules={true}
                  min={2}
                  name="nameEng"
                  placeholder=" Language English Name*"
                />

                <p className="inputTitle">{t("NATIVE_NAME")}</p>
                <CustomAntdInput 
                  rules={true} 
                  min={2}
                  name="name" 
                  placeholder="Native Name*" />
                <p className="inputTitle">{t("LANGUAGE_ICON")}</p>

                <Form.Item
                  name="image"
                  rules={[{ required: true }]}
                >
                  {previewImgUrl?.length > 1 ? (
                    <ShowImage title={selectedImage?.name}
                      src={previewImgUrl}
                      onClick={() => {
                        setPreviewimgUrl(".")
                        setCategoryShow(null);
                      }} />
                  ) : learningData?.imageFile && !previewImgUrl ? (
                    <ShowImage loading={learnignLanguageImageUpdate} title={learningData?.imageFile?.description} src={imageUrls[learningData?.imageFile?._id]} onClick={() => {
                      setPreviewimgUrl(".")
                      setCategoryShow(null);
                    }} />
                  ) : (
                    <ImageUpload onChange={handleFileChange} />
                  )}
                </Form.Item>
              </div>
              <div className="learnLanguageSelectedLanguages">
                <p className="inputTitle marginBottom">Native Language</p>
                <SelectLearningLang  loadOptions={handleLoadOptions} current={current} name={"Native Language"}
                 dataLanguages={lerningLangAllData} onDelete={(id) => {
                  dispatch(removeSelectedLanguagesItem(id));
                }} />
              </div>
            </div>

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
        </Form>
      </div>
      </>}
    </div>
  );
};
