import noData from "../../assets/images/noData.png";
import "./custom-no-data.css";

export  const CustomNoData = () => {
    return(
        <div className="noDataSection">
            <img src={noData}/>
        </div>
    )
}