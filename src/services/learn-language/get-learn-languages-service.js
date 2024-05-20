import { api } from "..";

export const lernLanguageGetService = () => {
  return api.get("api/admin/language/learn?skip=0&limit=10");
};
