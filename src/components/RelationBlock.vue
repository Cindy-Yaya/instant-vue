<template>
  <div class="friend-container">
    <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" />
    <div class="name">
      {{ name }}
    </div>
    <div class="tip">
      {{ tip }}
    </div>
    <el-button class="btn" type="primary" @click="onAddClick">
      Add Friend
    </el-button>
    <el-button class="btn" @click="onRemoveClick"> Remove </el-button>
  </div>
</template>
<script setup lang="ts">
import { addFollowing, removeFollowing } from "@/apis/relation";
import { ElMessage } from "element-plus";
const props = defineProps({
  avatar: { type: Number, default: 0 },
  name: { type: String, default: "" },
  tip: { type: String, default: "" },
  userID: { type: String, default: "" },
});
const onAddClick = () => {
  addFollowing(props.userID).then((res) => {
    console.log(res);
    if (res?.code === 202) {
      ElMessage.success("Add following success");
    } else {
      ElMessage.error("Add following failed");
    }
  });
};
const onRemoveClick = () => {
  removeFollowing(props.userID).then((res) => {
    console.log(res);
    if (res?.code === 202) {
      ElMessage.success("Remove following success");
    } else {
      ElMessage.error("Remove following failed");
    }
  });
};
</script>

<style scoped lang="scss">
.friend-container {
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
