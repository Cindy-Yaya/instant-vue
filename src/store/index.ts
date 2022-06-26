import { defineStore } from "pinia";
import { computed } from "vue";
export const token = computed(() => {
  const temp = localStorage.getItem("token");
  return temp ? temp : "";
});
export const userID = computed<number>(() => {
  const temp1 = localStorage.getItem("userID");
  const temp2 = Number.parseInt(temp1 ? temp1 : "-1");
  return temp2;
});
