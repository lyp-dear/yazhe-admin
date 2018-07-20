<template>
	<div>
		<div class="block">
			<el-input v-model="goods_name" clearable placeholder="请输入商品名称"></el-input>
			<el-select v-model="category_id" clearable placeholder="请选择">
				<el-option v-for="item in categoryOption" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button type="primary" @click="sosoGood" icon="el-icon-search">搜索</el-button>

		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column type="index" width="150" align="center">
			</el-table-column>
			<el-table-column prop="id" label="id" width="180" align="center">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="180" align="center">
			</el-table-column>
			<el-table-column prop="type" label="定制类型" width="180" align="center">
			</el-table-column>
			<el-table-column prop="price" label="价格" width="180" align="center">
			</el-table-column>
			<el-table-column prop="market_price" label="市场价" width="180" align="center">
			</el-table-column>
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
	import { GoodList, Update } from 'api/clothes'
	import { CommodityList } from 'api/commodity'
	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification, formatDate } from 'common/js/common'

	export default {

		data() {
			return {
				currentPage: 1,
				total: 0,
				tableData: [],

				dataArray: [],

				categoryOption: [],
				goods_name: '',
				category_id: ''

			}
		},
		methods: {
			editClick(row, index) {
				console.log();
				this.$router.push({
					name: 'clothesEdit',
					params: this.dataArray[index]
				})
			},
			getCommodityList() {
				const loading = showLoading();
				CommodityList(100, 0).then((res) => {
					loading.close();
					if(res.data.code === ERR_CODE) {
						let data = res.data.data;
						for(let i = 0; i < res.data.data.length; i++) {
							let obj = {
								value: data[i].cagegory_id,
								label: data[i].title
							}
							this.categoryOption.push(obj);
						}
					} else {
						showNotification('warning', res.data.msg)
					}
				})

			},
			removeClick(row) {
				this.$confirm('此操作将永久删除商品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = showLoading();
					let options = {
						goods_id: row.id,
						status: 1,

					}
					options = JSON.stringify(options);
					Update(options).then((res) => {
						console.log(res)
						loading.close();
						if(res.data.code == ERR_CODE) {
							showNotification('success', '删除商品成功');
							this.getGoodList();
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
				if(val == 1 ){
					return;
				}
				this.getGoodList();
			},
			sosoGood(){
				this.currentPage = 1;
				this.getGoodList();
			},
			getGoodList() {
				const loading = showLoading();
				let options = {
					goods_name: this.goods_name,
					currentPage: this.currentPage,
					category_id: this.category_id,
					pageSize: 10,
				}
				GoodList(options).then((res) => {
					loading.close();
					if(res.data.code == ERR_CODE) {
						this.tableData = [];
						let data = res.data.data;
						this.total = res.data.total;
						this.dataArray = data;
						for(let i = 0; i < data.length; i++) {

							let obj = {
								'id': data[i].goods_id,
								'title': data[i].goods_name,
								'price': data[i].price,
								'market_price': data[i].market_price
							}
							switch(data[i].type) {
								case 0:
									obj.type = '半定制';
									break;
								case 1:
									obj.type = '全定制';
									break;
								case 2:
									obj.type = '全定制';
									break;
								case 3:
									obj.type = '特惠';
									break;

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
		created() {},
		mounted() {
			this.getCommodityList();
			this.getGoodList();
		}
	}
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
		width: 200px;
	}
</style>