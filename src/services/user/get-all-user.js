import { api } from "..";

export const userGetAllService = (data) => {
    return api.put("api/admin/user", data
    );
};
