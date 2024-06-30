import { useTranslation } from "react-i18next";
import { UploadScreenAddFields } from "../words-screen/components";
import { CustomNoData, CustomPagination, CustomSpin } from "../../components";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import { UploadStatus } from "./upload-typing";
import { tableHeaderData } from "./upload-data";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wordsExelGetLoading, wordsExelGetResponse, wordsExelGetThunk } from "../../store/slices/words/get-exel-words";
import errorIcon from "../../assets/images/cross (1) 1.png"
import "./upload.css"
import { useNavigate } from "react-router-dom";
import { Popover, Radio } from 'antd';
import filterIcon from "../../assets/images/filterIcon.png"
import { statusUpload, typeUpload } from "./upload-data";
import { UploadType } from "./upload-typing";
import { useCallback } from "react";
import { ConstPagiantion } from "../../constants/const-pagination";
import { listItemCountForShow } from "../../constants/constants";




const UploadFilterPopover = ({
    currentType,
    currentStatus,
    onTypeChange,
    onStatusChange,
    onClearFilter,
    onApplyFilter,
    isPopoverOpen,
    handlePopoverOpenChange,
}) => {
    const { t } = useTranslation();

    return (
        <Popover
            placement="bottomLeft"
            content={
                <div className="filterSection">
                    <p className="popeverTitle">{t("Status")}</p>
                    <Radio.Group onChange={onStatusChange} value={currentStatus}>
                        <div className="statusGroup">
                            {statusUpload?.map((option) => (
                                <Radio key={option.key} className="radio" value={option.key}>
                                    <p className="optiontitle">{option.title}</p>
                                </Radio>
                            ))}
                        </div>
                    </Radio.Group>
                    <hr className="poepverHr" />
                    <p className="popeverTitle">{t("Type")}</p>
                    <Radio.Group onChange={onTypeChange} value={currentType}>
                        <div className="statusGroup">
                            {typeUpload?.map((option) => (
                                <Radio key={option.key} className="radio" value={option.key}>
                                    <p className="optiontitle">{option.title}</p>
                                </Radio>
                            ))}
                        </div>
                    </Radio.Group>
                    <div className="buttonSection">
                        <button onClick={onClearFilter} className="button">
                            {t("Clear")}
                        </button>
                        <button onClick={onApplyFilter} className="buttonApply">
                            {t("Apply")}
                        </button>
                    </div>
                </div>}
            trigger="click"
            open={isPopoverOpen}
            onOpenChange={handlePopoverOpenChange}
        >
<div className="fiterlIconSection">
<img src={filterIcon} className="popeverOpenImg" alt="Filter Icon" />
    
    </div>     
       </Popover>
    );
};


const UploadListItem = ({ upload, onClick }) => {

    const getUploadTypeLabel = (type) => {
        switch (type) {
            case UploadType.CREATE:
                return "Create";
            case UploadType.UPDATE:
            default:
                return "Update";
        }
    };

    const getUploadStatusLabel = (status) => {
        switch (status) {
            case UploadStatus.PROCESSED:
                return "Progress";
            case UploadStatus.SUCCESS:
                return "Completed";
            case UploadStatus.ERROR:
            default:
                return "Failed";
        }
    };

    return (
        <li className="table-row" onClick={onClick}>
            <div className="col col-1 desc" data-label="Job Id"> <p className="wordsItem">{(upload?._id).slice(0, 10)}</p></div>
            <div className="col col-1 desc" data-label="Job Id"> <p className="wordsItem">{getUploadTypeLabel(upload?.type)}</p></div>
            <div className="col col-1 desc rowCount" data-label="Job Id">{upload?.errorCount != 0 && <img className="errorIcon" src={errorIcon} />} <p className="wordsItem">{upload?.errorCount}</p></div>
            <div className="col col-1 desc rowCount" data-label="Job Id">
                <p className="wordsSuccess">{upload?.successCount}</p>
                <p className="wordsItem">/</p>
                <p className="wordsItem">{upload?.totalWords}</p>
            </div>
            <div className="col col-1 desc" data-label="Job Id">
                {getUploadStatusLabel(upload?.status)}
            </div>
            <div className="col col-1 desc" data-label="Job Id"> <p className="wordsItem">{upload?.createDt}</p></div>
        </li>
    );
};


export const UplaodScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wordsGetLoading = useSelector(wordsExelGetLoading);
    const wordsGetResponse = useSelector(wordsExelGetResponse);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [uploadStatus, setUploadStatus] = useState();
    const [filterStatus, setFiltterStatus] = useState(undefined);
    const [filterUploadType, setFilterUploadType] = useState();

    const wordsExel = (val) => {
        // localStorage.setItem("wordsExel", val);
        // dispatch(userGetByIdThunk(id));
        navigate(`/upload/${val}`);
    }

    const onChangePagination = (current) => {
        const skip =( current -1 ) * listItemCountForShow;   
        dispatch(wordsExelGetThunk(ConstPagiantion(skip,listItemCountForShow)))
    };

    const handlePopoverOpenChange = (newOpen) => {
        setIsPopoverOpen(newOpen);
    };

    const handleTypeChange = (e) => {
        setFilterUploadType(e.target.value);

    };

    const handleStatusChange = (e) => {
        setUploadStatus(e.target.value);
        setFiltterStatus(e.target.value !== UploadStatus.All ? e.target.value : undefined);

    };

    const fetchData = useCallback(() => {
        dispatch(wordsExelGetThunk(ConstPagiantion(0,listItemCountForShow)))
    }, [dispatch]);

    const fetchFilteredData = useCallback(() => {
        const filterData = {
            skip: 0,
            limit: listItemCountForShow,
            type: filterUploadType,
            status: filterStatus,
        };
        dispatch(wordsExelGetThunk(filterData));
    }, [dispatch, filterUploadType, filterStatus]);

    const handleClearFilter = () => {
        setFilterUploadType("");
        setUploadStatus("");
        setFiltterStatus(undefined);
        fetchData()
    };

    const handleApplyFilter = () => {
        fetchFilteredData();
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <div className="nativeLanguageScreenMainDiv">
            <div>
                <UploadScreenAddFields />
                <p className="feedbackTitle">{t("Upload from Exel")}</p>
                <UploadFilterPopover
                    currentType={filterUploadType}
                    currentStatus={uploadStatus}
                    onTypeChange={handleTypeChange}
                    onStatusChange={handleStatusChange}
                    onClearFilter={handleClearFilter}
                    onApplyFilter={handleApplyFilter}
                    isPopoverOpen={isPopoverOpen}
                    handlePopoverOpenChange={handlePopoverOpenChange}
                />
                <div className="container">
                    <ul className="responsive-table">
                        <TableHeader data={tableHeaderData} />
                        {wordsGetLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
                            <CustomSpin size={64} color="gray" />
                        </div> :
                            <>
                                {!wordsGetLoading && !wordsGetResponse?.data?.list?.length ? <CustomNoData /> :
                                    wordsGetResponse?.data?.list?.map((upload, index) => {
                                        return (
                                            <UploadListItem
                                                key={index}
                                                upload={upload}
                                                onClick={() => {
                                                    wordsExel(upload?._id)
                                                }}
                                            />
                                        )
                                    })}
                            </>}
                    </ul>
                </div>
            </div>
            {!wordsGetLoading && !wordsGetResponse?.data?.list?.length ? null : <div className="nativeScreenPaginationDiv">
                <CustomPagination length={wordsGetResponse?.data?.total} pageLength={listItemCountForShow} onChange={onChangePagination} />
            </div>}
        </div>
    )
}