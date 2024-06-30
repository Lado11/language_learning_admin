
import React from 'react';
import { useTranslation } from "react-i18next";
import { CustomAntdButtonDelete, CustomAntdInput, CustomSpin } from "../../components";
import { Colors } from "../../assets/colors";
import { useEffect, useState } from "react";
import CustomModal from "../../components/custom-modal/custom-modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteWordsDelete, wordsExelDeleteLoading, wordsExelDeleteResponse } from "../../store/slices/words/delete-exel-words";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "antd";
import { wordsExelGetIdLoading, wordsExelGetIdResponse, wordsExelGetIdThunk } from "../../store/slices/words/getId-exel-words";
import { filesDeleteThunk } from '../../store/slices/files/delete-files';

export const FilesMore = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    const filesId = location?.pathname.slice(12);
    const wordsProcessDeleteLoading = useSelector(wordsExelDeleteLoading);
    const wordsProcessDeleteResponse = useSelector(wordsExelDeleteResponse);
    const wordsIdResponse = useSelector(wordsExelGetIdResponse);
    const wordsIdLoading = useSelector(wordsExelGetIdLoading);

    useEffect(() => {
        dispatch(wordsExelGetIdThunk(filesId))
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            id: wordsIdResponse?.data?._id,
            errorCount: wordsIdResponse?.data?.errorCount,
            type: wordsIdResponse?.data?.type === 0 ? "create" : "update",
            totalWords: wordsIdResponse?.data?.totalWords,
            processedWords: wordsIdResponse?.data?.processedWords,
            successCount: wordsIdResponse?.data?.successCount,
            finishDt: wordsIdResponse?.data?.finishDt,
            createDt: wordsIdResponse?.data?.createDt,
            errorLogs: wordsIdResponse?.data?.errorLogs?.map((item) => {
                return item
            })
        });
    }, [wordsIdResponse]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onTab = () => {
        dispatch(filesDeleteThunk(filesId));
    };

    useEffect(() => {
        if (wordsProcessDeleteResponse?.success === true) {
            navigate("/upload")
        }
        dispatch(deleteWordsDelete())
    }, [wordsProcessDeleteResponse?.success])

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
                    <div className="exelRowSection">
                        <div>
                            <p className="feedbackTitle uploadTitle">{t("Files details")}</p>
                            <div className="category_row_input_user">
                            <div className='inputLabel'>

                                <p  className="labelTextArea">ID</p>
                                <CustomAntdInput
                                    disabled={true}
                                    name="id"
                                    placeholder="ID*"
                                    type="text"
                                    min={3}
                                />
                                </div>
                                <div className="left">
                                    <p  className="labelTextArea">Used Object*</p>
                                    <CustomAntdInput
                                        disabled={true}
                                        name="errorCount"
                                        placeholder="Error Count*"
                                        type="text"
                                        min={3}
                                    />
                                </div>
                            </div>
                            <div className="category_row_input_user">
                            <div className='inputLabel'>

                            <p  className="labelTextArea">Type</p>
                                <CustomAntdInput
                                    disabled={true}
                                    name="type"
                                    placeholder="Type*"
                                    type="text"
                                    min={3}
                                />
                                </div>
                                <div className="left">
                                <p  className="labelTextArea">Description*</p>
                                    <CustomAntdInput
                                        disabled={true}
                                        name="totalWords"
                                        placeholder="Total words*"
                                        type="text"
                                        min={3}
                                    />
                                </div>
                            </div>
                            <div className="category_row_input_user">
                            <div className='inputLabel'>

                            <p  className="labelTextArea">Path*</p>
                                <CustomAntdInput
                                    disabled={true}
                                    name="processedWords"
                                    placeholder="processed Words*"
                                    type="text"
                                    min={3}
                                />
                                </div>
                                <div className="left">
                                <p  className="labelTextArea">Create date*</p>
                                    <CustomAntdInput
                                        disabled={true}
                                        name="successCount"
                                        placeholder="successCount*"
                                        type="text"
                                        min={3}
                                    />
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </Form>
                <div className="deleteButton">
                    <CustomAntdButtonDelete
                        loading={wordsProcessDeleteLoading}
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