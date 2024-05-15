import { api } from "..";

export const nativeLanguageUpdateService = (data) => {
    return api.post("api/admin/language/native", {
        data
    });
};
