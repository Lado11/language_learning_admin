import { api } from "..";

export const userDeleteService = (data) => {
    return api.put("api/admin/user", data
    );
};
