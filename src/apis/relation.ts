import { request } from "@/utils/request";
export type FriendType = {
  userID: string;
  avatar: number;
  username: string;
  tip: string;
};
export const getPotentialFollowings = async (index: number) => {
  return request("relation/potential", "GET", { index: index }, null);
};
export const getFollowings = async (index: number) => {
  return request("relation/following", "GET", { index: index }, null);
};
export const getFollowers = async (index: number) => {
  return request("relation/followers", "GET", { index: index }, null);
};
export const getAllUsers = async (index: number) => {
  return request("relation/all", "GET", { index: index }, null);
};
export const addFollowing = async (followingID: string) => {
  return request("relation", "POST", null, { followingID: followingID });
};
export const removeFollowing = async (followingID: string) => {
  return request("relation", "DELETE", null, { followingID: followingID });
};
export const getFriends = async (index: number) => {
  return request("relation/friends", "GET", { index: index }, null);
};
