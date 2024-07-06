import React from 'react';
import { Switch } from 'antd';

const CsutomSwitch = ({color,check,backSelected ,onChange}) => {

    return(
        <Switch 
            style={{
            background: backSelected === true && check === undefined || check === true  ? `${color}` : null
            }}
            defaultChecked={backSelected}
            onChange={onChange} 
         />
    )
};
export default CsutomSwitch;