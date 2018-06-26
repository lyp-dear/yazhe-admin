<template>
	<div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column fixed prop="title" label="名称" width="150" align="center">
			</el-table-column>
			<el-table-column prop="id" label="id" width="180" align="center">
			</el-table-column>
			<el-table-column prop="parent" label="父类管理" width="180" align="center">
			</el-table-column>
			<el-table-column prop="ctime" label="创建时间" width="200" align="center">
			</el-table-column>
			<el-table-column label="操作" width="100" align="center">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
					<el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-box">
			<!---->
			<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>

</template>

<script>
	import { CommodityList, UpdateCommodity } from 'api/commodity'
	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification, formatDate } from 'common/js/common'

	export default {
		methods: {
			editClick(row) {
				this.$router.push({
					name: 'editCommodityType',
					params: row
				})
			},
			handleClick(row) {
				this.$confirm('此操作将永久删除商品类型, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = showLoading();
					let options = {
						title: row.title,
						cagegory_id: row.id,
						status: 1
					}
					if(row.parent == '男'){
						options.parent = 1;
					}else{
						options.parent = 2;
						
					}
					options = JSON.stringify(options);
					UpdateCommodity(options).then((res) => {
						loading.close();
						if(res.data.code == ERR_CODE) {
							showNotification('success', '删除商品类型成功');
							this.getCommodityList();
						} else {
							showNotification('error', res.data.msg);
						}
					}).catch((res) => {
						loading.close();
						showNotification('error', '网络错误,请稍后');

					})
				}).catch((res) => {
					console.log(res)
				});
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getCommodityList();
			},
			getCommodityList() {
				const loading = showLoading();
				CommodityList(10,this.currentPage).then((res) => {
					loading.close();
					if(res.data.code == ERR_CODE) {
						this.tableData = [];
						let data = res.data.data;
						this.total = res.data.total;
						for(let i = 0; i < data.length; i++) {
							let obj = {
								'title': data[i].title,
								'id': data[i].cagegory_id
							}
							let date1 = new Date(data[i].creationTime);
							obj.ctime = date1.toLocaleDateString().replace(/\//g, "-") + " " + date1.toTimeString().substr(0, 8);
							let date2 = new Date(data[i].updateTime);
							obj.etime = date2.toLocaleDateString().replace(/\//g, "-") + " " + date2.toTimeString().substr(0, 8);
							if(data[i].parent == 1) {
								obj.parent = '男';
							} else {
								obj.parent = '女';

							}
							this.tableData.push(obj);
						}
					} else {
						showNotification('warning', res.data.msg)
					}
				})

			},
		},

		data() {
			return {
				currentPage: 1,
				total: 0,
				tableData: []
			}
		},
		created() {
			this.getCommodityList();
		}
	}
</script>

<style scoped>
	.pagination-box {
		margin-top: 40px;
		text-align: right;
	}
</style>