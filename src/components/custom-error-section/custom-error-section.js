import remove_icon from "../../assets/images/remove_icon.png";


export const  CustomErrorSection = ({onTab,error}) => {
    return (
        <div className="errorDiv" >
        <img src={remove_icon} className="removeIcon" onClick={onTab}/>
        <p>{error}</p>
      </div>
    )
}