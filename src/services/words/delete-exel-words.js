import { api } from "..";
import { buildUrl } from "../../helper/build-url";



export const wordExelDeleteService = (id) => {
  return api.delete(`api/admin/words/xlsx/process?id=${id}`);
};

export const getWordsExelService = (data) => {
  const params ={
    skip:data.skip,
    limit:data.limit,
    status:data.status ,
    type:data.type 
  }

  const url =  buildUrl(`api/admin/words/xlsx/process/`,params);
    return api.get(url);
  };

  
export const GetIdWordsExelService = (id) => {
  return api.get(`api/admin/words/xlsx/process/${id}`);
};