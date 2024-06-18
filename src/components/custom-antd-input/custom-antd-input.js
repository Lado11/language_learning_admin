import { Form, Input } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const CustomAntdInput = ({rules, disabled,defaultValue,name, placeholder,min,type,message }) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name={name}
      rules={[
        {
          type:type,
          message: t(`${message}`),
        },
        {
        
          required: rules,
        },
        {
          min: min,
          message: t("INPUT_MIN_LENGTH_ERROR"),
        },
      ]}
      normalize={(value) => value.trimStart()}
    >
      <Input disabled={disabled}  defaultValue={defaultValue}  placeholder={placeholder} />
    </Form.Item>
  );
};
