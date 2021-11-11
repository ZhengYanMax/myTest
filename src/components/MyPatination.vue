<template>
  <div>
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page='current'
      @current-change='changeCurrent'
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
props:{
    total:{
        type:Number,
        default:100
    },
    pageSize:{
        type:Number,
        default:10
    },
    current:{
      type:Number,
      default:1
    }
},
methods:{
changeCurrent(val){
this.$emit('changePage',val)
}
}






};
</script>

<style scoped lang='scss'>
.el-pagination {
  text-align: center;
  margin-top: 20px;
  height: 30px;
  //   width: 500px;

  //   background: #fff;
}
::v-deep .el-pagination.is-background .el-pager li {
  margin: 0 5 px;
  background-color: #fff ;
  color: #606266;
  min-width: 30 px;
  border-radius: 2 px;
}
</style>