import { api } from "..";
import { buildUrl } from "../../helper/build-url";

export const nativeLanguageGetService = (data) => {
  const params ={
    skip:data.skip,
    limit:data.limit,
    search:data.search
  }

  const url = buildUrl(`api/admin/language/native/`,params);
  return api.get(url
    // `api/admin/language/native?skip=${data.skip}&limit=${data.limit}`
  );
};
