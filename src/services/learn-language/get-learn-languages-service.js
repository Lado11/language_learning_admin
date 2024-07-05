import { api } from "..";
import { buildUrl } from "../../helper/build-url";

export const learnLanguageGetService = (data) => {
  const params ={
    skip:data.skip,
    limit:data.limit,
    search:data.search
  }

  const url = buildUrl(`api/admin/language/learn/`,params);
  return api.get(url);
};
