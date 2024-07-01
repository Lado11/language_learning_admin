import { api } from "..";
import { buildUrl } from "../../helper/build-url";

export const filesGetIdService = (id) => {
  return api.get(`api/admin/files/${id}`);
};


export const voiceGetIdService = (id) => {
  return api.get(`api/admin/files/${id}`);
};

export const filesIdGetService = (id) => {
  return api.get(`api/admin/files/details/${id}`);
};


export const filesGetService = (data) => {
  const params ={
    skip:data.skip,
    limit:data.limit,
    usedObjectType:data.usedObjectType,
    mediaType:data.mediaType,
    search:data.search
  }

  const url = buildUrl(`api/admin/files/`,params);
  return api.get(url);
};


export const filesDeleteService = (id) => {
  return api.delete(`api/admin/files?id=${id}`);
};
