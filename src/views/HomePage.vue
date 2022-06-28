<template>
  <el-container>
    <el-header class="header">
      <MainHeader active="0" />
    </el-header>
    <el-container class="content-container">
      <el-aside class="base-container hide-on-ms" width="auto"
        ><SidePanel
      /></el-aside>
      <el-main class="main-container">
        <MyBlock user-name="Evan" avatar="0" />
        <InstantBlock
          v-for="i in instantData"
          :key="i.insID"
          :ins-i-d="i.insID"
          user-name="Evan"
          avatar="0"
          :time="i.createTime.format('MMM D, YYYY')"
          :text="i.content"
          likes="25"
          shares="9"
        /> </el-main
      ><el-aside class="base-container hide-on-xs" width="auto">
        <div class="section-container">
          <div class="base-header">Contacts</div>
          <div class="base-line">
            <img
              class="line-icon"
              src="/img/icons/avatar-0.jpg"
              style="border-radius: 10%"
            />
            <div class="line-text">Yaya</div>
          </div>
        </div>
        <div class="section-container">
          <div class="base-header">Group Conversations</div>
          <div class="base-line">
            <img
              class="line-icon"
              src="/img/icons/avatar-0.jpg"
              style="border-radius: 10%"
            />
            <div class="line-text">Evan and Yaya</div>
          </div>
        </div>
      </el-aside>
    </el-container>
    <el-backtop />
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import InstantBlock from "@/components/InstantBlock.vue";
import MyBlock from "@/components/MyBlock.vue";
import MainHeader from "@/components/MainHeader.vue";
import SidePanel from "@/components/SidePanel.vue";
import { getInstants, InstantType } from "@/apis/instant";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
const index = ref(0);
const instantData = reactive<InstantType[]>([]);
const loadInstants = (i: number) => {
  getInstants(i).then((res) => {
    console.log(res);
    if (res?.code === 200) {
      if (i === 0) {
        instantData.length = 0;
      }
      if (res.data.length > 0) {
        res.data.forEach((item: any) => {
          instantData.push({
            insID: item.insID,
            createTime: dayjs(item.createTime),
            updateTime: dayjs(item.updateTime),
            content: item.content,
          });
        });
        index.value += 10;
      } else {
        ElMessage.info("No new posts");
      }
    }
  });
};
const loadMore = () => {
  if (window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight) {
    loadInstants(index.value);
  }
};
onMounted(() => {
  window.addEventListener("scroll", loadMore);
  loadInstants(0);
});
onUnmounted(() => {
  window.removeEventListener("scroll", loadMore);
});
</script>

<style scoped lang="scss">
.header {
  height: 54px;
  background-color: #ffffff;
}
.base-container {
  min-width: 270px;
  position: sticky;
  height: fit-content;
  top: 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
}
.base-line {
  height: 54px;
  margin: 0 6px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background-color: rgb(0 0 0 / 0.05);
  }
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
</style>
