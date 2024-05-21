import React from "react";
import { Button } from "antd";
import { CustomSpin } from "../custom-spin/custom-spin";

export const CustomAntdButtonDelete = ({ title, background, onClick, loading }) => {
  return (
    <Button style={{ background: background }} onClick={onClick}>
      {loading ? <div className="loadingDiv">
        <p >{title}</p>
        <CustomSpin color="black" size={24} />
      </div> : <p>{title}</p>}
    </Button>
  );
};
