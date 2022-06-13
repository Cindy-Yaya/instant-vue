import router from '@/router';
import { token, userid } from '@/store';
import { ElMessage } from 'element-plus';

export type FriendType = {
  friendID: number;
  avatar: number;
  name: string;
  tip: string;
};
export const getFriends = async (index: number): Promise<FriendType[]> => {
  const friendData: FriendType[] = [];
  await fetch('http://localhost:8081/friend/potential', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authentication: token.value,
    },
    body: JSON.stringify({
      UserID: userid.value,
      Index: index,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 200) {
        if (index === 0) {
          res.data
            ?.reverse()
            .map(
              (item: {
                userid: number;
                avatar: number;
                username: string;
                tip: string;
              }) => {
                friendData.push({
                  friendID: item.userid,
                  avatar: item.avatar,
                  name: item.username,
                  tip: '',
                });
              }
            );
          console.log(res.data);
        }
      } else {
        ElMessage.error(`Code: ${res.code}, Session Expired. Please Login.`);
        router.replace({ path: '/login' });
      }
    })
    .catch((err) => ElMessage.error(`Get Potential Friend Error: ${err}`));
  return friendData;
};
export const addFriend = async (friendid: number | undefined) => {
  await fetch('http://localhost:8081/friend/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authentication: token.value,
    },
    body: JSON.stringify({
      friendid: friendid,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        getFriends(0);
      } else ElMessage.error(`Add Friend Failed. Code: ${res.code}`);
    })
    .catch((err) => ElMessage.error(`Add Friend Error: ${err}`));
};
export const removeFriend = async (friendid: number | undefined) => {
  await fetch('http://localhost:8081/friend/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authentication: token.value,
    },
    body: JSON.stringify({
      friendid: friendid,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        getFriends(0);
      } else ElMessage.error(`Remove Failed. Code: ${res.code}`);
    })
    .catch((err) => ElMessage.error(`Remove Friend Error: ${err}`));
};
