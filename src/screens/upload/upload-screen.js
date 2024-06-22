import { useTranslation } from "react-i18next";
import { UploadScreenAddFields } from "../words-screen/components";
import { CustomNoData, CustomPagination, CustomSpin } from "../../components";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import { UploadStatus, columnsUpload, statusUpload, typeGroup } from "../../data";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wordsExelGetLoading, wordsExelGetResponse, wordsExelGetThunk } from "../../store/slices/words/get-exel-words";
import errorIcon from "../../assets/images/cross (1) 1.png"
import "./upload.css"
import { useNavigate } from "react-router-dom";
import { Popover, Radio } from 'antd';
import filterIcon from "../../assets/images/filterIcon.png"


export const UplaodScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wordsGetLoading = useSelector(wordsExelGetLoading);
    const wordsGetResponse = useSelector(wordsExelGetResponse);
    const [open, setOpen] = useState(false);
    const [uploadStatus, setUploadStatus] = useState();
    const [filtterStatus, setFiltterStatus] = useState(undefined);
    const [filterUploadType, setFilterUploadType] = useState();

    const data = {
        skip: 0,
        limit: 5,
    };

    const filterData = {
        skip: 0,
        limit: 6,
        type: filterUploadType,
        status: filtterStatus,
    }

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    useEffect(() => {
        dispatch(wordsExelGetThunk(data))
    }, [])

    const onChange = (e) => {
        setUploadStatus(e.target.value);
        if (e.target.value !== UploadStatus.All) {
            setFiltterStatus(e.target.value)
        } else {
            setFiltterStatus(undefined)
        }
    };

    const onChangeType = (e) => {
        setFilterUploadType(e.target.value);
    };

    const clearFilter = () => {
        setUploadStatus("")
        setFilterUploadType("")
        dispatch(wordsExelGetThunk(data))
    }

    const sendFilter = () => {
        dispatch(wordsExelGetThunk(filterData))
    }

    const wordsExel = (val) => {
        localStorage.setItem("wordsExel", val);
        // dispatch(userGetByIdThunk(id));
        navigate(`/upload/${val}`);
    }



    return (
        <div className="nativeLanguageScreenMainDiv">
            <div>
                <UploadScreenAddFields />
                <p className="feedbackTitle">{t("Upload from Exel")}</p>
                <Popover
                    placement="bottomLeft"
                    content={<div className="filterSection">
                        <p className="popeverTitle">Status</p>
                        <Radio.Group onChange={onChange} value={uploadStatus}>
                            <div className="statusGroup">
                                {statusUpload?.map((option) => {
                                    return <Radio key={option?._id} className="radio" value={option.key}><p className="optiontitle">{option.title}</p></Radio>
                                })}
                            </div>
                        </Radio.Group>
                        <hr className="poepverHr" />
                        <p className="popeverTitle">Type</p>

                        <Radio.Group onChange={onChangeType} value={filterUploadType}>
                            <div className="statusGroup">
                                {typeGroup?.map((option) => {
                                    return <Radio key={option?._id} className="radio" value={option.key}><p className="optiontitle">{option.title}</p></Radio>
                                })}
                            </div>

                        </Radio.Group>
                        <div className="buttonSection">
                            <button onClick={clearFilter} className="button">Clear</button>
                            <button onClick={sendFilter} className="buttonApply">Apply</button>
                        </div>

                    </div>}
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <img src={filterIcon} className="popeverOpenImg" />
                </Popover>
                <div className="container">
                    <ul className="responsive-table">
                        <TableHeader data={columnsUpload} />
                        {wordsGetLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
                            <CustomSpin size={64} color="gray" />
                        </div> :
                            <>
                                {!wordsGetLoading && !wordsGetResponse?.data?.list?.length ? <CustomNoData /> : wordsGetResponse?.data?.list?.map((val, index) => {
                                    return (
                                        <li className="table-row" key={index} onClick={() => {
                                            wordsExel(val?._id)
                                        }}>
                                            <div className="col col-1 desc" data-label="Job Id"> <p className="wordsItem">{(val?._id).slice(0, 10)}</p></div>
                                            <div className="col col-1 desc" data-label="Job Id"> <p className="wordsItem">{val?.type === 0 ? "Create" : "Update"}</p></div>
                                            <div className="col col-1 desc rowCount" data-label="Job Id">{val?.errorCount != 0 && <img className="errorIcon" src={errorIcon} />} <p className="wordsItem">{val?.errorCount}</p></div>
                                            <div className="col col-1 desc rowCount" data-label="Job Id">
                                                <p className="wordsSuccess">{val?.successCount}</p>
                                                <p className="wordsItem">/</p>
                                                <p className="wordsItem">{val?.totalWords}</p>
                                            </div>
                                            <div className="col col-1 desc" data-label="Job Id">{val?.status === 0 ? <p className="wordsItem">progress</p> : val?.status === 1 ? <p className="wordsSuccess">completed</p> : <p className="wordsError">failed</p>}</div>
                                            <div className="col col-1 desc" data-label="Job Id"> <p className="wordsItem">{val?.createDt}</p></div>
                                        </li>
                                    )
                                })}
                            </>
                        }
                    </ul>
                </div>
            </div>
            {!wordsGetLoading && !wordsGetResponse?.data?.list?.length ? null : <div className="nativeScreenPaginationDiv">
                <CustomPagination length={wordsGetResponse?.data?.total} pageLength={12} />
            </div>}
        </div>
    )
}