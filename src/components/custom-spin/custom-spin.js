import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const CustomSpin = ({color,size}) => {
    return(
        <Spin
        className="titleButton"
          indicator={
            <LoadingOutlined
              style={{
                color:color,
                fontSize: size,
              }}
              spin
            />
          }
        />
    )
}