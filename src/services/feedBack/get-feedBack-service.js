import { api } from "..";

function buildUrl(base, params) {
  const url = new URL(base);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url;
}

export  const feedBackGetService = async (data) => {
 console.log(data,"data");
  const params ={
    skip:data.skip,
    limit:data.limit,
    status:data.status || undefined,
    type:data.type || undefined
  }
  const url =  buildUrl(`api/admin/user`,params);
 
  return api.get(`api/admin/user&status=${data.status}&type=${data.type}`);
};
// &status=${data.status}&type=${data.type}

export const feedBackGetIdService = (id) => {
  return api.get(
    `api/admin/feedback/${id}`
  );
};
