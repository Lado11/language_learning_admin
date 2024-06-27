import React, { useEffect, useState } from "react";
import { Form, Upload, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CustomAntdButton } from "../../components/custom-antd-button/custom-antd-button";
import { Colors } from "../../assets/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomAntdButtonDelete, CustomAntdInput, CustomSpin, CustomUploadElement } from "../../components";
import {
  deleteNativeDeleteBool,
  deleteNativeDeleteResponse,
  getNativeDeleteBool,
  getNativeDeleteResponse,
  getNativeDeleteloading,
  nativeLanguageDeleteThunk,
} from "../../store/slices/native-language/native-language-delete";
import {
  deleteNativeUpdateResponse,
  getNativeUpdateBool,
  getNativeUpdateData,
  getNativeUpdateLoading,
  nativeLanguageUpdateThunk,
} from "../../store/slices";
import {
  getNativeGetIdResponse,
  getNativeGetIdloading,
  nativeLanguageGetIdThunk,
} from "../../store/slices/native-language/get-id-native-language";
import CustomModal from "../../components/custom-modal/custom-modal";
import { Success, Error } from "../../components/custom-message/custom-message";
import { ShowImage } from "../category-screen/category-update";
import { fileToDataString } from "../../helper/file-build";
import { filesGetIdThunk, getfilesGetIdResponse } from "../../store/slices/files/get-id-files";
import { ImageUpload } from "../category-screen/category-screen-create-from";

export const UpdateNativeLanguage = () => {
  let location = useLocation();
  const nativeId = location?.pathname.slice(17);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryShow, setCategoryShow] = useState();
  const deleteBool = useSelector(getNativeDeleteBool);
  const nativeLanguageData = useSelector(getNativeGetIdResponse)?.data;
  const nativeUpdateLoading = useSelector(getNativeUpdateLoading);
  const nativeDeleteLoading = useSelector(getNativeDeleteloading);
  const nativeUpdateBool = useSelector(getNativeUpdateBool);
  const nativeDeleteResponse = useSelector(getNativeDeleteResponse);
  const nativeUpdateResponse = useSelector(getNativeUpdateData);
  const getIdNativeLoading = useSelector(getNativeGetIdloading);
  const [selectedImage, setSelectedImage] = useState();
  const [previewImgUrl, setPreviewimgUrl] = useState("");

  const onFinish = (values) => {
    if (values.image.file != "") {
      formData.append("nameEng", values.nameEng);
      formData.append("name", values.name);
      selectedImage && formData.append("image", selectedImage);
      formData.append("id", nativeLanguageData.id);
      formData.append("active", nativeLanguageData?.active);
      dispatch(nativeLanguageUpdateThunk(formData));
      form.resetFields();
      setCategoryShow("");
    } else {
      console.log(values, "values");
    }
  };


  useEffect(() => {
    dispatch(nativeLanguageGetIdThunk(nativeId));
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const messageError = nativeDeleteResponse?.message;
  const messageErrorUpdate = nativeUpdateResponse?.message;

  useEffect(() => {
    nativeDeleteResponse?.success === true && Success({ messageApi });
    nativeDeleteResponse?.success === false && Error({ messageApi, messageError });
    nativeUpdateResponse?.success === false &&
      Error({ messageApi, messageErrorUpdate });
    dispatch(deleteNativeDeleteResponse());
    dispatch(deleteNativeUpdateResponse());
  }, [nativeDeleteResponse?.success, nativeUpdateResponse?.success]);

  useEffect(() => {
    form.setFieldsValue({
      nameEng: nativeLanguageData?.nameEng,
      name: nativeLanguageData?.name,
      image: nativeLanguageData?.imageFile?.path,
    });
  }, [nativeLanguageData]);

  useEffect(() => {
    dispatch(nativeLanguageGetIdThunk(nativeId));
  }, []);

  useEffect(() => {
    if (nativeDeleteResponse?.success === true || nativeUpdateResponse?.success === true) {
      navigate("/native-language");
    }
    dispatch(deleteNativeDeleteBool());
    dispatch(deleteNativeUpdateResponse());
  }, [nativeDeleteResponse?.success, nativeUpdateResponse?.success]);

  const onTab = () => {
    dispatch(nativeLanguageDeleteThunk(nativeLanguageData?.id));
  };

  const [imageUrls, setImageUrls] = useState({});
  const categoryImageResponse = useSelector(getfilesGetIdResponse);


  useEffect(() => {
    // Preload image URLs
    if (nativeLanguageData) {
      fetchImage(nativeLanguageData.imageFile?._id);
    }
  }, [nativeLanguageData]);

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
    <div className="nativeLanguageCreateScreenMainDiv">
      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onTab={onTab}
      />
      <p className="categoryUpdateTitle">Update Native Language</p>

      {getIdNativeLoading ? <div className="CustomSpinUpdate"> <CustomSpin size={120} color={Colors.GRAY_COLOR} /> </div> :
        <Form
          autoComplete="off"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className="formAntd"
        >
          <p className="customInputTitle">Language english name</p>
          <CustomAntdInput rules={true} name="nameEng" placeholder=" Language English Name*" />
          <p className="customInputTitle">Native Name</p>
          <CustomAntdInput rules={true} name="name" placeholder="Native Name*" />
          <p className="customInputTitle">Language Icon</p>
          <Form.Item
            name="image"
            rules={[
              {
                required: true,
              },
            ]}
          >
            {previewImgUrl?.length > 1 ? (
              <ShowImage title={selectedImage?.name}
                src={previewImgUrl}
                onClick={() => {
                  setPreviewimgUrl(".")
                  setCategoryShow(null);
                }} />
            ) : nativeLanguageData?.imageFile && !previewImgUrl ? (
              <ShowImage title={nativeLanguageData?.imageFile?.description} src={imageUrls[nativeLanguageData?.imageFile?._id]} onClick={() => {
                setPreviewimgUrl(".")
                setCategoryShow(null);
              }} />
            ) : (
              <ImageUpload onChange={handleFileChange} />
            )}
          </Form.Item>
          <Form.Item>
            {contextHolder}
            <CustomAntdButton
              title="Update"
              background={Colors.PURPLE}
              loading={nativeUpdateLoading}
            />
            <div className="deleteButton">
              <CustomAntdButtonDelete
                loading={nativeDeleteLoading}
                title="Delete"
                background={Colors.GRAY_COLOR}
                onClick={() => {
                  showModal();
                }}
              />
            </div>
          </Form.Item>
        </Form>}
    </div>
  );
};
