<template>
  <el-container>
    <el-header>
      <div class="base-line" @click="onProfileClick">
        <div class="icon-container">
          <img
            class="line-icon"
            :src="`/img/icons/avatar-${avatar}.jpg`"
            style="border-radius: 50%"
          />
        </div>
        <div class="line-text">{{ username }}</div>
      </div> </el-header
    ><el-main>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" src="/img/icons/find-friends.png" />
        </div>
        <div class="line-text">Find Friends</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" src="/img/icons/groups.png" />
        </div>
        <div class="line-text">Groups</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" src="/img/icons/memories.png" />
        </div>
        <div class="line-text">Memories</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" src="/img/icons/saved.png" />
        </div>
        <div class="line-text">Saved</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" src="/img/icons/pages.png" />
        </div>
        <div class="line-text">Pages</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" src="/img/icons/events.png" />
        </div>
        <div class="line-text">Events</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" src="/img/icons/most-recent.png" />
        </div>
        <div class="line-text">Most Recent</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" src="/img/icons/favorites.png" />
        </div>
        <div class="line-text">Favorites</div>
      </div>
      <div class="base-line">
        <div class="icon-container">
          <img class="line-icon" src="/img/icons/weather.png" />
        </div>
        <div class="line-text">Weather</div>
      </div>
    </el-main>
    <el-footer>Privacy · Terms · ZYChimne @ 2022</el-footer>
  </el-container>
</template>

<script setup lang="ts">
import router from "@/router";

const props = defineProps({
  userID: { type: String, default: "" },
  username: { type: String, default: "" },
  avatar: { type: Number, default: 0 },
});
const onProfileClick = () => {
  router.push(`/profile/${props.userID}`);
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
</style>
