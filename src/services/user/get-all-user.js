import axios from "axios";
import { api } from "..";

function buildUrl(base, params) {
  const url = new URL(base);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
}

export async function fetchData(regionCode, role, limit = 10, skip = 0) {
  const params = {
    regionCode: regionCode || undefined,
    role: role || undefined,
    limit,
    skip
  };

  const url = buildUrl(`${api}api/admin/user`, params);

  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export const userGetAllService = (data) => {
  return api.get(`api/admin/user?limit=${data.limit}&skip=${data.skip}&search=${data.search}`,);
};
