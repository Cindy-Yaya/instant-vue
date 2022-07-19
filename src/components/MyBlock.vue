<template>
  <div class="header-container">
    <img
      class="avatar"
      :src="`/img/icons/avatar-${avatar}.jpg`"
      alt=""
      @click="onAvatarClick"
    />
    <el-input
      v-model="content"
      class="input"
      size="large"
      :placeholder="`What's on your mind, ${username}?`"
      @keyup.enter="onPostClick"
    />
  </div>
</template>

<script setup lang="ts">
import { postInstant } from "@/apis/instant";
import router from "@/router";
import { ElMessage } from "element-plus";
import { ref } from "vue";
const props = defineProps({
  userID: { type: String, default: "" },
  username: { type: String, default: "" },
  avatar: { type: Number, default: 0 },
  loadInstants: { type: Function, default: () => {} },
});
const content = ref("");
const onPostClick = () => {
  postInstant(content.value).then((res) => {
    console.log(res);
    if (res?.code === 201) {
      ElMessage.success("Post success!");
      content.value = "";
      props.loadInstants(0);
    }
  });
};
const onAvatarClick = () => {
  router.push(`/profile/${props.userID}`);
};
</script>

<style scoped lang="scss">
.header-container {
  display: flex;
  flex-direction: row;
  max-width: 720px;
  border-radius: 12px;
  background: white;
  margin: 12px auto;
  padding: 6px 0;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.2);
}
.avatar {
  padding: 12px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  object-fit: cover;
}
.input {
  align-items: center;
  margin: 12px;
}
</style>
