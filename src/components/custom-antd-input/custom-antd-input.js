import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

export const CustomAntdInput = ({ name, placeholder,min,type,message }) => {
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
        
          required: true,
        },
        {
          min: min,
          message: t("INPUT_MIN_LENGTH_ERROR"),
        },
      ]}
      normalize={(value) => value.trimStart()}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};
