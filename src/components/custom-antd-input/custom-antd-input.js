import { Button, Form, Input,  Upload,} from 'antd';


export const CustomAntdInput = ({name,placeholder}) => {
    return (
        <Form.Item
            name={name}
            rules={[
                {
                    required: true,
                },
                {
                    min: 3,
                    message: "min length 3!",
                  },
            ]}
            normalize={(value, prevVal, prevVals) => value.trim()}
        >
            <Input placeholder={placeholder}/>
        </Form.Item>
    )
}