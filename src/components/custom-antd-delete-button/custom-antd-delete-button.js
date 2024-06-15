import React from "react";
import { Button } from "antd";
import { CustomSpin } from "../custom-spin/custom-spin";
import { Colors } from "../../assets/colors";

export const CustomAntdButtonDelete = ({ title, background, onClick, loading }) => {
  return (
    <Button style={{ background: background }} onClick={onClick}>
      {loading ? <div className="loadingButtonDiv">
        <p style={{color:Colors.WHITE}}>{title}</p>
        <CustomSpin color="white" size={24} />
      </div> : <p  style={{color:Colors.WHITE}}>{title}</p>}
    </Button>
  );
};
