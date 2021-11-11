<template>
  <div>
    <h3>个人中心</h3>
    <el-button @click="look">查看合同</el-button>

    <CenterPdf ref="centerPdf" />
  </div>
</template>

<script>
import CenterPdf from "./CenterPdf.vue";
export default {
  components: {
    CenterPdf,
  },
  
  methods: {
    look() {
      this.$refs.centerPdf.dialogVisible=true;
    },
  },
};
</script>

<style lang='scss' scoped>
h3{
  margin: 20px 0;
  padding-bottom: 20px;
  border-bottom:  solid #fff;
}

</style>