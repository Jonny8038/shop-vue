<template>
  <div class="login">
    <el-card v-if="isLogin">
      <div class="form-title">用户登录</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            maxlength="11"
            placeholder="请输入手机号码"
          />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            type="password"
            v-model="ruleForm.pwd"
            placeholder="请输入密码"
          />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="Login('ruleForm')">登录</el-button>
      <el-link type="success" @click="toRegister('ruleForm')">注册账号</el-link>
    </el-card>
    <el-card v-else>
      <div class="form-title">用户注册</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            maxlength="11"
            placeholder="请输入手机号码"
          />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            type="password"
            v-model="ruleForm.pwd"
            placeholder="请输入密码"
          />
        </el-form-item>
      </el-form>
      <el-button type="success" @click="Register('ruleForm')">注册</el-button>
    </el-card>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
export default {
  beforeCreate() {
    sessionStorage.clear();
  },
  data() {
    return {
      isLogin: true,
      submit: {},
      ruleForm: {
        phone: "13068868038",
        pwd: "123456789",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号为11位数字", trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 12,
            message: "长度在 8 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //登录
    Login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { phone, pwd } = this.ruleForm;
          login(phone, pwd).then((res) => {
            console.log(res.data);

            if (res.data.code === 200) {
              this.$message.success("登录成功");
              this.$store.commit("set_token", res.data.token);
              this.$store.commit("set_phone", res.data.phone);
              this.$store.commit("set_userinfo", res.data.data);
              this.$router
                .push({ path: this.redirect || "/home" })
                .catch((err) => {
                  console.log(err);
                });
            } else if (res.data.code === 400) {
              this.$message.error("该用户未注册");
            } else if (res.data.code === 500) {
              this.$message.error("手机号码为11位数字");
            }
          });
        }
      });
    },
    //跳转注册
    toRegister() {
      this.isLogin = false;
    },

    //注册
    Register(formName) {
      this.isLogin = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$store.dispatch("Register", this.ruleForm);
          const { phone, pwd } = this.ruleForm;
          register(phone, pwd)
            .then((res) => {
              console.log(res.data);
              if (res.data.code === 200) {
                this.$message.success("注册成功");
                setTimeout(() => {
                  this.isLogin = true;
                }, 1000);
              } else if (res.data.code === 300) {
                this.$message.error("该号码已被注册");
              }
            })
            .catch((err) => {});
        } else {
          // return false;
        }
      });
    },
  },
  computed: {
    SubmitData() {
      return this.$store.getters.submit_data;
    },
  },
  watch: {
    SubmitData(value) {
      this.submit = value;
    },
  },
};
</script>
 
<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: #2e7bfc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-title {
  text-align: center;
  font-size: 22px;
}

.el-card {
  width: 40%;
  height: 40%;
}

.el-link {
  margin-left: 15px;
}
</style>