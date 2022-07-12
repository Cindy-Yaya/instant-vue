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
          <RelationBlock
            v-for="item in potentialFriends"
            :key="item.userID"
            :name="item.username"
            :user-i-d="item.userID"
            :avatar="item.avatar"
            :tip="item.tip"
          />
        </div>
      </el-main>
    </el-container>
    <el-backtop />
  </el-container>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import RelationBlock from "@/components/RelationBlock.vue";
import MainHeader from "@/components/MainHeader.vue";
import SidePanel from "@/components/SidePanel.vue";
import {
  FriendType,
  getAllUsers,
  getFollowings,
  getPotentialFollowings,
} from "@/apis/relation";
import { ElMessage } from "element-plus";
const index = ref(0);
const potentialFriends = ref<FriendType[]>([]);
const loadMore = () => {
  if (window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight) {
    index.value += 10;
    loadPotentialFollowings(index.value);
  }
};
const loadPotentialFollowings = (i: number) => {
  getPotentialFollowings(i).then((res) => {
    if (res?.code === 200) {
      if (i === 0) {
        potentialFriends.value.length = 0;
        window.scrollTo({ top: 0 });
      }
      if (res.data.length > 0) {
        res.data.forEach((item: any) => {
          potentialFriends.value.push({
            userID: item.userID,
            username: item.username,
            avatar: item.avatar,
            tip: item.introduction,
          });
        });
      } else {
        ElMessage.info("No more potential friends");
      }
    } else {
      ElMessage.error(res?.message);
    }
  });
};
onMounted(() => {
  window.addEventListener("scroll", loadMore);
  loadPotentialFollowings(index.value);
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
