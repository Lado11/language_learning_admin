import { api } from "..";

export const lernLanguageGetService = (formData) => {
    return api.put("api/admin/language/learn", formData
    );
};
