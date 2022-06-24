<template>
  <el-container>
    <el-main>
      <div class="loginContainer">
        <div class="title">Instant</div>
        <div class="formContainer">
          <el-form
            status-icon
            class="form"
            size="large"
            :rules="rules"
            :model="form"
            ref="FormRef"
          >
            <el-form-item prop="Account">
              <el-input
                type="text"
                autocomplete="off"
                placeholder="Email address or phone number"
                v-model="form.Account"
              />
            </el-form-item>
            <el-form-item prop="Password">
              <el-input
                type="password"
                autocomplete="off"
                placeholder="Password"
                v-model="form.Password"
              />
            </el-form-item>
            <el-form-item>
              <el-button class="formBtn" type="primary" @click="login"
                >Login</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button class="formBtn">Forgotten password?</el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="formBtn" type="success"
                >Create New Account</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
    <el-footer>ZYChimne @ 2022</el-footer>
  </el-container>
</template>
<script setup lang="ts">
import router from "@/router";
import { ElForm } from "element-plus";
import { reactive, ref } from "vue";
const FormRef = ref<InstanceType<typeof ElForm>>();
const form = reactive({
  Account: "",
  Password: "",
});
const login = async () => {
  await fetch("http://localhost:8081/auth/getToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      MailBox: "example@example.com",
      Password: "1234567890",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("userid", res.userid);
      localStorage.setItem("token", res.token);
      router.replace({ path: "/" });
    });
};
const rules = reactive({
  Account: [
    {
      required: true,
      message: "Email Address or Phone Number is required",
      trigger: "blur",
    },
  ],
  Password: [
    { required: true, message: "Password is required", trigger: "blur" },
  ],
});
</script>
<style scoped lang="scss">
.loginContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 72px;
  padding: 48px 0;
  color: var(--el-color-primary);
  font-weight: bold;
}
.formContainer {
  padding: 48px 24px 30px 24px;
  border-radius: 12px;
  background: white;
}
.form {
  width: 360px;
  display: flex;
  flex-direction: column;
}
.formBtn {
  width: 100%;
}
</style>
