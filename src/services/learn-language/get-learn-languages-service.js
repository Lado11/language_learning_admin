import { api } from "..";

export const learnLanguageGetService = (data) => {
  return api.get(`api/admin/language/learn?skip=${data.skip}&limit=${data.limit}`);
};
