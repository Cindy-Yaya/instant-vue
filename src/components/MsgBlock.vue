<template>
  <div
    class="chatLine"
    :style="{
      flexDirection: fromself ? 'row' : 'row-reverse',
      alignSelf: fromself ? 'flex-end' : 'flex-start',
    }"
  >
    <div
      class="msgContainer"
      :style="{ alignItems: fromself ? 'flex-end' : 'flex-start' }"
    >
      <div class="time">{{ time }}</div>
      <div class="message" :class="fromself ? '' : 'other'">{{ msg }}</div>
    </div>
    <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" alt="" />
  </div>
</template>
<script setup lang="ts">
import { Dayjs } from 'dayjs';
import { defineProps } from 'vue';
const props = defineProps({
  msg: String,
  avatar: Number,
  fromself: Boolean,
  time: String,
  state: Number,
});
</script>
<style lang="scss">
.chatLine {
  max-width: 60%;
  display: flex;
  flex-direction: row;
}
.msgContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.time {
  font-size: 12px;
  margin: 6px;
}
.message {
  color: white;
  text-align: justify;
  word-break: break-all;
  background: var(--el-color-primary);
  padding: 6px 12px;
  margin: 0px 12px;
  font-size: 16px;
  border-radius: 6px;
  position: relative;
  &:after {
    left: 100%;
    top: 12%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    border-top-color: var(--el-color-primary);
    border-width: 12px;
    margin-left: -12px;
  }
}
.other {
  background: var(--el-color-success);
  &:after {
    border-top-color: var(--el-color-success);
    left: 0%;
  }
}
.iconContainer {
  height: 48px;
  width: 48px;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
