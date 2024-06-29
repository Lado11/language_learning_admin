import { api } from "..";
import { buildUrl } from "../../helper/build-url";


export const filesIdGetService = () => {
  
}
export const getWordsService = (data) => {
  const params ={
    skip:data.skip,
    limit:data.limit,
    language:data.language,
    translateLanguage: data.translateLanguage,
    category: data.category,
    level:data.level,
    search:data.search
  }

  const url = buildUrl(`api/admin/words/word/`,params);
  return api.get(url);
};

export const getWordsIdService = (id) => {
  return api.get(`api/admin/words/word/${id}`);
};

export const getWordsDeleteService = (id) => {
  return api.delete(`api/admin/words/word?id=${id}`);
};

export const getWordsUpdateService = (formData) => {
  return api.put(`api/admin/words/word`,formData);
};