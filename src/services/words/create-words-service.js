import { api } from "..";

export const createWordsService = (formData) => {
  return api.post("api/admin/words/word", formData);
};
