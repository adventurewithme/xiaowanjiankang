<template>
	<view class="Contactus">
		<!-- top -->
		<view class="cu-top">
			<view class="cu-top-li b-b" v-for="(item,index) in culist" :key="index">
				<view class="cu-topli-left">
					<image :src="item.icon" mode="" :class="index==1?'email-icon':''"></image>
					<text>{{item.text}}</text>
				</view>
				<view class="cu-topli-right">
					{{item.right}}
				</view>
			</view>
		</view>
		<!-- top -->
		<!-- center -->
		<view class="cu-center">
			<image src="/static/newimg/logo.png" mode=""></image>
		</view>
		<!-- center end -->
		<!-- bottom -->
		<view class="cu-bottom">
			<view class="title">
				北京首都机场商贸有限公司简介
			</view>
			<view class="text">

				北京首都机场商贸有限公司（以下简称“商贸公司”）是中国最大机场管理集团——首都机场集团公司全资子公司，前身为机场候机楼商店，创立于1988年，2005年根据首都机场集团公司的专业化重组战略正式注册成立，在北京、天津、江西、吉林、内蒙古、黑龙江、河北等七个省市机场，经营着42,000余平方米商业零售资源和近100,000种商品，现有员工1000余人。
			</view>
			<view class="text">
				商贸公司始终坚持依托机场、服务机场，做好机场零售资源的服务商、供应商、保障商，努力提高经营业绩和服务品质，商贸公司目前是ACI（国际机场协会）亚太地区WBP（全球商业合作伙伴计划）成员，中国商业联合会副会长单位、北京商业联合会副会长单位、北京质量协会副会长单位、中国质量协会会员单位。
			</view>
			<view class="text">
				作为专业的品牌集成商和运营商，商贸公司旗下“航诚商业”品牌是“北京市著名商标”，强大的品牌号召力和影响力已将首都机场打造成为多受众群体的一站式大型购物中心，奢侈品店、便利店、运动休闲店、地方特产店、书刊音像店……充分满足不同旅客的个性消费需求。2011年，商贸公司推出“航诚”会员体系，成为国内首家推出会员系统的机场零售企业，现拥有会员近60万人。

			</view>
		</view>
		<!-- bottom end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				culist: [{
						icon: '/static/newimg/us-phone.png',
						text: '联系电话',
						right: '010-39551382'
					},
					{
						icon: '/static/newimg/us-email.png',
						text: '邮箱',
						right: 'actXXX@164.com'
					},
					{
						icon: '/static/newimg/us-earth.png',
						text: '官方网站',
						right: 'http://www.airportshopping.com.cn/'
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	page {
		background: #f7f7f7;
	}

	.cu-top {
		background: #fff;

		image {
			width: 37upx;
			height: 37upx;
			margin: 0 26upx 0 0;
		}

		.email-icon {
			width: 38upx;
			height: 25upx;
		}

		.cu-top-li {
			padding: 0 27upx;
			height: 94upx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.cu-topli-left {
				display: flex;
				align-items: center;
			}

			text {
				font-size: 24upx;
			}

			.cu-topli-right {
				color: #909090;
				font-size: 20upx;
			}
		}
	}

	.cu-center {
		background: #fff;
		width: 100vw;
		height: 267upx;
		margin: 27upx 0 0;
		text-align: center;

		image {
			width: 335upx;
			height: 115upx;
			margin: 58upx auto 0;
		}
	}

	.cu-bottom {
		padding: 10upx 27upx 0;

		.title {
			position: relative;
			text-align: center;
			font-size: 27upx;
			line-height: 70upx;

			&:after,
			&:before {
				position: absolute;
				content: '';
				width: 67upx;
				height: 1px;
				background: #000;
				top: 50%;
				right: 80upx;
			}

			&:before {
				left: 80upx;
			}
		}

		.text {
			font-size: 23upx;
			line-height: 31upx;
			margin: 0 0 40upx 0;
		}
	}
</style>
