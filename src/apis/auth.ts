import dayjs, { Dayjs } from "dayjs";
import { ProfileType } from "./types";

export const register = async (form: ProfileType) => {
  await fetch("http://localhost:8081/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      MailBox: form.MailBox,
      Phone: form.Phone,
      Password: form.Password,
      Username: form.Username,
      Gender: form.Gender,
      Country: 0,
      Province: 0,
      City: 0,
      Birthday: form.Birthday ? form.Birthday : dayjs(0).toDate(),
      School: form.School,
      Company: form.Company,
      Job: form.Job,
      Introduction: form.Introduction,
      Tag: form.Tag,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};
