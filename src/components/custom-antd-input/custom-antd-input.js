import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

export const CustomAntdInput = ({ rules, disabled, defaultValue, name, placeholder, min, type, message }) => {
  const { t } = useTranslation();

  const validateMinLength = (_, value) => {
    // Skip validation if the field has a default value
    if(rules === false || rules === undefined){
      return Promise.resolve();
    }

    if (defaultValue && value === defaultValue) {
      return Promise.resolve();
    }

    if (!value || value.length >= min) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(t("INPUT_MIN_LENGTH_ERROR")));
  };

  return (
    <Form.Item
      name={name}
      initialValue={defaultValue}
      rules={[
        {
          type: type,
          message: t(`${message}`),
        },
        {
          required: rules,
        },
        {
          validator: validateMinLength,
        },
      ]}
      normalize={(value) => value.trimStart()}
    >
      <Input disabled={disabled} defaultValue={defaultValue} placeholder={placeholder} />
    </Form.Item>
  );
};
