<template>
  <el-container>
    <el-header class="header">
      <MainHeader active="0" />
    </el-header>
    <el-main class="main-container">
      <div class="cover-container">
        <img
          class="cover-bg-shared cover-blur"
          src="/img/covers/1C.jpg"
          alt=""
        />
        <div class="cover-bg-shared cover-gradient" />
        <img
          class="cover"
          :src="`/img/covers/${userInfo.coverPhoto}C.jpg`"
          alt=""
        />
      </div>
      <div class="profile-container-wrapper">
        <div class="profile-container">
          <img
            class="avatar"
            :src="`/img/icons/avatar-${userInfo.avatar}.jpg`"
            alt=""
          />
          <div class="info-container">
            <div class="text-container">
              <div class="title">
                {{ userInfo.username }}
              </div>
              <div class="subtitle">1 Friend</div>
            </div>
            <el-button class="profile-btn" type="primary">
              Edit Profile
            </el-button>
          </div>
        </div>
      </div>
      <div class="content-container">
        <el-container>
          <el-aside class="aside-wrapper hide-on-ms" width="360">
            <div class="aside-container">
              <div class="aside-title">Intro</div>
              <div class="aside-text">
                {{ userInfo.intro }}
              </div>
              <div v-if="userInfo.birthday" class="aside-text">
                Born on
                <span class="bold">{{
                  userInfo.birthday.format("MMM D, YYYY")
                }}</span>
              </div>
              <div class="aside-text">
                Working as <span class="bold">{{ userInfo.job }}</span> at
                <span class="bold">{{ userInfo.company }}</span>
              </div>
              <div class="aside-text">
                Studied at
                <span class="bold">{{ userInfo.school }}</span>
              </div>
              <div v-if="userInfo.created" class="aside-text">
                Joined Instant on
                <span class="bold">{{
                  userInfo.created.format("MMM D, YYYY")
                }}</span>
              </div>
            </div>
          </el-aside>
          <el-main>
            <MyBlock
              :username="userInfo.username"
              :avatar="userInfo.avatar"
              :load-instants="loadInstants"
            />
            <InstantBlock
              v-for="instant in instantData"
              :key="instant.insID"
              :ins-i-d="instant.insID"
              :username="instant.username"
              :avatar="instant.avatar"
              :time="instant.created.format('MMM D, YYYY [at] H:mm')"
              :text="instant.content"
              :load-instants="loadInstants"
              :likes="instant.likes"
              :shares="instant.shares"
              :is-my-self="instant.userID === userInfo.userID"
            />
          </el-main>
        </el-container>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { getInstantsByUserID } from "@/apis/instant";
import { getUserProfileDetail } from "@/apis/profile";
import { InstantType } from "@/apis/types";
import InstantBlock from "@/components/InstantBlock.vue";
import MainHeader from "@/components/MainHeader.vue";
import MyBlock from "@/components/MyBlock.vue";
import dayjs, { Dayjs } from "dayjs";
import { ElMessage } from "element-plus";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
const index = ref(0);
const instantData = reactive<InstantType[]>([]);
const userInfo = reactive<{
  userID: string;
  username: string;
  avatar: number;
  intro: string;
  birthday: Dayjs | null;
  job: string;
  company: string;
  school: string;
  created: Dayjs | null;
  coverPhoto: number;
}>({
  userID: "",
  username: "",
  avatar: 0,
  intro: "",
  birthday: null,
  job: "",
  company: "",
  school: "",
  created: null,
  coverPhoto: 0,
});
const loadUserProfile = (callback?: Function) => {
  getUserProfileDetail(useRoute().params.id as string).then((res) => {
    console.log(res);
    if (res?.code === 200) {
      userInfo.userID = res.data.userID;
      userInfo.username = res.data.username;
      userInfo.avatar = res.data.avatar;
      userInfo.intro = res.data.introduction;
      userInfo.birthday = dayjs(res.data.birthday);
      userInfo.job = res.data.job;
      userInfo.company = res.data.company;
      userInfo.school = res.data.school;
      userInfo.created = dayjs(res.data.created);
      userInfo.coverPhoto = res.data.coverPhoto;
      if (callback) {
        callback(index.value);
      }
    }
  });
};
const loadInstants = (i: number) => {
  getInstantsByUserID(userInfo.userID, i).then((res) => {
    console.log(res);
    if (res?.code === 200) {
      if (i === 0) {
        instantData.length = 0;
        window.scrollTo({ top: 0 });
      }
      if (res.data.length > 0) {
        res.data.forEach((item: any) => {
          instantData.push({
            insID: item.insID,
            userID: item.userID,
            avatar: item.avatar,
            username: item.username,
            created: dayjs(item.created),
            lastModified: dayjs(item.lastModified),
            content: item.content,
            likes: item.likes,
            shares: item.shares,
            attitude: item.attitude,
          });
        });
        index.value += 10;
      } else {
        ElMessage.info("No new posts");
      }
    }
  });
};
const loadMore = () => {
  if (window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight) {
    loadInstants(index.value);
  }
};
onMounted(() => {
  window.addEventListener("scroll", loadMore);
  loadUserProfile(loadInstants);
});
onUnmounted(() => {
  window.removeEventListener("scroll", loadMore);
});
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cover {
  position: absolute;
  object-fit: cover;
  top: -54px;
  left: 50%;
  max-width: 960px;
  transform: translateX(-50%);
}
.cover-container {
  position: absolute;
  left: 0;
  top: 54px;
  width: 100%;
  height: 360px;
  overflow: hidden;
}
.cover-bg-shared {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.cover-gradient {
  height: inherit;
  background: linear-gradient(
    to top,
    #ffffff,
    rgb(255 255 255.9),
    rgb(255 255 255 / 0.7),
    rgb(255 255 255 / 0.4),
    rgb(255 255 255 / 0)
  );
}
.cover-blur {
  object-fit: cover;
  filter: blur(12px);
}
.profile-container-wrapper {
  position: absolute;
  top: 414px;
  height: 150px;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.profile-container {
  width: 900px;
  display: flex;
  flex-direction: row;
}
.avatar {
  border-radius: 50%;
  height: 168px;
  width: 168px;
  object-fit: cover;
  align-self: flex-end;
  border: solid 6px #fff;
}
.info-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-basis: 0px;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 12px 24px;
}
.text-container {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
}
.title {
  font-size: 32px;
  font-weight: 600;
}
.subtitle {
  color: #65676b;
  font-size: 17px;
  font-weight: 600;
}
.profile-btn {
  align-self: flex-end;
}
.content-container {
  margin-top: 480px;
  width: 960px;
}
.aside-wrapper {
  padding: 20px 0;
  flex-grow: 1;
  flex-basis: 0px;
}
.aside-container {
  width: 100%;
  background: white;
  border-radius: 6px;
  margin: 12px 0;
  padding: 12px;
}
.aside-title {
  padding: 6px;
  font-size: 20px;
  font-weight: 700;
}
.aside-text {
  font-size: 15px;
  padding: 6px;
  font-weight: 400;
  .bold {
    font-weight: 600;
  }
}
</style>
