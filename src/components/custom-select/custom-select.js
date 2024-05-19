import { Select } from "antd";

export const CustomSelect = ({title}) => {
    const handleChange = (value) => {};

    const options = [
        {
            value: 'jack',
            label: 'Jack',
        },
        {
            value: 'lucy',
            label: 'Lucy',
        },
        {
            value: 'Yiminghe',
            label: 'yiminghe',
        },
        {
            value: 'disabled',
            label: 'Disabled',
            disabled: true,
        },
    ]
    
    return (
        <div>
            <Select
                defaultValue={title}
                style={{
                width:177
                }}
                onChange={handleChange}
                options={options}
            />
        </div>
    )
}