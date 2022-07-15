<template>
  <div class="instant-block">
    <div class="header-container">
      <img
        class="avatar"
        :src="`/img/icons/avatar-${avatar}.jpg`"
        alt=""
        @click="onUserClick"
      />
      <div class="header-text-container">
        <div class="header-name" @click="onUserClick">
          {{ username }}
        </div>
        <div class="header-time">
          {{ time }}
        </div>
      </div>
    </div>
    <div class="text-container" @dblclick="data.showEditDialog = true">
      {{ text }}
    </div>
    <el-dialog v-model="data.showEditDialog">
      <div>Edit Your Instant</div>
      <el-input
        v-model="data.editInstant"
        size="large"
        @keyup.enter="onUpdateClick"
      />
    </el-dialog>
    <div class="img-container" />
    <div class="info-container">
      <div class="likes-info">
        <div class="icon-container">
          <img class="icon-img" src="/img/icons/likes.svg" />
        </div>
        <el-tooltip placement="bottom" effect="dark" :content="likesList">
          <div class="info-text">
            {{ attitude > 0 ? `You and ${likes} others` : likes }}
          </div>
        </el-tooltip>
      </div>
      <div class="shares-info">
        <el-tooltip placement="bottom" effect="dark" :content="sharesList">
          <div class="info-text">{{ shares }} Shares</div>
        </el-tooltip>
      </div>
    </div>
    <div
      class="btn-container"
      :style="{
        borderBottom: data.showComments ? `1px solid #ced0d4` : `none`,
      }"
    >
      <div class="btn" @click="onLikeClick">
        <div class="icon-container">
          <i
            class="bg-icon"
            :style="{
              backgroundPosition: attitude > 0 ? '0px -228px' : '0px -247px',
            }"
          />
        </div>
        Like
      </div>
      <div class="btn" @click="getComments(insID)">
        <div class="icon-container">
          <i
            class="bg-icon"
            :style="{
              backgroundPosition: '0px -209px',
            }"
          />
        </div>
        Comment
      </div>
      <div class="btn" @click="data.showShareDialog = !data.showShareDialog">
        <div class="icon-container">
          <i
            class="bg-icon"
            :style="{
              backgroundPosition: '0px -266px',
            }"
          />
        </div>
        Share
      </div>
      <el-dialog v-model="data.showShareDialog">
        <el-form inline="true">
          <el-form-item label="Share Message">
            <el-input v-model="data.shareInput" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="shareInstant(data.shareInput, insID)"
            >
              Share
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div v-show="data.showComments" class="comment-container">
      <div class="comment-input-container">
        <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" />
        <el-input
          v-model="data.commentInput"
          autocomplete="off"
          style="margin: 0 12px"
        /><el-button
          type="primary"
          style="margin: 0 12px"
          @click="sendComment(insID, data.commentInput)"
        >
          Send
        </el-button>
      </div>
      <div class="comment-line-container">
        <div class="icon-container" style="margin: 12px 6px 6px 12px">
          <el-avatar
            size="small"
            shape="circle"
            src="/img/icons/avatar-0.jpg"
          />
        </div>
        <div class="comment-line">
          <div class="comment-line-text">
            {{ data.comments[0] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getComments,
  likeInstant,
  sendComment,
  shareInstant,
  updateInstant,
} from "@/apis/instant";
import router from "@/router";
import { ElMessage } from "element-plus";
import { reactive } from "vue";
const props = defineProps({
  insID: { type: String, default: "" },
  userID: { type: String, default: "" },
  username: { type: String, default: "" },
  avatar: { type: Number, default: 0 },
  time: { type: String, default: "" },
  text: { type: String, default: "" },
  attitude: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  loadInstants: { type: Function, default: () => {} },
});
type InstantType = {
  shareInput: string;
  commentInput: string;
  editInstant: string;
  showEditDialog: boolean;
  showShareDialog: boolean;
  showComments: boolean;
  likes: string[];
  comments: string[];
  shares: string[];
};
const data = reactive<InstantType>({
  shareInput: "",
  commentInput: "",
  editInstant: "",
  showEditDialog: false,
  showShareDialog: false,
  showComments: false,
  likes: [],
  comments: [],
  shares: [],
});
const likesList = `Evan, Yaya and 23 more...`;
const sharesList = `Evan, Yaya and 7 more...`;
const onUserClick = () => {
  router.push(`/profile/${props.userID}`);
};
const onUpdateClick = () => {
  updateInstant(props.insID, data.editInstant).then((res) => {
    if (res?.code === 201) {
      data.editInstant = "";
      data.showEditDialog = false;
      props.loadInstants(0);
    }
  });
};
const onLikeClick = () => {
  likeInstant(props.insID, 1).then((res) => {
    if (res?.code === 201) {
      ElMessage.success("Liked");
    }
  });
};
</script>

<style scoped lang="scss">
.instant-block {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: white;
  margin: 12px auto;
  padding: 6px 0;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.2);
}
.header-container {
  display: flex;
  flex-direction: row;
}
.avatar {
  padding: 12px;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  object-fit: cover;
}
.header-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.header-name {
  font-size: 15px;
  font-weight: bold;
}
.header-time {
  font-size: 14px;
}
.text-container {
  margin: 0;
  padding: 12px;
  text-align: left;
  word-wrap: break-word;
}
.info-container {
  margin: 0 12px;
  padding: 6px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ced0d4;
}
.likes-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.shares-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.icon-container {
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-img {
  height: 18px;
  width: 18px;
  aspect-ratio: auto 18 / 18;
}
.btn-container {
  margin: 0 12px;
  padding: 6px;
  display: flex;
  flex-direction: row;
}
.btn {
  margin: 0 12px;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  &:hover {
    background-color: rgb(0 0 0 / 0.05);
  }
}
.bg-icon {
  background-image: url("/img/icons/background-icons.png");
  background-size: 25px 571px;
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
}
.comment-input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 12px;
}
.comment-line-container {
  display: flex;
  flex-direction: row;
  margin: 0 12px;
}
.comment-line {
  margin: 6px 12px 12px 6px;
  padding: 12px;
  border-radius: 12px;
  background-color: #f0f2f5;
}
.comment-line-text {
  text-align: left;
}
</style>
