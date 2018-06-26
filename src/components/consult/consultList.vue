<template>
	<div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column type="index" width="150" align="center">
			</el-table-column>
			<el-table-column prop="newsId" label="id" width="150" align="center">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="180" align="center">
			</el-table-column>
			<el-table-column prop="auth" label="作者" width="100" align="center">
			</el-table-column>
			<el-table-column prop="source" label="来源" width="100" align="center">
			</el-table-column>
			<!--<el-table-column label="图片地址" align="center" width="200">
				<template slot-scope="scope">
					<img :src="scope.row.cover" width="150" height="100" class="head_pic" />
				</template>
			</el-table-column>-->
			<el-table-column prop="ctime" label="创建时间" width="200" align="center">
			</el-table-column>
			<el-table-column label="操作" width="140" align="center">
				<template slot-scope="scope">
					<el-button @click="removeClick(scope.row)" type="text" size="small">删除</el-button>
					<el-button type="text" size="small" @click="editClick(scope.row,scope.$index)">编辑</el-button>
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
	import { BannerList, UpdateBanner } from 'api/banner'
	import { ConsultList ,Deleteconsult} from 'api/consult'
	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification, formatDate } from 'common/js/common'

	export default {

		data() {
			return {
				currentPage: 1,
				total: 0,
				tableData: [],
				
				dataArray:[]
			}
		},
		methods: {
			editClick(row,index) {
				this.$router.push({
					name: 'editConsult',
					params: this.dataArray[index]
				})
			},
			removeClick(row) {
				this.$confirm('此操作将永久删除咨询, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = showLoading();
					let options = {
						newsId: row.newsId,
						status: 1,

					}
					options = JSON.stringify(options);
					Deleteconsult(options).then((res) => {
						loading.close();
						if(res.data.code == ERR_CODE) {
							showNotification('success', '删除咨询成功');
							this.getConsultList();
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
				this.getConsultList();
			},
			getConsultList() {
				const loading = showLoading();
				let options = {
					currentPage: this.currentPage,
					pageSize: 10
				}
				ConsultList(options).then((res) => {
					loading.close();
					if(res.data.code == ERR_CODE) {
						this.tableData = [];
						let data = res.data.data;
						this.dataArray = res.data.data;
						this.total = res.data.total;
						for(let i = 0; i < data.length; i++) {

							let obj = {
								'newsId': data[i].newsId,
								'title': data[i].title,
								'auth': data[i].auth,
								'source': data[i].source,
							}
							if(data[i].type === 1) {
								obj.type = '着装品格'
							}
							if(data[i].type === 2) {
								obj.type = '面料养护'
							}
							if(data[i].type === 3) {
								obj.type = '奢侈驿站'
							}
							if(data[i].type === 4) {
								obj.type = '财经咨询'
							}
							if(data[i].type === 5) {
								obj.type = '公司咨询'
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
			this.getConsultList();
		}
	}
</script>

<style scoped>
	.pagination-box {
		margin-top: 40px;
		text-align: right;
	}
</style>