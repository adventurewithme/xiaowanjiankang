<template>
	<view class="content">
		<view class="ps_top">
			<image src="/static/newimg/redquan.png" mode=""></image>
			<text>下单成功</text>
		</view>
		<view class="ps-goods">
			<!-- <view class="price">
				{{goods.price}}
			</view>
			<view class="p">
				订单编号<text class="num">{{goods.num}}</text>
			</view> -->
			<view class="p">
				支付方式<text>{{goods.express}}</text>
			</view>
		</view>
		<view class="ps-bottom">
			<view class="order" @click='navTo("/pages/order/order?state=0")'>
				订单中心
			</view>
			<view class="buy" @click='switchTo("/pages/category/category")'>
				继续下单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods:{
					price:0,
					num:0,
					express:'特产'
				}
			}
		},
		onload(option){
			if(option){
				this.goods.price = option.price;
				this.goods.num=option.orderId;
			}
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url
				})
			},
			switchTo(url){
				uni.switchTab({
					url
				})
			}
			
		}
	}
</script>

<style lang='scss'>
	.content{
		text-align: center;
	}
	.ps_top{
		padding: 53px 0 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40upx;
		image{
			width: 45upx;
			height: 45upx;
			margin: 0 20upx 0 0;
		}
	}
	.ps-goods{
		font-size: 24upx;
		.price{
			color: #ff0000;
			font-size: 40upx;
			font-weight: bold;
			position: relative;
			margin: 30upx 0 34upx 0;
			&:before{
				content: '￥';
				font-size: 27upx;
			}
		}
		.p{
			line-height: 40upx;
		}
	}
	.ps-bottom{
		margin: 80upx 0 0;
		display: flex;
		justify-content: space-around;
		padding: 0 40upx;
		view{
			width: 267upx;
			height: 73upx;
			border-radius: 33upx;
			font-size: 27upx;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid #ff0000;
		}
		.order{
			color: #ff0000;
		}
		.buy{
			background: #ff0000;
			color: #fff;
		}
	}
</style>
