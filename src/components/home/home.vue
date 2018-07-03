<template>
	<el-container>
		<el-header class="el-col el-col-24">

			<div class="logo">雅者商城</div>

			<div class="user-info">
				<div class="user-box">
					<div class="user-name">{{name}}</div>
					<div class="portrait">
						<el-dropdown>
							<span class="el-dropdown-link">
								<img :src="avatar" alt="" />
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>

			</div>

		</el-header>
		<el-container class="container el-col el-col-24">
			<el-aside>
				<el-menu default-active="2" class="el-menu-vertical-demo">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-goods"></i>
							<span>商品</span>
						</template>
						<router-link tag="div" class="tab-item" to="/clothesList">
							<el-menu-item index="1-1">商品列表</el-menu-item>
						</router-link>
						<router-link tag="div" class="tab-item" to="/clothesRelease">
							<el-menu-item index="1-2">商品发布</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
				<el-menu default-active="2" class="el-menu-vertical-demo">
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-document"></i>
							<span>商品分类</span>
						</template>
						<router-link tag="div" class="tab-item" to="/commodityList">
							<el-menu-item index="2-1">商品分类列表</el-menu-item>
						</router-link>
						<router-link tag="div" class="tab-item" to="/addCommodityTyep">
							<el-menu-item index="2-2">添加商品分类</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
				<el-menu default-active="3" class="el-menu-vertical-demo">
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-news"></i>
							<span>广告</span>
						</template>
						<router-link tag="div" class="tab-item" to="/bannerList">
							<el-menu-item index="3-1">广告列表</el-menu-item>
						</router-link>
						<router-link tag="div" class="tab-item" to="/uploadBanner">
							<el-menu-item index="3-2">上传广告</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
				<el-menu default-active="4" class="el-menu-vertical-demo">
					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>尺寸</span>
						</template>
						<router-link tag="div" class="tab-item" to="/sizeTypeList">
							<el-menu-item index="4-1">尺寸列表</el-menu-item>
						</router-link>
						<router-link tag="div" class="tab-item" to="/addSizeType">
							<el-menu-item index="4-2">添加尺寸</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
				<el-menu default-active="5" class="el-menu-vertical-demo">
					<el-submenu index="5">
						<template slot="title">
							<i class="el-icon-star-on"></i>
							<span>尺寸值</span>
						</template>
						<router-link tag="div" class="tab-item" to="/sizeTypeValueList">
							<el-menu-item index="5-1">尺寸值列表</el-menu-item>
						</router-link>
						<router-link tag="div" class="tab-item" to="/addSizeTypeValue">
							<el-menu-item index="5-2">添加尺寸值</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
				<el-menu default-active="6" class="el-menu-vertical-demo">
					<el-submenu index="6">
						<template slot="title">
							<i class="el-icon-setting"></i>
							<span>定制类型</span>
						</template>
						<router-link tag="div" class="tab-item" to="/customizedList">
							<el-menu-item index="6-1">定制类型列表</el-menu-item>
						</router-link>
						<router-link tag="div" class="tab-item" to="/addCustomized">
							<el-menu-item index="6-2">添加定制类型</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
				<el-menu default-active="6" class="el-menu-vertical-demo">
					<el-submenu index="6">
						<template slot="title">
							<i class="el-icon-setting"></i>
							<span>定制类型值</span>
						</template>
						<router-link tag="div" class="tab-item" to="/customizedValueList">
							<el-menu-item index="6-1">定制类型值列表</el-menu-item>
						</router-link>
						<router-link tag="div" class="tab-item" to="/addCustomizedValue">
							<el-menu-item index="6-2">添加定制类型值</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
				<el-menu default-active="7" class="el-menu-vertical-demo">
					<el-submenu index="7">
						<template slot="title">
							<i class="el-icon-star-on"></i>
							<span>商品属性类型</span>
						</template>
						<router-link tag="div" class="tab-item" to="/attributeList">
							<el-menu-item index="7-1">商品属性类型列表</el-menu-item>
						</router-link>
						<router-link tag="div" class="tab-item" to="/addAttribute">
							<el-menu-item index="7-2">添加商品属性类型</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
				<el-menu default-active="8" class="el-menu-vertical-demo">
					<el-submenu index="8">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>用户</span>
						</template>
						<router-link tag="div" class="tab-item" to="/userList">
							<el-menu-item index="8-1">用户列表</el-menu-item>
						</router-link>
						<router-link tag="div" class="tab-item" to="/feedbackList">
							<el-menu-item index="8-2">用户反馈列表</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
				<el-menu default-active="9" class="el-menu-vertical-demo">
					<el-submenu index="9">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>订单管理</span>
						</template>
						<router-link tag="div" class="tab-item" to="/orderList">
							<el-menu-item index="9-1">订单列表</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
				<el-menu default-active="10" class="el-menu-vertical-demo">
					<el-submenu index="10">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>资讯管理</span>
						</template>
						<router-link tag="div" class="tab-item" to="/consultList">
							<el-menu-item index="10-1">资讯列表</el-menu-item>
						</router-link>
						<router-link tag="div" class="tab-item" to="/addConsult">
							<el-menu-item index="10-1">添加资讯</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
				<el-menu default-active="11" class="el-menu-vertical-demo">
					<el-submenu index="11">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>组织架构</span>
						</template>
						<router-link tag="div" class="tab-item" to="/level">
							<el-menu-item index="11-1">组织架构列表</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</el-container>

</template>

<script type="text/ecmascript-6">
import { showNotification } from "common/js/common";

export default {
  data() {
    return {
      avatar: "",
      name: ""
    };
  },
  methods: {
    logout(command) {
      this.$confirm("是否退出登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {});
    }
  },
  created() {},
  watch: {}
};
</script>

<style scoped>
.el-menu-item-group__title {
  display: none !important;
}

.el-header {
  background-color: #20a0ff;
  color: #fff;
  text-align: center;
  line-height: 60px;
  padding: 0;
  display: flex;
}

.logo {
  flex: 0 0 230px;
  width: 230px;
}

.user-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.user-info {
  flex: 1;
  padding-right: 40px;
}

.portrait {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 10px;
}

.portrait img {
  width: 100%;
  height: 100%;
}

.container {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 0;
  overflow: hidden;
}

.el-aside {
  background-color: #d3dce6;
  color: #fff;
  text-align: center;
  flex: 0 0 230px;
  width: 230px;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  flex: 1;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>