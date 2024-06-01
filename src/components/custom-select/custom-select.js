import { Select } from "antd";
import { useDispatch } from "react-redux";
import {
  addLanguages,
  addLearnLanguageSelectedLanguages,
} from "../../store/slices";

const { Option } = Select;

export const CustomSelect = ({title,optionsData,width,backgroundColor,data}) => {
  console.log(data,"log option")

  const dispatch = useDispatch();

  const handleChange = (value) => {
    const selectedOption = optionsData.find((option) => option.name === value);
    dispatch(addLanguages(selectedOption));
    dispatch(addLearnLanguageSelectedLanguages(selectedOption));
  };


  return (
    <div>
      <Select
        onChange={handleChange}
        className="customSelect"
        defaultValue={title}
        style={{ width: width, backgroundColor: backgroundColor }}
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
