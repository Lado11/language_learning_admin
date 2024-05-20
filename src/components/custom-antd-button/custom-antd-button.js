import { Button } from "antd";
import "./custom-antd-button.css";

export const CustomAntdButton = ({ title, background }) => {
  return (
    <Button type="primary" htmlType="submit" style={{ background: background }}>
      <p>{title}</p>
    </Button>
  );
};
