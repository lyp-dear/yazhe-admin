<template>
	<div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column fixed prop="name" label="名称" width="150" align="center">
			</el-table-column>
			<el-table-column prop="id" label="id" width="180" align="center">
			</el-table-column>
			<el-table-column prop="cagegoryName" label="商品分类名称" width="180" align="center">
			</el-table-column>
			<el-table-column prop="category_id" label="商品分类id" width="180" align="center">
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
	import { AttributeList, UpdateAttribute } from 'api/attribute'
	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification, formatDate } from 'common/js/common'

	export default {
		methods: {
			editClick(row) {
				this.$router.push({
					name: 'editAttribute',
					params: row
				})
			},
			handleClick(row) {
				this.$confirm('此操作将永久删除商品属性类型, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = showLoading();
					let options = {
						status:1,
						attribute_id: row.id
					}
					options = JSON.stringify(options);
					UpdateAttribute(options).then((res) => {
						loading.close();
						if(res.data.code == ERR_CODE) {
							showNotification('success', '删除商品属性类型成功');
							this.getAttributeList();
						} else {
							showNotification('error', res.data.msg);
						}
					}).catch((res) => {
						console.log(res)
						loading.close();
						showNotification('error', '网络错误,请稍后');

					})
				}).catch((res) => {
					console.log(res)
				});
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getAttributeList();
			},
			getAttributeList() {
				const loading = showLoading();
				AttributeList(this.currentPage).then((res) => {
					loading.close();
					if(res.data.code == ERR_CODE) {
						this.tableData = [];
						let data = res.data.data;
						this.total = res.data.total;
						for(let i = 0; i < data.length; i++) {
							let obj = {
								'name': data[i].name,
								'id': data[i].attribute_id,
								'cagegoryName': data[i].cagegoryName,
								'category_id': data[i].category_id
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

		data() {
			return {
				currentPage: 1,
				total: 0,
				tableData: []
			}
		},
		created() {
			this.getAttributeList();
		}
	}
</script>

<style scoped>
	.pagination-box {
		margin-top: 40px;
		text-align: right;
	}
</style>