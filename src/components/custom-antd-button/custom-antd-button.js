import { Button } from "antd";
import "./custom-antd-button.css";
import { CustomSpin } from "../custom-spin/custom-spin";
export const CustomAntdButton = ({ title, background, loading ,onClick, icon}) => {
  return (
    <Button type="primary" onClick={onClick} htmlType="submit" style={{ background: background }}>
      {loading ? (
        <div className="loadingButtonDiv">
          <p>{title}</p>
          {icon ? <img src={icon} alt="icon" className="iconDirection"/> : null}
          <CustomSpin color="white" size={24} />
        </div>
      ) : (
       <div className="buttonSectionRow">
         <p>{title}</p>
        {icon ? <img src={icon} alt="icon" className="iconDirection"/> : null}
       </div>

      )}
    </Button>
  );
};
