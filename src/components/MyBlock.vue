<template>
  <div class="headerContainer">
    <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" alt="" />
    <el-input
      class="input"
      size="large"
      v-model="content"
      :placeholder="placeholder"
      @keyup.enter="post"
    />
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ElMessage } from 'element-plus';
import { defineProps, ref } from 'vue';
const props = defineProps({
  userName: String,
  avatar: String,
  userID: Number,
  token: String,
  getInstants: Function,
});
const content = ref('');
const placeholder = `What's on your mind, ${props.userName}?`;
const post = async () => {
  await fetch('http://localhost:8081/instant/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authentication: props.token ? props.token : '',
    },
    body: JSON.stringify({
      UserID: props.userID,
      Content: content.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        props.getInstants ? props.getInstants(0) : null;
      } else ElMessage.error(`Send Instant Failed. Code: ${res.code}`);
    });
};
</script>

<style scoped lang="scss">
.headerContainer {
  display: flex;
  flex-direction: row;
  max-width: 720px;
  border-radius: 12px;
  background: white;
  margin: 12px auto;
  padding: 6px 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
