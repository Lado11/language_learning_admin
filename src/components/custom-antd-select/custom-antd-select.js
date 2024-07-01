import React from "react";
import { Form, Select } from "antd";
import "./custom-antd-select.css";

export const CustomAntdSelect = ({
  user,
  rules,
  optinData,
  setSelected,
  defaultValue,
  width,
  color,
  name
}) => {
  const handleChange = (value) => {
    if (!user) {
      const selectedOption = optinData?.find((option) => {
        if (option.value === value) {
          return option._id
        }
      });
      setSelected(selectedOption);
    } else {
      setSelected(value)
    }
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


  return (
    <div className="antd_custom_select_user">
      <Form.Item
        name={name}
        rules={[{ required: rules }]}
      >

        <Select
          placeholder={defaultValue}
          filterOption={filterOption}
          onChange={handleChange}
          style={{
            color: color,
            width: `${width}`
          }}
          allowClear
          options={optinData}
        />
      </Form.Item>
    </div>
  );
};
