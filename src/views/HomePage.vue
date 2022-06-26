<template>
  <el-container>
    <el-header class="header">
      <MainHeader active="0" />
    </el-header>
    <el-container class="contentContainer">
      <el-aside class="baseContainer hideOnMs" width="auto">
        <el-container>
          <el-header>
            <div class="baseLine">
              <img
                class="lineIcon"
                src="/img/icons/avatar-0.jpg"
                style="border-radius: 50%"
              />
              <div class="lineText">Evan</div>
            </div> </el-header
          ><el-main>
            <div class="baseLine">
              <div class="iconContainer">
                <img class="lineIcon" src="/img/icons/find-friends.png" />
              </div>
              <div class="lineText">Find Friends</div>
            </div>
            <div class="baseLine">
              <div class="iconContainer">
                <img class="lineIcon" src="/img/icons/groups.png" />
              </div>
              <div class="lineText">Groups</div>
            </div>
            <div class="baseLine">
              <div class="iconContainer">
                <img class="lineIcon" src="/img/icons/memories.png" />
              </div>
              <div class="lineText">Memories</div>
            </div>
            <div class="baseLine">
              <div class="iconContainer">
                <img class="lineIcon" src="/img/icons/saved.png" />
              </div>
              <div class="lineText">Saved</div>
            </div>
            <div class="baseLine">
              <div class="iconContainer">
                <img class="lineIcon" src="/img/icons/pages.png" />
              </div>
              <div class="lineText">Pages</div>
            </div>
            <div class="baseLine">
              <div class="iconContainer">
                <img class="lineIcon" src="/img/icons/events.png" />
              </div>
              <div class="lineText">Events</div>
            </div>
            <div class="baseLine">
              <div class="iconContainer">
                <img class="lineIcon" src="/img/icons/most-recent.png" />
              </div>
              <div class="lineText">Most Recennt</div>
            </div>
            <div class="baseLine">
              <div class="iconContainer">
                <img class="lineIcon" src="/img/icons/favorites.png" />
              </div>
              <div class="lineText">Favorties</div>
            </div>
            <div class="baseLine">
              <div class="iconContainer">
                <img class="lineIcon" src="/img/icons/weather.png" />
              </div>
              <div class="lineText">Weather</div>
            </div>
          </el-main>
          <el-footer>Privacy · Terms · ZYChimne @ 2022</el-footer>
        </el-container> </el-aside
      ><el-main class="mainContainer">
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
      ><el-aside class="baseContainer hideOnXs" width="auto">
        <div class="sectionContainer">
          <div class="baseHeader">Contacts</div>
          <div class="baseLine">
            <img
              class="lineIcon"
              src="/img/icons/avatar-0.jpg"
              style="border-radius: 10%"
            />
            <div class="lineText">Yaya</div>
          </div>
        </div>
        <div class="sectionContainer">
          <div class="baseHeader">Group Conversations</div>
          <div class="baseLine">
            <img
              class="lineIcon"
              src="/img/icons/avatar-0.jpg"
              style="border-radius: 10%"
            />
            <div class="lineText">Evan and Yaya</div>
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
import { getInstants, InstantType } from "@/apis/instant";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
const index = ref(0);
const instantData = reactive<InstantType[]>([]);
const loadInstants = (index: number) => {
  getInstants(index).then((res) => {
    console.log(res);
    if (res?.code === 200) {
      instantData.length = 0;
      res.data.forEach((item: any) => {
        instantData.push({
          insID: item.insID,
          createTime: dayjs(item.createTime),
          updateTime: dayjs(item.updateTime),
          content: item.content,
        });
      });
    }
  });
};
const loadMore = () => {
  if (window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight) {
    index.value += 10;
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
.baseContainer {
  min-width: 270px;
  position: sticky;
  height: fit-content;
  top: 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
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
</style>
