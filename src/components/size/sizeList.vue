<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="150" align="center">
            </el-table-column>
            <el-table-column prop="id" label="openId" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.openId}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.title || '--'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
                <template slot-scope="scope">
                    <div v-for="(info,key) in JSON.parse(scope.row.body)" :key="key">{{key}}:{{info}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="140" align="center">
                <template slot-scope="scope">
                    <!-- <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="teamClick(scope.row)">查看组织架构</el-button>  -->
                    <el-button type="text" size="small" @click="addClick(scope.row)">新增尺寸</el-button>
                    <el-button type="text" size="small" @click="sizeClick(scope.row)">编辑尺寸</el-button>
                </template>
            </el-table-column>
        </el-table>

        <size :openId="openId" :data="defalutList" :size="sizeArray" :sizeData="data" ref="newSize" @close="cancleSize"></size>
    </div>
</template>
<script>
import { MySize, Remove, SizeConfigByModel, SizeConfig } from "api/size";
import Size from "components/size/newSize";
import { ERR_CODE } from "api/config";

export default {
  components: {
    Size
  },
  data() {
    return {
      tableData: [],
      sizeDialog: false,
      sizeArray: [],
      defalutList: [],
      data: {},
      openId: ""
    };
  },
  mounted() {
    this.getMySize();
  },
  methods: {
    getMySize() {
      if (!this.$route.query.id) {
        this.$router.push({
          path: "/userList"
        });
        return;
      }
      this.openId = this.$route.query.id;
      MySize(this.$route.query.id).then(res => {
        if (res.data.code === ERR_CODE) {
          this.tableData = res.data.data;
        }
      });
    },

    sizeClick(row) {
      this.$refs.newSize.sizeClick();
      this.data = row;
      SizeConfigByModel().then(res => {
        if (res.data.code === ERR_CODE) {
          this.sizeArray = res.data.data;
          SizeConfig().then(res => {
            if (res.data.code === ERR_CODE) {
              this.defalutList = res.data.data;
            }
          });
        }
      });
    },
    addClick() {
      this.data = '';
      this.$refs.newSize.sizeClick();
      SizeConfigByModel().then(res => {
        if (res.data.code === ERR_CODE) {
          this.sizeArray = res.data.data;
          SizeConfig().then(res => {
            if (res.data.code === ERR_CODE) {
              this.defalutList = res.data.data;
            }
          });
        }
      });
    },
    cancleSize() {
      //   this.sizeDialog = false;
      this.data = {};
      this.defalutList = [];
      this.sizeArray = [];
      this.$refs.newSize.cancle();
      this.getMySize();
    }
  }
};
</script>
<style scoped>
</style>


