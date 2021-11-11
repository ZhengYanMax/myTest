<template>
  <el-row class="login">
    <el-col :span="8" :offset="8" class="kuang">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        stretch
        class="tabs"
      >
        <el-tab-pane label="登录" name="login">
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input
                type="password"
                v-model="loginForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')"
                >登录</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="zhuce">
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input
                type="password"
                v-model="loginForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')"
                >注册</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import store from "../../store/index";
import api from "../../api/index";
import jwt from "jwt-decode";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      activeName: "login",
      loginForm: {
        username: "",
        password: "",
      },
      account: "",
      flag: false,
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      //清空表单数据
      //方法1：element库提供的清空表单
      this.$refs.loginForm.resetFields();
      //方法2： 自己手动清空
      // this.loginForm = {
      //   username: "",
      //   password: "",
      // };
    },
    submitForm(formName) {
      console.log("当前", this.activeName);
      console.log(this.loginForm.username, this.loginForm.password);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { username, password } = this.loginForm;
          if (this.activeName === "login") {
            console.log("登录信息", this.loginForm);
            console.log(this.loginForm.username);
            api
              .getLogin({
                username,
                password,
              })
              .then((res) => {
                console.log("获取的数据", res.data);
                if (res.data.status === 200) {
                  //3. 登录成功：1. 存储登录信息   2. 跳转页码  3. 数据持久化
                  let user = jwt(res.data.data).username;
                  let obj = {
                    user,
                    token: res.data.data,
                  };
                  //4. 存储vuex仓库
                  this.$store.commit("loginModule/setUser", obj);
                  //5. 本地存储  localStorage sessionStorage
                  localStorage.setItem("userinfo", JSON.stringify(obj));
                  //6. 跳转路由
                  this.$router.push("/");
                  this.$message({
                    message: "恭喜你，登录成功",
                    type: "success",
                  });
                } else {
                  this.$message.error("错了哦，账号或者密码错误了，请重新输入");
                }
              });
          } else {
            console.log("注册信息", this.loginForm);
            api
              .getResult({
                username,
                password,
              })
              .then((res) => {
                console.log("注册数据", res.data.msg);
                if (res.data.status == 200) {
                  this.$refs.loginForm.resetFields();
                  this.activeName = "login";
                  this.$message({
                    message: "恭喜你，注册成功",
                    type: "success",
                  });
                }
              });
          }
        } else {
          console.log("输入错误!!");
          this.$message.error("错了哦，这是一条错误消息");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs.loginForm.resetFields();
    },
  },
};
</script>

<style lang='scss' scoped>
.login {
  padding-top: 200px;
  background: #eee;
  height: 100%;

  .kuang {
    padding: 40px;
    box-sizing: border-box;
    background: #fff;
  }
}
</style>