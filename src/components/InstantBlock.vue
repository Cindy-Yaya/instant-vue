<template>
  <div class="instant-block">
    <div class="header-container">
      <div class="header-left">
        <img
          class="avatar"
          :src="`/img/icons/avatar-${avatar}.jpg`"
          alt=""
          @click="onUserClick(userID)"
        />
        <div class="header-text-container">
          <div class="header-name" @click="onUserClick(userID)">
            {{ username }}
          </div>
          <div class="header-time">
            {{ time }}
          </div>
        </div>
      </div>
      <div class="header-right">
        <template v-if="data.editable"
          ><el-button size="small" circle @click="onCancelClick"
            ><svg viewBox="0 0 320 512" width="12" height="12" fill="#050505">
              <path
                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
              />
            </svg>
          </el-button>
          <el-button
            class="header-btn"
            type="primary"
            size="small"
            circle
            @click="onUpdateConfirmClick"
            ><svg viewBox="0 0 512 512" width="12" height="12" fill="#fff">
              <path
                d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"
              /></svg></el-button
        ></template>
        <template v-else
          ><el-popover placement="bottom-end" trigger="click"
            ><template #reference
              ><div class="header-right-icon-container">
                <svg
                  viewBox="0 0 448 512"
                  width="15"
                  height="15"
                  fill="#65676B"
                >
                  <path
                    d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"
                  />
                </svg></div
            ></template>
            <template v-if="isMySelf"
              ><div class="menu-container" @click="data.editable=true">
                <svg
                  viewBox="0 0 512 512"
                  width="12"
                  height="12"
                  fill="#65676B"
                >
                  <path
                    d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"
                  />
                </svg>
                Update
              </div>
              <div class="menu-container">
                <svg
                  viewBox="0 0 448 512"
                  width="12"
                  height="12"
                  fill="#65676B"
                >
                  <path
                    d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"
                  />
                </svg>
                Delete
              </div></template
            >
            <div v-else class="menu-container">
              <svg viewBox="0 0 640 512" width="12" height="12" fill="#65676B">
                <path
                  d="M274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM577.9 223.1l47.03-47.03c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L544 190.1l-47.03-47.03c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03l-47.03 47.03c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L544 257.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94L577.9 223.1z"
                />
              </svg>
              Unfollow {{ username }}
            </div>
          </el-popover></template
        >
      </div>
    </div>
    <textarea
      class="text-container"
      :value="text"
      :readonly="!data.editable"
      @input="onTextInput"
      @dblclick="onTextDoubleClick"
    />
    <div class="img-container" />
    <div class="info-container">
      <div class="likes-info">
        <div class="icon-container">
          <img class="icon-img" src="/img/icons/likes.svg" />
        </div>
        <el-tooltip placement="bottom" effect="dark">
          <template #content
            ><div
              v-for="item in data.likes"
              :key="item.userID"
              @click="onUserClick(item.userID)"
            >
              {{ item.username }}
            </div></template
          >
          <div class="info-text" @pointerenter="onLikePointerEnter">
            {{
              attitude > 0
                ? `You${likes - 1 > 0 ? ` and ${likes - 1} others` : ``}`
                : likes
            }}
          </div>
        </el-tooltip>
      </div>
      <div class="shares-info">
        <el-tooltip placement="bottom" effect="dark">
          <template #content></template>
          <div class="info-text">
            {{ shares > 0 ? `${shares} Shares` : "0 Share" }}
          </div>
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
      <div class="btn" @click="onCommentClick">
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
          @click="onSendCommentClick"
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
  getLikesUserInfo,
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
  isMySelf: { type: Boolean, default: true },
  loadInstants: { type: Function, default: () => {} },
});
type DataType = {
  shareInput: string;
  commentInput: string;
  editInstant: string;
  editable: boolean;
  showShareDialog: boolean;
  showComments: boolean;
  comments: string[];
  likes: { username: string; userID: string }[];
  shares: string[];
};
const data = reactive<DataType>({
  shareInput: "",
  commentInput: "",
  editInstant: "",
  editable: false,
  showShareDialog: false,
  showComments: false,
  comments: [],
  likes: [],
  shares: [],
});
const onUserClick = (userID: string) => {
  router.push(`/profile/${userID}`);
};
const onTextInput = (event: Event) => {
  if (data.editable && event.target) {
    data.editInstant = (event.target as HTMLTextAreaElement).value;
  }
};
const onTextDoubleClick = () => {
  data.editable = true;
};
const onCancelClick = () => {
  data.editable = false;
};
const onUpdateConfirmClick = () => {
  updateInstant(props.insID, data.editInstant).then((res) => {
    if (res?.code === 201) {
      data.editInstant = "";
      data.editable = false;
      props.loadInstants(0);
      ElMessage.success("Update successfully");
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
const onLikePointerEnter = () => {
  getLikesUserInfo(props.insID, 0).then((res) => {
    if (res?.code === 200) {
      data.likes = res.data;
    }
  });
};
const onCommentClick = () => {
  data.showComments = !data.showComments;
  if (data.showComments) {
    getComments(props.insID, 0).then((res) => {
      if (res?.code === 200) {
        data.comments = res.data;
      }
    });
  }
};
const onSendCommentClick = () => {
  sendComment(props.insID, data.commentInput, true).then((res) => {
    if (res?.code === 201) {
      data.commentInput = "";
      getComments(props.insID, 0).then((res) => {
        if (res?.code === 200) {
          data.comments = res.data;
        }
      });
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
  box-shadow: var(--box-shadow);
}
.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.avatar {
  margin: 12px;
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
  &:hover {
    text-decoration: underline;
  }
}
.header-time {
  font-size: 12px;
}
.header-btn {
  margin-right: 12px;
}
.header-right-icon-container {
  height: 36px;
  width: 36px;
  line-height: 40px;
  margin-right: 12px;
  border-radius: 50%;
  text-align: center;
  &:hover {
    background-color: var(--hover-background-color);
  }
}
.menu-container {
  padding: 8px;
  border-radius: var(--el-border-radius-base);
  &:hover {
    background-color: var(--hover-background-color);
  }
}
.text-container {
  margin: 0;
  padding: 12px 12px 3px;
  font-size: 15px;
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
.info-text {
  &:hover {
    text-decoration: underline;
  }
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
    background-color: var(--hover-background-color);
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
