import React from "react";
import { Form, Select, Space } from "antd";
import "./custom-antd-select.css";

export const CustomAntdSelect = ({
  optinData,
  setSelected,
  defaultValue,
  width,
  color,
  name
}) => {
  const handleChange = (value) => {
    setSelected(value);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div className="antd_custom_select_user">
      <Form.Item
      name={name}>
        <Select
        showSearch
        onSearch={onSearch}
        filterOption={filterOption}
          onChange={handleChange}
          defaultValue={defaultValue}
          style={{
            color: color,
            width:`${width}`
          }}
          allowClear
          options={optinData}
        />
      </Form.Item>
    </div>
  );
};
