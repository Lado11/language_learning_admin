import React from "react";
import { Button } from "antd";

export const CustomAntdButtonDelete = ({ title, background, onClick }) => {
  return (
    <Button style={{ background: background }} onClick={onClick}>
      <p>{title}</p>
    </Button>
  );
};
