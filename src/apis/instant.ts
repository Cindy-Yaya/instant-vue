import { request } from "@/utils/request";
import { Dayjs } from "dayjs";
export type InstantType = {
  insID: number;
  createTime: Dayjs;
  updateTime: Dayjs;
  content: string;
};
export const getInstants = async (index: number) => {
  return request("instant/get", "GET", { index: index }, null);
};
export const updateInstant = async (insID: number, content: string) => {
  return request("instant/update", "PUT", null, {
    InsID: insID,
    content: content,
  });
};
export const likeInstant = async (insID: number) => {
  return request("instant/like", "POST", null, { InsID: insID, Attitude: 0 });
};
export const getComments = async (insID: number) => {
  return request("comment/get", "GET", { insID: insID }, null);
};
export const sendComment = async (insID: number, content: string) => {
  return request("comment/send", "POST", null, {
    insID: insID,
    content: content,
  });
};
export const shareInstant = async (content: string, refOriginID: number) => {
  return request("instant/share", "POST", null, {
    content: content,
    refOriginID: refOriginID,
  });
};
