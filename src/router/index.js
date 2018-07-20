import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = resolve => require(['components/login/login.vue'], resolve);
const Home = resolve => require(['components/home/home.vue'], resolve);
const ClothesList = resolve => require(['components/clothes/clothesList/clothesList.vue'], resolve);
const ClothesRelease = resolve => require(['components/clothes/clothesRelease/clothesRelease.vue'], resolve);
const ClothesEdit = resolve => require(['components/clothes/clothesEdit/clothesEdit.vue'], resolve);

const AddCommodityTyep = resolve => require(['components/commodity/addCommodityTyep.vue'], resolve);
const CommodityList = resolve => require(['components/commodity/commodityList.vue'], resolve);
const EditCommodityType = resolve => require(['components/commodity/editCommodityType.vue'], resolve);
const BannerList = resolve => require(['components/banner/bannerList.vue'], resolve);
const UploadBanner = resolve => require(['components/banner/uploadBanner.vue'], resolve);
const UpdateBanner = resolve => require(['components/banner/updateBanner.vue'], resolve);
const SizeTypeList = resolve => require(['components/sizeType/sizeTypeList.vue'], resolve);
const AddSizeType = resolve => require(['components/sizeType/addSizeType.vue'], resolve);
const UpdateSizeType = resolve => require(['components/sizeType/updateSizeType.vue'], resolve);
const SizeTypeValueList = resolve => require(['components/sizeTypeValue/sizeTypeValueList.vue'], resolve);

const CustomizedList = resolve => require(['components/customized/customizedList.vue'], resolve);
const AddCustomized = resolve => require(['components/customized/addCustomized.vue'], resolve);
const EditCustomized = resolve => require(['components/customized/editCustomized.vue'], resolve);

const CustomizedValueList = resolve => require(['components/customizedValue/customizedValueList.vue'], resolve);
const AddCustomizedValue = resolve => require(['components/customizedValue/addCustomizedValue.vue'], resolve);
const EditCustomizedValue = resolve => require(['components/customizedValue/editCustomizedValue.vue'], resolve);

const UserList = resolve => require(['components/user/userList.vue'], resolve);
const FeedbackList = resolve => require(['components/user/feedbackList.vue'], resolve);

const OrderList = resolve => require(['components/order/orderList.vue'], resolve);

const ConsultList = resolve => require(['components/consult/consultList.vue'], resolve);
const AddConsult = resolve => require(['components/consult/addConsult.vue'], resolve);
const EditConsult = resolve => require(['components/consult/editConsult.vue'], resolve);

const AddSizeTypeValue = resolve => require(['components/sizeTypeValue/addSizeTypeValue.vue'], resolve);
const EditSizeTypeValue = resolve => require(['components/sizeTypeValue/editSizeTypeValue.vue'], resolve);
const AttributeList = resolve => require(['components/attribute/attributeList.vue'], resolve);
const AddAttribute = resolve => require(['components/attribute/addAttribute.vue'], resolve);
const EditAttribute = resolve => require(['components/attribute/editAttribute.vue'], resolve);

const Level = resolve => require(['components/level/level.vue'], resolve);
const SizeList = resolve => require(['components/size/sizeList.vue'], resolve);


export default new Router({
	routes: [{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			component: Login,
		},
		{
			path: '/home',
			component: Home,
			children: [{
				path: '/clothesList',
				component: ClothesList
			}, {
				path: '/clothesRelease',
				component: ClothesRelease
			}, {
				path: '/clothesEdit',
				name: 'clothesEdit',
				component: ClothesEdit
			}, {
				path: '/userList',
				component: UserList
			}, {
				path: '/feedbackList',
				component: FeedbackList
			}, {
				path: '/orderList',
				component: OrderList
			}, {
				path: '/consultList',
				component: ConsultList
			}, {
				path: '/addConsult',
				component: AddConsult
			}, {
				path: '/editConsult',
				name: 'editConsult',
				component: EditConsult
			}, {
				path: '/addCommodityTyep',
				component: AddCommodityTyep
			}, {
				path: '/commodityList',
				component: CommodityList
			}, {
				path: '/editCommodityType',
				name: 'editCommodityType',
				component: EditCommodityType
			}, {
				path: '/bannerList',
				component: BannerList
			}, {
				path: '/uploadBanner',
				component: UploadBanner
			}, {
				path: '/updateBanner',
				name: 'updateBanner',
				component: UpdateBanner
			}, {
				path: '/sizeTypeList',
				component: SizeTypeList
			}, {
				path: '/addSizeType',
				component: AddSizeType
			}, {
				path: '/updateSizeType',
				name: 'updateSizeType',
				component: UpdateSizeType
			}, {
				path: '/sizeTypeValueList',
				component: SizeTypeValueList
			}, {
				path: '/addSizeTypeValue',
				component: AddSizeTypeValue
			}, {
				path: '/editSizeTypeValue',
				name: 'editSizeTypeValue',
				component: EditSizeTypeValue
			}, {
				path: '/customizedList',
				component: CustomizedList
			}, {
				path: '/addCustomized',
				component: AddCustomized
			}, {
				path: '/editCustomized',
				name: 'editCustomized',
				component: EditCustomized
			}, {
				path: '/customizedValueList',
				component: CustomizedValueList
			}, {
				path: '/addCustomizedValue',
				component: AddCustomizedValue
			}, {
				path: '/editCustomizedValue',
				name: 'editCustomizedValue',
				component: EditCustomizedValue
			}, {
				path: '/attributeList',
				component: AttributeList
			}, {
				path: '/addAttribute',
				component: AddAttribute
			}, {
				path: '/editAttribute',
				name: 'editAttribute',
				component: EditAttribute
			},{
				path: '/level',
				component: Level
			},{
				path:'/sizeList',
				component:SizeList
			}]
		}
	]
})