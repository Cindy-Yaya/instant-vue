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
    MailBox: form.MailBox,
    Phone: form.Phone,
    Password: form.Password,
    Username: form.Username,
    Gender: form.Gender,
    Country: 0,
    Province: 0,
    City: 0,
    Birthday: form.Birthday ? form.Birthday : dayjs().toDate(),
    School: form.School,
    Company: form.Company,
    Job: form.Job,
    Introduction: form.Introduction,
    Tag: form.Tag,
  });
};
