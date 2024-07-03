import { api } from "..";
import { buildUrl } from "../../helper/build-url";

export const categoryGetService = (data) => {
  const params ={
    skip:data.skip,
    limit:data.limit,
    search:data.search
  }

  const url = buildUrl(`api/admin/words/category/`,params);
  return api.get(url);
};
