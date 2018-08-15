<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="150" align="center">
      </el-table-column>
      <el-table-column prop="id" label="id" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="真实姓名" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="名称" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.nickName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.phone || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="levelName" label="vip级别" width="180" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.levelName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="levelName" label="上下级" width="180" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.parentName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片地址" align="center" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.headimgurl" width="150" height="100" class="head_pic" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="editInfo(scope.row)">用户信息</el-button>

          <!-- <el-button type="text" size="small" @click="teamClick(scope.row)">查看组织架构</el-button> -->
          <el-button type="text" size="small" @click="sizeClick(scope.row)">查看尺寸</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加会员级别" :visible.sync="dialogTableVisible">
      <el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm">
        <el-form-item label="VIP级别" prop="proportion">
          <el-select v-model="data.proportion" clearable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVip('data')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看用户信息" :visible.sync="infoVisible">
      <el-form :model="userInfo" :rules="rulesUserInfo" ref="userInfo" label-width="100px" class="demo-ruleForm">
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="userInfo.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="头像" prop="img">
          <upload-image v-on:selectCover="getCover" :imgUrl="userInfo.img"></upload-image>

        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wx">
          <el-input v-model="userInfo.wx"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="userInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人" prop="energencyContact">
          <el-input v-model="userInfo.energencyContact"></el-input>
        </el-form-item>
        <el-form-item label="银行卡" prop="bandCards">
          <el-input v-model="userInfo.bandCards"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idcard">
          <el-input v-model="userInfo.idcard"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="infoVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserInfo('userInfo')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑用户信息" :visible.sync="editVisible" width="500px" class="editVisible" @change="cancleEdit">
      <el-form :model="userInfo" :rules="userInfoFules" ref="userInfo" label-width="100px" class="demo-ruleForm">
        <el-form-item label="VIP级别" prop="proportion">
          <el-select v-model="userInfo.proportion" clearable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定上下级">
          <el-select v-model="userInfo.referralCode" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="proportion">
          <el-select v-model="userInfo.channel" clearable placeholder="请选择">
            <el-option key="4" label="合伙人" value="4"></el-option>
            <el-option key="2" label="经销商" value="2"></el-option>
            <el-option key="5" label="会员" value="5"></el-option>
            <el-option key="1" label="生产线" value="1"></el-option>
            <el-option key="3" label="设计师" value="3"></el-option>
            <el-option key="0" label="其他" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleEdit">取 消</el-button>
        <el-button type="primary" @click="edit('userInfo')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="pagination-box">
      <!---->
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
import { UserList, Update } from "api/user";
import { showLoading, showNotification } from "common/js/common";
import { ERR_CODE } from "api/config";
import { UpdateBanner } from "api/banner";
import UploadImage from "base/uploadImage";

