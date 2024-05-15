import { api } from "..";

export const lernLanguageCreateService = (formData) => {
    return api.put("api/admin/language/learn", formData
    );
};
