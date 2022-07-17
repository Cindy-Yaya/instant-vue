import { ElMessage } from "element-plus";
import { WeatherHourlyType } from "./types";

const key = "8617f107601d44fab3565012a155b6bc";

export const lookupLocation = async (location: string) => {
  return fetch(
    `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${key}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw res.statusText;
      }
    })
    .catch((err) => ElMessage.error(`Get Location Error: ${err}`));
};

export const getWeatherOfNow = async (location: string) => {
  return fetch(
    `https://devapi.qweather.com/v7/weather/now?key=${key}&location=${location}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw res.statusText;
      }
    })
    .catch((err) => ElMessage.error(`Get WeatherOfNow Error: ${err}`));
};

export const getWeatherOfToday = async (location: string) => {
  return fetch(
    `https://devapi.qweather.com/v7/weather/24h?key=${key}&location=${location}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw res.statusText;
      }
    })
    .catch((err) => ElMessage.error(`Get WeatherOfToday Error: ${err}`));
};

export const getWeatherOfWeek = async (location: string) => {
  return fetch(
    `https://devapi.qweather.com/v7/weather/7d?key=${key}&location=${location}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw res.statusText;
      }
    })
    .catch((err) => ElMessage.error(`Get WeatherOfWeek Error: ${err}`));
};

export const getTodayIndices = async (location: string) => {
  return fetch(
    `https://devapi.qweather.com/v7/indices/1d?key=${key}&location=${location}&type=0`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw res.statusText;
      }
    })
    .catch((err) => ElMessage.error(`Get TodayIndices Error: ${err}`));
};
