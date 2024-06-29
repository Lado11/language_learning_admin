import remove_icon from "../../assets/images/remove_icon.png";
import "./error.css"

export const  CustomErrorSection = ({onTab,error}) => {
    return (
        <div className="errorDiv" >
        <p className="error">{error}</p>
        <img src={remove_icon} className="removeIcon" onClick={onTab}/>
      </div>
    )
}