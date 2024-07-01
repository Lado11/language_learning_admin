import React from 'react';
import { Switch } from 'antd';

const CsutomSwitch = ({color,check,setCheck ,backSelected}) => {
    const onChange = (checked) => {
      console.log(check,"chekc");
        setCheck(checked)
      };
    return(
        <Switch 
        style={{
           background: backSelected=== true ||  check=== true ? `${color}` : null
        }}
         defaultChecked={backSelected}
         onChange={onChange} 
         />
    )
};
export default CsutomSwitch;