<template>
  <div class="header-container">
    <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" alt="" />
    <el-input
      v-model="content"
      class="input"
      size="large"
      :placeholder="placeholder"
      @keyup.enter="onPost"
    />
  </div>
</template>

<script setup lang="ts">
import { postInstant } from "@/apis/instant";
import { ref } from "vue";
const props = defineProps({
  userName: { type: String, default: "" },
  avatar: { type: String, default: "" },
  userID: { type: Number, default: 0 },
  token: { type: String, default: "" },
  getInstants: { type: Function, default: () => {} },
});
const content = ref("");
const placeholder = `What's on your mind, ${props.userName}?`;
const onPost = () => {
  postInstant(content.value);
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
