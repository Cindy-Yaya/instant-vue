import { request } from "@/utils/request";
import { Dayjs } from "dayjs";
export type InstantType = {
  insID: string;
  created: Dayjs;
  lastModified: Dayjs;
  content: string;
};
export const getInstants = async (index: number) => {
  return request("instant", "GET", { index: index }, null);
};
export const postInstant = async (content: string) => {
  return request("instant", "POST", null, { content: content });
};
export const updateInstant = async (insID: string, content: string) => {
  return request("instant", "PUT", null, {
    insID: insID,
    content: content,
  });
};
export const likeInstant = async (insID: string) => {
  return request("instant/like", "POST", null, { InsID: insID, Attitude: 0 });
};
export const getComments = async (insID: string) => {
  return request("comment/get", "GET", { insID: insID }, null);
};
export const sendComment = async (insID: string, content: string) => {
  return request("comment/send", "POST", null, {
    insID: insID,
    content: content,
  });
};
export const shareInstant = async (content: string, refOriginID: string) => {
  return request("instant/share", "POST", null, {
    content: content,
    refOriginID: refOriginID,
  });
};
