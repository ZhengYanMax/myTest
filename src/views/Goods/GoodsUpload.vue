<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      multiple
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="handleSuccess"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
    </el-upload>
  </div>
</template>

<script>
import base from "../../api/base";
export default {
  data() {
    return {
      url: base.upload,
      fileList: [],
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSuccess(response, file, fileList) {
      console.log("response", response);
      console.log("file", file);
      console.log("fileList", fileList);
      let url = base.host + "/" + response.url.slice(7);
      this.$emit("sendImage", url);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log("点击上传服务器的图片");
      console.log(file);
    },
  },
};
</script>

<style>
</style>