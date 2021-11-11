<template>
  <div>
    <div class="goods-header">
      <el-input
        @change="search"
        v-model="input"
        :placeholder="$t('menu.place')"
      ></el-input>
      <el-button type="success">{{ $t("menu.search") }}</el-button>
      <el-button type="success" @click="addGoods">{{
        $t("menu.add")
      }}</el-button>
    </div>
    <div class="conent">
      <!-- 表格 -->
      <el-table :data="tableData" ref="goodsTable" @select="select">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" :label="$t('menu.commodityId')" width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          :label="$t('menu.commodityName')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="price"
          :label="$t('menu.commodityPrice')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="num"
          :label="$t('menu.commodityCount')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="category"
          :label="$t('menu.Specification')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="image"
          :label="$t('menu.commodityPic')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="sellPoint"
          :label="$t('menu.commoditySpecial')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="descs"
          :label="$t('menu.commodityDesc')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column :label="$t('menu.operator')" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >{{ $t("menu.edit") }}</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >{{ $t("menu.delete") }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()"
          >切换第二、第三行的选中状态</el-button
        >
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="deleteSelection()">批量删除</el-button>
      </div>
      <!-- 分页 -->
      <MyPatination
        :total="total"
        :pageSize="pageSize"
        @changePage="changePage"
      />
    </div>
    <GoodsDialog ref="dialog" :title="title" :rowData="rowData" />
  </div>
</template>

<script>
import api from "../../api/index";
import MyPatination from "../../components/MyPatination.vue";
import GoodsDialog from "./GoodsDialog.vue";
export default {
  components: {
    MyPatination,
    GoodsDialog,
  },
  data() {
    return {
      title: "添加商品",
      tableData: [],
      input: "",
      total: 100,
      pageSize: 1,
      rowData: {},
      arr: [],
    };
  },
  methods: {
    select(selection, row) {
      console.log(selection, row);
      let arr = [];
      for (let i = 0; i < selection.length; i++) {
        arr.push(selection[i].id);
      }
      console.log("选中的id:", arr);
      this.arr = arr;
    },
    deleteSelection() {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定删除
          api
            .deleteGoods({
              idArr: this.arr,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //信息提示
                this.https(1);
              } else {
                this.$message.error("删除失敗");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toggleSelection(rows) {
      console.log("rows", rows);
      if (rows) {
        rows.forEach((row) => {
          this.$refs.goodsTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.goodsTable.clearSelection();
      }
    },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    //编辑
    handleEdit(index, row) {
      this.$refs.dialog.dialogVisible = true;
      //2.修改title
      this.title = "编辑商品";
      this.$nextTick(() => {
        this.rowData = { ...row }; //每次都是对象
      });
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定删除
          api.getDeleteItem({ id: row.id }).then((res) => {
            console.log(res.data);
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.https(1);
            } else {
              this.$message.error("删除失敗");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    search() {
      console.log("搜索内容", this.input);
      if (!this.input) {
        this.https(1);
        return;
      }
      //请求搜索数据-
      api
        .getSearch({
          search: this.input,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            //解析数据
            this.tableData = res.data.result; //
            //计算分页数据
            this.total = res.data.result.length;
            //显示的个数
            this.pageSize = 8;
          } else {
            this.tableData = [];
            this.total = 0;
            this.pageSize = 8;
          }
        });
    },
    changePage(val) {
      console.log("页码", val);
      this.https(val);
    },
    https(page) {
      api
        .getGoodsList({
          page,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            this.tableData = res.data.data;
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;
          }
        });
    },
    addGoods() {
      this.$refs.dialog.dialogVisible = true;
      this.title = "添加商品";
    },
  },
  created() {
    //1. 进入界面--获取商品管理列表数据
    this.https(1);
  },
};
</script>

<style lang='scss' scoped>
.goods-header {
  display: flex;
  margin-top: 20px;
  .el-input {
    margin-right: 20px;
  }
  button {
    margin-right: 15px;
  }
}
::v-deep .el-table__cell {
  padding: 25px 0 !important;
}
.conent {
  margin-top: 20px;
  margin-right: 20px;
}
</style>