import { Radio, Select } from "antd"
import { Option } from "antd/es/mentions";
import "./radio-notification.css"

export const SelectNotification = ({ data, defaultValue, onChange, value }) => {

    return (
        <Radio.Group onChange={onChange} value={value}>
            <Select
                className="customSelectNoth"
                defaultValue={defaultValue}
                style={{ width: "420px", backgroundColor: "white" }}
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