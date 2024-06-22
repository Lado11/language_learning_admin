import { api } from "..";
import { buildUrl } from "../../helper/build-url";

export const userGetAllService = (data) => {
  const params ={
    skip:data.skip,
    limit:data.limit,
    isSubscribed:data.isSubscribed,
    phoneNumberVerified: data.phoneNumberVerified,
    emailVerified: data.emailVerified,
    role:data.role,
    search:data.search
  }

  const url = buildUrl(`api/admin/user/`,params);
  return api.get(url);
};
