<template>
	<view class="submitam">

		<view v-for="(item,index) in goodsList" :key="index">
			<!-- 预约信息 -->
			<view class="sub-shop">
				<image src="/static/newimg/redquan.png" mode=""></image>
				<text>{{item.cart.shop}}</text>
			</view>
			<view class="sam_info">
				<view class="info_left">
					<image :src="item.cart.picUrl" class="goodimg" mode=""></image>
				</view>
				<view class="info_right">
					<view class="title">
						<!-- <text class="red">美食</text> -->
						{{item.cart.goodsName}}
					</view>
					<view class="info_other">
						<view class="info_li" v-for="(it,j) in item.cart.specifications" :key="j">
							<text>{{it}}</text>
						</view>
					</view>
					<view class="info_price">
						<view class="price">
							<text class="num">{{item.cart.price}}</text>
						</view>
						<!-- <view> -->
						<!-- <view class="dis" @click="disnum">
								<image :src="yuyue_num<2?(disimg+'2.png'):(disimg+'1.png')" mode="" class="opimg"></image>
							</view>
							<input type="number" :value="yuyue_num" v-model="yuyue_num" />
							<view class="add" @click="addnum">
								<image :src="addimg" mode="" class="opimg"></image>
							</view> -->
						<!-- <uni-number-box class="add_dis" :min="1" :max="item.cart.stock"   :value="item.cart.number" :isMax="item.cart.number>=item.cart.stock?true:false"
							 :isMin="item.cart.number===1" :index="index"></uni-number-box> -->
						<text type="number title" />X {{item.cart.number}}</text>
						<!-- </view> -->
					</view>
				</view>
			</view>
			<!-- 预约信息 end-->
			<!-- 取货门店 +时间-->
			<view class="sam_mendian_time">
				<view class="mendian">
					<view class="mendian_left">
						取货门店：
					</view>
					<view class="mendian_right" v-if="item!=null&&item.storeList!=null&&item.storeList.length>0">
						<!-- 选中的默认取货门店 -->
						<view class="mendian_li" @click="storeToggleMask('show',item)">
							<text class="address">{{item.defaultStore.name}}</text>
							<text class="cell-tip clamp active" v-if="item.storeList.length>1">
								<text>切换取货门店</text>
								<text class="yticon icon-you"></text>
							</text>
							<!-- 							<checkbox-group  @change="checkaddress(index,ind)">
								<label class="checkbox">
									<radio class="box" color="#FF0000" :value="item.address" :checked="item.storeList[ind].seleted" />
								</label>
							</checkbox-group> -->
						</view>
					</view>
				</view>
				<view class="st-time">
					<view class="time">
						<view class="time_left">
							取货时间：
						</view>
						<view class="time_right">
							<picker mode="time" class="p_time" :value="item.time" start="09:01" end="21:01" data-a="time" @change="bindTimeChange(item,$event)">
								<view class="uni-input">{{item.time}}></view>
							</picker>
							<picker mode="date" class="p_data" :value="item.date" :start="startDate" :end="endDate" data-a="day" @change="bindDateChange(item,$event)">
								<view class="uni-input">{{item.date}}</view>
							</picker>
						</view>
					</view>
					<view class="st-times">
						请您按时取货，过期将不再为您预留产品！
					</view>
					<view class="time st-address">
						<view class="time_left">
							门店地址：
						</view>
						<view class="time_right">
							<!-- <image src="/static/newimg/address1.png" mode=""></image> -->
							<!-- {{item.defaultStore.comName}} -->
							{{item.defaultStore.posdes}}
							<!-- {{item.defaultStore.name}} -->
						</view>
					</view>
					<view class="time st-address" v-if="item.defaultStore.comName.phone!=null">
						<view class="time_left">
							门店联系电话：
						</view>
						<view class="time_right">
							{{item.defaultStore.comName.phone}}
						</view>
					</view>

				</view>

			</view>
			<!-- 取货门店 +时间 end-->
			<!-- 取货时间规则+门店信息+发票*** -->
			<!-- 			<view class="sam_tmf">
 
				<view class="tmf_list">
					<view class="dingdan_li">
						<view class="dingd_left">
							发票
						</view>
						<view class="dingd_right">
							<text class="red">预约商品</text>
							线下开具
						</view>
					</view>

				
				</view>
			</view> -->
			<!-- 取货时间规则+门店信息+发票*** end-->

			<view class="shou_list">
				<view class="shou_li">
					<view class="shou_left">
						商品售价
					</view>
					<view class="shou_right">
						<text>￥</text>{{item.cart.price*item.cart.number}}
					</view>
				</view>
				<view class="shou_li" >
					<text class="shou_left">优惠券</text>
					<switch class="switch" :checked="'false'"  v-if="item.coupon!=null" color="#FF0000"  @change="notUseCoupon(item)"></switch>
					<text class="shou_right red cell-tip">
						<text v-if="mayUseCouponList!=null&&mayUseCouponList.length>0&&item.coupon==null" @click="toggleMask('show',item)">{{mayUseCouponList.length}}张可用</text>
						<text v-if="item.coupon!=null">{{item.coupon.ticketDesci}}</text>
						<text class="yticon icon-you"></text>
						<text class="cell-tip active" v-if="isbind==false" @click="navToLogin">
							去领取
							<text class="yticon icon-you"></text>
						</text>
						<text class="cell-more wanjia wanjia-gengduo-d"></text>
						<text v-if="item.coupon==null" class="cell-tip red">-￥0</text>
						<text v-if="item.coupon!=null" class="cell-tip red">-￥{{item.coupon.maxAmt}}</text>
					</text>
				</view>

				<view class="shou_li">

					<text class="shou_left">积分</text>
					<text class="shou_right red cell-tip">
						<text>共{{bonus}}分,剩余{{mayUseBonus}}分,使用{{item.integralBonus}}分</text>
						<switch class="switch" color="#FF0000" @change="usebonusChange(item,$event)" />

						<text v-if="item.integralPrice==null||item.integralPrice==0" class="cell-tip red">-￥0</text>
						<text v-if="item.integralPrice" class="cell-tip red">-￥{{item.integralPrice}}</text>
					</text>

				</view>
				<view class="shou_li">
					<view class="shou_left">
						实际支付
					</view>
					<view class="shou_right">
						 
						<text v-if="item.coupon!=null&&item.coupon.maxAmt!=null">￥{{item.cart.price*item.cart.number-item.coupon.maxAmt-item.integralPrice}}</text>
						<text v-if="item.coupon==null">￥{{item.cart.price*item.cart.number-item.integralPrice}}</text>
					</view>
				</view>
			</view>

			<!-- 			<view class="window">
				<label class="checkbox">
					<checkbox @click="ifCheckFlagClick()" :checked="ifCheckFlag"  color="#fff" />
				</label>
				<text @click="windowshow(true)">预定须知</text>
			</view> -->
			<view class="window"></view>
		</view>
		<!-- 确认预约 -->
		<view class="confirm">
			<view class="last_price">
				<view class="price_right">
					{{goodsTotalPrice}}
				</view>
				<view class="con_can">
					参考价格（以门店实际售价为准）
				</view>
			</view>
			<view class="confirm_btn" @click="recommandOrder">
				确认预约
			</view>
		</view>
		<!-- 确认预约 end-->
		<!-- 弹窗 -->
		<view class="windows" v-show="windowflag" @click="windowshow(false)">
			<view class="window-content">
				<view class="title">

					预订须知
				</view>
				<view class="text">
					1、使用电商线上预定线下取货服务，您可以在到机场提货前<text class="red">7天（168小时）-前1天（24小时）</text>完成下单，以便您顺利提取。
				</view>
				<view class="text">
					<view class="">2、我们免费为您预定，预定后即为您备货，提货时请您主动出示，请您认真阅读以下提示：</view>
					<view class="">（1）当您预约成功，系统自动生成提货二维码，提货时请主动出示，让您的包裹找对主人。</view>
					<view class="">（2）订单取消方式：提货前1小时可以通过系统操作取消订单，提货<text class="red">前1小时</text>内，您将无法取消订单，如有变动，请联系客服（客服入口的页面展示位置）。</view>
					<view class="">（3）提货时间<text class="red">2个小时</text>后仍未提货的订单将被取消。</view>
					<view class="">（4）如顾客连续两次或累计三次预定后不提取，被系统取消订单的，将有可能失去预定资格。</view>
					<view class="">（5）如发现顾客存在恶意下单、非正常购买等账户异常情况，我方有权采取封号措施，该顾客3个月内不享有预定资格。</view>
				</view>
			</view>
		</view>
		<!-- 弹窗 end-->
		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask('', selectGoods)">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(itemCoupon,index) in mayUseCouponList" :key="index" @click="selectCoupon(itemCoupon)">
					<view class="con">
						<view class="left">
							<text class="title">{{itemCoupon.ticketDesci}}</text>
							<text class="time">有效期至{{itemCoupon.expiryDate}}</text>
						</view>
						<view class="right">
							<text class="price">{{itemCoupon.maxAmt}}</text>
							<text></text>
						</view>

						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 选择取货门店面板 -->
		<view class="mask" :class="storeState===0 ? 'none' : storeState===1 ? 'show' : ''" @click="storeToggleMask('', selectGoods)">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<view v-if="selectGoods!=null&&selectGoods.storeList!=null" class="coupon-item" v-for="(itemStore,index) in selectGoods.storeList"
				 :key="index" @click="clickSelectStore(itemStore)">
					<view class="con">
						<view class="left">
							<text class="title">{{itemStore.name}}</text>
							<text class="time">预约时间:{{itemStore.yuyueTimeDesc}}</text>
							<text class="time">门店电话:{{itemStore.phone}}</text>
						</view>
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uniNumberBox from '@/components/uni-number-box.vue'
	import {
		mapState,
		mapMutations

	} from 'vuex';
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				comId: 0,
				goodsTotalPrice: 0, //商品总额
				//orderTotalPrice:0,//订单总额
				couponPrice: 0, //优惠金额
				coupon: null, //当前使用优惠券

				selectGoods: {}, //当前选中的商品
				maskState: 0, //优惠券面板显示状态
				storeState: 0, //店铺面板显示状态
				bonus: 0, //积分 
			 
				mayUseBonus: 0, //可用的抵扣的积分数，当一个商品使用积分后，其它商品需要使用剩下的积分数

				couponList: [], //优惠券列表
				mayUseCouponList: [], //可用优惠券列表，当用户选择为其中一个商品使用时，其它商品不可使用
				isbind: false, //是否与CRM同步
				// goodsList:[{
				// 	"cart":{
				// 		"shop":"aaa"
				// 	}
				// 	}
				// ],
				goodsList: [],
				time: '12:00', //取件时间
				// disimg: '../../static/dis', //减号
				// addimg: '../../static/add1.png', //加号
				date: '', //选择送达日期
				end: '', //选择送达日期的结束时间
				goodsId: "",
				cartIds: "",
				windowflag: false,
				ifCheckFlag: false,

				//订单提交结构
				orderStructData: {
					cartIds: null, //多张预订单购物车明细id
					times: null, //多预订单的时间
					storeIds: '', //多预订单的店铺
					integralPrices: null, //多预订单积分抵现金额
					integralBonuss: null, //多预订单使用抵现积分
					coupons: null, //多预订单的优惠券
					message: null, //客户留言 未使用
					goodId: null, //单商品预订Id
					number: '1', //单商品的预订数量
					time: null, //单商品的预订时间
					storeId: null, //单商品的预订店铺
					comId: null, //订单来源的商贸类型
					integralPrice: null, //积分抵现金额
					integralBonus: null, //使用抵现积分
					coupon: null, //订单的优惠券	
				},
			};
		},
		onLoad(option) {

			this.getOderSetInfo();
			let goodId = option.goodId;
			this.goodsId = goodId;
			let number = option.number;
			let numbers = option.numbers;
			let cartIds = option.cartIds;
			this.cartIds = cartIds;
			let comId = option.comId;
			this.comId = comId;
			this.loadData(goodId, number, cartIds, numbers);
			this.windowshow(true);
		},
		onShow(){
			this.getuserInfo();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},

		methods: {
			...mapMutations(['login']),
		    notUseCoupon(item){
				item.coupon=null;
				this.recomputeCoupon();
			    this.reComputeBonus();
				this.toggleMask('',item);
			},
			reComputeBonus(){
				//计算可用积分
				this.mayUseBonus = this.bonus;
				this.goodsTotalPrice=0;
				this.goodsList.forEach(goodsItem => {
					if (goodsItem.integralBonus != null) {
						this.mayUseBonus = this.mayUseBonus - goodsItem.integralBonus;
						if(goodsItem.coupon!=null){
							goodsItem.orderTotalPrice=goodsItem.orderTotalPriceReal - goodsItem.coupon.maxAmt
						} else
						{
							goodsItem.orderTotalPrice=goodsItem.orderTotalPriceReal
						}
						
						if(goodsItem.integralPrice!=null){
							this.goodsTotalPrice+=goodsItem.orderTotalPrice-goodsItem.integralPrice;
						} else{
							this.goodsTotalPrice+=goodsItem.orderTotalPrice;
						}
						
					}
				})
			},
			recomputeCoupon(){
				//计算可用优惠券 加上自己目前在使用的电子券
				this.mayUseCouponList = [];
				console.log(this.couponList);
				console.log(this.goodsList);
				this.couponList.forEach(couponItem => {
					var ifhave = false;
					this.goodsList.forEach(goodsItem => {
						if(goodsItem.coupon!=null)
						{
							if (couponItem.serialId == goodsItem.coupon.serialId) {
								ifhave = true;
							}
						}
					})
					if (ifhave == false) {
						this.mayUseCouponList.push(couponItem);
					}
				})
				// if(this.selectGoods.coupon!=null){
				// 	this.mayUseCouponList.push(this.selectGoods.coupon)
				// }
				var temp=this.mayUseCouponList;
				this.mayUseCouponList=[];
				this.mayUseCouponList=temp;
			},
			
			usebonusChange(item, data) {
				var that = this;
			    that.reComputeBonus();
				console.log(this.mayUseBonus)
				if (data.detail.value) {
					that.$http({ //调用接口
						method: 'POST',
						params: {
							bonus: that.mayUseBonus
						},
						data: uni.getStorageSync('userInfo'),
						url: this.global.target + "/wx/shoudu/crm/getMoneyWithBonus" //this指data
					}).then(function(response) { //接口返回数据
						// console.log(response)
						var result = response.data;
						console.log(result)
						if (result.errno == 0) {
							var jsonResult = result.data;
							var maxMoney = jsonResult.money;
							var maxBonus = jsonResult.bonus;

							if (maxMoney > 0) {
								if (maxMoney > item.orderTotalPrice) {
									that.$http({ //调用接口
										method: 'POST',
										data: uni.getStorageSync('userInfo'),
										params: {
											money: item.orderTotalPrice
										},
										url: that.global.target + "/wx/shoudu/crm/getBonusWithMoney" //this指data
									}).then(function(response) { //接口返回数据
										// console.log(response)
										var result = response.data;
										if (result.errno == 0) {
											item.integralPrice = item.orderTotalPrice;
											item.integralBonus = result.data;

											item.orderTotalPrice = 0;
											that.reComputeBonus();
										} else {
											that.$api.msg(result.errmsg);
										}
									}, function(error) {})
								} else {

									item.integralPrice = maxMoney;
									item.integralBonus = maxBonus;

									item.orderTotalPrice = item.orderTotalPrice - maxMoney;
								
									// 晕，搞了好长时间，重新赋值，才会刷新页面
									 var temp = item;
									item=[];
									item = temp;
									
									that.reComputeBonus();
									
									console.log(that.mayUseBonus)
								}
							}
						} else {
							that.$api.msg(result.errmsg);
						}
					}, function(error) {})

				} else {
					if (that.coupon != null) {
						item.orderTotalPrice = item.orderTotalPriceReal - item.coupon.maxAmt;
					} else {
						item.orderTotalPrice = item.orderTotalPriceReal;
					}
					item.integralPrice = 0;
					item.integralBonus = 0;
					that.reComputeBonus();
				}
			},
			//获取后台订单配置信息
			getOderSetInfo() {
				var that = this;
				that.$http({ //调用接口
					method: 'GET',
					url: that.global.target + "/wx/order/getOrderSetList" //this指data
				}).then(function(response) { //接口返回数据
					// console.log(response)
					var result = response.data;
					if (result.errno == 0) {
						that.orderSetList = result.data;
					} else {

					}
				}, function(error) {})

			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			// usebonus(data){
			// 	var that = this;
			// 	if(data.detail.value){
			// 		that.$http({ //调用接口
			// 			method: 'POST',
			// 			data:uni.getStorageSync('userInfo'),
			// 			url: this.global.target + "/wx/shoudu/crm/getMoneyWithBonus" //this指data
			// 		}).then(function(response) { //接口返回数据
			// 			// console.log(response)
			// 			var result = response.data;
			// 			if (result.errno == 0) {
			// 				var maxMoney = result.data;
			// 				if(maxMoney>0){
			// 					if(maxMoney>that.orderTotalPrice){
			// 						that.$http({ //调用接口
			// 							method: 'POST',
			// 							data:uni.getStorageSync('userInfo'),
			// 							params:{
			// 								money:that.orderTotalPrice
			// 							},
			// 							url: that.global.target + "/wx/shoudu/crm/getBonusWithMoney" //this指data
			// 						}).then(function(response) { //接口返回数据
			// 							// console.log(response)
			// 							var result = response.data;
			// 							if (result.errno == 0) {
			// 								that.useBonusMoney=orderTotalPrice;
			// 								that.useBonus=result.data;
			// 								that.orderTotalPrice=0;
			// 							}else {
			// 								that.$api.msg(result.errmsg);
			// 							}
			// 						}, function(error) {})
			// 					}else{
			// 						that.useBonusMoney=maxMoney;
			// 						that.useBonus=that.bonus;
			// 						that.orderTotalPrice=that.orderTotalPrice-maxMoney;
			// 					}
			// 				}
			// 			}else {
			// 				that.$api.msg(result.errmsg);
			// 			}
			// 		}, function(error) {})
			// 		
			// 	}else{
			// 		if(that.coupon!=null){
			// 			that.orderTotalPrice=that.orderTotalPriceReal-that.coupon.maxAmt;
			// 		}else{
			// 			that.orderTotalPrice=that.orderTotalPriceReal;
			// 		}
			// 		item.integralBonus=0;
			// 		item.integralPrice=0;
			// 	}
			// },
			clickSelectStore(item) {
				//console.log(this.selectGoods);
				if (item == null) {
					return;
				}
				this.selectGoods.storeId = item.id;
				this.selectGoods.storeName = item.name;
				//切换当前选择的店铺信息
				this.selectGoods.defaultStore = item;


				//console.log(this.selectGoods);
				this.storeToggleMask('', this.selectGoods);
			},
			stopPrevent() {},
			//显示取货门店
			storeToggleMask(type, item) {
				console.log(item)
				let timer = type === 'show' ? 10 : 300;
				let storeState = type === 'show' ? 1 : 0;
				if (item == null) {
					this.storeState = 0;
					return;
				}
				this.storeState = 2;
				setTimeout(() => {
					this.storeState = storeState;
				}, timer);
				this.selectGoods = item;

			},
			selectCoupon(coupon) {
				console.log(coupon);
				if(coupon==null){
					this.toggleMask('', this.selectGoods);
					return;
				}
				this.selectGoods.coupon = coupon;
				this.selectGoods.orderTotalPrice = this.selectGoods.orderTotalPrice - coupon.maxAmt;
				//计算可用优惠券 加上自己目前在使用的电子券
				this.recomputeCoupon();
				this.reComputeBonus();
	
				this.toggleMask('', this.selectGoods);
			},
			//显示优惠券面板
			toggleMask(type, item) {
				
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(() => {
					this.maskState = state;
				}, timer)
				this.selectGoods = item;
			},
			loadData(goodId, number, cartIds, numbers) {
				var that = this;
				//强制刷新获取用户优惠券和积分信息
				that.getuserInfo();
				if (goodId && goodId != null && goodId != "" && number != null && number != "") {
					that.$http({ //调用接口
						method: 'POST',
						params: {
							goodId: goodId,
							number: number,
							comId: that.comId
						},
						url: this.global.target + "/wx/cart/recomandcheckoutinfo" //this指data
					}).then(function(response) { //接口返回数据
						// console.log(response)

						var result = response.data;
						if (result.errno == 0) {
							let goodsList = result.data.checkedGoodsList;
							goodsList.forEach(item => {
								// that.$set(item.storeList[0], 'seleted', true);
								that.nowDate(item)
								// item.time=that.time;
								// item.date=that.date;
							})
							that.goodsList = result.data.checkedGoodsList;
							that.goodsTotalPrice = result.data.goodsTotalPrice;
						} else {
							this.$api.msg(result.errmsg)
						}
					}, function(error) {})
				} else if (cartIds && cartIds != null && cartIds != "" && numbers != null && numbers != "") {
					that.$http({ //调用接口
						method: 'POST',
						params: {
							cartIds: cartIds,
							numbers: numbers,
							comId: that.comId
						},
						url: this.global.target + "/wx/cart/recomandcheckoutinfo" //this指data
					}).then(function(response) { //接口返回数据
						// console.log(response)
						var result = response.data;
						if (result.errno == 0) {
							let goodsList = result.data.checkedGoodsList;
							goodsList.forEach(item => {
								that.$set(item.storeList[0], 'seleted', true);
								that.nowDate(item);
								// item.time=that.time;
								// item.date=that.date;
							})
							that.goodsList = result.data.checkedGoodsList;
							that.goodsTotalPrice = result.data.goodsTotalPrice;
						} else {
							that.$api.msg(result.errmsg);
						}
					}, function(error) {})
				}

				
			},
			getuserInfo() {
				var that = this;
				that.$http({ //调用接口
					method: 'POST',
					url: this.global.target + "/wx/auth/checkToken" //this指data
				}).then(function(response) { //接口返回数据
					// console.log(response)
					var result = response.data;
					if (result.errno == 0) {
						that.login(result.data);
						let userInfo = uni.getStorageSync('userInfo');
						that.bonus = userInfo.bonus;
						that.mayUseBonus = userInfo.bonus;
						that.couponList = userInfo.ticketsList;
						that.mayUseCouponList = userInfo.ticketsList;
						if (userInfo.vipCode) {
							that.isbind = true;
						}
					} else {

					}
				}, function(error) {})
			},
			recommandOrder() { //下单预约
				//    if(this.ifCheckFlag==false){		 
				// this.$api.msg("请勾选预定须知，确保您已知晓预订取货规则");
				// return;
				// 		 
				// }
				uni.showLoading({
					title: '请稍后'
				})
				this.orderStructData.goodId = 0;
				this.orderStructData.number = 0;
				this.orderStructData.time = "";
				this.orderStructData.storeId = 0;
				this.orderStructData.cartIds = "";
				this.orderStructData.times = "";
				this.orderStructData.storeIds = "";
				this.orderStructData.comId = this.comId;
				this.orderStructData.integralBonuss="";
				this.orderStructData.integralPrices="";

				if (this.goodsId && this.goodsId != null && this.goodsId != "") {
					//如果只有一个商品,则取第一个
					// for(var i=0;i<this.goodsList.length;i++){
					let obj = this.goodsList[0];
					let cart = obj.cart;
					this.orderStructData.goodId = cart.productId;
					this.orderStructData.number = cart.number;
					// time=obj.date +" "+obj.time;
					this.orderStructData.time = this.date + " " + this.time;
					this.orderStructData.storeId = obj.defaultStore.id;
					this.orderStructData.integralPrice=obj.integralPrice;
					this.orderStructData.integralBonus=obj.integralBonus;
					this.orderStructData.coupon=obj.coupon;

					// }
				} else if (this.cartIds && this.cartIds != null && this.cartIds != "") {
					var addCouponList=[];
					for (var i = 0; i < this.goodsList.length; i++) {
						let obj = this.goodsList[i];
						// console.log(obj)
						let cart = obj.cart;
						this.orderStructData.cartIds += cart.id + ",";
						this.orderStructData.times += obj.date + " " + obj.time + ",";
						this.orderStructData.storeIds += obj.defaultStore.id + ",";
						this.orderStructData.integralPrices+=obj.integralPrice+ ",";
						this.orderStructData.integralBonuss+=obj.integralBonus + ",";
						var addCoupon=obj.coupon;
						
						addCouponList.push(obj.coupon);
						this.orderStructData.coupons=addCouponList;
						 
					}
				}
                console.log(this.orderStructData)

				var that = this;
				that.$http({ //调用接口
					method: 'POST',
					data: that.orderStructData,
					// params:{
					// 	goodId:goodsId,
					// 	number:number,
					// 	time:time,
					// 	storeId:storeId,
					// 	storeIds:storeIds,
					// 	cartIds:cartIds,
					// 	times:times,
					// 	comId:that.comId
					// },
					url: this.global.target + "/wx/order/submitcommand" //this指data
				}).then(function(response) { //接口返回数据
					// console.log(response)
					uni.hideLoading();
					var result = response.data;
					if (result.errno == 0) {
						uni.navigateTo({
							url: `/pages/submitam/order?state=0`
						})
					} else {
			 
						that.$api.msg(result.errmsg)
					}
					
				}, function(error) {
					uni.hideLoading();
				})


			},
			getDefaultDateValue(hours) {
				//默认时间，当前时间加上系统设置的备货时间
				var date = new Date().getTime()
				// console.log(date,new Date().getTime() );
				// console.log(new Date().getTime() + hours *3600 * 1000);

				return new Date(new Date().getTime() + hours * 3600 * 1000);

			},
			//当前日期加1天
			getDayAddSome(beginDay, addDay) {
				// var dateAdd=new Date().getTime()

				var date = new Date(new Date(beginDay).getTime() + addDay * 24 * 3600 * 1000);
				var monthAdd = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);

				var dayAdd = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())

				return date.getFullYear() + '-' + monthAdd + '-' + dayAdd;

			},
			nowDate(selectGoodsItem) {
				var date = new Date();
				// console.log(this.orderSetList.litemall_order_yuyue_beihuo_hour);
				var date = this.getDefaultDateValue(Number(this.orderSetList.litemall_order_yuyue_beihuo_hour) + Number(1));
				var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
				var day = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())
				// var endmonth=(date.getMonth()+2)>9?(date.getMonth()+2):('0'+(date.getMonth()+2));
				selectGoodsItem.date = date.getFullYear() + '-' + month + '-' + day;
				this.date = selectGoodsItem.date;
				// this.end=date.getFullYear()+'-'+endmonth+'-'+day;
				var hour = ((date.getHours() + 1) > 9 ? (date.getHours() + 1) : '0' + (date.getHours() + 1));
				var min = ((date.getMinutes() + 1) > 9 ? (date.getMinutes() + 1) : '0' + (date.getMinutes() + 1))
				selectGoodsItem.time = hour + ':' + min;
				this.time = selectGoodsItem.time;
				if (selectGoodsItem != null && selectGoodsItem.defaultStore != null) {
					//如果提货时间小于店铺提货日期，则取当天最早日期
					if (selectGoodsItem.time <= selectGoodsItem.defaultStore.yuyueTime[0]) {
						selectGoodsItem.time = selectGoodsItem.defaultStore.yuyueTime[0];
						this.time = selectGoodsItem.time;
					} else if (selectGoodsItem.time > selectGoodsItem.defaultStore.yuyueTime[1]) {
						//如果取货时间大于当天最晚时间，则取第二天的最早日期
						// console.log(selectGoodsItem.date,selectGoodsItem.time)
						selectGoodsItem.date = this.getDayAddSome(selectGoodsItem.date, 1);
						this.date = selectGoodsItem.date;
						// console.log(selectGoodsItem.date)
						selectGoodsItem.time = selectGoodsItem.defaultStore.yuyueTime[0];
						this.time = selectGoodsItem.time;
					}
				}
				console.log(selectGoodsItem.date, selectGoodsItem.time)
			},
			disnum() { //减少件数
				var yuyue_num = this.yuyue_num - 1;
				if (yuyue_num > 0) {
					this.yuyue_num = yuyue_num;
				}
			},
			addnum() { //增加件数
				var yuyue_num = parseInt(this.yuyue_num) + 1;
				// console.log(yuyue_num)
				this.yuyue_num = yuyue_num;
			},
			checkaddress(numb, index) { //选择地址
				let storeList = this.goodsList[numb].storeList;
				storeList.forEach(item => {
					item.seleted = false;
				})
				this.goodsList[numb].storeList[index].seleted = true;
			},
			bindDateChange(item, e) {
				// console.log(e)
				this.date = e.detail.value;
				item.date = e.detail.value;
			},
			bindTimeChange(item, e) {
				// console.log(e)
				this.time = e.detail.value;
				item.time = e.detail.value;
			},
			//弹窗 
			windowshow(e) {
				this.windowflag = e
			},
			ifCheckFlagClick() {
				this.ifCheckFlag = !this.ifCheckFlag
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year;
				} else if (type === 'end') {
					year = year + 1;
				}
				// console.log(month)
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;

			}
		}
	}
