import { request } from "@/utils/request";
export const getInstants = async (index: number) => {
  return request("instant", "GET", { index: index }, null);
};
export const getMyInstants = async (index: number) => {
  return request("instant/mine", "GET", { index: index }, null);
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
export const likeInstant = async (insID: string, attitude: number) => {
  return request("instant/like", "POST", null, {
    insID: insID,
    attitude: attitude,
  });
};
export const getComments = async (insID: string) => {
  return request("comment", "GET", { insID: insID }, null);
};
export const sendComment = async (insID: string, content: string) => {
  return request("comment", "POST", null, {
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
