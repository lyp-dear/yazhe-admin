<template>
	<div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column type="index" width="150" align="center">
			</el-table-column>
			<el-table-column prop="id" label="id" width="180" align="center">
			</el-table-column>
			<el-table-column prop="name" label="名称" width="180" align="center">
			</el-table-column>
			<el-table-column prop="cagegoryName" label="商品分类" width="180" align="center">
			</el-table-column>
						<el-table-column prop="cagegory_id" label="商品分类id" width="180" align="center">
			</el-table-column>
			<el-table-column prop="type" label="定制类型" width="180" align="center">
			</el-table-column>
			<el-table-column prop="ctime" label="创建时间" width="200" align="center">
			</el-table-column>
			<el-table-column label="操作" width="140" align="center">
				<template slot-scope="scope">
					<el-button @click="removeClick(scope.row)" type="text" size="small">删除</el-button>
					<el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
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
	import { CustomizedList ,UpdateCustomized} from 'api/customized'
	
	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification, formatDate } from 'common/js/common'

	export default {

		data() {
			return {
				currentPage: 1,
				total: 0,
				tableData: []
			}
		},
		methods: {
			editClick(row) {
				this.$router.push({
					name: 'editCustomized',
					params: row
				})
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
							this.getCustomizedList();
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
				this.getCustomizedList();
			},
			getCustomizedList() {
				const loading = showLoading();
				let options = {
					pageSize: 10,
					currentPage: this.currentPage
				}
				CustomizedList(options).then((res) => {
					loading.close();
					if(res.data.code == ERR_CODE) {
						this.tableData = [];
						let data = res.data.data;
						this.total = res.data.total;
						for(let i = 0; i < data.length; i++) {
							let obj = {
								'id': data[i].id,
								'name': data[i].name,
								'cagegoryName': data[i].cagegoryName,
								'cagegory_id': data[i].cagegory_id
								
							}
							if(data[i].type === 1){
								obj.type = '全定制';
							}else{
								obj.type = '半定制';
								
							}
							let date1 = new Date(data[i].creationTime);
							obj.ctime = date1.toLocaleDateString().replace(/\//g, "-") + " " + date1.toTimeString().substr(0, 8);
							this.tableData.push(obj);
						}
					} else {
						showNotification('warning', res.data.msg)
					}
				})

			},
		},
		created() {
			this.getCustomizedList();
		}
	}
</script>

<style scoped>
	.pagination-box {
		margin-top: 40px;
		text-align: right;
	}
</style>