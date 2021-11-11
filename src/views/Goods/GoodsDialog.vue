<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="clearForm"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择" prop="category">
          <el-button type="primary" @click="tan">类目选择</el-button>
          <span style="margin-left: 10px">{{ ruleForm.category }}</span>
        </el-form-item>
        <!-- 55555555555 -->
            <el-form-item label="商品规格配置" v-if="isShow">
          <!-- 表单格式 -->
          <el-form
            ref="paramsForms"
            label-width="100px"
            class="demo-dynamic"
          >
            <el-form-item
              v-for="(item) in paramsInfo"
              :label="item.title"
              :key="item.key"
            >
              <div class="item-form">
                <el-input v-model="item.value"></el-input>
              </div>
              <!-- 子组遍历 -->
              <el-form-item
                v-for="ele in item.children"
                :label="ele.title"
                :key="ele.key"
              >
                <div class="item-form">
                  <el-input v-model="ele.value"></el-input>
                </div>
              </el-form-item>
            </el-form-item>
          </el-form>
        </el-form-item>
        <!-- //55555555555555555555 -->
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="showImage">上传图片</el-button>
          <img
            style="width: 200px; margin-left: 20px; vertical-align: middle"
            :src="ruleForm.image"
            alt=""
          />
        </el-form-item>
        <el-form-item label="商品描述" prop="descs">
          <!-- <el-input v-model="ruleForm.descs"> </el-input>-->
          <WangEditor ref="wangE" @sendWangEditor="sendWangEditor" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="addItem">确 定</el-button>
      </span>

      <el-dialog
        width="40%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body
      >
        <GoodsTree @sendNode="sendNode" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="showTreeData">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="imgVisible"
        append-to-body
      >
        <GoodsUpload ref="upload" @sendImage="sendImage" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="imgVisible = false">取 消</el-button>
          <el-button type="primary" @click="imgVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import GoodsTree from "./GoodsTree.vue";
import GoodsUpload from "./GoodsUpload.vue";
import api from "../../api/index";
import WangEditor from "./WangEditor.vue";
export default {
  props: {
    title: {
      type: String,
      default: "添加商品",
    },
    rowData: {
      //当前行的数据内容
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    GoodsTree,
    GoodsUpload,
    WangEditor,
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      imgVisible: false,
      isShow: false,
      treeData: {},
      paramsInfo: [],
      ruleForm: {
        id: "",
        category: "", //类目名称
        cid: "", //类目cid
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        descs: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 20 个字符", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    rowData(val) {
      console.log("监听的--当前行的数据", val);
      this.ruleForm = val;
      console.log("this.ruleForm", this.ruleForm);
      this.$nextTick(() => {
        //延迟加载 等待dom出现
        this.$refs.wangE.editor.txt.html(val.descs);
      });
    },
  },
  methods: {
    sendWangEditor(val) {
      this.resetForm.descs = val;
    },
    sendImage(val) {
      this.ruleForm.image = val;
    },
    showImage() {
      this.imgVisible = true;
    },
    addItem() {
      // this.dialogVisible = false;
      if (this.title === "添加商品") {
        console.log("添加商品", this.ruleForm);
        this.addGoods();
      } else {
        console.log("编辑商品", this.ruleForm);
        this.editorGoods();
      }
    },
    addGoods() {
      let { title, cid, category, sellPoint, price, num, image, descs } =
        this.ruleForm;
      let paramsInfo = JSON.stringify(this.paramsInfo);
      api
        .getAddItem({
          title,
          cid,
          category,
          sellPoint,
          price,
          num,
          image,
          descs,
          paramsInfo,
        })
        .then((res) => {
          console.log("添加商品", res.data);
          if (res.data.status === 200) {
            //1. 关闭弹框
            this.dialogVisible = false;
            //2. 更新视图
            this.$parent.https(1);
            //3. 清空表单
            this.clearForm();
          } else {
            //错误信息提示
          }
        });
    },
    editorGoods() {
      let { id, title, cid, category, sellPoint, price, num, image, descs } =
        this.ruleForm;
      api
        .getEditGoods({
          id,
          title,
          cid,
          category,
          sellPoint,
          price,
          num,
          image,
          descs,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            this.$parent.https(1);
            //3. 清空表单
            this.clearForm();
          } else {
            console.log("编辑失败---1111");
          }
        });
    },
    clearForm() {
      this.dialogVisible = false;
      // 清空表单数据  方法1：调用element-ui 重置  方法2：自己手动对数据 初始化
      // this.$refs.ruleForm.resetFields();
      this.ruleForm = {
        category: "", //类目名称
        cid: "", //类目cid
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        descs: "", //商品描述
      };
      //清空编译器
      this.$refs.wangE.editor.txt.clear(); //清空
      this.paramsInfo = [];
      this.isShow = false;
        if (this.$refs.upload) {
        this.$refs.upload.fileList = [];
      }
    },
    sendNode(val) {
      this.treeData = val;
      console.log(val);
    },
    showTreeData() {
      this.innerVisible = false;
      this.ruleForm.category = this.treeData.name;
      this.ruleForm.cid = this.treeData.cid;
      api.getItemCategory({ cid: this.treeData.cid }).then((res) => {
        console.log("数据", res.data);
        if (res.data.status === 200) {
          //显示规格参数配置
          this.isShow = true;
          //res.data.result[res.data.result.length-1]
          this.paramsInfo = JSON.parse(res.data.result[0].paramData);
        } else {
          //不显示--规格参数配置
        }
      });
      this.isShow = true;
    },
    tan() {
      this.innerVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>