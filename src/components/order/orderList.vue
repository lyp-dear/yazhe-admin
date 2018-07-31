<template>
  <div>
    <div class="block">
      <el-input placeholder="请输入姓名" v-model="name">
      </el-input>
      <!--<el-input placeholder="请输入主单人" v-model="orderName" clearable>
			</el-input>-->
      <el-select v-model="is_pay" clearable placeholder="请选择">
        <el-option label="未支付" value="0"></el-option>
        <el-option label="已支付" value="1"></el-option>
      </el-select>
      <el-date-picker v-model="time" type="daterange" @change="getTime" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :unlink-panels="false" value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="soso">搜索</el-button>
      <el-button type="primary" @click="down" icon="el-icon-download">导出数据</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="150" align="center">
      </el-table-column>
      <el-table-column prop="id" label="id" width="180" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center">
      </el-table-column>
      <el-table-column prop="order_number" label="订单号" width="180" align="center">
      </el-table-column>
      <el-table-column label="后台订单号" align="center" width="200">
        <template slot-scope="scope">
          <!--<img :src="scope.row.headimgurl" width="150" height="100" class="head_pic" />-->
          <a href="javascript:;" @click="orderDetail(scope.row)">{{scope.row.custom_number}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="pay_price" label="支付金额" width="180" align="center">
      </el-table-column>
      <el-table-column prop="zhengprice" label="真实价钱" width="180" align="center">
      </el-table-column>
      <el-table-column prop="is_pay" label="支付状态" width="180" align="center">
      </el-table-column>
      <el-table-column prop="code" label="生产线代码" width="180" align="center">
      </el-table-column>
      <el-table-column prop="number" label="生产线编号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="partOrder" label="下单员" width="180" align="center">
      </el-table-column>

      <el-table-column prop="theSalesmanStr" label="主单人" width="180" align="center">
      </el-table-column>
      <el-table-column prop="quantityBodyPart" label="量体员" width="180" align="center">
      </el-table-column>
      <el-table-column prop="pay_time" label="支付时间" width="180" align="center">
      </el-table-column>
      <!--<el-table-column label="图片地址" align="center" width="200">
				<template slot-scope="scope">
					<img :src="scope.row.headimgurl" width="150" height="100" class="head_pic" />
				</template>
			</el-table-column>-->
      <el-table-column label="操作" width="140" align="center">
        <template slot-scope="scope">
          <!--<el-button @click="removeClick(scope.row)" type="text" size="small">删除</el-button>
					<el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>-->
          <el-button type="text" size="small" @click="addCode(scope.row)">添加编号</el-button>
          <el-button type="text" size="small" @click="delivery(scope.row)">发货</el-button>

        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <!---->
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="添加生产线编号" :visible.sync="dialogTableVisible">
      <el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm">
        <el-form-item label="生产线代码" prop="code">
          <el-input v-model="data.code" placeholder="请填写生产线代码"></el-input>
        </el-form-item>
        <el-form-item label="生产线编号" prop="number">
          <el-input v-model="data.number" placeholder="请填写生产线编号"></el-input>
        </el-form-item>
        <el-form-item label="下单员" prop="partOrder">
          <el-input v-model="data.partOrder" placeholder="请填写下单员"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCodeApi('data')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="发货" :visible.sync="isDelivery" width="900px">
      <el-form :model="data1" :rules="rules1" ref="data1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="快递公司" prop="expressName">
          <el-input v-model="data1.expressName" placeholder="请填写快递公司"></el-input>
        </el-form-item>
        <el-form-item label="快递单号" prop="expressNumber">
          <el-input v-model="data1.expressNumber" placeholder="请填写快递单号"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="data1.remark" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-table-column prop="divide" label="分成" width="180" align="center">
        </el-table-column>
        <el-form-item label="商品数量" prop="count">
          <el-input v-model="data1.count" placeholder="请填写商品数量"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isDelivery = false">取 消</el-button>
        <el-button type="primary" @click="addDelivery('data1')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="订单详情" :visible.sync="isOrderDetail">
      <el-table :data="detailData" border style="width: 100%">
        <el-table-column prop="order_number" label="订单号" width="100" align="center">
        </el-table-column>
        <el-table-column label="商品列表" align="center" width="200">
          <template slot-scope="scope">
            <!--<img :src="scope.row.headimgurl" width="150" height="100" class="head_pic" />-->
            <div v-for="(item,index) in scope.row.goodsList" :key="index">
              <p>{{item.goods_name}}</p>
              <p>{{item.attribute}}</p>
              <p>{{item.customization}}</p>
              <p>{{item.size}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pay_price" label="订单价格" width="100" align="center">
          <template slot-scope="scope">
            <!--<img :src="scope.row.headimgurl" width="150" height="100" class="head_pic" />-->
            <span>{{scope.row.pay_price|| '--'}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="divide" label="分成" width="100" align="center">
          <template slot-scope="scope">
            <!--<img :src="scope.row.headimgurl" width="150" height="100" class="head_pic" />-->
            <span>{{scope.row.divide|| '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="收获地址" width="100" align="center">
          <template slot-scope="scope">
            <!--<img :src="scope.row.headimgurl" width="150" height="100" class="head_pic" />-->
            <span>{{scope.row.address|| '--'}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="remark" label="备注" width="100" align="center">
          <template slot-scope="scope">
            <!--<img :src="scope.row.headimgurl" width="150" height="100" class="head_pic" />-->
            <span>{{scope.row.remark|| '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="生产编码" width="180" align="center">
          <template slot-scope="scope">
            <!--<img :src="scope.row.headimgurl" width="150" height="100" class="head_pic" />-->
            <span>{{scope.row.code|| '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="生产线编号" width="180" align="center">
          <template slot-scope="scope">
            <!--<img :src="scope.row.headimgurl" width="150" height="100" class="head_pic" />-->
            <span>{{scope.row.number|| '--'}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="图片地址" align="center" width="200">
				<template slot-scope="scope">
					<img :src="scope.row.headimgurl" width="150" height="100" class="head_pic" />
				</template>
			</el-table-column>-->
      </el-table>
    </el-dialog>
  </div>

</template>

<script>
import {
  OrderList,
  AddCode,
  AddDelivery,
  OrderDetail,
  DownYear,
  ExportOrder
} from "api/order";

import { ERR_CODE } from "api/config";
import { showLoading, showNotification } from "common/js/common";

export default {
  data() {
    return {
      name: "",
      orderName: "",
      is_pay: "",

      time: "",
      sTime: "",
      eTime: "",
      currentPage: 0,
      total: 0,
      tableData: [],
      detailData: [],

      dialogTableVisible: false,
      isDelivery: false,
      isOrderDetail: false,
      data: {
        code: "",
        number: "",
        partOrder: "",
        order_number: ""
      },
      data1: {
        expressName: "",
        expressNumber: "",
        remark: "",
        count: "",
        order_number: ""
      },
      rules: {
        code: [
          {
            required: true,
            message: "请填写生产线代码",
            trigger: "blur,input,change"
          }
        ],
        number: [
          {
            required: true,
            message: "请填写生产线编号",
            trigger: "blur,input,change"
          }
        ],
        partOrder: [
          {
            required: true,
            message: "请填写下单员",
            trigger: "blur,input,change"
          }
        ]
      },
      rules1: {
        expressName: [
          {
            required: true,
            message: "请填写快递公司",
            trigger: "blur,input,change"
          }
        ],

        expressNumber: [
          {
            required: true,
            message: "请填写快递单号",
            trigger: "blur,input,change"
          }
        ],
        count: [
          {
            required: true,
            message: "请填写商品数量",
            trigger: "blur,input,change"
          }
        ]
      }
    };
  },
  methods: {
    getTime(val) {
      if (val === null) return;
      this.sTime = val[0];
      this.eTime = val[1];
    },
    soso() {
      this.currentPage = 0;
      this.getOrderList();
    },
    down() {
      //				if(this.sTime === '' && this.eTime === '') {
      //					showNotification('warning', '请选择开始时间和结束时间');
      //					return;
      //				}
      let options = {
        name: this.name,
        orderName: this.orderName,
        start: this.sTime + "",
        end: this.eTime + ""
      };
      if (this.is_pay != "") {
        options.is_pay = Number(this.is_pay);
      } else {
        options.is_pay = "";
      }
      ExportOrder(options)
        .then(res => {
          //					if(res.data != '') {
          //						window.location.href = res.request.responseURL;
          //					} else {
          //						showNotification('error', '网络异常,请稍候!')
          //					}
          let blob = new Blob([res.data], {
            type: "application/x-xls"
          });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          if (this.name != "") {
            link.download = this.name + ".xls";
          } else {
            link.download = "订单表" + ".xls";
          }
          link.click();
        })
        .catch(res => {
          showNotification("error", "网络异常,请稍候!");
        });
    },
    orderDetail(row) {
      this.isOrderDetail = true;
      this.detailData = [];
      let options = {
        id: row.id
      };
      const loading = showLoading();
      OrderDetail(options).then(res => {
        console.log(res);
        loading.close();
        if (res.data.code === ERR_CODE) {
          this.detailData.push(res.data.data);
        }
      });
    },
    addCode(row) {
      this.data.order_number = row.order_number;
      this.dialogTableVisible = true;
    },
    delivery(row) {
      this.data1.order_number = row.order_number;
      this.isDelivery = true;
    },
    addCodeApi(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = showLoading();
          let options = {
            code: this.data.code,
            partOrder: this.data.partOrder,
            order_number: this.data.order_number,
            number: this.data.number
          };
          options = JSON.stringify(options);
          AddCode(options)
            .then(res => {
              console.log(res);
              loading.close();
              if (res.data.code == ERR_CODE) {
                showNotification("success", "添加成功");
                this.dialogTableVisible = false;
                //								this.$router.push({
                //									path: '/sizeTypeList'
                //								});
              } else {
                showNotification("warning", res.data.msg);
              }
            })
            .catch(res => {
              loading.close();
              showNotification("error", "网络错误,请稍后!");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addDelivery(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = showLoading();
          let options = {
            expressName: this.data1.expressName,
            order_number: this.data1.order_number,
            expressNumber: this.data1.expressNumber,
            remark: this.data1.remark,
            count: this.data1.count
          };

          AddDelivery(options)
            .then(res => {
              console.log(res);
              loading.close();
              if (res.data.code == ERR_CODE) {
                showNotification("success", "发货成功");
                this.isDelivery = false;
                //								this.$router.push({
                //									path: '/sizeTypeList'
                //								});
              } else {
                showNotification("warning", res.data.msg);
              }
            })
            .catch(res => {
              loading.close();
              showNotification("error", "网络错误,请稍后!");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editClick(row) {
      this.$router.push({
        name: "editCustomized",
        params: row
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
                this.getOrderList();
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
      this.getOrderList();
    },
    getOrderList() {
      const loading = showLoading();
      let options = {
        pageSize: 10,
        currentPage: this.currentPage,
        name: this.name,
        orderName: this.orderName,
        start: this.sTime + "",
        end: this.eTime + ""
      };
      if (this.is_pay === "") {
        options.is_pay = "";
      } else {
        options.is_pay = Number(this.is_pay);
      }
      OrderList(options).then(res => {
        loading.close();
        if (res.data.code == ERR_CODE) {
          console.log(res);
          this.tableData = [];
          let data = res.data.data;
          this.total = res.data.total;
          for (let i = 0; i < data.length; i++) {
            let obj = {
              id: data[i].id || "--",
              name: data[i].name || "--",
              order_number: data[i].order_number || "--",
              pay_price: data[i].pay_price || "--",
              code: data[i].code || "--",
              number: data[i].number || "--",
              partOrder: data[i].partOrder || "--",
              theSalesmanStr: data[i].theSalesmanStr || "--",
              quantityBodyPart: data[i].quantityBodyPart || "--",
              custom_number: data[i].custom_number || "--",
              zhengprice: data[i].zhengprice || "--"
            };
            let date1 = new Date(data[i].pay_time);
            obj.pay_time =
              date1.toLocaleDateString().replace(/\//g, "-") +
              " " +
              date1.toTimeString().substr(0, 8);
            if (data[i].type === 1) {
              obj.type = "全定制";
            } else {
              obj.type = "半定制";
            }
            if (data[i].is_pay === 0) {
              obj.is_pay = "待支付";
            }
            if (data[i].is_pay === 1) {
              obj.is_pay = "已支付";
            }
            this.tableData.push(obj);
          }
        } else {
          showNotification("warning", res.data.msg);
        }
      });
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>

<style scoped>
.pagination-box {
  margin-top: 40px;
  text-align: right;
}

.block {
  margin-bottom: 20px;
  text-align: left;
}

.block .el-input {
  width: 120px;
}
</style>