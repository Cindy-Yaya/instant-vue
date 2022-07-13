<template>
  <el-container>
    <el-header class="header">
      <MainHeader active="0" />
    </el-header>
    <el-container class="content-container">
      <el-aside class="base-container hide-on-ms" width="auto"
        ><SidePanel :username="userInfo.username" :avatar="userInfo.avatar"
      /></el-aside>
      <el-main class="main-container">
        <MyBlock
          :username="userInfo.username"
          :avatar="userInfo.avatar"
          :load-instants="loadInstants"
        />
        <InstantBlock
          v-for="instant in instantData"
          :key="instant.insID"
          :ins-i-d="instant.insID"
          :username="userInfo.username"
          :avatar="userInfo.avatar"
          :time="instant.created.format('MMM D, YYYY')"
          :text="instant.content"
          :load-instants="loadInstants"
          :attitude="instant.attitude"
          :likes="instant.likes"
          :shares="instant.shares"
        /> </el-main
      ><el-aside class="base-container hide-on-xs" width="auto">
        <div class="section-container">
          <div class="base-header">Contacts</div>
          <div class="base-line">
            <img
              class="line-icon"
              src="/img/icons/avatar-0.jpg"
              style="border-radius: 10%"
            />
            <div class="line-text">Yaya</div>
          </div>
        </div>
        <div class="section-container">
          <div class="base-header">Group Conversations</div>
          <div class="base-line">
            <img
              class="line-icon"
              src="/img/icons/avatar-0.jpg"
              style="border-radius: 10%"
            />
            <div class="line-text">Evan and Yaya</div>
          </div>
        </div>
      </el-aside>
    </el-container>
    <el-backtop />
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import InstantBlock from "@/components/InstantBlock.vue";
import MyBlock from "@/components/MyBlock.vue";
import MainHeader from "@/components/MainHeader.vue";
import SidePanel from "@/components/SidePanel.vue";
import { getInstants } from "@/apis/instant";
import dayjs, { Dayjs } from "dayjs";
import { ElMessage } from "element-plus";
import { getUserInfo } from "@/apis/profile";
const userInfo = reactive({
  username: "",
  avatar: 0,
});
const index = ref(0);
const instantData = reactive<
  {
    insID: string;
    created: Dayjs;
    lastModified: Dayjs;
    content: string;
    attitude: number;
    likes: number;
    shares: number;
  }[]
>([]);
const loadUserInfo = () => {
  getUserInfo().then((res) => {
    console.log(res);
    if (res?.code === 200) {
      userInfo.username = res.data.username;
      userInfo.avatar = res.data.avatar;
    }
  });
};
const loadInstants = (i: number) => {
  getInstants(i).then((res) => {
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
            created: dayjs(item.created),
            lastModified: dayjs(item.lastModified),
            content: item.content,
            attitude: item.attitude,
            likes: item.likes,
            shares: item.shares,
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
  loadUserInfo();
  loadInstants(0);
  window.addEventListener("scroll", loadMore);
});
onUnmounted(() => {
  window.removeEventListener("scroll", loadMore);
});
</script>

<style scoped lang="scss">
.header {
  height: 54px;
  background-color: #ffffff;
}
.base-container {
  min-width: 270px;
  position: sticky;
  height: fit-content;
  top: 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
}
.base-line {
  height: 54px;
  margin: 0 6px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background-color: rgb(0 0 0 / 0.05);
  }
}
.icon-container {
  height: 36px;
  width: 36px;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-icon {
  height: 36px;
  width: 36px;
}
.line-text {
  color: #050505;
  font-weight: 500;
  text-indent: 6px;
  font-size: 15px;
}
.section-container {
  padding-bottom: 24px;
}
.base-header {
  color: #65676b;
  font-size: 17px;
  font-weight: 600;
  padding-bottom: 12px;
}
</style>
