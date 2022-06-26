<template>
  <div class="instantBlock">
    <div class="headerContainer">
      <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" alt="" />
      <div class="headerTextContainer">
        <div class="headerName">
          {{ userName }}
        </div>
        <div class="headerTime">
          {{ time }}
        </div>
      </div>
    </div>
    <div class="textContainer" @dblclick="data.showEditDialog = true">
      {{ text }}
    </div>
    <el-dialog v-model="data.showEditDialog">
      <el-form label-width="auto">
        <el-form-item label="Edit Your Instant">
          <el-input
            v-model="data.editInstant"
            type="textarea"
            resize="none"
            autocomplete="off"
            @keyup.enter="updateInstant(insID, data.editInstant)"
          />
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="imgContainer" />
    <div class="infoContainer">
      <div class="likesInfo">
        <div class="iconContainer">
          <img class="iconImg" src="/img/icons/likes.svg" />
        </div>
        <el-tooltip placement="bottom" effect="dark" :content="likesList">
          <div class="infoText">
            {{ isLiked ? `You and ${likes} others` : likes }}
          </div>
        </el-tooltip>
      </div>
      <div class="sharesInfo">
        <el-tooltip placement="bottom" effect="dark" :content="sharesList">
          <div class="infoText">{{ shares }} Shares</div>
        </el-tooltip>
      </div>
    </div>
    <div
      class="btnContainer"
      :style="{
        borderBottom: data.showComments ? `1px solid #ced0d4` : `none`,
      }"
    >
      <div class="btn" @click="likeInstant(insID)">
        <div class="iconContainer">
          <i
            class="bgIcon"
            :style="{
              backgroundPosition: isLiked ? '0px -228px' : '0px -247px',
            }"
          />
        </div>
        Like
      </div>
      <div class="btn" @click="getComments(insID)">
        <div class="iconContainer">
          <i
            class="bgIcon"
            :style="{
              backgroundPosition: '0px -209px',
            }"
          />
        </div>
        Comment
      </div>
      <div class="btn" @click="data.showShareDialog = !data.showShareDialog">
        <div class="iconContainer">
          <i
            class="bgIcon"
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
    <div v-show="data.showComments" class="commentContainer">
      <div class="commentInputContainer">
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
      <div class="commentLineContainer">
        <div class="iconContainer" style="margin: 12px 6px 6px 12px">
          <el-avatar
            size="small"
            shape="circle"
            src="/img/icons/avatar-0.jpg"
          />
        </div>
        <div class="commentLine">
          <div class="commentLineText">
            {{ data.comments[0] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { reactive } from "vue";
import {
  likeInstant,
  getComments,
  sendComment,
  shareInstant,
  updateInstant,
} from "@/apis/instant";
const props = defineProps({
  insID: { type: Number, default: 0 },
  userName: { type: String, default: "" },
  avatar: { type: String, default: "" },
  time: { type: String, default: "" },
  text: { type: String, default: "" },
  isLiked: { type: Boolean, default: false },
  likes: { type: String, default: "" },
  shares: { type: String, default: "" },
  getInstants: { type: Function, default: () => {} },
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
let likesList = `Evan, Yaya and 23 more...`;
let sharesList = `Evan, Yaya and 7 more...`;
</script>
<style scoped lang="scss">
.instantBlock {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: white;
  margin: 12px auto;
  padding: 6px 0;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.2);
}
.headerContainer {
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
.headerTextContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.headerName {
  font-size: 15px;
  font-weight: bold;
}
.headerTime {
  font-size: 14px;
}
.textContainer {
  margin: 0;
  padding: 12px;
  text-align: left;
  word-wrap: break-word;
}
.infoContainer {
  margin: 0 12px;
  padding: 6px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ced0d4;
}
.likesInfo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.sharesInfo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.iconContainer {
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconImg {
  height: 18px;
  width: 18px;
  aspect-ratio: auto 18 / 18;
}
.btnContainer {
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
.bgIcon {
  background-image: url("/img/icons/background-icons.png");
  background-size: 25px 571px;
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
}
.commentInputContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 12px;
}
.commentLineContainer {
  display: flex;
  flex-direction: row;
  margin: 0 12px;
}
.commentLine {
  margin: 6px 12px 12px 6px;
  padding: 12px;
  border-radius: 12px;
  background-color: #f0f2f5;
}
.commentLineText {
  text-align: left;
}
</style>
