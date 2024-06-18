import { useTranslation } from "react-i18next";
import { CustomAntdButtonDelete, CustomAntdInput } from "../../components";
import { Colors } from "../../assets/colors";
import { useEffect, useState } from "react";
import CustomModal from "../../components/custom-modal/custom-modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteWordsDelete, wordsExelDeleteLoading, wordsExelDeleteResponse, wordsExelDeleteThunk } from "../../store/slices/words/delete-exel-words";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { wordsExelGetIdLoading, wordsExelGetIdResponse, wordsExelGetIdThunk } from "../../store/slices/words/getId-exel-words";

export const WordsProcess = () => {
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wordsProcessId = localStorage.getItem("wordsExel");
    const wordsProcessDeleteLoading = useSelector(wordsExelDeleteLoading);
    const wordsProcessDeleteResponse = useSelector(wordsExelDeleteResponse);
    const wordsIdResponse = useSelector(wordsExelGetIdResponse);
    const wordsIdLoading = useSelector(wordsExelGetIdLoading);

    useEffect(()=>{
        dispatch(wordsExelGetIdThunk(wordsProcessId))
    },[])
    // useEffect(() => {
    //     form.setFieldsValue({
    //       nameEng: nativeLanguageData?.nameEng,
    //       name: nativeLanguageData?.name,
    //       image: nativeLanguageData?.imageFile?.path,
    //     });
    //   }, [nativeLanguageData]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onTab = () => {
        dispatch(wordsExelDeleteThunk(wordsProcessId));
    };

    useEffect(() => {
        if (wordsProcessDeleteResponse?.success === true) {
            navigate("/upload")
        }
        dispatch(deleteWordsDelete())
    }, [wordsProcessDeleteResponse?.success])

    return (
        <div className="nativeLanguageScreenMainDiv">

            <div>
                <CustomModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onTab={onTab}
                />
                <p className="feedbackTitle">{t("Uploading process details")}</p>
                <Form
        autoComplete="off"
        form={form}
        name="control-hooks"
        // onFinish={onFinish}
        // className="formAntd"
      >
                <div className="exelRowSection">
      
                    <div>
                        <div className="category_row_input_user">
                            <CustomAntdInput
                                disabled={true}
                                name="firstName"
                                placeholder="ID*"
                                type="text"
                                min={3}
                            />
                            <div className="left">
                                <CustomAntdInput
                                    disabled={true}
                                    name="lastName"
                                    placeholder="Error Count*"
                                    type="text"
                                    min={3}
                                />
                            </div>
                        </div>
                        <div className="category_row_input_user">
                            <CustomAntdInput
                                disabled={true}
                                name="firstName"
                                placeholder="Type*"
                                type="text"
                                min={3}
                            />
                            <div className="left">
                                <CustomAntdInput
                                    disabled={true}
                                    name="lastName"
                                    placeholder="Total words*"
                                    type="text"
                                    min={3}
                                />
                            </div>
                        </div>
                        <div className="category_row_input_user">
                            <CustomAntdInput
                                disabled={true}
                                name="firstName"
                                placeholder="processed Words*"
                                type="text"
                                min={3}
                            />
                            <div className="left">
                                <CustomAntdInput
                                    disabled={true}
                                    name="lastName"
                                    placeholder="successCount*"
                                    type="text"
                                    min={3}
                                />
                            </div>

                        </div>
                        <div className="category_row_input_user">
                            <CustomAntdInput
                                disabled={true}
                                name="firstName"
                                placeholder="Finish date*"
                                type="text"
                                min={3}
                            />
                            <div className="left">
                                <CustomAntdInput
                                    disabled={true}
                                    name="lastName"
                                    placeholder="Create date*"
                                    type="text"
                                    min={3}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="textAreaSection">
                        <p className="labelTextArea">Error Logs</p>
                        <TextArea disabled rows={4} placeholder="Error Logs" className="textArea" />
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
            </div>
        </div>
    )
}