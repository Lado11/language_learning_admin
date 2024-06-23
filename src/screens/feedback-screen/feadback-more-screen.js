import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetIdFeedBackLoading, GetIdFeedBackResponse, feedBackGetIdThunk } from "../../store/slices/feedBack/getId-feadback";
import { CustomSpin } from "../../components";
import { TableHeader } from "../../components/custom-table/components/table-header/table-header";
import { columnsFeedback } from "./feedback-data";
import { FeedbackStatus, FeedbackType, MistakeWordType} from "./feadback-typing"
import wordIcon from "../../assets/images/word.png";
import appIcon from "../../assets/images/app.png";
import generalIcon from "../../assets/images/general.png";
import { Colors } from "../../assets/colors/colors";
import "./feedback-screen-style.css"; 

const FeedbackItem = ({ feedback }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case FeedbackType.WORD_MISTAKE:
        return wordIcon;
      case FeedbackType.APP_ISSUE:
        return appIcon;
      case FeedbackType.GENERAL_FEEDBACK:
        return generalIcon;
      default:
        return generalIcon;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case FeedbackType.WORD_MISTAKE:
        return "Word Mistake";
      case FeedbackType.APP_ISSUE:
        return "App Issue";
      case FeedbackType.GENERAL_FEEDBACK:
        return "General Mistake";
      default:
        return "Undefined Feedback";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case FeedbackStatus.PENDING:
        return "Pending";
      case FeedbackStatus.RESOLVED:
        return "Resolved";
      case FeedbackStatus.CANCELED:
        return "Canceled";
      default:
        return "Undefined Status";
    }
  };

  return (
    <li className="table-row" key={feedback?._id}>
      <div className="col col-1 desc" data-label="Job Id">
        <div className="rowFeadback">
          <img src={getTypeIcon(feedback?.type)} className="iconfeadback" alt="Feedback Icon" />
          <p className="feadbackItem">{getTypeLabel(feedback?.type)}</p>
        </div>
      </div>
      <div className="col col-1 desc" data-label="Job Id">
        <p className="feadbackItem">{getStatusLabel(feedback?.status)}</p>
      </div>
      <div className="col col-1 desc" data-label="Job Id">{feedback?.updateDt}</div>
      <div className="col col-1 desc" data-label="Job Id">{feedback?.createDt}</div>
    </li>
  );
};

const FeedbackUserInfo = ({ feedback }) => {
  const getMistakeTypeLabel = (type) => {
    switch (type) {
      case MistakeWordType.WORD:
        return "(word)";
      case MistakeWordType.TRANSCRIPTION:
        return "(transcription)";
      case MistakeWordType.TRANSLATE:
        return "(translate)";
      case MistakeWordType.AUDIO:
        return "(audio)";
      case    MistakeWordType.IMAGE:
        return "(image)";
      default:
        return "(UNdefined word mistake type)";
    }
  };

  return (
    <div className="feadbackUserInfo">
      <div className="userInfo">
        <img src={appIcon} className="iconfeadback" alt="User Icon" />
        <div>
          <p className="userName">
            {feedback?.user?.firstName} {feedback?.user?.lastName}
          </p>
          <p className="userPhone">{feedback?.user?.phoneNumber}</p>
        </div>
      </div>
      <div className="col col-1 desc" data-label="Job Id">
        <div className="rowFeadBackItem">
          <div className="rowFeadback">
            <img src={wordIcon} className="iconfeadback" alt="Feedback Icon" />
            <p className="feadbackItem">Word Mistake</p>
          </div>
          <p className="feadbackItemType">{getMistakeTypeLabel(feedback?.miastakeWordType)}</p>
        </div>
      </div>
      {feedback?.type === FeedbackType.WORD_MISTAKE && (
        <div>
          <p className="wordsIfno">Words</p>
          <p className="wordsIfnoItem">{feedback?.mistakeWord?.word}</p>
          <p className="wordsIfno">Words ID</p>
          <p className="wordsIfnoItem">{feedback?.mistakeWord?._id}</p>
        </div>
      )}
    </div>
  );
};

export const FeadBackMoreScreen = () => {
  const dispatch = useDispatch();
  const feadbackId = localStorage.getItem("feadback");
  const feadbackIdResponse = useSelector(GetIdFeedBackResponse);
  const feadbackIdLoading = useSelector(GetIdFeedBackLoading);

  useEffect(() => {
    if (feadbackId) {
      dispatch(feedBackGetIdThunk(feadbackId));
    }
  }, [dispatch, feadbackId]);

  return (
    <div className="nativeLanguageScreenMainDiv" style={{ backgroundColor: Colors.WHITE }}>
      {feadbackIdLoading ? (
        <div className="loadingDiv nativeLanguageScreenMainDiv">
          <CustomSpin size={64} color="gray" />
        </div>
      ) : (
        <div>
          <div className="container">
            <ul className="responsive-table">
              <TableHeader data={columnsFeedback} />
              <FeedbackItem feedback={feadbackIdResponse?.data} />
            </ul>
          </div>
          <FeedbackUserInfo feedback={feadbackIdResponse?.data} />
        </div>
      )}
    </div>
  );
};
