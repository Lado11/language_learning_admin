import React from 'react';
import { Switch } from 'antd';

const CsutomSwitch = ({color,check,backSelected ,onChange}) => {
console.log(check,"check");
    return(
        <Switch 
     
        style={{
           background: ( check ? check : backSelected)  || check === true ? `${color}` : null
        }}
         defaultChecked={backSelected}
         onChange={onChange} 
         />
    )
};
export default CsutomSwitch;