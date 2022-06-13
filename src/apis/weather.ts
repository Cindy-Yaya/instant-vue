import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import {
  InitialWeatherDaily,
  InitialWeatherHour,
  InitialWeatherNow,
  WeatherDailyType,
  WeatherHourlyType,
  WeatherNowType,
} from './types';

const key = '8617f107601d44fab3565012a155b6bc';

export const lookupLocation = async (location: string): Promise<any> => {
  let weatherData;
  await fetch(
    `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${key}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      weatherData = res;
    })
    .catch((err) => ElMessage.error(`Get Location Error: ${err}`));
  return weatherData;
};

export const getWeatherOfNow = async (
  location: string
): Promise<WeatherNowType> => {
  const weatherData = InitialWeatherNow;
  await fetch(
    `https://devapi.qweather.com/v7/weather/now?key=${key}&location=${location}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.code === '200') {
        weatherData.cloud = res.now.cloud;
        weatherData.dew = res.now.dew;
        weatherData.feelsLike = res.now.feelsLike;
        weatherData.humidity = res.now.humidity;
        weatherData.icon = res.now.icon;
        weatherData.obsTime = dayjs(res.now.obsTime);
        weatherData.precip = res.now.precip;
        weatherData.pressure = res.now.pressure;
        weatherData.temp = res.now.temp;
        weatherData.text = res.now.text;
        weatherData.vis = res.now.vis;
        weatherData.wind360 = res.now.wind360;
        weatherData.windDir = res.now.windDir;
        weatherData.windScale = res.now.windScale;
        weatherData.windSpeed = res.now.windSpeed;
      }
    })
    .catch((err) => ElMessage.error(`Get WeatherOfNow Error: ${err}`));
  return weatherData;
};

export const getWeatherOfToday = async (
  location: string
): Promise<WeatherHourlyType[]> => {
  let weatherData: WeatherHourlyType[] = [InitialWeatherHour];
  await fetch(
    `https://devapi.qweather.com/v7/weather/24h?key=${key}&location=${location}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.code === '200') {
        weatherData = res.hourly;
      }
    })
    .catch((err) => ElMessage.error(`Get WeatherofToday Error: ${err}`));
  return weatherData;
};

export const getWeatherOfWeek = async (
  location: string
): Promise<WeatherDailyType[]> => {
  let weatherData: WeatherDailyType[] = [InitialWeatherDaily];
  await fetch(
    `https://devapi.qweather.com/v7/weather/7d?key=${key}&location=${location}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.code === '200') {
        weatherData = res.daily;
      }
    })
    .catch((err) => ElMessage.error(`Get WeatherOfWeek Error: ${err}`));
  return weatherData;
};

export const getTodayIndices = async (location: string): Promise<any> => {
  let weatherData;
  await fetch(
    `https://devapi.qweather.com/v7/indices/1d?key=${key}&location=${location}&type=0`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      weatherData = res;
    })
    .catch((err) => ElMessage.error(`Get TodayIndices Error: ${err}`));
  return weatherData;
};
