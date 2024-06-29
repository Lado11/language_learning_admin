import { api } from "..";

export const filesGetIdService = (id) => {
  return api.get(`api/admin/files/${id}`);
};


export const voiceGetIdService = (id) => {
  return api.get(`api/admin/files/${id}`);
};
