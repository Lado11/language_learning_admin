import { api } from "..";

export const userCreateService = (data) => {
    return api.put("api/admin/user", data
    );
};
