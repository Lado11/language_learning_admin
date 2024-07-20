import { Radio, Select } from "antd"
import { Option } from "antd/es/mentions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./radio-notification.css"

export const SelectNotification = ({data,defaultValue,onChange,value}) => {
    const dispatch = useDispatch();

    const handleChange = (value) => {
        console.log(value,"valuesss88");
        // const selectedOption = optionsData.find((option) => option.name === value);
        // dispatch(addLanguages(selectedOption));
        // dispatch(addLearnLanguageSelectedLanguages(selectedOption));
    };

    
    // const [value, setValue] = useState(1);
    // const onChange = (e) => {
    //     console.log(e.target.value,
    //         "valuesssss"
    //     );
    //     setValue(e.target.value);
    // };
 

    return (
        <Radio.Group onChange={onChange} value={value}>
            <Select
                onChange={handleChange}
                className="customSelectNoth"
                defaultValue={defaultValue}
                style={{ width: "420px" ,backgroundColor:"white"}}
            >
                {data?.map((option) => {
                    return <Option key={option.key} value={option.title}>
                        <Radio value={option.key}>{option.title}</Radio>
                    </Option>
                }
                )}
            </Select>
        </Radio.Group>

    )
}