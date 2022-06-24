<template>
  <el-container>
    <el-header class="header"><MainHeader active="1" /> </el-header>
    <el-container class="contentContainer">
      <el-aside class="baseContainer hideOnMs" width="auto"
        ><div class="baseLine">
          <div class="iconContainer">
            <img class="lineIcon" src="/img/icons/find-friends.png" />
          </div>
          <div class="lineText">Find Friends</div>
        </div>
        <div class="baseLine">
          <div class="iconContainer">
            <img class="lineIcon" src="/img/icons/groups.png" />
          </div>
          <div class="lineText">Groups</div>
        </div>
        <div class="baseLine">
          <div class="iconContainer">
            <img class="lineIcon" src="/img/icons/memories.png" />
          </div>
          <div class="lineText">Memories</div>
        </div>
        <div class="baseLine">
          <div class="iconContainer">
            <img class="lineIcon" src="/img/icons/saved.png" />
          </div>
          <div class="lineText">Saved</div>
        </div>
        <div class="baseLine">
          <div class="iconContainer">
            <img class="lineIcon" src="/img/icons/pages.png" />
          </div>
          <div class="lineText">Pages</div>
        </div>
        <div class="baseLine">
          <div class="iconContainer">
            <img class="lineIcon" src="/img/icons/events.png" />
          </div>
          <div class="lineText">Events</div>
        </div>
        <div class="baseLine">
          <div class="iconContainer">
            <img class="lineIcon" src="/img/icons/most-recent.png" />
          </div>
          <div class="lineText">Most Recennt</div>
        </div>
        <div class="baseLine">
          <div class="iconContainer">
            <img class="lineIcon" src="/img/icons/favorites.png" />
          </div>
          <div class="lineText">Favorties</div>
        </div>
        <div class="baseLine">
          <div class="iconContainer">
            <img class="lineIcon" src="/img/icons/weather.png" />
          </div>
          <div class="lineText">Weather</div>
        </div></el-aside
      ><el-main class="mainContainer">
        <div class="title">People You May Know</div>
        <div class="friendsContainer">
          <FriendBlock
            v-for="item in potentialFriends"
            :key="item.friendID"
            :name="item.name"
            :friendid="item.friendID"
            :avatar="item.avatar"
            :tip="item.tip"
            :getFriends="getFriends"
          /></div></el-main
    ></el-container>
    <el-backtop />
  </el-container>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import FriendBlock from "@/components/FriendBlock.vue";
import MainHeader from "@/components/MainHeader.vue";
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
.baseContainer {
  min-width: 270px;
  position: sticky;
  height: fit-content;
  top: 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
}
.baseLine {
  height: 54px;
  margin: 0 6px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
.iconContainer {
  height: 36px;
  width: 36px;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lineIcon {
  height: 36px;
  width: 36px;
}
.lineText {
  color: #050505;
  font-weight: 500;
  text-indent: 6px;
  font-size: 15px;
}
.hideOnMs {
  @media only screen and (max-width: 992px) {
    display: none;
  }
}
.hideOnXs {
  @media only screen and (max-width: 768px) {
    display: none;
  }
}
.title {
  font-size: 20px;
  font-weight: 700;
  padding: 12px;
}
.friendsContainer {
  display: flex;
  align-items: row;
  flex-wrap: wrap;
}
</style>
