import router from "@/router";
import { ElMessage } from "element-plus";
type MethodType = "GET" | "POST" | "PUT" | "DELETE";
const BASE_URL = "http://localhost:8081/";
export const request = async (
  url: string,
  method: MethodType,
  params: any,
  data: any
) => {
  const token = localStorage.getItem("token");
  return fetch(
    `${BASE_URL}${url}${params ? `?${new URLSearchParams(params)}` : ""}`,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authentication: token ? token : "",
      },
      body: method !== "GET" ? JSON.stringify(data) : null,
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res);
        const err = new Error();
        err.name = `${res.status}`;
        err.message = res.statusText;
        throw err;
      }
    })
    .catch((err: Error) => {
      console.error(err);
      ElMessage.error(`${err}`);
      switch (err.name) {
        case "401": {
          router.push("/login");
        }
        case "403": {
          router.push("/login");
        }
      }
    });
};
