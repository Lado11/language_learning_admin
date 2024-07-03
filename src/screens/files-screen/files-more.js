
import React from 'react';
import { useTranslation } from "react-i18next";
import { CustomAntdButtonDelete, CustomAntdInput, CustomSpin } from "../../components";
import { Colors } from "../../assets/colors";
import { useEffect, useState } from "react";
import CustomModal from "../../components/custom-modal/custom-modal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "antd";
import { wordsExelGetIdLoading } from "../../store/slices/words/getId-exel-words";
import { DeletefilesResponse, Deletefilesloading, deleteFilesResponse, filesDeleteThunk } from '../../store/slices/files/delete-files';
import { filesIdGetThunk, getfilesIdGetResponse } from '../../store/slices/files/get-files-id';
import { MediaTypes, UserObjectType } from './files-typing';
import { filesGetIdThunk, getfilesGetIdResponse, getfilesGetIdloading } from '../../store/slices/files/get-id-files';

export const FilesMore = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageUrls, setImageUrls] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    const filesId = location?.pathname.slice(12);
    const wordsIdLoading = useSelector(wordsExelGetIdLoading);
    const filesIdRspsonse = useSelector(getfilesIdGetResponse);
    const filesDeleteloading = useSelector(Deletefilesloading);
    const filesDeleteResponse = useSelector(DeletefilesResponse)
    const filesImageResponse = useSelector(getfilesGetIdResponse);
    const filesImageLoading = useSelector(getfilesGetIdloading);

    const fetchImage = (imageFileId) => {
        if (!imageUrls[imageFileId]) {
          dispatch(filesGetIdThunk(imageFileId));
        }
      };
    
      useEffect(() => {
        // Preload image URLs
        if (filesIdRspsonse) {
            fetchImage(filesIdRspsonse?.data?._id);         
        }
      }, [filesIdRspsonse]);
    
      useEffect(() => {
        // Update imageUrls state with fetched image URLs
        if (filesImageResponse?.data?.url) {
          setImageUrls((prevUrls) => ({
            ...prevUrls,
            [filesImageResponse.data.fileId]: filesImageResponse.data.url,
          }));
        }
      }, [filesImageResponse]);

    const getFilesUsedObject = (type) => {
        switch (type) {
            case UserObjectType.NATIVELANGUAGE:
                return "Native";
            case UserObjectType.LEARNINGLANGUAGE:
                return "Language";
            case UserObjectType.WORD:
                return "Word";
            case UserObjectType.CATEGORY:
            default:
                return "Category";
        }
    };

    const getFilesType = (type) => {
        switch (type) {
            case MediaTypes.IMAGE:
                return "Image";
            case MediaTypes.AUDIO:
            default:
                return "Audio";
        }
    };

    
    const getFilesTypeImage = (type) => {
        switch (type) {
            case MediaTypes.IMAGE:
                return <div className='filesImageSection'>
                  {filesImageLoading ? <CustomSpin size={64} color={Colors.GRAY_COLOR}/>:  <img className='filesImage' src={imageUrls[filesIdRspsonse?.data?._id]} alt='files image'/>}
                </div>;
            case MediaTypes.AUDIO:
            default:
                return <div>
                <img alt='files audio'/>
            </div>;
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onTab = () => {
        dispatch(filesDeleteThunk(filesId));
    };

    useEffect(() => {
        dispatch(filesIdGetThunk(filesId))
    }, [])

    useEffect(() => {
        if (filesDeleteResponse?.success === true) {
            navigate("/files")
        }
        dispatch(deleteFilesResponse())
    }, [filesDeleteResponse?.success])

    useEffect(() => {
        form.setFieldsValue({
            id: filesIdRspsonse?.data?._id,
            usedObjectType: getFilesUsedObject(filesIdRspsonse?.data?.usedObjectType),
            type: getFilesType(filesIdRspsonse?.data?.type),
            description: filesIdRspsonse?.data?.description,
            path: filesIdRspsonse?.data?.path,
            createDt: filesIdRspsonse?.data?.createDt,

        });
    }, [filesIdRspsonse]);

    return (
        <div className="nativeLanguageScreenMainDiv">
            {wordsIdLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
                <CustomSpin size={64} color="gray" />
            </div> : <div>
                <CustomModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onTab={onTab}
                />
                <Form
                    autoComplete="off"
                    form={form}
                    name="control-hooks"
                >
                    <div className="filesMoreSection">
                        <div>
                            <p className="feedbackTitle uploadTitle">{t("Files details")}</p>
                            <div className="category_row_input_user">
                                <div className='inputLabel'>
                                    <p className="labelTextArea">ID</p>
                                    <CustomAntdInput
                                        disabled={true}
                                        name="id"
                                        placeholder="ID*"
                                        type="text"
                                        min={3}
                                    />
                                </div>
                                <div className="left">
                                    <p className="labelTextArea">Used Object*</p>
                                    <CustomAntdInput
                                        disabled={true}
                                        name="usedObjectType"
                                        placeholder="usedObjectType"
                                        type="text"
                                        min={3}
                                    />
                                </div>
                            </div>
                            <div className="category_row_input_user">
                                <div className='inputLabel'>

                                    <p className="labelTextArea">Type</p>
                                    <CustomAntdInput
                                        disabled={true}
                                        name="type"
                                        placeholder="Type*"
                                        type="text"
                                        min={3}
                                    />
                                </div>
                                <div className="left">
                                    <p className="labelTextArea">Description*</p>
                                    <CustomAntdInput
                                        disabled={true}
                                        name="description"
                                        placeholder="description"
                                        type="text"
                                        min={3}
                                    />
                                </div>
                            </div>
                            <div className="category_row_input_user">
                                <div className='inputLabel'>

                                    <p className="labelTextArea">Path*</p>
                                    <CustomAntdInput
                                        disabled={true}
                                        name="path"
                                        placeholder="path"
                                        type="text"
                                        min={3}
                                    />
                                </div>
                                <div className="left">
                                    <p className="labelTextArea">Create date*</p>
                                    <CustomAntdInput
                                        disabled={true}
                                        name="createDt"
                                        placeholder="createDt*"
                                        type="text"
                                        min={3}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='filesTypesSection'>
                       { getFilesTypeImage(filesIdRspsonse?.data?.type)}
                        </div>

                    </div>
                </Form>
                <div className="deleteButton">
                    <CustomAntdButtonDelete
                        loading={filesDeleteloading}
                        title="Delete"
                        background={Colors.GRAY_COLOR}
                        onClick={() => {
                            showModal();
                        }}
                    />
                </div>
            </div>}
        </div>
    )
}