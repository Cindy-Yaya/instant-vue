import router from "@/router";
import { ElMessage } from "element-plus";
import { token, userid } from "@/store";
import dayjs from "dayjs";

export type InstantType = {
  insid: number;
  createtime: dayjs.Dayjs;
  updatetime: dayjs.Dayjs;
  content: string;
};

export const getInstants = async (index: number): Promise<InstantType[]> => {
  const instantData: InstantType[] = [];
  await fetch("http://localhost:8081/instant/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: token.value,
    },
    body: JSON.stringify({
      UserID: userid.value,
      Index: index,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.data
        .reverse()
        .map(
          (item: {
            insid: number;
            createtime: string;
            updatetime: string;
            content: string;
          }) => {
            instantData.push({
              insid: item.insid,
              createtime: dayjs(item.createtime),
              updatetime: dayjs(item.updatetime),
              content: item.content,
            });
          }
        );
    })
    .catch((err) => ElMessage.error(`Get Instants Error: ${err}`));
  console.log(instantData);
  return instantData;
};

export const updateInstant = async (
  insid: number | undefined,
  input: string
) => {
  await fetch("http://localhost:8081/instant/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: token.value,
    },
    body: JSON.stringify({
      InsID: insid,
      Content: input,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      getInstants(0);
    });
};
export const likeInstant = async (insid: number | undefined) => {
  await fetch("http://localhost:8081/instant/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: token.value,
    },
    body: JSON.stringify({
      InsID: insid,
      Attitude: 0,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
};
export const getComments = async (insid: number | undefined) => {
  await fetch("http://localhost:8081/comment/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: token.value,
    },
    body: JSON.stringify({
      InsID: insid,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        return res;
      } else ElMessage.error(`Get Comments Error. Code: ${res.code}`);
    });
};
export const sendComment = async (insid: number | undefined, input: string) => {
  await fetch("http://localhost:8081/comment/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: token.value,
    },
    body: JSON.stringify({
      InsID: insid,
      UserID: userid.value,
      Content: input,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        getComments(insid);
      } else ElMessage.error(`Send Coment Error. Code: ${res.code}`);
    });
};
export const shareInstant = async (
  input: string,
  refOriginID: number | undefined
) => {
  await fetch("http://localhost:8081/instant/share", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: token.value,
    },
    body: JSON.stringify({
      UserID: userid.value,
      Content: input,
      RefOriginID: refOriginID,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        getInstants(0);
      } else ElMessage.error(`Share Error. Code: ${res.code}`);
    });
};
