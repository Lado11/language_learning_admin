import { AsyncPaginate } from "react-select-async-paginate"

export const CustomAsyncPaginate = ({defaultInputValue, placeholder,onChange,loadOptions,current,style,value}) => {
    return(
        <AsyncPaginate
                defaultInputValue={defaultInputValue}
                styles={style}
                placeholder={placeholder}
                onChange={onChange}
                loadOptions={loadOptions}
                value={value}
                additional={{
                  page: current, // Initial page
                }}
              />
    )
}