export const TableHeader = ({data}) =>{
     return (
        <li className="table-header">
                {data?.map((item, index) => {
                  return (
                    <div key={index} className="col col-1 label">{item?.title}</div>
                  )
                })}
              </li>
     )
}