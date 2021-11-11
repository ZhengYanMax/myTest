<template>
  <div class="layout">
    <SlideBar class="menu" :isCollapse="isCollapse" />
    <div class="main-content" :class="{'main-content2':isCollapse}">
      <Header @changeCollapse="changeCollapse" :isCollapse="isCollapse" />
      <Content />
    </div>
  </div>
</template>

<script>
import Content from "./Content.vue";
import SlideBar from "./SlideBar.vue";
import Header from "./Header.vue";
export default {
  components: {
    Content,
    SlideBar,
    Header,
  },
  data() {
    return {
      isCollapse: false, //展开
    };
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang='scss' scoped>
.layout {
  height: 100%;
  // display: flex;
  background-color: #f2f2f2;
  .menu {
    height: 100%;
    float: left;
    background-color: #2e2e2e;
  }
  .main-content {
    margin-left: 200px;
    height: 100%;
    // flex: 1;
  }
  .main-content2{
    margin-left: 64px;
  }
}
</style>