import dayjs, { Dayjs } from "dayjs";

export type InstantType = {
  insID: string;
  userID: string;
  username: string;
  avatar: number;
  created: Dayjs;
  lastModified: Dayjs;
  content: string;
  attitude: number;
  likes: number;
  shares: number;
};

export type CommentType = {
  commentID: string;
  created: Dayjs;
  lastModified: Dayjs;
  insID: string;
  replyToID: string;
  userID: string;
  username: string;
  avatar: number;
  content: string;
  direct: boolean;
};

export type UserType = {
  userID: string;
  username: string;
  avatar: number;
};

export type ProfileType = {
  mailBox: string;
  phone: string;
  password: string;
  confirmPassword: string;
  username: string;
  gender: string;
  zone: string;
  birthday: Date | Dayjs | null;
  school: string;
  company: string;
  job: string;
  introduction: string;
  tags: string[];
  avatar: number;
};

export const getInitialProfile = (): ProfileType => {
  return {
    mailBox: "",
    phone: "",
    password: "",
    confirmPassword: "",
    username: "",
    gender: "2",
    zone: "",
    birthday: null,
    school: "",
    company: "",
    job: "",
    introduction: "",
    tags: [],
    avatar: 0,
  };
};

export type WeatherNowType = {
  cloud: string;
  dew: string;
  feelsLike: string;
  humidity: string;
  icon: string;
  obsTime: Dayjs;
  precip: string;
  pressure: string;
  temp: string;
  text: string;
  vis: string;
  wind360: string;
  windDir: string;
  windScale: string;
  windSpeed: string;
};

export const InitialWeatherNow: WeatherNowType = {
  cloud: "0",
  dew: "2",
  feelsLike: "8",
  humidity: "64",
  icon: "150",
  obsTime: dayjs("2022-03-28T23:32+08:00"),
  precip: "0.0",
  pressure: "1026",
  temp: "9",
  text: "晴",
  vis: "30",
  wind360: "45",
  windDir: "东北风",
  windScale: "0",
  windSpeed: "0",
};

export type WeatherHourlyType = {
  cloud: string;
  dew: string;
  fxTime: string;
  humidity: string;
  icon: string;
  pop: string;
  precip: string;
  pressure: string;
  temp: string;
  text: string;
  wind360: string;
  windDir: string;
  windScale: string;
  windSpeed: string;
};

export const InitialWeatherHour = {
  cloud: "0",
  dew: "5",
  fxTime: "2022-03-29T12:00+08:00",
  humidity: "47",
  icon: "100",
  pop: "7",
  precip: "0.0",
  pressure: "1020",
  temp: "17",
  text: "晴",
  wind360: "150",
  windDir: "东南风",
  windScale: "3-4",
  windSpeed: "20",
};

export type WeatherDailyType = {
  cloud: string;
  fxDate: string;
  humidity: string;
  iconDay: string;
  iconNight: string;
  moonPhase: string;
  moonPhaseIcon: string;
  moonrise: string;
  moonset: string;
  precip: string;
  pressure: string;
  sunrise: string;
  sunset: string;
  tempMax: string;
  tempMin: string;
  textDay: string;
  textNight: string;
  uvIndex: string;
  vis: string;
  wind360Day: string;
  wind360Night: string;
  windDirDay: string;
  windDirNight: string;
  windScaleDay: string;
  windScaleNight: string;
  windSpeedDay: string;
  windSpeedNight: string;
};

export const InitialWeatherDaily = {
  cloud: "25",
  fxDate: "2022-03-29",
  humidity: "91",
  iconDay: "101",
  iconNight: "104",
  moonPhase: "残月",
  moonPhaseIcon: "807",
  moonrise: "04:12",
  moonset: "15:09",
  precip: "0.0",
  pressure: "1018",
  sunrise: "05:48",
  sunset: "18:11",
  tempMax: "18",
  tempMin: "12",
  textDay: "多云",
  textNight: "阴",
  uvIndex: "8",
  vis: "25",
  wind360Day: "135",
  wind360Night: "135",
  windDirDay: "东南风",
  windDirNight: "东南风",
  windScaleDay: "1-2",
  windScaleNight: "1-2",
  windSpeedDay: "3",
  windSpeedNight: "3",
};
