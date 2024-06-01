import { api } from "..";

export const getWordsService = (data) => {
  return api.get(`api/admin/words/word?limit=${data.limit}&skip=${data.skip}`);
};
