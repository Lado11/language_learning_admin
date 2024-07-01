import React from 'react';
import { Switch } from 'antd';

const CsutomSwitch = ({color,check,setCheck ,backSelected ,onChange}) => {

    return(
        <Switch 
        style={{
           background: ( check === true ? `${color}` : null) && ( backSelected === true ? `${color}` : null )
        }}
         defaultChecked={backSelected}
         onChange={onChange} 
         />
    )
};
export default CsutomSwitch;