<template>
  <div class="header">
    <i
      class="iconfont"
      @click="change"
      :class="{ 'icon-youduiqi': !isCollapse, 'icon-zuoduiqi': isCollapse }"
    ></i>

    <!-- 右侧内容 -->
    <div class="header-right">
      <div class="lang">
        <el-dropdown @command="changeLang">
          <span class="el-dropdown-link">
            {{$t('menu.Language')}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 用户名和 退出按钮 -->
      <div class="user">
        <span>{{$t('menu.welcome')}}  :  {{ userinfo.user }} </span>
        <i @click="exidt" class="iconfont icon-h"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: ["isCollapse"],
  computed: {
    ...mapState("loginModule", ["userinfo"]),
  },
  methods: {
    ...mapMutations("loginModule", ["deleteUser"]),
    change() {
      this.$emit("changeCollapse");
    },
    //退出登录
    exidt() {
      //1. 清空vuex数据  2. 清空本地 3.跳转到登录界面
      this.deleteUser();
      localStorage.removeItem("userinfo");
      this.$router.push("/login");
    },
    changeLang(val) {
      console.log(val);
      //语言切换
      this.$i18n.locale = val;
    },
  },
};
</script>

<style lang='scss' scoped>
.header {
  height: 50px;
  line-height: 46px;
  background: #ffffff;
  color: #000;
  .iconfont {
    font-size: 28px;
    padding-left: 20px;
  }
}
.header-right {
  float: right;
display: flex;
margin-right: 20px;
.lang{
  margin-right: 50px;
}
.user span {
    top: -4px;
    position: relative;
  }
  .user i {
    color: red;
    font-weight: bolder;
  }
}
</style>