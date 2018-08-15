<template>
	<div id="level">
		<div class="fl">
			<el-tree :props="props" :load="loadNode" lazy @node-click="handleNodeClick" :default-expanded-keys="[1]" :expand-on-click-node="false" v-if="data.length > 0">
			</el-tree>
		</div>
		<div class="box">
			<!--  -->
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
						<!-- <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button> -->
						<el-button type="text" size="small" @click="teamClick(scope.row)">查看组织架构</el-button>
						<!-- <el-button type="text" size="small" @click="sizeClick(scope.row)">查看尺寸</el-button> -->
					</template>
				</el-table-column>
			</el-table>
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
		</div>
	</div>
</template>
<script>
	import { UserList, Update, GetUserInfo } from "api/user";
	import { UserInfo, Bot, Top } from "api/level";
	import { ERR_CODE } from "api/config";
	import { showLoading, showNotification } from "common/js/common";

	export default {
		data() {
			return {
				props: {
					label: "label",
					parentId: "id"
				},
				tableData: [],
				parentId: "",
				proportion: 5,
				data: [],

				options4: [],
				list: [],
				loading: false,
				editVisible: false,
				options: [{
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
				botData: [],
				userInfo: {
					proportion: "",
					name: "",
					phone: "",
					channel: "",
					referralCode: ""
				},
				userInfoFules: {},
				openId: ""
			};
		},
		methods: {
			remoteMethod(query) {
				if(query !== "") {
					this.loading = true;
					setTimeout(() => {
						this.loading = false;
						this.options4 = this.list.filter(item => {
							if(item.label.indexOf(query) > -1) {
								return item;
							}
							if(item.label1.indexOf(query) > -1) {
								item.label = item.label1;
								return item;
							}
						});
					}, 200);
				} else {
					this.options4 = [];
				}
			},
			getLevel() {
				const loading = showLoading();
				let options = {
					pageSize: 10000,
					currentPage: 0
				};
				UserList(options).then(res => {
					loading.close();
					if(res.data.code == ERR_CODE) {
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
			getQuery() {
				console.log(1111);
				let options = {
					proportion: this.proportion,
					pageSize: 10000
				};
				UserList(options)
					.then(res => {
						if(res.data.code === 0) {
							let data = res.data.data;
							data.map(item => {
								if(item.proportion === 5) {
									item.label = `${item.nickName}团队`;
									this.data.push(item);
								}
							});
						}
					})
					.catch(res => {});
			},
			loadNode(node, resolve) {
				if(node.level === 0) {
					return resolve(this.data);
				} else {
					this.getBot(node.data.id, node.level, node.data.parentId, resolve);
				}
			},
			handleCheckChange(data, checked, indeterminate) {},
			handleNodeClick(row) {
				this.openId = row.openId;
				this.getUser(row.openId);
			},
			getUser(id) {
				this.tableData = [];
				GetUserInfo(id).then(res => {
					if(res.data.code === ERR_CODE) {
						this.tableData.push(res.data.data);
					}
				});
			},
			teamClick(row) {
				this.editVisible = true;
				this.userInfo = {};
				this.options4 = [];
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
				if(!row.parentName) {
					this.userInfo.referralCode = "";
					this.options4 = [];
				}
				if(!row.channel) {
					this.userInfo.channel = "";
				}
				if(!row.proportion) {
					this.userInfo.proportion = "";
				}
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
					if(valid) {
						const loading = showLoading();
						Update(this.userInfo)
							.then(res => {
								loading.close();
								if(res.data.code === ERR_CODE) {
									this.editVisible = false;
									showNotification("success", "更改成功");
									this.getUser(this.openId);
									this.getQuery();
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
			getBot(id, proportion, parentId, resolve) {
				let options = {
					id: id,
					pageSize: 10000,
					parentId: parentId,
					proportion: proportion
				};

				Bot(options)
					.then(res => {
						if(res.data.code === 0) {
							let data = res.data.data;

							if(data.length === 0 && proportion <= 5) {
								this.botData.map(item => {
									item.level = parseInt(proportion);
								});
								data = this.botData;

							} else {
								this.botData = data;

							}
							data.map(item => {
								if(item.level === 0) {
									item.label = `${item.nickName}(普通用户)`;
								} else {
									item.label = `${item.nickName}(${proportion}级合伙人)`;
								}
							});
							return resolve(data);
						}
					})
					.catch(res => {});
			}
		},
		created() {
			this.getQuery();
			this.getLevel();
		},
		mounted() {}
	};
</script>
<style scoped>
	.el-form-item {
		text-align: left;
	}
	
	.el-input,
	.el-select {
		width: 300px;
	}
	
	#level {
		background: #e1e1e1;
		overflow: hidden;
		margin: -20px;
		padding: 10px;
		height: 100%;
	}
	
	.fl {
		float: left;
		width: auto;
		padding: 0 10px;
		height: 100%;
		background: #fff;
		margin-right: 10px;
	}
	
	.box {
		overflow: hidden;
		height: 100%;
		padding: 20px 0 0 0;
		background: #fff;
	}
	
	.demo-ruleForm {
		width: 400px;
		margin: 0 auto;
	}
	
	.btn {
		width: 300px;
	}
</style>