import { api } from "..";
import { buildUrl } from "../../helper/build-url";

export  const feedBackGetService = async (data) => {
  const params ={
    skip:data.skip,
    limit:data.limit,
    status:data.status ,
    type:data.type 
  }

  const url =  buildUrl(`api/admin/feedback/`,params);
  return api.get(url);
};

export const feedBackGetIdService = (id) => {
  return api.get(
    `api/admin/feedback/${id}`
  );
};
