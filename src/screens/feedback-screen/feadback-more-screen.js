import { Colors } from "chart.js"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetIdFeedBackLoading, GetIdFeedBackResponse, feedBackGetIdThunk } from "../../store/slices/feedBack/getId-feadback";
import { CustomSpin } from "../../components";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import { columnsFeedback } from "../../data";
import word from "../../assets/images/word.png";
import app from "../../assets/images/app.png";
import general from "../../assets/images/general.png"

export const FeadBackMoreScreen = () => {
    const dispatch = useDispatch();
    const feadbackId = localStorage.getItem("feadback");
    const feadbackIdResponse = useSelector(GetIdFeedBackResponse);
    console.log(feadbackIdResponse, "res");
    const feadbackIdLoading = useSelector(GetIdFeedBackLoading);

    useEffect(() => {
        dispatch(feedBackGetIdThunk(feadbackId));
    }, [])

    return (
        <div
            className="nativeLanguageScreenMainDiv"
            style={{ backgroundColor: Colors.WHITE }}
        >

         <div>
         {feadbackIdLoading ? <div className="loadingDiv nativeLanguageScreenMainDiv">
                <CustomSpin size={64} color="gray" />
            </div> :<div> <div class="container">
                <ul class="responsive-table">
                    <TableHeader data={columnsFeedback} />

                    <li class="table-row" key={feadbackIdResponse?.data?._id}>
                        <div class="col col-1 desc" data-label="Job Id">{feadbackIdResponse?.data?.type === 0 ?
                            <div className="rowFeadback">
                                <img src={word} className="iconfeadback" />
                                <p className="feadbackItem">Word Mistake</p>
                            </div>
                            : feadbackIdResponse?.data?.type === 1 ?
                                <div className="rowFeadback">
                                    <img src={app} className="iconfeadback" />
                                    <p className="feadbackItem">App Issue</p>
                                </div>
                                :
                                <div className="rowFeadback">
                                    <img src={general} className="iconfeadback" />
                                    <p className="feadbackItem">General Mistake</p>
                                </div>
                        }</div>
                        <div class="col col-1 desc" data-label="Job Id">
                            {feadbackIdResponse?.data?.status === 0 ?
                                <p className="feadbackItem">Pending</p> :
                                feadbackIdResponse?.data?.status === 1 ?
                                    <p className="feadbackItem">Resolved</p> :
                                    <p className="feadbackItem">Canceled</p>}</div>
                        <div class="col col-1 desc" data-label="Job Id">{feadbackIdResponse?.data?.updateDt}</div>
                        <div class="col col-1 desc" data-label="Job Id">{feadbackIdResponse?.data?.createDt}</div>
                    </li>
                </ul>
            </div>
            <div className="feadbackUserInfo">
                <div className="userInfo">
                    <img src={app} className="iconfeadback" />
                    <div>
                        <p className="userName">
                            {feadbackIdResponse?.data?.user?.firstName} {feadbackIdResponse?.data?.user?.lastName}
                        </p>
                        <p className="userPhone">
                            {feadbackIdResponse?.data?.user?.phoneNumber}
                        </p>
                    </div>
                </div>
                <div class="col col-1 desc" data-label="Job Id">{feadbackIdResponse?.data?.type === 0 ?
                    <div className="rowFeadBackItem">
                        <div className="rowFeadback">
                            <img src={word} className="iconfeadback" />
                            <p className="feadbackItem">Word Mistake</p>
                        </div>
                        {feadbackIdResponse?.data?.miastakeWordType === 0 ? <p className="feadbackItemType">(word)</p> :
                            feadbackIdResponse?.data?.miastakeWordType === 1 ? <p className="feadbackItemType">(transcription)</p> :
                                feadbackIdResponse?.data?.miastakeWordType === 2 ? <p className="feadbackItemType">(translate)</p> :
                                    feadbackIdResponse?.data?.miastakeWordType === 3 ? <p className="feadbackItemType">(audio)</p> :
                                        <p className="feadbackItemType">(image)</p>
                        }</div>

                    : feadbackIdResponse?.data?.type === 1 ?
                        <div className="rowFeadback">
                            <img src={app} className="iconfeadback" />
                            <p className="feadbackItem">App Issue</p>
                        </div>
                        :
                        <div className="rowFeadback">
                            <img src={general} className="iconfeadback" />
                            <p className="feadbackItem">General Mistake</p>
                        </div>
                }</div>
                {feadbackIdResponse?.data?.type === 0 && <div>
                    <p className="wordsIfno">Words</p>
                    <p className="wordsIfnoItem">
                        {feadbackIdResponse?.data?.mistakeWord?.word}
                    </p>
                    <p className="wordsIfno">Words ID</p>
                    <p className="wordsIfnoItem">
                        {feadbackIdResponse?.data?.mistakeWord?._id}
                    </p>
                </div>}

            </div>
            </div>}
         </div>
        </div>
    )
}