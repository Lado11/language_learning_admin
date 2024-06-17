import { api } from "..";

export const feedBackGetService = (data) => {
  return api.get(
    `api/admin/feedback?skip=${data.skip}&limit=${data.limit}`
  );
};


export const feedBackGetIdService = (id) => {
  return api.get(
    `api/admin/feedback/${id}`
  );
};
