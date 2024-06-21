import React from "react";
import { Form, Select, Space } from "antd";
import "./custom-antd-select.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import { getLearnLanguagesLoading, learningLanguagesThunk } from "../../store/slices";
import { useDispatch, useSelector } from "react-redux";
export const CustomAntdSelect = ({
  user,
  rules,
  optinData,
  setSelected,
  defaultValue,
  width,
  color,
  name
}) => {
  const handleChange = (value) => {
    if (!user) {
      const selectedOption = optinData?.find((option) => {
        if (option.value === value) {
          return option._id
        }
      });
      setSelected(selectedOption);
    } else {
      setSelected(value)
    }
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const dispatch = useDispatch()
  const loading = useSelector(getLearnLanguagesLoading)


  return (
    <div className="antd_custom_select_user">
      {/* <InfiniteScroll
                dataLength={optinData?.length  ? optinData?.length: 0}
                next={() => { dispatch(learningLanguagesThunk({}))}}
                hasMore={optinData?.meta?.hasNextPage}
                loader={loading}
                

                scrollableTarget="scrollableDiv"
            > */}
      <Form.Item
        name={name}
        rules={[{ required: rules }]}
      >

        <Select
        placeholder={defaultValue}
          showSearch
          onSearch={onSearch}
          filterOption={filterOption}
          onChange={handleChange}
          // defaultValue={defaultValue}
          style={{
            color: color,
            width: `${width}`
          }}
          allowClear
          options={optinData}
        />
      </Form.Item>

      {/* </InfiniteScroll> */}
    </div>
  );
};
