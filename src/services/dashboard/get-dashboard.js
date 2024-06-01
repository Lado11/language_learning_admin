import { api } from "..";

export const dashboardGetService = () => {
  return api.get(`api/admin/dashboard`);
};