export default {
  components: {
    UploadImage
  },
  data() {
    var checkBandCards = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入银行卡账号"));
      } else if (!/^(\d{16}|\d{19})$/.test(value)) {
        callback(new Error("请输入正确的银行卡!"));
      } else {
        callback();
      }
    };
    var checkIdcard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入身份证"));
      } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback(new Error("请输入正确的身份证!"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入电话号码"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的电话号码!"));
      } else {
        callback();
      }
    };

    return {
      userInfo: {
  
      },
      rulesUserInfo: {
        name: [
          {
            required: true,
            message: "请输入用户真实姓名",
            trigger: "blur,input,change"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur,input,change"
          }
        ],
        img: [
          {
            required: true,
            message: "请上传图片",
            trigger: "blur,input,change"
          }
        ],
        phone: [
          {
            required: true,
            validator: checkPhone,
            trigger: "blur"
          }
        ],
        wx: [
          {
            required: true,
            message: "请填写微信号",
            trigger: "blur,input,change"
          }
        ],
        address: [
          {
            required: true,
            message: "请选择地址",
            trigger: "blur,input,change"
          }
        ],
        energencyContact: [
          {
            required: true,
            message: "请填写紧急联系人",
            trigger: "blur,input,change"
          }
        ],
        bandCards: [
          {
            required: true,
            validator: checkBandCards,
            trigger: "blur"
          }
        ],
        idcard: [
          {
            required: true,
            validator: checkIdcard,
            trigger: "blur"
          }
        ]
      },
      currentPage: 1,
      total: 0,
      tableData: [],
      levelArray: [],

      dialogTableVisible: false,
      editVisible: false,
      options4: [],
      list: [],
      loading: false,
      options: [
        {
          value: "1",
          label: "一级合伙人"
        },
        {
          value: "2",
          label: "二级合伙人"
        },
        {
          value: "3",
          label: "金钻vip"
        },
        {
          value: "4",
          label: "vip"
        },
        {
          value: "5",
          label: "创始投资人"
        }
      ],
      data: {
        proportion: "",
        id: ""
      },
      rules: {
        code: [
          {
            required: true,
            message: "请选择vip级别",
            trigger: "blur,input,change"
          }
        ]
      },
      userInfo: {
        proportion: "",
        name: "",
        channel: "",
        referralCode: "",
        sex: "",
        img: "",
        phone: "",
        wx: "",
        address: "",
        energencyContact: "",
        bandCards: "",
        idcard: ""
      },
      userInfoFules: {},
      infoVisible: false,
      user: {}
    };
  },
  mounted() {},
  methods: {
    editInfo(data) {
      this.infoVisible = true;

   this.userInfo =  {
        proportion: data.proportion + "",
        name: data.name,
        channel: data.channel + "",
        referralCode: data.referralCode,
        sex: data.sex,
        img: data.img,
        phone: data.phone,
        wx: data.wx,
        address: data.address,
        energencyContact: data.energencyContact,
        bandCards: data.bandCards,
        idcard: data.idcard,
      }
    },
    getCover(val) {
      this.userInfo.img = val;
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            if (item.label.indexOf(query) > -1) {
              return item;
            }
            if (item.label1.indexOf(query) > -1) {
              item.label = item.label1;
              console.log(item);
              return item;
            }
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    },
    addClick(row) {
      this.dialogTableVisible = true;
      this.data.id = row.id;
    },
    editClick(row) {
      this.editVisible = true;
      this.userInfo = {
        proportion: row.proportion + "",
        name: row.name,
        phone: row.phone,
        channel: row.channel + "",
        id: row.id
      };
      let obj = {
        value: row.invitationCode,
        label: row.parentName
      };

      this.options4.push(obj);
      this.userInfo.referralCode = row.invitationCode;
      if (!row.parentName) {
        this.userInfo.referralCode = "";
        this.options4 = [];
      }
      if (!row.channel) {
        this.userInfo.channel = "";
      }
      if (!row.proportion) {
        this.userInfo.proportion = "";
      }
    },
    sizeClick(row) {
      this.$router.push({
        path: "/sizeList",
        query: {
          id: row.openId
        }
      });
    },
    cancleEdit() {
      (this.userInfo = {
        proportion: "",
        name: "",
        phone: "",
        channel: "",
        id: ""
      }),
        (this.editVisible = false);
    },
    edit(data) {
      this.$refs[data].validate(valid => {
        if (valid) {
          const loading = showLoading();
          Update(this.userInfo)
            .then(res => {
              loading.close();
              if (res.data.code === ERR_CODE) {
                this.editVisible = false;
                this.getUserList();
                showNotification("success", "更改成功");
              } else {
                showNotification("warning", res.data.msg);
              }
            })
            .catch(res => {
              loading.close();
            });
        }
      });
    },
    addUserInfo(data) {
      this.$refs[data].validate(valid => {
        if (valid) {
          let options = this.userInfo;
          Update(options).then(res => {
            console.log(res);
          });
        }
      });
    },
    addVip(data) {
      this.$refs[data].validate(valid => {
        if (valid) {
          const loading = showLoading();
          let options = {
            proportion: this.data.proportion,
            id: this.data.id
          };
          Update(options)
            .then(res => {
              loading.close();
              if (res.data.code === ERR_CODE) {
                this.dialogTableVisible = false;
                this.getUserList();

                showNotification("success", "更改成功");
              } else {
                showNotification("warning", res.data.msg);
              }
            })
            .catch(res => {
              loading.close();
            });
        }
      });
    },
    removeClick(row) {
      this.$confirm("此操作将永久删除尺寸类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loading = showLoading();
          let options = {
            id: row.id,
            status: 1
          };
          options = JSON.stringify(options);
          UpdateCustomized(options)
            .then(res => {
              loading.close();
              if (res.data.code == ERR_CODE) {
                showNotification("success", "删除成功");
                this.getUserList();
              } else {
                showNotification("error", res.data.msg);
              }
            })
            .catch(res => {
              loading.close();
              showNotification("error", "网络错误,请稍后");
            });
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    },
    getLevel() {
      const loading = showLoading();
      let options = {
        pageSize: 10000,
        currentPage: 0
      };
      UserList(options).then(res => {
        loading.close();
        if (res.data.code == ERR_CODE) {
          let data = res.data.data;
          this.list = data.map(item => {
            return {
              value: item.invitationCode,
              label: item.nickName,
              label1: item.name === null ? "" : item.name
            };
          });
        } else {
          showNotification("warning", res.data.msg);
        }
      });
    },
    getUserList() {
      const loading = showLoading();
      let options = {
        pageSize: 10,
        currentPage: this.currentPage
      };
      UserList(options).then(res => {
        loading.close();
        if (res.data.code == ERR_CODE) {
          this.tableData = [];
          let data = res.data.data;
          this.total = res.data.total;
          this.tableData = res.data.data;
          this.levelArray = res.data.data;
        } else {
          showNotification("warning", res.data.msg);
        }
      });
    }
  },
  created() {
    this.getUserList();
    this.getLevel();
  }
};
</script>

<style scoped>
.pagination-box {
  margin-top: 40px;
  text-align: right;
}

.editVisible .el-input {
  width: 222px;
}
</style>