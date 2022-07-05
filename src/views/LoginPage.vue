<template>
  <el-container>
    <el-main>
      <div class="login-container">
        <div class="title">Instant</div>
        <div class="form-container">
          <el-form
            ref="FormRef"
            status-icon
            class="form"
            size="large"
            :rules="rules"
            :model="form"
          >
            <el-form-item prop="Account">
              <el-input
                v-model="form.account"
                type="text"
                autocomplete="off"
                placeholder="Email address or phone number"
              />
            </el-form-item>
            <el-form-item prop="Password">
              <el-input
                v-model="form.password"
                type="password"
                autocomplete="off"
                placeholder="Password"
              />
            </el-form-item>
            <el-form-item>
              <el-button class="form-btn" type="primary" @click="login">
                Login
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="form-btn"> Forgotten password? </el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="form-btn" type="success" @click="register">
                Create New Account
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
    <el-footer>ZYChimne @ 2022</el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { getToken } from "@/apis/auth";
import router from "@/router";
import { ElForm } from "element-plus";
import { reactive, ref } from "vue";
const FormRef = ref<InstanceType<typeof ElForm>>();
const form = reactive({
  account: "",
  password: "",
});
const login = () => {
  getToken(form.account, form.password).then((res) => {
    if (res?.code === 200) {
      localStorage.setItem("token", res.data.token);
      router.push("/");
    }
  });
};
const register = () => {
  router.push("/register");
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
.login-container {
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
.form-container {
  padding: 48px 24px 30px 24px;
  border-radius: 12px;
  background: white;
}
.form {
  width: 330px;
  display: flex;
  flex-direction: column;
}
.form-btn {
  width: 100%;
}
</style>
