<template>
  <div>
    <div class="param-header">
      <el-input
        @change="search"
        v-model="input"
        :placeholder="$t('menu.place')"
      ></el-input>
      <el-button type="success">{{ $t("menu.search") }}</el-button>
      <el-button type="success" @click="addParams">{{
        $t("menu.add")
      }}</el-button>
    </div>

    <div class="conent">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="itemCatId" label="规格参数ID" width="120">
        </el-table-column>
        <el-table-column prop="id" label="类目ID" width="120">
        </el-table-column>
        <el-table-column
          prop="specsName"
          label="规格名称"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="paramData"
          label="规格参数"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="180">
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
    </div>
    <MyPatination
      :total="total"
      :pageSize="pageSize"
      @changePage="changeCurrent"
    />

    <ParamsDialog ref="paramsDialog" />
  </div>
</template>

<script>
import api from "../../api/index";
import MyPatination from "../../components/MyPatination.vue";
import ParamsDialog from "./ParamsDialog.vue";
export default {
  components: { MyPatination, ParamsDialog },
  data() {
    return {
      input: "",
      tableData: [],
      total: 10,
      pageSize: 1,
    };
  },
  methods: {
    addParams() {
      this.$refs.paramsDialog.dialogVisible = true;
    },
    handleEdit() {},
    handleDelete() {},
    changeCurrent(num) {
      this.http(num);
    },
    http(page) {
      api.getParamsList({ page }).then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
        } else {
        }
      });
    },
    search(input) {
      console.log("规格参数查询");
      if (!this.input) {
        this.http(1);
        return;
      }
      api.getParamsSearch({ search: this.input }).then((res) => {
        console.log("搜索到数据", res.data);
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
  },
  created() {
    this.http(1);
  },
};
</script>

<style lang='scss' scoped>
.param-header {
  display: flex;
  margin-top: 20px;
  .el-input {
    margin-right: 20px;
  }
  button {
    margin-right: 15px;
  }
}
.conent {
  margin-right: 20px;
  margin-top: 20px;
}
::v-deep .el-table__cell {
  padding: 25px 0 !important;
}
</style>