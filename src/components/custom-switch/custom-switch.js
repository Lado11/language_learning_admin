import React, { useState } from 'react';
import { Switch } from 'antd';

const CsutomSwitch = ({color,check,setCheck}) => {
    // const [check,setCheck] = useState(false)
    
    const onChange = (checked) => {
        setCheck(checked)
      };
    return(
        <Switch 
        style={{
           background:  check=== true ? `${color}` : null
        }}
         defaultChecked={false}
         onChange={onChange} 
         />
    )
};
export default CsutomSwitch;