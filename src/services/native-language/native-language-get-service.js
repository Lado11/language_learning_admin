import { api } from "..";

export const nativeLanguageGetService = (data) => {
  return api.get(
    `api/admin/language/native?skip=${data.skip}&limit=${data.limit}`
  );
};
