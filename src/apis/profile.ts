import router from '@/router';
import { token } from '@/store';
import dayjs, { Dayjs } from 'dayjs';
import { ElMessage } from 'element-plus';
import { InitialProfile, ProfileType } from './types';
export const getUserInfo = async (userid: number): Promise<ProfileType> => {
  const profile: ProfileType = InitialProfile;
  await fetch('http://localhost:8081/profile/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authentication: token.value,
    },
    body: JSON.stringify({
      UserID: userid,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.data);
      if (res.code === 200) {
        profile.Username = res.data.username;
        profile.Gender = res.data.gender;
        profile.Birthday = dayjs(res.data.birthday);
        profile.School = res.data.school;
        profile.Company = res.data.company;
        profile.Job = res.data.job;
        profile.Introduction = res.data.Introduction;
        profile.Tag = res.data.tag;
        profile.Avatar = res.data.avatar;
        profile.CreateTime = dayjs(res.data.createtime);
      } else {
        ElMessage.error(`Code: ${res.code}, Session Expired. Please Login.`);
        router.replace({ path: '/login' });
      }
    })
    .catch((err) => ElMessage.error(`Get User Profile Error: ${err}`));
  console.log(profile);
  return profile;
};
