import { request } from "@/utils/request";
export const getUserInfo = async (userID?: string) => {
  return request("profile", "GET", userID ? { userID: userID } : null, null);
};
