<template>
  <el-container>
    <el-main>
      <div class="registerContainer">
        <div class="title">Instant</div>
        <div class="formContainer">
          <el-form
            status-icon
            class="form"
            size="large"
            label-width="auto"
            :rules="rules"
            :model="form"
            ref="FormRef"
          >
            <el-form-item label="E-mail Address" prop="MailBox">
              <el-input
                type="email"
                autocomplete="off"
                placeholder="Email address"
                v-model="form.MailBox"
              />
            </el-form-item>
            <el-form-item label="Phone Number" prop="Phone">
              <el-input
                type="tel"
                autocomplete="off"
                placeholder="Phone Number"
                v-model="form.Phone"
              />
            </el-form-item>
            <el-form-item label="Password" prop="Password">
              <el-input
                type="password"
                autocomplete="off"
                placeholder="Password"
                v-model="form.Password"
              />
            </el-form-item>
            <el-form-item label="Confirm Password" prop="ConfirmPassword">
              <el-input
                type="password"
                autocomplete="off"
                placeholder="Confirm Password"
                v-model="form.ConfirmPassword"
              />
            </el-form-item>
            <el-form-item label="Username" prop="Username">
              <el-input
                type="text"
                autocomplete="off"
                placeholder="Username"
                v-model="form.Username"
                maxlength="15"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="Gender" prop="Gender">
              <el-radio-group v-model="form.Gender">
                <el-radio label="0">Male</el-radio>
                <el-radio label="1">Female</el-radio>
                <el-radio label="2">Secret</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Zone" prop="Zone">
              <el-cascader v-model="form.Zone" />
            </el-form-item>
            <el-form-item label="Birthday" prop="Birthday">
              <el-date-picker
                type="date"
                v-model="form.Birthday"
                placeholder="Birthday"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="School" prop="School">
              <el-input
                type="text"
                autocomplete="off"
                placeholder="School"
                v-model="form.School"
                maxlength="32"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="Company" prop="Company">
              <el-input
                type="text"
                autocomplete="off"
                placeholder="Company"
                v-model="form.Company"
                maxlength="32"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="Job" prop="Job">
              <el-input
                type="text"
                autocomplete="off"
                placeholder="Job"
                v-model="form.Job"
                maxlength="32"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="Introduction" prop="Introduction">
              <el-input
                type="textarea"
                autocomplete="off"
                placeholder="Introduction"
                v-model="form.Introduction"
                autosize
                resize="none"
                maxlength="250"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="Tags" prop="Tag" style="align-items: center">
              <el-tag
                v-for="tag in form.Tag"
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
                ref="InputRef"
                v-model="inputValue"
                class="tagInput"
                size="default"
                maxlength="10"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="tagBtn" @click="showInput">
                + New Tag
              </el-button>
            </el-form-item>
            <el-form-item label="Actions">
              <el-button
                class="formBtn"
                type="primary"
                style="flex: 1"
                @click="register(form)"
                >Create New Account</el-button
              ><el-button
                class="formBtn"
                type="success"
                style="flex: 1"
                @click="backToLogin"
                >Back to Login</el-button
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
import { register } from "@/apis/auth";
import { InitialProfile, ProfileType } from "@/apis/types";
import dayjs from "dayjs";
import { ElForm, ElInput } from "element-plus";
import { nextTick, ref, reactive } from "vue";
const inputValue = ref("");
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();
const FormRef = ref<InstanceType<typeof ElForm>>();
const form = reactive<ProfileType>(InitialProfile);
const vPassword = (
  _rule: unknown,
  value: string,
  callback: (err?: Error) => void
) => {
  if (value === "") {
    callback(new Error("Password is required"));
  } else {
    if (form.Password !== "") {
      if (!FormRef.value) return;
      FormRef.value.validateField("Password", () => null);
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
  } else if (value !== form.Password) {
    callback(new Error("It does not match your Password!"));
  } else {
    callback();
  }
};
const rules = reactive({
  MailBox: [
    { required: true, message: "Email Address is required", trigger: "blur" },
  ],
  Phone: [
    { required: true, message: "Phone Number is required", trigger: "blur" },
  ],
  Password: [{ required: true, validator: vPassword, trigger: "blur" }],
  ConfirmPassword: [
    { required: true, validator: vConfirmPassword, trigger: "blur" },
  ],
  Username: [
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
const backToLogin = () => {
  if (form.Birthday) console.log(form.Birthday.toISOString());
};
const handleClose = (tag: string) => {
  form.Tag.splice(form.Tag.indexOf(tag), 1);
};
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value?.input?.focus();
  });
};
const handleInputConfirm = () => {
  if (inputValue.value) {
    form.Tag.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};
</script>
<style scoped lang="scss">
.registerContainer {
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
  width: 480px;
  display: flex;
  flex-direction: column;
}
.tag {
  margin: 3px;
}
.tagBtn {
  height: 32px;
}
.tagInput {
  width: auto;
  height: 32px;
  line-height: 32px;
}
</style>
