<template>
  <div>
    <el-dialog title="商品规格" :visible.sync="dialogVisible" width="50%">
      <GoodsTree @sendNode="sendNode" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="innerVisible = true"
          :disabled="isDisabled"
          >确定 并添加分组</el-button
        >
      </span>

      <el-dialog
        width="40%"
        title="商品规格配置"
        :visible.sync="innerVisible"
        append-to-body
        :before-close='resetForm'
      >
        <div class="params-header">
          <div class="title">当前选中的商品：{{ treeData.name }}</div>
          <el-button @click="addDomain">新增规格列表</el-button>
        </div>
        <el-form
          :model="paramsForm"
          ref="paramsForm"
          label-width="120px"
          class="demo-dynamic"
        >
          <el-form-item
            v-for="(item, index) in paramsForm.groups"
            :label="'规格名称' + index"
            :key="item.key"
            :prop="'groups.' + index + '.title'"
            :rules="{
              required: true,
              message: '规格名称不能为空',
              trigger: 'blur',
            }"
          >
            <div class="item-form">
              <el-input v-model="item.title"></el-input>
              <el-button @click.prevent="addChildDomain(index)"
                >添加子组</el-button
              >
              <el-button @click.prevent="removeDomain(index)">删除</el-button>
            </div>
            <el-form-item
              v-for="(ele, i) in item.children"
              :label="'规格名称' + i"
              :key="ele.key"
              :rules="{
                required: true,
                message: '规格名称不能为空',
                trigger: 'blur',
              }"
            >
              <div class="item-form">
                <el-input v-model="ele.title"></el-input>
                <el-button @click.prevent="removeChildDomain(index, i)">删除</el-button>
              </div>
            </el-form-item>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="submitForm('paramsForm')"
              >提交</el-button
            >

            <el-button @click="addDomain">新增域名</el-button>
            <el-button @click="resetForm('paramsForm')">重置</el-button>
          </el-form-item> -->
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" @click="submitForm('paramsForm')"
            >确定</el-button
          >
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../api/index'
import GoodsTree from "../Goods/GoodsTree.vue";
export default {
  components: { GoodsTree },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      isDisabled: true,
      treeData: {},
      paramsForm: {
        groups: [
          {
            value: "",
            title: "",
            children: [
              {
                value: "",
                title: "",
              },
            ],
          },
          {
            value: "",
            title: "",
            children: [],
          },
        ],
        email: "",
      },
    };
  },
  methods: {
    sendNode(data) {
      console.log("接受tree数据", data);
      this.treeData = data;
      //修改按钮
      this.isDisabled = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("获取到规格参数", this.paramsForm);
          let content = JSON.stringify(this.paramsForm.groups);
            api
            .getAddParams({
              itemCatId: this.treeData.cid,
              content,
              specsName: this.treeData.name,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 200) {
                this.dialogVisible = false;
               
                this.$message({
                  message: "恭喜你，这是一条成功消息",
                  type: "success",
                });
                //清空表单
                this.resetForm();
                //视图更新
                this.$parent.http(1);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.innerVisible = false;
      this.paramsForm.groups=[];
    },
     removeChildDomain(index, i) {
      this.paramsForm.groups[index].children.splice(i, 1);
    },
    removeDomain(index) {
        this.paramsForm.groups.splice(index, 1);

    },
    addChildDomain(index) {
      this.paramsForm.groups[index].children.push({
        value: "",
        title: "",
        key: Date.now(),
        
      });
    },
    addDomain() {
      this.paramsForm.groups.push({
        value: "",
        key: Date.now(),
        children: [],
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.item-form {
  display: flex;
  margin-bottom: 10px;
  .el-input {
    margin-right: 20px;
  }
}
.params-header {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
  .title {
    margin-bottom: 6px;
  }
}
</style>