<template>
  <el-container>
    <el-header class="header">
      <MainHeader active="2" />
    </el-header>
    <el-container class="contentContainer">
      <el-aside class="baseContainer hideOnMs" width="auto">
        <div class="baseLine">
          <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" alt="" />
          <div class="lineText">Yaya and Evan</div>
        </div>
        <div class="baseLine">
          <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" alt="" />
          <div class="lineText">Evan and Yaya</div>
        </div> </el-aside
      ><el-main class="mainContainer">
        <div ref="chatContainer" class="chatContainer">
          <MsgBlock
            v-for="i in msgList"
            :key="i.localMsgSeq"
            :msg="i.content"
            :from-self="i.fromSelf"
            :time="i.time"
            :state="i.state"
          />
        </div>
        <div class="inputContainer">
          <el-input
            v-model="msgInput"
            class="msgInput"
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
import { token, userID } from "@/store";
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
  socket.send(
    JSON.stringify({
      token: token.value,
      localmsgseq: count.value,
      sendtime: dayjs().toISOString(),
      from: userID.value,
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
.header {
  height: 54px;
  background-color: #ffffff;
}
.baseContainer {
  height: calc(100vh - 78px);
  min-width: 270px;
  position: sticky;
  top: 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  border-right: 3px solid var(--el-color-primary);
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
.avatar {
  height: 48px;
  width: 48px;
  object-fit: cover;
  border-radius: 10%;
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
.sectionContainer {
  padding-bottom: 24px;
}
.baseHeader {
  color: #65676b;
  font-size: 17px;
  font-weight: 600;
  padding-bottom: 12px;
}
.mainContainer {
  height: calc(100vh - 54px);
}
.chatContainer {
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.inputContainer {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.msgInput {
  width: 90%;
}
</style>
