import React from 'react';
import { Select, Space } from 'antd';
import "./custom-antd-select.css"

const CsutomAntdSelect = ({ optinData, setSelected }) => {

    const handleChange = (value) => {
        setSelected(value)
    }
    return (
       <div className='antd_custom_select'>
         <Space wrap>
            <Select
                onChange={handleChange}
                defaultValue="Role"
                style={{
                    width: 120,
                }}
                allowClear
                options={optinData}
            />
        </Space>
       </div>
    )
}

export default CsutomAntdSelect;