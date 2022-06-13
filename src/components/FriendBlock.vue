<template>
  <div class="friendContainer">
    <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" />
    <div class="name">{{ name }}</div>
    <div class="tip">{{ tip }}</div>
    <el-button class="btn" type="primary" @click="addFriend(friendid)"
      >Add Friend</el-button
    >
    <el-button class="btn" @click="removeFriend(friendid)">Remove</el-button>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { defineProps } from 'vue';
import { getFriends, addFriend, removeFriend } from '@/apis/friend';
const props = defineProps({
  avatar: Number,
  name: String,
  tip: String,
  friendid: Number,
});
</script>
<style scoped lang="scss">
.friendContainer {
  max-width: 250px;
  min-width: 200px;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: solid 1px #ced0d4;
  padding-bottom: 3px;
  margin: 3px;
  flex-basis: 0px;
  flex-shrink: 1;
  flex-grow: 1;
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.name {
  font-weight: 600;
  margin: 6px 3px 3px 3px;
}
.tip {
  color: #65676b;
  font-size: 15px;
  font-weight: 400;
  margin: 3px;
}
.btn {
  margin: 3px 12px;
}
</style>
