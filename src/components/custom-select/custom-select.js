import { Select } from "antd";
import { useDispatch } from "react-redux";
import {
  addLanguages,
  getNewArr,
} from "../../store/slices";

const { Option } = Select;

export const CustomSelect = ({ title, optionsData, languagesData }) => {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    const selectedOption = optionsData.find((option) => option.name === value);
    dispatch(addLanguages(selectedOption));
    dispatch(getNewArr(selectedOption));
  };

  return (
    <div>
      <Select
        onChange={handleChange}
        className="customSelect"
        defaultValue={title}
      >
        {optionsData?.map((option) => (
          <Option key={option._id} value={option.name}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};
