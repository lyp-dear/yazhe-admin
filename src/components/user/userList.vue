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
						<el-option key="5" label="金钻会员" value="5"></el-option>
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
	import { UserList, Update } from 'api/user'

	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification } from 'common/js/common'

	export default {

		data() {
			return {
				loading: false,
				currentPage: 1,
				total: 0,
				tableData: [],
				levelArray: [],

				dialogTableVisible: false,
				editVisible: false,
				options4: [],
				list: [],
				loading: false,
				options: [{
					value: '1',
					label: '一级合伙人'
				}, {
					value: '2',
					label: '二级合伙人'
				}, {
					value: '3',
					label: '金钻vip'
				}, {
					value: '4',
					label: 'vip'
				}, {
					value: '5',
					label: '创始投资人'
				}],
				data: {
					proportion: '',
					id: ''
				},
				rules: {
					code: [{
						required: true,
						message: '请选择vip级别',
						trigger: 'blur,input,change'
					}],
				},
				userInfo: {
					proportion: '',
					name: '',
					phone: '',
					channel: '',
					referralCode: '',
				},
				userInfoFules: {

				}
			}
		},
		mounted() {},
		methods: {
			remoteMethod(query) {
				if(query !== '') {
					this.loading = true;
					setTimeout(() => {
						this.loading = false;
						this.options4 = this.list.filter(item => {
							if(item.label.indexOf(query) > -1) {
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
					proportion: row.proportion + '',
					name: row.name,
					phone: row.phone,
					channel: row.channel + '',
					id: row.id
				}
				let obj = {
					value: row.invitationCode,
					label: row.parentName
				}

				this.options4.push(obj)
				this.userInfo.referralCode = row.invitationCode
				if(!row.parentName) {
					this.userInfo.referralCode = '';
					this.options4 = [];
				}
				if(!row.channel) {
					this.userInfo.channel = '';
				}
				if(!row.proportion) {
					this.userInfo.proportion = '';
				}	
			},
			cancleEdit() {
				this.userInfo = {
						proportion: '',
						name: '',
						phone: '',
						channel: '',
						id: ''
					},
					this.editVisible = false;
			},
			edit(data) {
				this.$refs[data].validate((valid) => {
					if(valid) {
						const loading = showLoading();
						Update(this.userInfo).then(res => {
							loading.close();
							if(res.data.code === ERR_CODE) {
								this.editVisible = false;
								this.getUserList();
								showNotification('success', '更改成功');
							} else {
								showNotification('warning', res.data.msg);
							}
						}).catch(res => {
							loading.close();
						})
					}
				});
			},
			addVip(data) {
				this.$refs[data].validate((valid) => {
					if(valid) {
						const loading = showLoading();
						let options = {
							proportion: this.data.proportion,
							id: this.data.id
						}
						Update(options).then(res => {
							loading.close();
							if(res.data.code === ERR_CODE) {
								this.dialogTableVisible = false;
								this.getUserList();

								showNotification('success', '更改成功');
							} else {
								showNotification('warning', res.data.msg);

							}
						}).catch(res => {
							loading.close();
						})
					}
				});
			},
			removeClick(row) {
				this.$confirm('此操作将永久删除尺寸类型, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = showLoading();
					let options = {
						id: row.id,
						status: 1,

					}
					options = JSON.stringify(options);
					UpdateCustomized(options).then((res) => {
						loading.close();
						if(res.data.code == ERR_CODE) {
							showNotification('success', '删除成功');
							this.getUserList();
						} else {
							showNotification('error', res.data.msg);
						}
					}).catch((res) => {
						loading.close();
						showNotification('error', '网络错误,请稍后');

					})
				}).catch(() => {});
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
				}
				UserList(options).then((res) => {
					loading.close();
					if(res.data.code == ERR_CODE) {
						let data = res.data.data;
						this.list = data.map(item => {
							return {
								value: item.invitationCode,
								label: item.nickName
							};
						});
					} else {
						showNotification('warning', res.data.msg)
					}
				})
			},
			getUserList() {
				const loading = showLoading();
				let options = {
					pageSize: 10,
					currentPage: this.currentPage
				}
				UserList(options).then((res) => {
					loading.close();
					if(res.data.code == ERR_CODE) {
						this.tableData = [];
						let data = res.data.data;
						this.total = res.data.total;
						this.tableData = res.data.data;
						this.levelArray = res.data.data;
					} else {
						showNotification('warning', res.data.msg)
					}
				})

			},
		},
		created() {
			this.getUserList();
			this.getLevel();
		}
	}
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