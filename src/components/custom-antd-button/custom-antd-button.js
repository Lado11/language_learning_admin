import { Button } from "antd";
import "./custom-antd-button.css";
import { CustomSpin } from "../custom-spin/custom-spin";
export const CustomAntdButton = ({ title, background, loading }) => {
  return (
    <Button type="primary" htmlType="submit" style={{ background: background }}>

      {loading ? <div className="loadingDiv">

        <p >{title}</p>
        <CustomSpin color="white" size={24}/>
      </div> : <p>{title}</p>}
    </Button>
  );
};
