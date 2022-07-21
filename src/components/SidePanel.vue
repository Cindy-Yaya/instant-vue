<template>
  <el-container>
    <el-header>
      <div class="base-line" @click="onProfileClick">
        <div class="icon-container">
          <img
            class="line-icon"
            :src="`/img/icons/avatar-${avatar}.jpg`"
            style="border-radius: 50%"
            alt=""
          />
        </div>
        <div class="line-text">{{ username }}</div>
      </div> </el-header
    ><el-main>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" :src="findFriendsIcon" alt="" />
        </div>
        <div class="line-text">Find Friends</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" :src="groupsIcon" alt="" />
        </div>
        <div class="line-text">Groups</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" :src="memoriesIcon" alt="" />
        </div>
        <div class="line-text">Memories</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" :src="savedIcon" alt="" />
        </div>
        <div class="line-text">Saved</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" :src="pagesIcon" alt="" />
        </div>
        <div class="line-text">Pages</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" :src="eventsIcon" alt="" />
        </div>
        <div class="line-text">Events</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" :src="mostRecentIcon" alt="" />
        </div>
        <div class="line-text">Most Recent</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" :src="favoritesIcon" alt="" />
        </div>
        <div class="line-text">Favorites</div>
      </div>
      <div class="base-line" @click="onWeatherClick">
        <div class="icon-container">
          <img class="line-icon" :src="weatherIcon" alt="" />
        </div>
        <div class="line-text">Weather</div>
      </div>
    </el-main>
    <el-footer class="footer">Privacy · Terms · ZYChimne @ 2022</el-footer>
  </el-container>
</template>

<script setup lang="ts">
import router from "@/router";
import findFriendsIcon from "@/assets/img/icons/find-friends.png";
import groupsIcon from "@/assets/img/icons/groups.png";
import memoriesIcon from "@/assets/img/icons/memories.png";
import savedIcon from "@/assets/img/icons/saved.png";
import pagesIcon from "@/assets/img/icons/pages.png";
import eventsIcon from "@/assets/img/icons/events.png";
import mostRecentIcon from "@/assets/img/icons/most-recent.png";
import favoritesIcon from "@/assets/img/icons/favorites.png";
import weatherIcon from "@/assets/img/icons/weather.png";
const props = defineProps({
  userID: { type: String, default: "" },
  username: { type: String, default: "" },
  avatar: { type: Number, default: 0 },
});
const onProfileClick = () => {
  router.push(`/profile/${props.userID}`);
};
const onWeatherClick = () => {
  router.push("/weather");
};
</script>

<style lang="scss" scoped>
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
  padding: 0 6px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background-color: var(--hover-background-color);
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
  font-weight: 500;
  text-indent: 6px;
  font-size: 15px;
}
.footer {
  font-size: 12px;
}
</style>