</script>

<style lang="scss">
	.switch {
		transform: scale(0.6);
	}

	/* 优惠券面板 */
	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			min-height: 20vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 150upx;
			padding: 0 30upx;

			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 130upx;
		}

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: $font-color-light;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}

		.price {
			font-size: 44upx;
			color: $base-color;

			&:before {
				content: '￥';
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}

	page {
		background: $page-color-base;
	}

	.sam_info,
	.info_price,
	.info_price .add_dis,
	.mendian,
	.sam_mendian_time .time,
	.tmf_address,
	.tmf_list .dingdan_li,
	.shou_list .shou_li,
	.last_price,
	.mendian_right .mendian_li {
		display: flex;
		display: -webkit-flex;
		box-sizing: border-box;
		background: #fff;
	}

	.submitam {
		background: #f8f8f8;
	}

	.sub-shop {
		display: flex;
		background: #fff;
		align-items: center;
		padding: 27upx 0 0 27upx;
		font-size: 29upx;

		image {
			width: 38upx;
			height: 38upx;
			margin: 0 20upx 0 0;
		}
	}

	.sam_info {
		padding: 30upx 27upx 0;
	}

	.info_left {
		width: 246upx;
		height: 234upx;
		flex-shrink: 0;
		margin: 0 49upx 0 53upx;
	}

	.info_left .goodimg {
		width: 100%;
		height: 100%;
	}

	.info_right {
		flex: 1;
		position: relative;
	}

	.info_right .title {
		font-size: 24upx;

		.red {
			padding: 0 14upx;
			background: #ff0000;
			font-size: 19upx;
			color: #fff;
			border-radius: 14upx;
			margin: 0 10upx 0 0;
		}
	}

	.info_other {
		font-size: 20upx;
		color: #909090;
		line-height: 30upx;
	}

	.info_other .info_li {
		padding-left: 20upx;
		box-sizing: border-box;
		line-height: 34upx;
	}

	.info_price {
		position: absolute;
		bottom: 0;
		width: 100%;
		justify-content: space-between;
	}

	.info_price .num {
		font-size: 29upx;
		color: #ff0000;
		font-weight: bold;

		&:before {
			content: '￥';
			font-size: 24upx;
		}
	}

	.info_price .add_dis {
		position: relative;
		left: 0;
		transform: scale(0.7);
		background: #f5f5f5;
	}

	.info_price .add_dis .add,
	.info_price .add_dis .dis {
		width: 65upx;
		height: 56upx;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
	}

	.info_price .add_dis .opimg {
		width: 40upx;
		height: 40upx;
		margin: 10upx auto;
	}

	.info_price .add_dis input {
		width: 100upx;
		height: 56upx;
	}

	// <!-- 预约信息 end-->
	// <!-- 取货门店 +时间-->
	.sam_mendian_time {
		padding: 29upx 26upx 28upx;
		box-sizing: border-box;
		background: #fff;
	}

	.mendian {
		border-bottom: 1px solid #f8f8f8;
	}

	.mendian .mendian_left,
	.time .time_left,
	.tmf_address .tml_left {
		font-size: 24upx;
		flex-shrink: 0;
		padding: 8upx 0 0;
	}

	.mendian .mendian_right,
	.time .time_right {
		font-size: 24upx;
		flex: 1;
		-webkit-flex: 1;
	}

	.time .time_right .p_data,
	.time .time_right .p_time {
		float: right;
		margin: 0 0 0 20upx;
	}

	.mendian_right .mendian_li {
		height: 63upx;
		justify-content: space-between;

	}

	.mendian_right .mendian_li .address {
		display: block;
		padding: 8upx 0 0;
	}

	.mendian_right .mendian_li .checkbox,
	.mendian_right .mendian_li .checkbox .box {
		float: right;
		transform: scale(0.85);
		margin: 0;
	}

	.time .time_right {
		text-align: right;
		color: #FF0000;
		font-size: 24upx;
		margin: 20upx 0 0;
	}

	.st-time {
		.st-times {
			color: #B4B4B4;
			font-size: 20upx;
			margin: 8upx 0 0;
		}
	}

	// <!-- 取货门店 +时间 end-->
	// <!-- 取货时间规则+门店信息+发票*** -->
	.sam_tmf,
	.shou_list {
		margin: 27upx 0 0;
		background: #fff;
		padding: 20upx 27upx;
		box-sizing: border-box;

		.red {
			color: #ff0000;
		}
	}

	.sam_tmf .time {
		font-size: 30upx;
		color: #666;
		height: 100upx;
		line-height: 100upx;
		background: #f8f8f8;
		text-align: center;
		text-decoration: underline;
	}

	.tmf_mendian {
		margin: 10upx 0 0 0;
		font-size: 32upx;
		line-height: 60upx;
	}

	.tmf_address .tml_left {
		margin: 0;
	}

	.tmf_list .dingdan_li,
	.shou_list .shou_li {
		justify-content: space-between;
		-webkit-justify-content: space-between;
		font-size: 24upx;
		padding: 0;
		line-height: 50upx;
	}

	.tmf_list .dingdan_li {
		.jifens {
			margin: 0 0 0 20upx;
			font-weight: bold;
		}

		switch {
			transform: scale(.7);
		}
	}

	.dingd_left .jifen {
		margin: 0 0 0 10upx;
	}

	.dingd_left .jifen text {
		color: #fa436a;
	}


	.st-address {
		margin: 24upx 0 0;

		image {
			width: 20upx;
			height: 24upx;
			margin: 0 10upx 0 0;
		}

		.time_right {
			display: flex;
			align-items: center;
			color: #000000;
			margin: 0;
			justify-content: flex-end;
		}
	}

	.window {
		padding: 50upx 0 50upx;
		font-size: 26upx;
		color: #666;
		text-align: center;
		text-decoration: underline;

		text {
			margin-left: 10upx;
		}

		.checkbox {
			checkbox {
				transform: scale(.8);
			}

			/deep/uni-checkbox .uni-checkbox-input {
				background-color: transparent;
				margin-right: 0;
				border-radius: 100%;
				border: 1px solid #666;
			}

			/deep/uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
				background: #ff0000;
				border: 1px solid #ff0000;
			}
		}
	}

	// <!-- 取货时间规则+门店信息+发票*** end-->
	// <!-- 确认预约 -->
	.confirm {
		background: #fff;
		position: fixed;
		z-index: 999;
		height: 98upx;
		bottom: 0;
		width: 100vw;
		box-shadow: 0px 0px 9px 0px rgba(47, 47, 47, 0.36);
		display: flex;
	}

	.last_price {
		color: #ff0000;
		flex-direction: column;
		flex: 1;
		padding: 4upx 0 0 27upx;

		.price_right {
			font-size: 40upx;
			font-weight: bold;

			&:before {
				content: '￥';
				font-size: 27upx;
			}
		}

		.con_can {
			font-size: 19upx;
		}
	}

	.confirm_btn {
		width: 280upx;
		background: linear-gradient(239deg, rgba(242, 81, 33, 1), rgba(233, 58, 39, 1));
		text-align: center;
		font-size: 29upx;
		color: #fff;
		line-height: 98upx;
		flex-shrink: 0;
	}

	.windows {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 999;
		background: rgba(0, 0, 0, .8);
		top: 0;
		margin: 0;

		.window-content {
			background: #fff;
			padding: 50upx 40upx;
			box-sizing: border-box;
			position: absolute;
			width: 86%;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 5upx;

			.title {
				font-size: 29upx;
				line-height: 37upx;
				text-align: center;
			}

			.text {
				font-size: 21upx;
				line-height: 35upx;
				margin: 27upx 0 0;

				.red {
					color: #ff0000;
				}
			}
		}
	}
</style>
