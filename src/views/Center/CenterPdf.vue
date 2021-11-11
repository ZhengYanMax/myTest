<template>
  <div>
    <el-dialog
      title="合同内容"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <!-- <pdf src='./sxt.pdf' :page='num' /> -->

      <!-- {{ currentPage }} / {{ pageCount }}
      <pdf
        src="./sxt.pdf"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
      ></pdf> -->

      <!-- <pdf
        v-for="i in numPages"
        :key="i"
        :src="src"
        :page="i"
        style="display: inline-block; width: 25%"
      ></pdf> -->
      {{ currentPage }} / {{ pageCount }}
      <el-button @click="lastPage">上一页</el-button> /
      <el-button @click="nextPage">下一页</el-button> /
      <el-button @click="gotoPrint">打印合同</el-button>
      <hr />
      <MyPatination
        :total="numPages"
        :pageSize="1"
        :current="num"
        @changePage="changePage"
      />
      <pdf
        :src="src"
        ref="mypdf"
        :page="num"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
        style="width: 400px;"
      ></pdf>
      <!-- <span>这是一段信息</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pdf from "vue-pdf";
import MyPatination from "../../components/MyPatination.vue";
var loadingTask = pdf.createLoadingTask("./sxt.pdf");
export default {
  components: {
    pdf,
    MyPatination,
  },
  data() {
    return {
      dialogVisible: false,
      num: 1,
      pageCount: 0,
      currentPage: 0,
      src: loadingTask,
      numPages: undefined,
    };
  },
  methods: {
    lastPage(){
      this.num-=1;
      console.log('上一页');
    },
    nextPage(){
      this.num+=1;
       console.log('下一页');
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    changePage(n) {
      this.num = n;
    },
    //打印合同
    gotoPrint() {
      this.$refs.mypdf.print();
    },
  },
  mounted() {
    this.src.promise.then((pdf) => {
      this.numPages = pdf.numPages;
    });
  },
};
</script>

<style>
</style>