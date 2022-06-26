<template>
  <el-container>
    <el-header class="header">
      <MainHeader active="1" />
    </el-header>
    <el-container class="contentContainer">
      <el-aside class="baseContainer hideOnMs" width="auto">
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
        </div> </el-aside
      ><el-main class="main-container">
        <div class="weather-container">
          <div class="title">Weather in Shanghai</div>
          <div class="temp-container">
            <div class="subtitle">{{ weatherNowData.temp }}°</div>
            <div class="sub-temp-container">
              <div class="sub">
                H:
                {{ weatherWeekData.length ? weatherWeekData[0].tempMax : null }}
                L:
                {{ weatherWeekData.length ? weatherWeekData[0].tempMin : null }}
              </div>
              <div class="sub">
                {{ weatherNowData.text }}
              </div>
            </div>
          </div>
          <div class="hour-container">
            <div
              v-for="item in weatherTodayData"
              :key="item.fxTime"
              class="hour"
            >
              <div class="icon-container">
                <i class="icon" :class="`qi-${item.icon}`" />
              </div>
              <div class="title">{{ item.temp }}°</div>
              <div class="subtitle">
                {{ dayjs(item.fxTime).format("h A") }}
              </div>
            </div>
          </div>
          <div class="week-container">
            <div
              v-for="item in weatherWeekData.slice(1, 7)"
              :key="item.fxDate"
              class="week"
            >
              <div class="icon-container">
                <i class="icon" :class="`qi-${item.iconDay}`" />
              </div>
              <div class="text-container">
                <div class="title">
                  {{ dayjs(item.fxDate).format("dddd") }}
                </div>
                <div class="subtitle">
                  {{ item.textDay }}
                </div>
              </div>
              <div class="temp-container">
                <div class="title">{{ item.tempMax }}°C</div>
                <div class="subtitle">{{ item.tempMin }}°C</div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-backtop />
  </el-container>
</template>

<script setup lang="ts">
import {
  InitialWeatherNow,
  WeatherDailyType,
  WeatherHourlyType,
  WeatherNowType,
} from "@/apis/types";
import {
  getWeatherOfNow,
  getWeatherOfToday,
  getWeatherOfWeek,
} from "@/apis/weather";
import MainHeader from "@/components/MainHeader.vue";
import dayjs from "dayjs";
import { ref, onMounted } from "vue";
const weatherNowData = ref<WeatherNowType>(InitialWeatherNow);
const weatherTodayData = ref<WeatherHourlyType[]>([]);
const weatherWeekData = ref<WeatherDailyType[]>([]);
const InitialLocation = "101020100";
const loadWeatherOfNow = (location: string) => {
  getWeatherOfNow(location).then((res) => {
    weatherNowData.value = res;
  });
};
const loadWeatherOfToday = (location: string) => {
  getWeatherOfToday(location).then((res) => {
    weatherTodayData.value = res;
  });
};
const loadWeatherOfWeek = (location: string) => {
  getWeatherOfWeek(location).then((res) => {
    weatherWeekData.value = res;
  });
};
onMounted(() => {
  loadWeatherOfNow(InitialLocation);
  loadWeatherOfToday(InitialLocation);
  loadWeatherOfWeek(InitialLocation);
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
    background-color: rgb(0 0 0 / 0.05);
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
.main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.weather-container {
  background: white;
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 12px 0;
  .title {
    font-size: 32px;
    font-weight: 700;
    color: #050505;
    margin: 6px;
  }
  .temp-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px 0;
    .subtitle {
      font-size: 40px;
      font-weight: 700;
      color: #050505;
      margin: 0 12px;
    }
    .sub-temp-container {
      display: flex;
      flex-direction: column;
      .sub {
        font-size: 16px;
        font-weight: 500;
        margin: 0 3px;
      }
    }
  }
}
.hour-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-padding: 0px;
  overscroll-behavior-x: contain;
  .hour {
    display: flex;
    flex-direction: column;
    .icon-container {
      height: 96px;
      width: 96px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon {
      &::before {
        font-size: 48px;
      }
    }
    .title {
      font-size: 15px;
      color: #050505;
      font-weight: 400;
    }
    .subtitle {
      font-size: 12px;
    }
  }
}
.week-container {
  display: flex;
  flex-direction: column;
  margin: 12px;
  .week {
    display: flex;
    flex-direction: row;
    margin: 12px;
    .icon-container {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: solid 1px grey;
    }
    .icon {
      &::before {
        font-size: 36px;
      }
    }
    .text-container {
      margin: 0 24px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      flex-grow: 1;
      .title {
        font-size: 17px;
        font-weight: 600;
        color: #050505;
      }
      .subtitle {
        font-size: 17px;
        font-weight: 400;
      }
    }
    .temp-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 17px;
        font-weight: 500;
        color: #050505;
        margin: 3px;
      }
      .subtitle {
        font-size: 17px;
        font-weight: 400;
        margin: 3px;
      }
    }
  }
}
</style>
