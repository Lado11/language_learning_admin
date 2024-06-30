import { AsyncPaginate } from "react-select-async-paginate"

export const CustomAsyncPaginate = ({placeholder,onChange,loadOptions,current,style}) => {
  
    return(
        <AsyncPaginate
                styles={style}
                placeholder={placeholder}
                onChange={onChange}
                loadOptions={loadOptions}
                additional={{
                  page: current, // Initial page
                }}
              />
    )
}