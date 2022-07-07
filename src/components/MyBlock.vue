<template>
  <div class="header-container">
    <img class="avatar" :src="`/img/icons/avatar-${avatar}.jpg`" alt="" />
    <el-input
      v-model="content"
      class="input"
      size="large"
      :placeholder="`What's on your mind, ${username}?`"
      @keyup.enter="onPost"
    />
  </div>
</template>

<script setup lang="ts">
import { postInstant } from "@/apis/instant";
import { ElMessage } from "element-plus";
import { ref } from "vue";
const props = defineProps({
  username: { type: String, default: "" },
  avatar: { type: Number, default: 0 },
  loadInstants: { type: Function, default: () => {} },
});
const content = ref("");
const onPost = () => {
  postInstant(content.value).then((res) => {
    console.log(res);
    if (res?.code === 201) {
      ElMessage.success("Post success!");
      content.value = "";
      props.loadInstants(0);
    }
  })
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
