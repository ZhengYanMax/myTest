<template>
  <div class="bar">
    <el-menu
      :default-active="$route.path"
      background-color="#2E2E2E"
      text-color="#fff"
      active-text-color="#07C160"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
    >
      <el-menu-item>
        <i class="el-icon-s-promotion"></i>
        <span slot="title" class="yigou">{{ $t("menu.ego") }}</span>
      </el-menu-item>

      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t("menu.goods") }}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-document"></i>
        <span slot="title">{{ $t("menu.params") }}</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t("menu.advert") }}</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t("menu.mine") }}</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ $t("menu.msg") }}</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  data() {
    return {};
  },
};
</script>

<style lang='scss' scoped>

.bar {
  position: fixed;
  top: 0;
  bottom: 0;
}
.yigou {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: bolder;
}
.el-menu {
  border-right: 0;
  .is-active {
    background-color: #2e342e !important;
  }
}

element.style {
  background-color: #24262f;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>