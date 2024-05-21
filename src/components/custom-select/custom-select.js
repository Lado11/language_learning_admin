import { Select } from "antd";
import { customSelectOptions } from "../../data/custom-select-data";

export const CustomSelect = ({
  title,
  optionsData,
  setLanguage,
  languages,
}) => {
  const handleChange = (value) => {
    setLanguage([
      ...languages,
      {
        id: value.id,
        label: value,
      },
    ]);
  };

  return (
    <div>
      <Select
        defaultValue={title}
        className="customSelect"
        onChange={handleChange}
        options={optionsData}
      />
    </div>
  );
};
