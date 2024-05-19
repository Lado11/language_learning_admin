import { Button } from 'antd';
import "./custom-antd-button.css"


export const CustomAntdButton = ({title ,background}) => {
    return(
        <Button  type="primary" htmlType="submit" className='antd-custom-button' style={{background:background}}>
           <p className='antd-custom-button-title'>
           {title}
           </p>
        </Button>
    )
}