import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/global.scss";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).use(ElementPlus).mount("#app");
