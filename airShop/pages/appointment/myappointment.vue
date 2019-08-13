<template>
	<view class="myappointment">
		<!-- tab -->
		<view class="tab">
			<view class="tab_li" v-for="(item,index) in tab" :key="index" :class="tabid==item.id?'active':''">
				{{item.name}}
			</view>
		</view>
		<!-- tab end-->
		<!-- 列表 -->
		<view class="list">
			<view class="li" v-for="(item,index) in list" :key="index">
				<view class="top">
					<view class="t_danhao">
						<text>预约单号:{{item.number}}</text>
						<text class="yticon icon-you"></text>
					</view>
					<view class="status" :style="{color:item.status=='待取货'?'#FF0000':''}">
						<text>{{item.status}}</text>
						<image src="/static/newimg/delete.png" class="delete_img" mode=""></image>
					</view>

				</view>
				<view class="bottom">
					<view class="bottom_img">
						<image :src="item.img" class="goods_img" mode=""></image>
					</view>
					<view class="bottom-right">
						<view class="bottom-rtop">
							<view class="goods_info">
								<view class="title">
									{{item.name}}
								</view>
								<view class="num">
									<text>数量：{{item.num}}</text>
								</view>
								<view class="num">
									 规格：套装3袋装（单只约500g）
								</view>
								<!-- <view class="goods_other">{{item.color}} ; {{item.size}}</view> -->
							</view>
							<view class="bottom_right">
								<view class="price">
									￥{{item.price}}
								</view>
							</view>
							
						</view>
						
						
						<view class="operation">
							{{item.status=='待取货'?'查看地址':(item.status=='已过期'?'重新预约':'再次购买')}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 列表 end-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab: [{ //tab选项
					id: 1,
					name: "全部"
				}, {
					id: 2,
					name: "待取货"
				}, {
					id: 3,
					name: "已过期"
				}, {
					id: 4,
					name: "已完成"
				}],
				tabid: 1, //选中的当前tabid
				list: [{
						id: 1,
						number: 2018121346,
						status: '待取货',
						img: '../../static/temp/cate12.jpg',
						name: '春江潮水连海平，海上明月共潮生',
						size: 's',
						color: '白色',
						price: 66,
						num: 1
					},
					{
						id: 1,
						number: 2018121346,
						status: '已过期',
						img: '../../static/temp/cate12.jpg',
						name: '春江潮水连海平，海上明月共潮生',
						size: 's',
						color: '白色',
						price: 66,
						num: 1
					},
					{
						id: 1,
						number: 2018121346,
						status: '已过期',
						img: '../../static/temp/cate12.jpg',
						name: '春江潮水连海平，海上明月共潮生',
						size: 's',
						color: '白色',
						price: 66,
						num: 1
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	page {
		background: #f2f2f2;
	}

	.tab {
		display: flex;
		background: #fff;
		width: 100vw;
		padding: 17upx 26upx 0;
		justify-content: space-between;
		height: 80upx;
		font-size: 29upx;
		position: fixed;
		top: 44px;
		z-index: 99;
	}

	.tab .tab_li {
		padding: 0 4upx;
		box-sizing: border-box;
	}

	.tab .active {
		position: relative;

		&:after {
			position: absolute;
			content: '';
			width: 100%;
			left: 0;
			bottom: 13upx;
			height: 5upx;
			background: url(../../static/newimg/order.png);
			background-size: 100% 100%;
		}
	}

	.list {
		padding: 80upx 0 0;
	}

	.list .li {
		margin: 27upx 0 0 0;
		background: #fff;
		padding: 10upx 27upx 20upx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.list .li .top,
	.list .li .bottom {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
	}

	.list .li .top {
		height: 71upx;
		line-height: 71upx;
		font-size: 21upx;
		color: #909090;

		.icon-you {
			font-size: 20upx;
			color: #000;
			margin: 0 0 0 20upx;
		}

		.status {
			display: flex;
			align-items: center;
		}

		.delete_img {
			width: 46upx;
			height: 46upx;
			margin: 0 0 0 28upx;
		}

	}

	.list .li .bottom .bottom_img {
		width: 153upx;
		height: 146upx;
		overflow: hidden;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		margin: 0 28upx 0 0;
	}

	.list .li .bottom .bottom_img .goods_img {
		width: 100%;
		height: 100%;
	}

	.list .li .bottom {
		// background: khaki;
		align-items: center;

		.bottom-right {
			flex: 1;
			.bottom-rtop{
				display: flex;
				align-items: center;
			}
		}
	}

	.list .li .bottom .goods_info .title {
		font-size: 22upx;
		margin: 0 0 8upx 0;
	}

	.list .li .bottom .goods_info .num {
		font-size: 20upx;
		color: #909090;
	}

	.list .li .bottom .bottom_right {
		width: 100upx;
		// background: salmon;
		text-align: right;
		padding: 10upx 0 0;
		box-sizing: border-box;
	}

	.list .li .bottom .bottom_right .price {
		font-size: 19upx;
		font-weight: bold;
	}

	.operation {
		color: #DD1B36;
		font-size: 20upx;
		border-radius: 52upx;
		border: 2upx solid #DD1B36;
		padding: 7upx 21upx;
		float: right;
	}
</style>
