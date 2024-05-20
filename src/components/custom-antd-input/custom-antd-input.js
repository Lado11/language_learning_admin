import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

export const CustomAntdInput = ({ name, placeholder }) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
        },
        {
          min: 3,
          message: t("INPUT_MIN_LENGTH_ERROR"),
        },
      ]}
      normalize={(value) => value.trim()}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};
