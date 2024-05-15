import { api } from "..";

export const sendEmail = (data) => {
    return api.post("api/admin/auth/recovery/email", {
        email: data.email,
    })
}