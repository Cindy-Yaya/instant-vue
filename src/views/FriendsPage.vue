<template>
  <el-container>
    <el-header class="header">
      <MainHeader active="1" />
    </el-header>
    <el-container class="content-container">
      <el-aside class="base-container hide-on-ms" width="auto"
        ><SidePanel /></el-aside
      ><el-main class="main-container">
        <div class="title">People You May Know</div>
        <div class="friends-container">
          <FriendBlock
            v-for="item in potentialFriends"
            :key="item.friendID"
            :name="item.name"
            :friendid="item.friendID"
            :avatar="item.avatar"
            :tip="item.tip"
            :get-friends="getFriends"
          />
        </div>
      </el-main>
    </el-container>
    <el-backtop />
  </el-container>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import FriendBlock from "@/components/FriendBlock.vue";
import MainHeader from "@/components/MainHeader.vue";
import SidePanel from "@/components/SidePanel.vue";
import { FriendType, getFriends } from "@/apis/friend";
const index = ref(0);
const potentialFriends = ref<FriendType[]>([]);
const loadMore = () => {
  // console.log(
  //   `innerHeight: ${window.innerHeight}, scrollY: ${window.scrollY}, offsetHeight: ${document.body.offsetHeight}`
  // );
  if (window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight) {
    index.value += 10;
    getFriends(index.value);
  }
};
const loadFriends = (index: number) => {
  getFriends(index).then((res) => {
    if (index === 0) potentialFriends.value.length = 0;
    potentialFriends.value = potentialFriends.value.concat(res);
  });
};
onMounted(() => {
  window.addEventListener("scroll", loadMore);
  loadFriends(0);
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
.title {
  font-size: 20px;
  font-weight: 700;
  padding: 12px;
}
.friends-container {
  display: flex;
  align-items: row;
  flex-wrap: wrap;
}
</style>
