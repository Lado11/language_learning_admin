import { useTranslation } from "react-i18next";
import { UploadScreenAddFields } from "../words-screen/components";
import { CustomPagination, CustomSpin } from "../../components";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import { columnsUpload } from "../../data";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wordsExelGetLoading, wordsExelGetResponse, wordsExelGetThunk } from "../../store/slices/words/get-exel-words";
import errorIcon from "../../assets/images/cross (1) 1.png"
import "./upload.css"
import { useNavigate } from "react-router-dom";
export const UplaodScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wordsGetLoading = useSelector(wordsExelGetLoading);
    const wordsGetResponse = useSelector(wordsExelGetResponse);
    const data = {
        skip: 0,
        limit: 5,
    };
    useEffect(() => {
        dispatch(wordsExelGetThunk(data))
    }, [])


    const wordsExel = (val) => {
        localStorage.setItem("wordsExel", val);
        // dispatch(userGetByIdThunk(id));
        navigate("/words-exel-process");
    }

    return (
        <div className="nativeLanguageScreenMainDiv">
         <div>
         <p className="feedbackTitle">{t("Upload from Exel")}</p>
            <UploadScreenAddFields />
            {wordsGetLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
                <CustomSpin size={64} color="gray" />
            </div> : <div class="container">
                <ul class="responsive-table">
                    <TableHeader data={columnsUpload} />
                    {wordsGetResponse?.data?.list?.map((val, index) => {
                        return (
                            <li class="table-row" key={index} onClick={() => {
                                wordsExel(val?._id)
                            }}>
                                <div class="col col-1 desc" data-label="Job Id"> <p className="wordsItem">{(val?._id).slice(0, 10)}</p></div>
                                <div class="col col-1 desc" data-label="Job Id"> <p className="wordsItem">{val?.type === 0 ? "Create" : "Update"}</p></div>
                                <div class="col col-1 desc rowCount" data-label="Job Id">{val?.errorCount != 0 && <img className="errorIcon" src={errorIcon} />} <p className="wordsItem">{val?.errorCount}</p></div>
                                <div class="col col-1 desc rowCount" data-label="Job Id">
                                    <p className="wordsSuccess">{val?.successCount}</p>
                                    <p className="wordsItem">/</p>
                                    <p className="wordsItem">{val?.totalWords}</p>
                                </div>
                                <div class="col col-1 desc" data-label="Job Id">{val?.status === 0 ? <p className="wordsItem">progress</p> : val?.status === 1 ? <p className="wordsSuccess">completed</p> : <p className="wordsError">failed</p>}</div>
                                <div class="col col-1 desc" data-label="Job Id"> <p className="wordsItem">{val?.createDt}</p></div>
                            </li>
                        )
                    })}
                </ul>
            </div>}
         </div>
            <div className="nativeScreenPaginationDiv">
                <CustomPagination length={wordsGetResponse?.data?.total} />
            </div>
        </div>
    )
}