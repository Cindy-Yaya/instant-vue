import { request } from "@/utils/request";
export const getUserProfile = async (userID?: string) => {
  return request("profile", "GET", userID ? { userID: userID } : null, null);
};
export const getUserProfileDetail = async (userID?: string) => {
  return request(
    "profile/detail",
    "GET",
    userID ? { userID: userID } : null,
    null
  );
};
