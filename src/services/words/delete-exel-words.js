import { api } from "..";

export const wordExelDeleteService = (id) => {
  return api.delete(`api/admin/words/xlsx/process?id=${id}`);
};

export const getWordsExelService = (data) => {
    return api.get(`api/admin/words/xlsx/process?limit=${data.limit}&skip=${data.skip}`);
  };