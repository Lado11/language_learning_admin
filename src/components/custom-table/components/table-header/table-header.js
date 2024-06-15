export const TableHeader = ({data}) =>{
     return (
        <li class="table-header">
                {data?.map((item, index) => {
                  return (
                    <div key={index} class="col col-1 label">{item?.title}</div>
                  )
                })}
              </li>
     )
}