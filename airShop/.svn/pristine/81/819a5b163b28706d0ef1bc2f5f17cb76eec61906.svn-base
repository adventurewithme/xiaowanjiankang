<template>
	<view class="content">
		<view class="category">
			<!-- 商品列表 -->
			<view class="guess-section">
				<view v-for="(item, index) in goodslist" :key="index" class="guess-item" @click="navToDetailPage(item)">
					<view class="image-wrapper">
						<image :src="item.picUrl" mode="aspectFill"></image>
					</view>
					<text class="title clamp"><!-- <text class="red">美食</text> -->{{item.name}}</text>
					<view class="to-cart">
						<text class="price">{{item.retailPrice}}</text>
						<!-- <image src="/static/newimg/cart.png" mode=""></image> -->
					</view>
					
				</view>
			</view>
			<!-- 商品列表 end-->
			<!-- <scroll-view scroll-x class="cg_c_list">
				<block  v-for='(item,index) in fatherlist' :key='index'>
					<view class="cg_c_li"  v-if="item.pid!=''&&item.pid!=null&&item.name!=undefined&&item.pid==currentId">{{item.name}}</view>
				</block>
			</scroll-view> -->
		</view>
		<!-- 	<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="item in slist" :key="item.id" class="s-list" :id="'main-'+item.id">
				<text class="s-item">{{item.name}}</text>
				<view class="t-list">
					<view @click="navToList(item.id, titem.id)" v-if="titem.pid === item.id" class="t-item" v-for="titem in tlist" :key="titem.id">
						<image :src="titem.picUrl"></image>
						<text>{{titem.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				tabScrollLeft: 0,
				flist: [],
				slist: [],
				tlist: [],
				fatherlist: [],
				currentId: 1,
				childshow: false, //当前二级是否显示
				current_f_id: 1, //当前选中的父级id
				goodslist: [
				], //商品列表
				c_currentid: '', //选中的二级子集
				page: 1,
				size: 10,
				loading: true,
				levl: 0,
			}
		},
		onLoad() {
			this.loadData();
		},
		//加载更多
		onReachBottom() {
			this.loadData();
		},
		methods: {
			async loadData() {
				var loading = this.loading;
				if (loading == true) {
					let keyword = this.$route.query.keyword;
					var that = this;
					var page = that.page;
					var size = that.size;
					that.$http({ //调用接口
						method: 'POST',
						params: {
							keyword: keyword,
							page: page,
							size: size,
							sort: "add_time"
						},
						url: that.global.target + "/wx/goods/search" //this指data
					}).then(function(response) { //接口返回数据

						// that.goodslist =  response.data.data.goodslist;
						var total = response.data.data.totals;
						if (total == 0) {
							that.$api.msg("无数据");
						}
						// var num = page*size;
						if (total < size) {
							that.loading = false;
						}
						var glist = response.data.data.goodslist;
						console.log(response);
						glist.forEach(item => {
							that.goodslist.push(item);
						})

						that.page++;
						uni.hideLoading()


					}, function(error) {})
				}
				// this.getGoodslist(1);

			},

			async getGoodslist(type) { //type 标识是否需要重新计算分页
				var loading = this.loading;
				if (loading == true) {
					var that = this;
					var c_currentid = that.c_currentid;
					var currentId = that.currentId;
					var page = that.page;
					var size = that.size;
					var levl = that.levl;
					that.$http({ //调用接口
						method: 'GET',
						params: {
							categoryId: c_currentid,
							pCategoryId: currentId,
							levl: levl,
							page: page,
							size: size
						},
						url: this.global.target + "/wx/tablelist/ec" //this指data
					}).then(function(response) { //接口返回数据
						console.log(response);

						var total = response.data.data.total;
						if (total == 0) {
							that.$api.msg("无数据");
						}
						var num = page * size;
						if (total <= num) {
							that.loading = false;
						}
						var glist = response.data.data.list;
						if (type) {
							that.goodslist = glist;
							document.documentElement.scrollTop = 0;
						} else {
							glist.forEach(item => {
								that.goodslist.push(item);
							})
						}
						that.page++;
						uni.hideLoading()
					}, function(error) {})
				}


			},

			//一级分类点击
			tabtap(item) {
				if (!this.sizeCalcState) {
					this.calcSize();
				}

				this.currentId = item.id;
				let index = this.slist.findIndex(sitem => sitem.pid === item.id);
				this.tabScrollTop = this.slist[index].top;


			},
			//右侧栏滚动
			asideScroll(e) {
				if (!this.sizeCalcState) {
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item => item.top <= scrollTop).reverse();
				if (tabs.length > 0) {
					this.currentId = tabs[0].pid;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize() {
				let h = 0;
				this.slist.forEach(item => {
					let view = uni.createSelectorQuery().select("#main-" + item.id);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(sid, tid) {
				uni.navigateTo({
					url: `/pages/product/list?fid=${this.currentId}&sid=${sid}&tid=${tid}`
				})
			},
			// 切换父级标签
			change_currentid(id) {
				this.currentId = id;
				this.loading = true;
				this.page = 1;
				this.levl = 1;
				this.getGoodslist(1);
			},
			// 展示子集列表
			childshow_btn() {
				this.childshow = !this.childshow;
			},
			// 选择二级列表
			chioce_c(index, id) {
				// console.log(index, id)
				this.c_currentid = id;
				this.childshow = !this.childshow;
				this.loading = true;
				this.page = 1;
				this.levl = 2;
				this.getGoodslist(1, 2);
			},
			//详情页
			navToDetailPage(item) {

				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
		},
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}

	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
.content .category{
	width: 100%;
}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;

		&.active {
			color: $base-color;
			background: #f8f8f8;

			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside {
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}

	.s-item {
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}

	.t-list {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;

		&:after {
			content: '';
			flex: 99;
			height: 0;
		}
	}

	.t-item {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;

		image {
			width: 140upx;
			height: 140upx;
		}
	}

	.c_tab {
		width: 100vw;
		position: fixed;
		z-index: 999;
		height: 110upx;
		top: 44px;
		background: #fff;
		display: flex;
		display: -webkit-flex;
		font-size: 32upx;
		border-bottom: 2upx solid #f8f8f8;
		/* padding: 0 20upx;
		box-sizing: border-box; */

	}

	.cg_f_list {
		/* display: flex;
		display: -webkit-flex;
		width: 100vw;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap; */
		white-space: nowrap;
		overflow: auto;
		width: 650upx;
	}

	.cg_c_list {
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		margin: 20upx 0 0;
		position: fixed;
		z-index: 99;
		top: 44px;
		margin: 110upx 0 0 0;
		background: #fff;
	}

	.cg_show_cl {
		width: 100upx;
		height: 100upx;
		padding: 20upx;
		box-sizing: border-box;

	}

	.cg_show_cl .cd_show_btnimg {
		width: 100%;
		height: 100%;
	}

	.cg_f_li {
		display: inline-block;
		padding: 30upx 24upx;
		box-sizing: border-box;
		line-height: 42upx;
		position: relative;
	}

	.cg_c_list .active {
		border: 2upx solid rgb(250, 67, 106);
	}

	.cg_c_li {
		padding: 10upx 14upx;
		box-sizing: border-box;
		font-size: 32upx;
		border-radius: 8upx;
		border: 2upx solid #f8f8f8;
		margin: 10upx;
	}

	.active {
		color: rgb(250, 67, 106);

	}

	.cg_f_list .active::after {
		position: absolute;
		content: '';
		width: 88%;
		height: 2upx;
		background: rgb(250, 67, 106);
		left: 6%;
		bottom: 0;
	}

	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 27upx;
		margin: 0 0 100upx 0;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 48.8%;
			margin: 17upx 0 0;
			padding-bottom: 14upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 9px 0px rgba(47, 47, 47, 0.1);

			&:nth-child(2n+1) {
				margin-right: 2.4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 328upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			white-space: normal;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			padding: 10upx 10upx 0;
			.red {
				font-size: 19upx;
				color: #fff;
				padding: 0 14upx;
				background: #ff0000;
				border-radius: 14upx;
				margin: 0 10upx 0 0;
			}
		}

		.price {
			font-size: 29upx;
			color: #FF3B30;
			line-height: 1;
			font-weight: bold;
			&:before{
				content: '￥';
				font-size: 24upx;
			}
		}
		.to-cart{
			display: flex;
			padding: 10upx 10upx 0;
			justify-content: space-between;
			align-items: center;
			image{
				width: 48upx;
				height: 48upx;
			}
		}

	}
</style>
