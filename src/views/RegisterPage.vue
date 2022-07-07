<template>
  <el-container>
    <el-main>
      <div class="register-container">
        <div class="title">Instant</div>
        <div class="form-container">
          <el-form
            ref="formRef"
            status-icon
            class="form"
            size="large"
            label-width="auto"
            :rules="rules"
            :model="form"
          >
            <el-form-item label="E-mail Address" prop="mailBox">
              <el-input
                v-model="form.mailBox"
                type="email"
                autocomplete="off"
                placeholder="Email address"
              />
            </el-form-item>
            <el-form-item label="Phone Number" prop="phone">
              <el-input
                v-model="form.phone"
                type="tel"
                autocomplete="off"
                placeholder="Phone Number"
              />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input
                v-model="form.password"
                type="password"
                autocomplete="off"
                placeholder="Password"
              />
            </el-form-item>
            <el-form-item label="Confirm Password" prop="confirmPassword">
              <el-input
                v-model="form.confirmPassword"
                type="password"
                autocomplete="off"
                placeholder="Confirm Password"
              />
            </el-form-item>
            <el-form-item label="Username" prop="username">
              <el-input
                v-model="form.username"
                type="text"
                autocomplete="off"
                placeholder="Username"
                maxlength="15"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="Gender" prop="gender">
              <el-radio-group v-model="form.gender">
                <el-radio label="0"> Male </el-radio>
                <el-radio label="1"> Female </el-radio>
                <el-radio label="2"> Secret </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Zone" prop="zone">
              <el-cascader v-model="form.zone" />
            </el-form-item>
            <el-form-item label="Birthday" prop="birthday">
              <el-date-picker
                v-model="form.birthday"
                type="date"
                placeholder="Birthday"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="School" prop="school">
              <el-input
                v-model="form.school"
                type="text"
                autocomplete="off"
                placeholder="School"
                maxlength="32"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="Company" prop="Company">
              <el-input
                v-model="form.company"
                type="text"
                autocomplete="off"
                placeholder="Company"
                maxlength="32"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="Job" prop="job">
              <el-input
                v-model="form.job"
                type="text"
                autocomplete="off"
                placeholder="Job"
                maxlength="32"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="Introduction" prop="introduction">
              <el-input
                v-model="form.introduction"
                type="textarea"
                autocomplete="off"
                placeholder="Introduction"
                autosize
                resize="none"
                maxlength="250"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="Tags" prop="Tag" style="align-items: center">
              <el-tag
                v-for="tag in form.tags"
                :key="tag"
                class="tag"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="inputVisible"
                ref="inputRef"
                v-model="inputValue"
                class="tag-input"
                size="default"
                maxlength="10"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button v-else class="tag-btn" @click="showInput">
                + New Tag
              </el-button>
            </el-form-item>
            <el-form-item label="Actions">
              <el-button
                class="form-btn"
                type="primary"
                style="flex: 1"
                @click="createNewAccount"
              >
                Create New Account </el-button
              ><el-button
                class="form-btn"
                type="success"
                style="flex: 1"
                @click="backToLogin"
              >
                Back to Login
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
import { register } from "@/apis/auth";
import { getInitialProfile, ProfileType } from "@/apis/types";
import router from "@/router";
import dayjs from "dayjs";
import { ElForm, ElInput, ElMessage } from "element-plus";
import { nextTick, ref, reactive } from "vue";
const inputValue = ref("");
const inputVisible = ref(false);
const inputRef = ref<InstanceType<typeof ElInput>>();
const formRef = ref<InstanceType<typeof ElForm>>();
const form = reactive<ProfileType>(getInitialProfile());
const vPassword = (
  _rule: unknown,
  value: string,
  callback: (err?: Error) => void
) => {
  if (value === "") {
    callback(new Error("Password is required"));
  } else {
    if (form.password !== "") {
      if (!formRef.value) return;
      formRef.value.validateField("Password", () => null);
    }
    callback();
  }
};
const vConfirmPassword = (
  _rule: unknown,
  value: string,
  callback: (err?: Error) => void
) => {
  if (value === "") {
    callback(new Error("Confirm Password is required"));
  } else if (value !== form.password) {
    callback(new Error("It does not match your Password!"));
  } else {
    callback();
  }
};
const rules = reactive({
  mailBox: [
    { required: true, message: "Email Address is required", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "Phone Number is required", trigger: "blur" },
  ],
  password: [{ required: true, validator: vPassword, trigger: "blur" }],
  confirmPassword: [
    { required: true, validator: vConfirmPassword, trigger: "blur" },
  ],
  username: [
    { required: true, message: "Username is required", trigger: "blur" },
  ],
  // Gender: [{ trigger: 'blur' }],
  // Zone: [{ trigger: 'blur' }],
  // Birthday: [{ trigger: 'blur' }],
  // School: [{ trigger: 'blur' }],
  // Company: [{ trigger: 'blur' }],
  // Job: [{ trigger: 'blur' }],
  // Introduction: [{ trigger: 'blur' }],
  // Tag: [{ trigger: 'blur' }],
});
const createNewAccount = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      register(form).then((res) => {
        if (res?.code === 201) {
          ElMessage.success("Create Account Success!");
          nextTick(() => {
            router.push("/login");
          });
        }
      });
    }
  });
};
const backToLogin = () => {
  router.push("/login");
};
const handleClose = (tag: string) => {
  form.tags.splice(form.tags.indexOf(tag), 1);
};
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    inputRef.value?.input?.focus();
  });
};
const handleInputConfirm = () => {
  if (inputValue.value) {
    form.tags.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};
</script>

<style scoped lang="scss">
.register-container {
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
  width: 480px;
  display: flex;
  flex-direction: column;
}
.tag {
  margin: 3px;
}
.tag-btn {
  height: 32px;
}
.tag-input {
  width: auto;
  height: 32px;
  line-height: 32px;
}
</style>
