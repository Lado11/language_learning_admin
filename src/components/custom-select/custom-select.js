import { Form, Select } from "antd";
import { useDispatch } from "react-redux";
import {
  addLanguages,
  addLearnLanguageSelectedLanguages,
} from "../../store/slices";

const { Option } = Select;

export const CustomSelect = ({ title, optionsData, width, backgroundColor, data, name, rules }) => {
  const dispatch = useDispatch();
  const handleChange = (value) => {
    const selectedOption = optionsData?.find((option) => option?.name === value);
    dispatch(addLanguages(selectedOption));
    dispatch(addLearnLanguageSelectedLanguages(selectedOption ));
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  return (
    <div>
      <Form.Item
        name={name}
        rules={[
          {
            required: rules,
          }
        ]}   
        >
        <Select
         onSearch={onSearch}
          onChange={handleChange}
          className="customSelect"
          placeholder={title}
          // defaultValue={title}
          style={{ width: width, backgroundColor: backgroundColor }}
        >
         
          {data?.map((option) => (

            <Option key={option?._id} value={option?.name}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};
