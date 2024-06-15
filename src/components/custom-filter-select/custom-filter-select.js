import { Radio } from "antd"
import { EmailSelect, dataUser, dataUserSub, emailSelect, phoneSelect } from "../../data/radio-data"
import { SelectNotification } from "../../screens/notification-screen/components/select-notification"
import { Option } from "antd/es/mentions"
import { useState } from "react"
import "./custom-filter-select.css"

export const CustomFilterSeelct = () => {
    const handleChange = (value) => {
        // const selectedOption = optionsData.find((option) => option.name === value);
        // dispatch(addLanguages(selectedOption));
        // dispatch(addLearnLanguageSelectedLanguages(selectedOption));
    };


    const [value, setValue] = useState(0);
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);

    const onChange = (e) => {
        setValue(e.target.value);
    };
    const onChange1 = (e) => {
        setValue1(e.target.value);
    };
    const onChange2 = (e) => {
        setValue2(e.target.value);
    };


    return (
        <div>
            <div className="radioSelctDuiv">
            <Radio.Group onChange={onChange} value={value}>
                {dataUserSub?.map((option) => {
                    return (
                       <div>
                        {option.header &&<p>{option.header}</p>}
                        {option.title &&   <Radio value={option.key}>{option.title}</Radio>}

                       </div>
                    )
                }
                )}
            </Radio.Group>
            <Radio.Group onChange={onChange1} value={value1}>
                {phoneSelect?.map((option) => {
                    return (
                       <div>
                        <p>{option.header}</p>
                             {option.title &&   <Radio value={option.key}>{option.title}</Radio>}

                       </div>
                    )
                }
                )}
            </Radio.Group>
            <Radio.Group onChange={onChange2} value={value2}>
                {emailSelect?.map((option) => {
                    return (
                       <div>
                        <p>{option.header}</p>
                             {option.title &&   <Radio value={option.key}>{option.title}</Radio>}

                       </div>
                    )
                }
                )}
            </Radio.Group>
            </div>
            <div>
                <button onClick={() => { }} className="clear">
                    Clear
                </button>
                <button onClick={() => { }} className="apply">
                    Apply
                </button>
            </div>
        </div>
    )
}