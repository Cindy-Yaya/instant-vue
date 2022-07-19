<template>
  <div class="nav-container">
    <div class="inner aside hide-on-ms">
      <el-input placeholder="Search Instant" />
    </div>
    <div class="inner">
      <div
        class="nav-btn-wrapper"
        :style="{
          borderBottom:
            active === '0' ? '3px solid var(--el-color-primary)' : '',
        }"
        @click="onHomeClick"
      >
        <div class="nav-btn">
          <svg viewBox="0 0 28 28" class="nav-icon" height="28" width="28">
            <path
              d="M 17.5 23.979 L 21.25 23.979 C 21.386 23.979 21.5 23.864 21.5 23.729 L 21.5 13.979 C 21.5 13.427 21.949 12.979 22.5 12.979 L 24.33 12.979 L 14.017 4.046 L 3.672 12.979 L 5.5 12.979 C 6.052 12.979 6.5 13.427 6.5 13.979 L 6.5 23.729 C 6.5 23.864 6.615 23.979 6.75 23.979 L 10.5 23.979 L 10.5 17.729 C 10.5 17.04 11.061 16.479 11.75 16.479 L 16.25 16.479 C 16.939 16.479 17.5 17.04 17.5 17.729 L 17.5 23.979 Z M 21.25 25.479 L 17 25.479 C 16.448 25.479 16 25.031 16 24.479 L 16 18.327 C 16 18.135 15.844 17.979 15.652 17.979 L 12.348 17.979 C 12.156 17.979 12 18.135 12 18.327 L 12 24.479 C 12 25.031 11.552 25.479 11 25.479 L 6.75 25.479 C 5.784 25.479 5 24.695 5 23.729 L 5 14.479 L 3.069 14.479 C 2.567 14.479 2.079 14.215 1.868 13.759 C 1.63 13.245 1.757 12.658 2.175 12.29 L 13.001 2.912 C 13.248 2.675 13.608 2.527 13.989 2.521 C 14.392 2.527 14.753 2.675 15.027 2.937 L 25.821 12.286 C 25.823 12.288 25.824 12.289 25.825 12.29 C 26.244 12.658 26.371 13.245 26.133 13.759 C 25.921 14.215 25.434 14.479 24.931 14.479 L 23 14.479 L 23 23.729 C 23 24.695 22.217 25.479 21.25 25.479 Z"
            />
          </svg>
        </div>
      </div>
      <div
        class="nav-btn-wrapper"
        :style="{
          borderBottom:
            active === '1' ? '3px solid var(--el-color-primary)' : '',
        }"
        @click="onFriendsClick"
      >
        <div class="nav-btn">
          <svg viewBox="0 0 28 28" class="nav-icon" height="28" width="28">
            <path
              d="M10.5 4.5c-2.272 0-2.75 1.768-2.75 3.25C7.75 9.542 8.983 11 10.5 11s2.75-1.458 2.75-3.25c0-1.482-.478-3.25-2.75-3.25zm0 8c-2.344 0-4.25-2.131-4.25-4.75C6.25 4.776 7.839 3 10.5 3s4.25 1.776 4.25 4.75c0 2.619-1.906 4.75-4.25 4.75zm9.5-6c-1.41 0-2.125.841-2.125 2.5 0 1.378.953 2.5 2.125 2.5 1.172 0 2.125-1.122 2.125-2.5 0-1.659-.715-2.5-2.125-2.5zm0 6.5c-1.999 0-3.625-1.794-3.625-4 0-2.467 1.389-4 3.625-4 2.236 0 3.625 1.533 3.625 4 0 2.206-1.626 4-3.625 4zm4.622 8a.887.887 0 00.878-.894c0-2.54-2.043-4.606-4.555-4.606h-1.86c-.643 0-1.265.148-1.844.413a6.226 6.226 0 011.76 4.336V21h5.621zm-7.122.562v-1.313a4.755 4.755 0 00-4.749-4.749H8.25A4.755 4.755 0 003.5 20.249v1.313c0 .518.421.938.937.938h12.125c.517 0 .938-.42.938-.938zM20.945 14C24.285 14 27 16.739 27 20.106a2.388 2.388 0 01-2.378 2.394h-5.81a2.44 2.44 0 01-2.25 1.5H4.437A2.44 2.44 0 012 21.562v-1.313A6.256 6.256 0 018.25 14h4.501a6.2 6.2 0 013.218.902A5.932 5.932 0 0119.084 14h1.861z"
            />
          </svg>
        </div>
      </div>
      <div
        class="nav-btn-wrapper"
        :style="{
          borderBottom:
            active === '2' ? '3px solid var(--el-color-primary)' : '',
        }"
        @click="onChatClick"
      >
        <div class="nav-btn">
          <svg viewBox="0 0 28 28" class="nav-icon" height="28" width="28">
            <path
              d="M25.5 14C25.5 7.649 20.351 2.5 14 2.5 7.649 2.5 2.5 7.649 2.5 14 2.5 20.351 7.649 25.5 14 25.5 20.351 25.5 25.5 20.351 25.5 14ZM27 14C27 21.18 21.18 27 14 27 6.82 27 1 21.18 1 14 1 6.82 6.82 1 14 1 21.18 1 27 6.82 27 14ZM7.479 14 7.631 14C7.933 14 8.102 14.338 7.934 14.591 7.334 15.491 6.983 16.568 6.983 17.724L6.983 18.221C6.983 18.342 6.99 18.461 7.004 18.578 7.03 18.802 6.862 19 6.637 19L6.123 19C5.228 19 4.5 18.25 4.5 17.327 4.5 15.492 5.727 14 7.479 14ZM20.521 14C22.274 14 23.5 15.492 23.5 17.327 23.5 18.25 22.772 19 21.878 19L21.364 19C21.139 19 20.97 18.802 20.997 18.578 21.01 18.461 21.017 18.342 21.017 18.221L21.017 17.724C21.017 16.568 20.667 15.491 20.067 14.591 19.899 14.338 20.067 14 20.369 14L20.521 14ZM8.25 13C7.147 13 6.25 11.991 6.25 10.75 6.25 9.384 7.035 8.5 8.25 8.5 9.465 8.5 10.25 9.384 10.25 10.75 10.25 11.991 9.353 13 8.25 13ZM19.75 13C18.647 13 17.75 11.991 17.75 10.75 17.75 9.384 18.535 8.5 19.75 8.5 20.965 8.5 21.75 9.384 21.75 10.75 21.75 11.991 20.853 13 19.75 13ZM15.172 13.5C17.558 13.5 19.5 15.395 19.5 17.724L19.5 18.221C19.5 19.202 18.683 20 17.677 20L10.323 20C9.317 20 8.5 19.202 8.5 18.221L8.5 17.724C8.5 15.395 10.441 13.5 12.828 13.5L15.172 13.5ZM16.75 9C16.75 10.655 15.517 12 14 12 12.484 12 11.25 10.655 11.25 9 11.25 7.15 12.304 6 14 6 15.697 6 16.75 7.15 16.75 9Z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="inner aside hide-on-xs">
      <el-popover class="menu-container" trigger="click"
        ><template #reference
          ><img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" alt=""
        /></template>
        <div class="item-container" @click="onProfileClick">
          <span class="item-icon-container">
            <svg viewBox="0 0 448 512" width="20" height="20">
              <path
                d="M448 336v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z"
              /></svg></span
          ><span class="item-text">View Profile</span>
        </div>
        <div class="item-container" @click="onLogOutClick">
          <span class="item-icon-container">
            <svg viewBox="0 0 512 512" width="20" height="20">
              <path
                d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z"
              /></svg></span
          ><span class="item-text">Log Out</span>
        </div></el-popover
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
const props = defineProps({
  userID: {
    type: String,
    default: "",
  },
  active: { type: String, default: "0" },
  avatar: {
    type: Number,
    default: 0,
  },
});
const onHomeClick = () => {
  router.push({ path: "/" });
};
const onFriendsClick = () => {
  router.push({ path: "/following" });
};
const onChatClick = () => {
  router.push({ path: "/chat" });
};
const onProfileClick = () => {
  router.push(`/profile/${props.userID}`);
};
const onLogOutClick = () => {
  localStorage.removeItem("token");
  router.push({ path: "/login" });
};
</script>
<style scoped lang="scss">
.nav-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.inner {
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
}
.aside {
  width: 200px;
  justify-content: flex-end;
}
.nav-btn-wrapper {
  width: 120px;
  min-width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
}
.nav-btn {
  width: 100%;
  margin: 3px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: var(--hover-background-color);
  }
}
.nav-icon {
  color: var(--el-color-primary);
  fill: var(--el-color-primary);
}
.avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
}
.item-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-radius: var(--el-border-radius-base);
  &:hover {
    background-color: var(--hover-background-color);
  }
}
.item-icon-container {
  width: 36px;
  height: 36px;
  line-height: 48px;
  text-align: center;
  background-color: #e4e6eb;
  margin: 8px 12px 8px 4px;
  border-radius: 50%;
}
.item-text {
  color: var(--el-text-color-primary);
  font-size: 15px;
  font-weight: 500;
}
</style>
