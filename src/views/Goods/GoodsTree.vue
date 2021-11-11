<template>
  <div>
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      show-checkbox
      @node-click="nodeClick"
    >
    </el-tree>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    nodeClick(data, node) {
      this.$emit("sendNode", data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        console.log(node);
        api.getCategory({ id: 1 }).then((res) => {
          console.log("拿到数据", res.data);
          if (res.data.status === 200) {
            return resolve(res.data.result);
          }
        });
      }
      if (node.level >= 1) {
        api.getCategory({ id: node.data.cid }).then((res) => {
         if(res.data.status === 200){
                //[{name:''},{}]
                return resolve(res.data.result)
            }else{
                return resolve([])
            }
        });
      }
    },
  },
};
</script>

<style>
</style>