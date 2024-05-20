import { api } from "..";

export const nativeLanguageGetIdService = (id) => {
  return api.get(
    `api/admin/language/native/${id}`
  );
};
