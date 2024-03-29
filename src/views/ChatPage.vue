<template>
  <el-container>
    <el-header class="header">
      <MainHeader active="2" />
    </el-header>
    <el-container class="content-container">
      <el-aside class="base-container hide-on-ms" width="auto">
        <div class="base-line">
          <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" alt="" />
          <div class="line-text">Yaya and Evan</div>
        </div>
        <div class="base-line">
          <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" alt="" />
          <div class="line-text">Evan and Yaya</div>
        </div> </el-aside
      ><el-main class="main-container">
        <div ref="chatContainer" class="chat-container">
          <MsgBlock
            v-for="i in msgList"
            :key="i.localMsgSeq"
            :msg="i.content"
            :from-self="i.fromSelf"
            :time="i.time"
            :state="i.state"
          />
        </div>
        <div class="input-container">
          <el-input
            v-model="msgInput"
            class="msg-input"
            size="large"
            @keyup.enter="sendMsg"
          />
        </div>
      </el-main>
    </el-container>
    <el-backtop />
  </el-container>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from "vue";
import router from "@/router";
import dayjs from "dayjs";
import MainHeader from "@/components/MainHeader.vue";
import MsgBlock from "@/components/MsgBlock.vue";
type MsgType = {
  content: string;
  fromSelf: boolean;
  time: string;
  localMsgSeq: number;
  state: number;
};
const chatContainer = ref<HTMLDivElement | null>(null);
let msgList = reactive<MsgType[]>([]);
const count = ref(0);
const avatar = ref(0);
const msgInput = ref("");
let socket = new WebSocket("ws://localhost:8081/chat/echo");
const onSocketOpen = () => {
  console.log("Socket Opens");
};
const onSocketError = () => {
  console.log("Socket Error");
};
const onSocketMessage = (event: unknown) => {
  const e = event as { data: string; timestamp: number };
  const temp = JSON.parse(e.data);
  console.log(temp);
  switch (temp.type) {
    case 0:
      for (let i = msgList.length - 1; i >= 0; i--) {
        if (msgList[i].localMsgSeq === temp.localMsgSeq) {
          msgList[i].state = 1;
          msgList[i].time = dayjs(e.timestamp).format("MMM D, h:mm A");
        }
      }
      break;
    case 1:
      msgList.push({
        content: temp.content,
        fromSelf: false,
        time: dayjs(e.timestamp).format("MMM D, h:mm A"),
        localMsgSeq: count.value,
        state: 0,
      });
      count.value += 1;
      nextTick(scrollToBottom);
      break;
  }
};
const onSocketClose = () => {
  console.log("Socket Closes");
};
const sendMsg = () => {
  msgList.push({
    content: msgInput.value,
    fromSelf: true,
    time: dayjs().format("MMM D, h:mm A"),
    localMsgSeq: count.value,
    state: 0,
  });
  nextTick(scrollToBottom);
  const token = localStorage.getItem("token");
  socket.send(
    JSON.stringify({
      token: token ? token : "",
      localmsgseq: count.value,
      sendtime: dayjs().toISOString(),
      group: 0,
      content: msgInput.value,
    })
  );
  count.value += 1;
};
const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};
onMounted(() => {
  socket.addEventListener("open", onSocketOpen);
  socket.addEventListener("error", onSocketError);
  socket.addEventListener("message", onSocketMessage);
  socket.addEventListener("close", onSocketClose);
});
onUnmounted(() => {
  socket.removeEventListener("open", onSocketOpen);
  socket.removeEventListener("error", onSocketError);
  socket.removeEventListener("message", onSocketMessage);
  socket.removeEventListener("close", onSocketClose);
});
</script>

<style scoped lang="scss">
.base-container {
  height: calc(100vh - 78px);
  min-width: 270px;
  position: sticky;
  top: 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  border-right: 3px solid var(--el-color-primary);
}
.base-line {
  height: 54px;
  margin: 0 6px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background-color: var(--hover-background-color);
  }
}
.avatar {
  height: 48px;
  width: 48px;
  object-fit: cover;
  border-radius: 10%;
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
.section-container {
  padding-bottom: 24px;
}
.base-header {
  color: #65676b;
  font-size: 17px;
  font-weight: 600;
  padding-bottom: 12px;
}
.main-container {
  height: calc(100vh - 54px);
}
.chat-container {
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.input-container {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.msg-input {
  width: 90%;
}
</style>
