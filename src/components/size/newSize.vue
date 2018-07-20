<template>
  <div id="new-size">
    <el-dialog title="编辑用户信息" :visible.sync="sizeDialog" width="500px" class="editVisible" @change="cancle">

      <!-- <mt-field label="姓名" placeholder="请输入收件人姓名" v-model="username"></mt-field> -->
      <el-form :model="userInfo" ref="userInfo" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item :label="item.title" v-for="(item,index) in dataSize" :key="index">
          <el-input v-model="userInfo.mArray[index]"></el-input>
        </el-form-item>
      </el-form>
      <div class="size-list">
        <div class="size-list-info" v-for="(item,listIndex) in sizeList" :key="listIndex">
          <div class="title">{{item.title}}</div>
          <div class="icon">
            <div :class="{'active':index == indexArray[listIndex].index}" v-for="(info,index) in item.sizeConfigValueList" @click="clickSize(info,index,listIndex,item)" :key="index">
              <div class="icon-box">
                <img :src="info.image" alt="" />
              </div>
              <p>{{info.value}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="remarks">
        <div class="label">备注</div>
        <div class="textarea">
          <textarea rows="8" placeholder="您可以填写对该尺寸数据的补充信息。例如：”脖子较粗，胳膊比较长”等" v-model="remarks"></textarea>
        </div>
      </div>
      <div class="flex-bottom">
        <div class="default-address">
          <label><input type="checkbox" v-model="isCheckde">
            <span></span> 设置为默认尺寸</label>
        </div>
        <div class="success-add" @click="addSize">完成新增</div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import 'common/css/radio.css'
import { AddSize, Remove } from "api/size";
import { ERR_CODE } from "api/config";

import { showLoading, showNotification } from "common/js/common";

// import { MessageBox } from 'mint-ui';
// import { ShowToast } from 'common/js/loading-toast'

export default {
  props: {
    data: {
      type: Array,
      defalut: []
    },
    size: {
      type: Array,
      defalut: []
    },
    sizeData: {
      type: Object,
      defalut: []
    },
    openId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // userInfo: "",

      username: "",
      height: "",
      weight: "",
      chest: "",
      remarks: "",
      shoulder: "",
      waist: "",
      back: "",
      isCheckde: false,

      userInfo: {
        username: "",
        mArray: []
      },
      sizeList: [],
      indexArray: [],
      mArray: [],
      dataSize: [],
      sizeDialog: false,

      picture: {}
    };
  },
  methods: {
    sizeClick(row) {
      this.sizeDialog = true;
    },
    clickSize(info, index, listIndex, item) {
      if (item.title === this.picture[item.title]) {
        this.picture[item.title] = info.value;
      } else {
        this.picture[item.title] = info.value;
      }
      this.indexArray[listIndex].index = index;
    },
    setData() {},
    cancle() {
      this.userInfo.username = "";
      this.remarks = "";
      this.isCheckde = false;
      this.indexArray = [];
      this.sizeList = [];
      this.indexArray = [];
      this.picture = {};
      this.userInfo.mArray = [];
      this.dataSize = [];
      this.sizeDialog = false;
    },
    addSize() {
      //   if (this.userInfo === "") {
      //     this.userInfo = UserInfo();
      //   }
      if (this.userInfo.username.trim() === "") {
        showNotification("info", "请输入用户姓名");
        return;
      }
      let obj = {};
      this.userInfo.mArray.map((item, index) => {
        obj[this.size[index].title] = item;
      });
      let options = {
        title: this.userInfo.username,
        remarks: this.remarks,
        body_digital_information: JSON.stringify(obj),
        body_picture_information: JSON.stringify(this.picture)
      };
      if (this.isCheckde) {
        options.type = 1;
      } else {
        options.type = 0;
      }
      if (this.sizeData.id) {
        options.id = this.sizeData.id;

        Remove(options).then(res => {
          if (res.data.code === ERR_CODE) {
            showNotification("success", "修改尺寸成功!");
            this.cancle();
            this.$emit("close");

          }
        });
      } else {
        options.openId = this.openId;
        options.status = 0;
        AddSize(options).then(res => {
          if (res.data.code === ERR_CODE) {
            showNotification("success", "添加尺寸成功!");
            this.$emit("close");
            this.cancle();
          }
        });
      }
    }
  },
  created() {},
  mounted() {},
  watch: {
    data(val) {
      if (!val) return;
      this.sizeList = val;
      for (let i = 0; i < val.length; i++) {
        let obj = {
          index: -1
        };
        this.indexArray.push(obj);
      }
      if (!this.sizeData.body) return;
      this.$nextTick(_ => {
        let data = JSON.parse(this.sizeData.body);
        this.sizeList.map((item, index) => {
          for (let i in data) {
            if (item.title === i) {
              item.sizeConfigValueList.map((info, oIndex) => {
                if (info.value === data[i]) {
                  this.picture[item.title] = data[i];
                  this.indexArray[index].index = oIndex;
                }
              });
            }
          }
        });
      });
    },
    size(val) {
      this.dataSize = val;
      if (!this.sizeData.body) return;
      this.$nextTick(_ => {
        let data = JSON.parse(this.sizeData.body);
        this.size.map((item, index) => {
          for (let i in data) {
            if (item.title === i) {
              this.userInfo.mArray[index] = data[i];
            }
          }
        });
      });
    },
    sizeData(val) {
      this.sizeData = val;
      this.userInfo.username = val.title;
      if (val.type === 1) {
        this.isCheckde = true;
      } else {
        this.isCheckde = false;
      }
      this.remarks = val.remarks;
    }
    //			title(val) {
    //				console.log(val);
    //			}
  }
};
</script>

<style scoped>
img {
  height: 100%;
}

.default-address {
  text-align: center;
}

.default-address label {
  font-size: 13px !important;
}

.size-list {
  padding: 0 0 15px 15px;
  margin-top: 10px;
  background: #fff;
}

.size-list-info {
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 10px;
  padding-top: 15px;
}

.title {
  font-size: 13px;
  color: #999999;
  position: relative;
  padding-left: 10px;
  line-height: 15px;
}

.title:before {
  position: absolute;
  content: "";
  width: 3px;
  height: 15px;
  background: #ff9701;
  left: 0;
  top: -1px;
}

.icon {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 0 10px;
}

.icon > div {
  flex: 0 0 90px;
  width: 90px;
  margin-right: 23px;
  margin-bottom: 10px;
  box-sizing: border-box;
  text-align: center;
}

.icon p {
  color: #333333;
  font-size: 12px;
  margin-top: 7px;
}

.icon .icon-box {
  width: 100%;
  height: 67px;
}

.icon > div.active p {
  color: #ff9701;
}

.icon > div.active .icon-box {
  border: 1px solid #ff9701;
  position: relative;
}

.icon > div.active .icon-box:after {
  position: absolute;
  content: "";
  width: 11px;
  height: 11px;
  background: url("./active-icon.png") no-repeat center center;
  background-size: 11px 11px;
  bottom: 0;
  right: 0;
}

.remarks {
  background: #fff;
  padding: 10px 15px;
  margin: 10px 0 20px;
  display: flex;
}

.remarks .label {
  flex: 0 0 38px;
  width: 38px;
  color: #333;
  font-size: 14px;
  margin-top: 2px;
}

.textarea {
  flex: 1;
}

.textarea textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 0;
  background: #f5f5f5;
}

.success-add {
  width: 90%;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  border-radius: 4px;
  margin: 20px auto;
  text-align: center;
  background: #4c3622;
  color: #fff;
}

.flex-bottom {
  width: 100%;
  margin-bottom: 20px;
}


</style>