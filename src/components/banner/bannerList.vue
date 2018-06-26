<template>
	<div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column type="index" width="150" align="center">
			</el-table-column>
			<el-table-column prop="id" label="id" width="180" align="center">
			</el-table-column>
			<el-table-column label="图片地址" align="center" width="200">
				<template slot-scope="scope">
					<img :src="scope.row.cover" width="150" height="100" class="head_pic" />
				</template>
			</el-table-column>
			<el-table-column label="跳转地址" align="center" width="180">
				<template slot-scope="scope">
					<a :href="scope.row.link">{{scope.row.link}}</a>
				</template>
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
	import { BannerList, UpdateBanner } from 'api/banner'
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
					name: 'updateBanner',
					params: row
				})
			},
			removeClick(row) {
				this.$confirm('此操作将永久删除广告, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = showLoading();
					let options = {
						image: row.cover,
						link: row.link,
						id: row.id,
						status: 1,

					}
					options = JSON.stringify(options);
					UpdateBanner(options).then((res) => {
						loading.close();
						if(res.data.code == ERR_CODE) {
							showNotification('success', '删除广告成功');
							this.getBannerList();
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
				this.getBannerList();
			},
			getBannerList() {
				const loading = showLoading();
				BannerList(this.currentPage).then((res) => {
					loading.close();
					console.log(res)
					if(res.data.code == ERR_CODE) {
						this.tableData = [];
						let data = res.data.data;
						this.total = res.data.total;
						for(let i = 0; i < data.length; i++) {

							let obj = {
								'id': data[i].id,
								'cover': data[i].image,
								'link': data[i].link
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
			this.getBannerList();
		}
	}
</script>

<style scoped>
	.pagination-box {
		margin-top: 40px;
		text-align: right;
	}
</style>