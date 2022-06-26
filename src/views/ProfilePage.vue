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
        <img class="cover" src="/img/covers/1C.jpg" alt="" />
      </div>
      <div class="profile-container-wrapper">
        <div class="profile-container">
          <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" alt="" />
          <div class="info-container">
            <div class="text-container">
              <div class="title">
                {{ username }}
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
          <el-aside class="aside-wrapper" width="360">
            <div class="aside-container">
              <div class="aside-title">Intro</div>
              <div class="aside-text">
                {{ intro }}
              </div>
              <div v-if="birthday !== undefined" class="aside-text">
                Born on
                <span class="bold">{{ birthday.format("MMM D, YYYY") }}</span>
              </div>
              <div class="aside-text">
                Working as <span class="bold">{{ job }}</span> at
                <span class="bold">{{ company }}</span>
              </div>
              <div class="aside-text">
                Studied at
                <span class="bold">{{ school }}</span>
              </div>
              <div v-if="createTime !== undefined" class="aside-text">
                Joined Instant on
                <span class="bold">{{ createTime.format("MMM D, YYYY") }}</span>
              </div>
            </div>
          </el-aside>
          <el-main>
            <MyBlock user-name="Evan" avatar="0" />
            <InstantBlock
              v-for="i in instantData"
              :key="i.insID"
              :insid="i.insID"
              user-name="Evan"
              avatar="0"
              :time="i.createTime.format('MMM D, YYYY')"
              :text="i.content"
              likes="25"
              shares="9"
            />
          </el-main>
        </el-container>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { getInstants, InstantType } from "@/apis/instant";
import MainHeader from "@/components/MainHeader.vue";
import MyBlock from "@/components/MyBlock.vue";
import InstantBlock from "@/components/InstantBlock.vue";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { getUserInfo } from "@/apis/profile";
import dayjs, { Dayjs } from "dayjs";
const index = ref(0);
const instantData = ref<InstantType[]>([]);
const avatar = ref(0);
const birthday = ref<Dayjs>();
const company = ref("");
const createTime = ref<Dayjs>();
const gender = ref(2);
const intro = ref("");
const job = ref("");
const school = ref("");
const tag = ref<string[]>([]);
const username = ref("");
const zone = ref("");
const loadInstants = (index: number) => {
  getInstants(index).then((res) => {
    if (res.length) {
      if (index === 0) instantData.value.length = 0;
      res.map((item) => instantData.value.push(item));
    }
  });
};
const loadProfile = () => {
  getUserInfo(14).then((res) => {
    avatar.value = res.Avatar;
    if (res.Birthday) birthday.value = dayjs(res.Birthday);
    company.value = res.Company;
    if (res.CreateTime) createTime.value = res.CreateTime;
    gender.value = res.Gender;
    intro.value = res.Introduction;
    job.value = res.Job;
    school.value = res.School;
    tag.value = res.Tag;
    username.value = res.Username;
    zone.value = res.Zone;
  });
};
const loadMore = () => {
  if (window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight) {
    index.value += 10;
    loadInstants(index.value);
  }
};
onMounted(() => {
  window.addEventListener("scroll", loadMore);
  loadProfile();
  loadInstants(0);
});
onUnmounted(() => {
  window.removeEventListener("scroll", loadMore);
});
</script>

<style scoped lang="scss">
.header {
  height: 54px;
  background-color: #ffffff;
  z-index: 1;
}
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
  border: solid 6px white;
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
  color: #050505;
  font-size: 32px;
  font-weight: 900;
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
  padding: 12px 0;
}
.aside-title {
  padding: 6px 0;
  font-size: 20px;
  font-weight: 700;
}
.aside-text {
  font-size: 15px;
  padding: 3px 6px;
  font-weight: 400;
  .bold {
    font-weight: 600;
  }
}
</style>
