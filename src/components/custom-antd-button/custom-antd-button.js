import { Button } from "antd";
import "./custom-antd-button.css";
import { CustomSpin } from "../custom-spin/custom-spin";
export const CustomAntdButton = ({ title, background, loading ,onClick}) => {
  return (
    <Button type="primary" onClick={onClick} htmlType="submit" style={{ background: background }}>
      {loading ? (
        <div className="loadingButtonDiv">
          <p>{title}</p>
          <CustomSpin color="white" size={24} />
        </div>
      ) : (
        <p>{title}</p>
      )}
    </Button>
  );
};
