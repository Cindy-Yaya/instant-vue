import { request } from "@/utils/request";
export type FriendType = {
  friendID: number;
  avatar: number;
  name: string;
  tip: string;
};
export const getFriends = async (index: number) => {
  return request("friend/potential", "GET", { index: index }, null);
};
export const addFriend = async (friendID: number) => {
  return request("friend/add", "POST", null, { friendID: friendID });
};
export const removeFriend = async (friendID: number) => {
  return request("friend/remove", "DELETE", null, { friendID: friendID });
};
