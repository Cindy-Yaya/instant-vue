import { request } from "@/utils/request";
import dayjs from "dayjs";
import { ProfileType } from "./types";
export const getToken = (account: string, password: string) => {
  if (/\S+@\S+\.\S+/.test(account)) {
    return request("auth/getToken", "POST", null, {
      mailbox: account,
      password: password,
    }); // is Mail
  } else {
    return request("auth/getToken", "POST", null, {
      phone: account,
      password: password,
    }); // is Phone
  }
};
export const register = async (form: ProfileType) => {
  return request("auth/register", "POST", null, {
    mailBox: form.mailBox,
    phone: form.phone,
    password: form.password,
    username: form.username,
    gender: form.gender,
    country: 0,
    province: 0,
    city: 0,
    birthday: form.birthday ? form.birthday : dayjs().toDate(),
    school: form.school,
    company: form.company,
    job: form.job,
    introduction: form.introduction,
    tags: form.tags,
  });
};
