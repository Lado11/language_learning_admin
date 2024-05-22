import React from "react";
import { Button, message, Space } from "antd";

export const Success = ({ messageApi }) => {
  messageApi.open({
    type: "success",
    content: "This is a success message",
  });
};

export const Error = ({ messageApi, messageError }) => {
  messageApi.open({
    type: "error",
    content: messageError,
  });
};
