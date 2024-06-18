import { api } from "..";

export const getWordsService = (data) => {
  return api.get(`api/admin/words/word?limit=${data.limit}&skip=${data.skip}
    
    `);
};
// &language=${data?.language}
//     &level=${data?.level}&category=${data?.category}&search=${data?.search}&translateLanguage=${data.translateLanguage}

export const getWordsIdService = (id) => {
  return api.get(`api/admin/words/word/${id}`);
};

export const getWordsDeleteService = (id) => {
  return api.delete(`api/admin/words/word?id=${id}`);
};

export const getWordsUpdateService = (formData) => {
  return api.put(`api/admin/words/word`,formData);
};