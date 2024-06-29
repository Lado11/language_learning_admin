import logoVoice from "../../assets/images/Vector (4).png";
import rectangle from "../../assets/images/Rectangle 663.png";
import "./index.css";

export const CustomUploadElement = ({ title }) => {
    return (
        <div className="voiceUploadLanguage">
         <div className="uploadElemntRow">
         <p className="titleVoiceUpload">
                {title}
            </p>
            <img src={logoVoice} className="uploadIcon" />
         </div>
            <img src={rectangle} className="reactangleIcon"/>
        </div>
    )
}