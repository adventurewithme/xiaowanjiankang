<template>
	<view>
		<!-- 地址 -->
		<navigator url="/pages/address/address?source=1" class="address-section">
			<view class="order-content">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen">
					<view class="top" v-if="addressData.id!=0">
						<text class="name"><text class="red">{{addressData.flag}}</text>{{addressData.name}} {{addressData.tel}}</text>
					</view>
					<text class="address" v-if="addressData.id!=0"><text></text>{{addressData.provinceName}}{{addressData.cityName}}{{addressData.countyName}}{{addressData.addressDetail}}{{addressData.area}}</text>
					<text class="address" v-if="addressData.id==0">请选择地址</text>
					<view class="userinfo">
						<text class="username">{{addressData.user}}</text>
						<text>{{addressData.mobile}}</text>
					</view>
				</view>
				<text class="yticon icon-you"></text>
			</view>

			<image class="a-bg" src="/static/newimg/createorder.png"></image>
		</navigator>

		<view class="goods-section">
			<!-- <view class="g-header b-b">
				<image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"></image>
				<text class="name">西城小店铺</text>
			</view> -->
			<!-- 商品列表 -->
			<view class="co_list">
				<view class="co-list-top">
					<image src="/static/newimg/redquan.png" mode=""></image>
					<text>{{shopinfo.name}}</text>
				</view>
				<view class="g-item" v-for="(item,index) in goodList" :key='index'>
					<image :src="item.picUrl"></image>
					<view class="right">
						<text class="title clamp">
							<!-- <text class="red">美食</text> -->{{item.goodsName}}</text>
						<text class="spec"><text v-for="(it,ind) in item.specifications" :key="ind">{{it+" "}}</text></text>
						<view class="price-box">
							<text class="price">￥{{item.price}}</text>
							<text class="number">x {{item.number}}</text>
						</view>
					</view>
				</view>
				<view v-if="ifXuni=='false'" class="co-express">
					<view class="">配送方式：</view>
					<view class="kuaidi">
						<text>{{shopinfo.express}}</text>
						<image src="/static/newimg/express.png" mode=""></image>
					</view>
				</view>

				<view v-if="ifXuni=='false'" class="sendway">
					<view class="sendway_li" v-for="(item,index) in sendway_select" :key="index" :class="orderStructData.sendWay==item?'active':''"
					 @click="change_sendway(item)">
						{{item}}
					</view>
				</view>
				<view v-if="ifXuni=='false'&&orderStructData.sendWay=='航站楼取货'" class="sendway_hangzhanlou">
					<view class="yt-list-cell" @click="sendwayToggleMask('show')">
						<text class="cell-left clamp">提货点：{{orderStructData.pickSiteName}}</text>
						<text class="cell-tip clamp active">
							<text>点击选择</text>
							<text class="yticon icon-you"></text>
						</text>
					</view>
					<view class=" time yt-list-cell">
						<view class="cell-left clamp">
							自提时间：
						</view>
						<view class="cell-tip clamp time_right">
							<picker mode="time" class="p_time" start="09:01" end="21:01" data-a="time" @change="bindTimeChange">
								<view class="uni-input">{{time}}</view>
							</picker>
							<picker mode="date" class="p_data" :start="startDate" :end="endDate" data-a="day" @change="bindDateChange">
								<view class="uni-input">{{date}}</view>
							</picker>
						</view>
					</view>


					<view class="yt-list-cell">
						<text>取货人姓名：</text>
						<input style="padding-left: 20upx;font-size: 24upx" type="text" v-model="orderStructData.pickPerson" placeholder="请输入取货人姓名" />

					</view>
					<view class="yt-list-cell">
						<text>取货人手机号：</text>
						<input style="padding-left: 20upx;font-size: 24upx" type="text" v-model="orderStructData.pickMobile" placeholder="请输入取货人手机号" />

					</view>
				</view>

				<view class="yt-list">
					<view class="yt-list-cell">
						<text class="cell-tit clamp">
							<text>纸质发票</text>
							<text v-if="ifKaiFaPiao&&fapiaoDetail.fapiaoType=='个人'">
								<text class="num">
									{{fapiaoDetail.fapiaoType}}
								</text>
								<switch class="switch" :checked="'false'" color="#FF0000" @change="notKaiFaPiao">不开票</switch>
							</text>
							<text class="num" v-if="ifKaiFaPiao&&fapiaoDetail.fapiaoType=='单位'">
								<text>
									{{fapiaoDetail.fapiaoType}}:{{fapiaoDetail.name}}
								</text>
								<switch class="switch" :checked="'false'" color="#FF0000" @change="notKaiFaPiao">不开票</switch>
							</text>
						</text>
						<text class="cell-tip " @click="changeIfKaiFaPiao">
							开发票
							<text class="yticon icon-you"></text>
						</text>
						<!-- 				<switch class="switch" color="#FF0000" @change="changeIfKaiFaPiao">是否开票
					</switch> -->

					</view>
				</view>

				<view class="co-leave">
					<text>留言:</text>
					<textarea maxlength="70" class="leave" v-model="orderStructData.message" placeholder="给商家留言（限70字）" />
					</view>
			</view>

		</view>

 
		<!-- 金额明细 -->
		<view class="yt-list co-bottom">
			<view class="yt-list-cell">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip">￥{{goodsTotalPrice}}</text>
			</view>
<!-- 			<view class="yt-list-cell">
				<text class="cell-tit clamp">立减</text>
				<text class="cell-tip red">-￥{{couponPrice}}</text>
			</view> -->
			<!-- 如果是虚拟商品，不能使用优惠券 -->
	
			 <view v-if="ifXuni=='false'&&returnIfOnlyUserBonus=='false'" class="yt-list-cell" >
				   
				     <text class="cell-tit clamp">优惠券</text>
					 <text class="cell-tip clamp active" >
						<text v-if="couponList!=null&&couponList.length>0&&coupon==null" @click="toggleMask('show')">{{couponList.length}}张可用</text>
						<text v-if="couponList!=null&&couponList.length>0&&coupon!=null" @click="toggleMask('show')">{{coupon.ticketDesci}}</text>
						<!-- <text class="yticon icon-you"></text> -->
						<text class="cell-tip active" v-if="isbind==false" @click="navToLogin">
							去领取
							<text class="yticon icon-you"></text>
						</text>
					  <text class="cell-more wanjia wanjia-gengduo-d"></text>
				    </text>
				  <text v-if="coupon==null" class="cell-tip red" @click="toggleMask('show')">-￥0</text>
				  <text v-if="coupon" class="cell-tip red" @click="toggleMask('show')">-￥{{coupon.maxAmt}}</text>
			 
			</view>
		
			<view v-if="ifXuni=='false'" class="yt-list-cell ">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip">+￥{{freightPrice}}</text>
			</view>
			 <view v-if="ifXuni=='false'" class="yt-list-cell b-b">
				<text class="cell-tit clamp">
					<text>积分</text>
					<text class="num">共{{bonus}}积分,使用{{useBonus}}积分</text>
				</text>
			     
				 <switch class="switch"  color="#FF0000" @change="usebonusChange"/>
				
				 <text v-if="useBonusMoney==null||useBonusMoney==0" class="cell-tip red">-￥0</text>
				 <text v-if="useBonusMoney" class="cell-tip red">-￥{{useBonusMoney}}</text>
				
			</view>
			<!-- <view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view> -->
		</view>

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<!-- <text>实付款</text> -->
				<text class="price-tip">￥</text>
				<text class="price">{{orderTotalPrice}}</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>

		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index" @click="selectCoupon(item)">
					<view class="con">
						<view class="left">
							<text class="title">{{item.ticketDesci}}</text>
							<text class="time">有效期至{{item.expiryDate}}</text>
						</view>
						<view class="right">
							<text class="price">{{item.maxAmt}}</text>
							<text></text>
						</view>

						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<!-- <text class="tips">限新用户使用</text> -->
				</view>
			</view>
		</view>

		<!-- 提货点面板 -->
		<view class="mask" :class="sendwayState===0 ? 'none' : sendwayState===1 ? 'show' : ''" @click="sendwayToggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
					<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in pickSiteList" :key="index" @click="selectPickSite(item)">
					<view class="con">
						<view class="left">
							<text class="title">{{item.siteName}}</text>
							<text class="time">提货时间:{{item.siteTime}}</text>
						</view>
<!-- 						<view class="right">
							<text class="price">{{item.maxAmt}}</text>
							<text></text>
						</view> -->
				
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<!-- <text class="tips">限新用户使用</text> -->
				</view>
				
				<!-- 优惠券页面，仿mt -->
<!-- 				<view class="coupon-item" v-for="(item,index) in pickSiteList" :key="index" @click="selectCoupon(item)">
					 <text class="title">{{item.siteName}}</text>
				</view> -->
			</view>
		</view>

		<!-- 发票面板 -->
		<view class="mask" :class="fapiaoState===0 ? 'none' : fapiaoState===1 ? 'show' : ''" @click="fapiaotoggleMask">
			<view class="mask-content coupon-items" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<!-- <view class="coupon-items"> -->
					<view class="invoice">
<!-- 						<view class="invoice_title">
							<view>发票</view>
							<view class="right">
							 
								<image src="/static/close.png" mode=""  @click="fapiaotoggleMask" ></image>
							</view>
						</view> -->
<!-- 						<view class="invoice_titles">
							发票类型
						</view>
						<view class="invoice_select">
							<view class="select_li active">
								普通纸质发票
							</view>
						</view> -->
						<view class="invoice_titles" >
							发票抬头
						</view>
						<view class="invoice_select">
							<view class="select_li"
							 v-for="(item,index) in invoice_select"
							  :key="index"
							   :class="selectFaPiaoType==item?'active':''"
								@click="change_ins(item)">
								{{item}}
							</view>
						</view>
			 
						<view class="select_companys"  v-show="selectFaPiaoType=='单位'">
							<view class="user_info">
								<text style="color: red;">*</text>
								<view class="info_left">
									单位名称
								</view>
								<view class="info_right" >
									<input type="text" v-model="fapiaoDetail.name"   placeholder="请输入单位名称" />
								</view>
								 <view style="wdith:50upx,color:red" >
									 <text v-if="checkName" style="color: red;">*单位名称不能为空</text>
								</view>
							</view>
							<view class="user_info">
								<text style="color: red;">*</text>
								<view class="info_left">
									纳税人识别码
								</view>
								<view class="info_right">
									<input type="text" v-model="fapiaoDetail.taxno" placeholder="请输入纳税人识别码" />
								</view>
							    <view style="wdith:50upx,color:red" >
									 <text v-if="checkTaxno"  style="color: red;">*纳税人识别码不能为空</text>
								</view>
							</view>
<!-- 							<view class="user_info">
								<view class="info_left">
									注册地址
								</view>
								<view class="info_right">
									<input type="text" v-model="fapiaoDetail.address" placeholder="请输入注册地址"/>
								</view>
							</view>
							<view class="user_info">
								<view class="info_left">
									注册电话
								</view>
								<view class="info_right">
									<input type="number" v-model="fapiaoDetail.telphone" placeholder="请输入注册电话" value="" />
								</view>
							</view>
							<view class="user_info">
								<view class="info_left">
									开户银行
								</view>
								<view class="info_right">
									<input type="text" v-model="fapiaoDetail.bank" placeholder="请输入注册银行" value="" />
								</view>
							</view>
							<view class="user_info">
								<view class="info_left">
									银行账号
								</view>
								<view class="info_right">
									<input type="text" v-model="fapiaoDetail.bankNo"  placeholder="请输入银行账号" value="" />
								</view>
							</view> -->
						</view>
<!-- 						<view class="select_user">
							<view class="invoice_titles">
								收票人信息
							</view>
							<view class="user_info">
								<view class="info_left">
									收票人手机*
								</view>
								<view class="info_right">
									<input type="number" value="" placeholder="请输入收票人手机号"/>
								</view>
							</view>
							<view class="user_info">
								<view class="info_left">
									收票人邮箱
								</view>
								<view class="info_right">
									<input type="text" value="" placeholder="请输入收票人邮箱"/>
								</view>
							</view>
						</view> -->
<!-- 						<view class="invoice_titles">
							发票内容 
							<text>发票内容选项已根据税法调整，具体请以展示为准</text>
						</view>
						<view class="invoice_select">
							<view class="select_li" v-for="(item,index) in invoice_good" :key="index" :class="insg_active==index?'active':''" @click="change_insg(index)">
								{{item}}
							</view>
						</view>
						<view class="invoice_gray">
							发票内容将显示本单商品所属类别（日用品）及价格信息，发票金额以实际支付金额，不含虚拟资产、优惠等扣减金额。
						</view> -->
						<view class="invoice_ok" @click="confirmFaPiaoInfo">
							确定
						</view>
				 
					</view>
					<!-- <view class="con">
						<view class="left">
							<text class="title">发票类型：</text>
							<text class="time">普通发票</text>
						</view>

						<view class="circle l"></view>
						<view class="circle r"></view>
					</view> -->
					<!-- <text class="tips">限新用户使用</text> -->
				<!-- </view> -->
				<!-- <view class="coupon-item">
					<view class="con">
						<view class="left">
							<text class="title">发票抬头：</text>
							<text class="time">个人</text>
							<text class="time">企业</text>
						</view>
				
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
				</view> -->
				
			</view>
		</view>


	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	
	} from 'vuex';
	export default {
		data() {
			return {
	 			time: '12:00', //取件时间
			    date:'',//选择自提日期
			    // end:'',//选择自提日期的结束日期
				vipCode:undefined,
				checkName:false,
				checkTaxno:false,
				ifKaiFaPiao:false,
				ifXuni:'false',//是否是虚拟商品，如果是虚拟商品，不能使用优惠券和积分
				returnIfOnlyUserBonus:'false',//是否只允许用积分进行购买
                selectFaPiaoType:'个人',//选择的发票类型
				// sendWayType:'快递',//选择的发运类型
				pickSiteList:[],//提货点列表
				orderSetList:[],//订单设置列表
				fapiaoDetail:{
					id:undefined,
					orderId:undefined,
					fapiaoType:undefined,
					name:undefined,
					taxno:undefined,
					address:undefined,
					telphone:undefined,
					bank:undefined,
					bankNo:undefined,
					money:undefined,
					status:undefined
				},
				coupon:null,//当前使用优惠券
		 
				isbind:false,//是否与CRM同步
				bonus:0,//积分 
				useBonus:0,//抵扣的积分数
				useBonusMoney:0,//抵扣积分换算的钱数
				goodsTotalPrice:0,//商品总额
				orderTotalPrice:0,//订单总额
				freightPrice:0,//运费
				couponPrice:0,//优惠金额
				maskState: 0, //优惠券面板显示状态
				fapiaoState:0,//发票面板显示状态
				sendwayState:0,//提货点面板显示状态
				desc: '', //备注
				payType: 1, //1微信 2支付宝
				couponList: [
				],
				addressData: {	
				},
				goodList: [{}],
				cartIds: "",
				goodId: "",
				number: "",
				price:"",
				comId: "",
				shopinfo:{},
				regionList:[],
				invoice_select:["个人","单位"],
				sendway_select:["快递","航站楼取货"],
				insg_active:0,
				invoice_good:["商品明细","商品类别"],
				//订单提交结构
				orderStructData:{
					cartIds:null,//购物车主键
					addressId:null,//地址主键
					message:'',//客户留言
					productId:null,//产品id
					mallOrderTypeCode:null,//电商订单类型编码 10、正常单 20、秒杀单 30、团购单
					ruleId:null,//秒杀或团购的活动规则id
					number:null,//购买数量
					price:null,//购买单价
					comId:'1',//商贸类型
					integralPrice:null,//积分抵现金额
					integralBonus:null,//使用抵现积分
					freightPrice:null,//订单运费
					coupon:[],//订单优惠券
					fapiao:[],//订单发票
					sendWay:'快递',//运输方式
					pickSiteId:null,//自提货点ID
					pickSiteName:null,//自提货点名称
					pickTime:null,//自提货日期时间
					pickPerson:'',//取货人真实姓名
					pickMobile:'',//取货人手机号码
					yuyueStoreId:null,//取货店铺信息
					yuyueFetchTime:null,//预约取货时间
				},
			}
		},
		onLoad(option) {
			//this.nowDate();
			this.getPickSiteList();
			this.getOderSetInfo();
			//商品ID
			let productId = option.productId;
			this.orderStructData.productId=option.productId;
			this.goodId=productId;
			//商品数量
			let number = option.number;
			this.orderStructData.number=option.number;
			this.number=number;
			//购物车里传过来的购物车记录Id
			let numbers = option.numbers;
			let cartIds = option.cartIds;
		    if(option.cartIds!=null&&option.cartIds!='undefined'){
				this.orderStructData.cartIds=option.cartIds;
			}
		 
			this.cartIds=cartIds;
			//传过来的电商类型Id
			let comId = option.comId;
			this.orderStructData.comId=option.comId;
			this.comId = comId;
			
			//传过来的 电商订单类型编码 10、正常单 20、秒杀单 30、团购单 
			if(option.mallOrderTypeCode==null){
				this.orderStructData.mallOrderTypeCode='10'
			}else{
				this.orderStructData.mallOrderTypeCode=option.mallOrderTypeCode;
			}
			//传过来的 活动规则id
			if(option.ruleId!=null&&option.ruleId!='undefined'){
				this.orderStructData.ruleId=option.ruleId;
			}
			//单价
			this.price=option.price;
			this.orderStructData.price=option.price;
			
			//传过来的商品属性，是否虚拟商品
			if(option.ifXuni!=null){
				this.ifXuni=option.ifXuni;
			}
			
			//是否只允许用积分进行购买
			if(option.returnIfOnlyUserBonus!=null){
				this.returnIfOnlyUserBonus=option.returnIfOnlyUserBonus;
			}
			
			
			// console.log(goodId)
			// console.log(number)
			this.loadDate(this.goodId, number, cartIds, numbers);
		},
		onShow(){
			//商品数据
			// let goodId ,number ,numbers ,cartIds,comId;
			// 
			// let name,value,str=location.href,num=str.indexOf("?"); //取得整个地址栏
			// str=str.substr(num+1); //取得所有参数 stringvar.substr(start [, length ]
			// let arr=str.split("&"); //各个参数放到数组里
			// console.log(arr)
			// for(let i=0;i < arr.length;i++){
			// 	num=arr[i].indexOf("=");
			// 	if(num>0){
			// 		name=arr[i].substring(0,num);
			// 		value=arr[i].substr(num+1);
			// 		if(name=="goodId"){
			// 			this.goodId=goodId;
			// 		}else if(name=="number"){
			// 			this.number=number;
			// 		}else if(name=="cartIds"){
			// 			this.cartIds=cartIds;
			// 		}else if(name=="comId"){
			// 			this.comId = comId;
			// 		}
			// 	}
			// }
			// 
			 this.loadDate(this.goodId, this.number, this.cartIds, this.numbers);
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
			//获取后台订单配置信息
			getOderSetInfo(){
				var that=this;
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
			
			//获取提货点信息
			getPickSiteList(){
				var that=this;
				that.$http({ //调用接口
					method: 'GET',
					params: {
						name: '',
						page:1,
						limit:100
					},
					url: that.global.target + "/wx/picksite/list" //this指data
				}).then(function(response) { //接口返回数据
					// console.log(response)
					var result = response.data;
					if (result.errno == 0) {
						that.pickSiteList = result.data.list;
						if(that.pickSiteList.length>0){
							//默认设置第一个提货点
							that.orderStructData.pickSiteId=that.pickSiteList[0].id;
							that.orderStructData.pickSiteName=that.pickSiteList[0].siteName;
							//设置提货时间
							that.nowDate(that.pickSiteList[0].sitePickTime);
						}
						
					} else {
				
					}
				}, function(error) {})
				
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
			
			},
			getDefaultDateValue(hours){
				//默认时间，当前时间加上系统设置的备货时间
				var date=new Date().getTime()
				console.log(date,new Date().getTime() );
				console.log(new Date().getTime() + hours *3600 * 1000);
				 
				return new Date(new Date().getTime() + hours *3600 * 1000);
				
			},
			//当前日期加1天
			getDayAddSome(beginDay, addDay) {
			 // var dateAdd=new Date().getTime()
			 var date= new Date(new Date(beginDay).getTime() + addDay*24 *3600 * 1000);
			 var monthAdd=(date.getMonth()+1)>9?(date.getMonth()+1):'0'+(date.getMonth()+1);
			 
			 var dayAdd=date.getDate()>9?date.getDate():('0'+date.getDate())
		 
			 return date.getFullYear()+'-'+monthAdd+'-'+dayAdd;
			 
			},
			nowDate(sitePickTime){
				console.log(sitePickTime)
				// var date=new Date()+this.orderSetList.litemall_order_tihuo_beihuo_hour;
				var date=this.getDefaultDateValue(Number(this.orderSetList.litemall_order_tihuo_beihuo_hour)+Number(1));
				//console.log(date, Number(this.orderSetList.litemall_order_tihuo_beihuo_hour)+Number(1));
				var month=(date.getMonth()+1)>9?(date.getMonth()+1):'0'+(date.getMonth()+1);
				
				var day=date.getDate()>9?date.getDate():('0'+date.getDate())
				this.date=date.getFullYear()+'-'+month+'-'+day;
				// console.log(date.getHours(),date.getMinutes());
				var hour=((date.getHours()+1)>9?(date.getHours()+1):'0'+(date.getHours()+1));
				var min=((date.getMinutes()+1)>9?(date.getMinutes()+1):'0'+(date.getMinutes()+1))
				this.time=hour+':'+min;
				if(sitePickTime!=null&&sitePickTime.length>0)
				{
					//如果提货时间小于店铺提货日期，则取当天最早日期
					if(this.time<=sitePickTime[0])
					{
						this.time=sitePickTime[0];
					} else if(this.time>sitePickTime[1]){
						//如果取货时间大于等于当天最大日期，则取第二天的最早日期
						this.date=this.getDayAddSome(this.date,1);
							console.log(this.date)
						this.time=sitePickTime[0];
					}
				}
 	
				console.log(this.date,this.time);
				// this.end=date.getFullYear()+'-'+endmonth+'-'+day;
			
			},
			bindDateChange(e){
				// console.log(e)
				this.date=e.detail.value;
			},
			bindTimeChange(e){
				// console.log(e)
				this.time=e.detail.value;
			},
			
			confirmFaPiaoInfo(){
				//判断一下必填项
				this.checkName=false;
				this.checkTaxno=false;
				if(this.selectFaPiaoType=="单位"){
					if (!this.fapiaoDetail.name) {
					     this.checkName=true;
						//this.$api.msgTop('请填写单位名称');
						 return;
				 
					}
					 if (!this.fapiaoDetail.taxno) {
						 this.checkTaxno=true;
						//this.$api.msgTop('请填写纳税人识别号');
						return;
					}
				}
				this.ifKaiFaPiao=true;
				this.fapiaoDetail.fapiaoType=this.selectFaPiaoType;
 	            this.fapiaotoggleMask()
			},
			
			
			changeIfKaiFaPiao(){ 
				//显示发票信息
				this.fapiaotoggleMask('show')
			},
			notKaiFaPiao(){
				this.ifKaiFaPiao=false;
			},
			usebonusChange(data){
				var that = this;
				if(data.detail.value){
					that.$http({ //调用接口
						method: 'POST',
						data:uni.getStorageSync('userInfo'),
						url: this.global.target + "/wx/shoudu/crm/getMoneyWithBonus" //this指data
					}).then(function(response) { //接口返回数据
						// console.log(response)
						var result = response.data;
						if (result.errno == 0) {
							var jsonResult = result.data;
							var maxMoney=jsonResult.money;
							var maxBonus=jsonResult.bonus;
							if(maxMoney>0){
								if(maxMoney>that.orderTotalPrice){
									that.$http({ //调用接口
										method: 'POST',
										data:uni.getStorageSync('userInfo'),
										params:{
											money:that.orderTotalPrice
										},
										url: that.global.target + "/wx/shoudu/crm/getBonusWithMoney" //this指data
									}).then(function(response) { //接口返回数据
										// console.log(response)
										var result = response.data;
										if (result.errno == 0) {
											that.useBonusMoney=that.orderTotalPrice;
											that.useBonus=result.data;
											that.orderTotalPrice=0;
										}else {
											that.$api.msg(result.errmsg);
										}
									}, function(error) {})
								}else{
									that.useBonusMoney=maxMoney;
									that.useBonus=maxBonus;
									that.orderTotalPrice=that.orderTotalPrice-maxMoney;
								}
							}
						}else {
							that.$api.msg(result.errmsg);
						}
					}, function(error) {})
					
				}else{
					if(that.coupon!=null){
						that.orderTotalPrice=that.orderTotalPriceReal-that.coupon.maxAmt;
					}else{
						that.orderTotalPrice=that.orderTotalPriceReal;
					}
					that.useBonus=0;
					that.useBonusMoney=0;
				}
			},
			async loadDate() {
				let goodId = this.goodId, number=this.number,price=this.price,cartIds=this.cartIds, numbers;
				var that = this;
				that.getuserInfo();
				var addressId = that.addressData.id;
				// console.log("地址："+addressId)
				if (goodId && goodId != null && goodId != "" && number != null && number != "") {
					that.$http({ //调用接口
						method: 'POST',
						params: {
							goodId: goodId,
							number: number,
							price: price,
							addressId:addressId
						},
						url: that.global.target + "/wx/cart/checkoutinfo" //this指data
					}).then(function(response) { //接口返回数据
						// console.log(response)
						var result = response.data;
						if (result.errno == 0) {
							that.goodList = result.data.checkedGoodsList;
							that.addressData = result.data.checkedAddress;
							that.orderStructData.addressId=that.addressData.id;
							// console.log(that.addressData)
							that.regionList = result.data.regionList;
							// //以下测试用，随便加一个默认地址
							// if(result.data.checkedAddress!=null&&result.data.checkedAddress.length>0)
							// {
							// 	that.addressData = result.data.checkedAddress;
							// }
							//封装省市县信息
							that.regionList.forEach(item=>{
								if(item.id==that.addressData.province){
									that.$set(that.addressData, "provinceName", item.name);
								}
								if(item.id==that.addressData.city){
									that.$set(that.addressData, "cityName", item.name);
								}
								if(item.id==that.addressData.county){
									that.$set(that.addressData, "countyName", item.name);
								}
								// if(item.id==){
								// 	
								// }
							})
							 
							that.goodsTotalPrice=result.data.goodsTotalPrice;
							that.orderTotalPrice=result.data.orderTotalPrice;
							that.orderTotalPriceReal=result.data.orderTotalPrice;
							that.couponPrice=result.data.couponPrice;
							that.freightPrice=result.data.freightPrice;
							that.goodId=goodId;
							that.number=number;
						}else {


						}
					}, function(error) {})
				} else if (cartIds && cartIds != null && cartIds != "") {
					that.$http({ //调用接口
						method: 'POST',
						params: {
							cartIds: cartIds,
							// numbers: numbers,
							addressId:addressId
						},
						url: this.global.target + "/wx/cart/checkoutinfo" //this指data
					}).then(function(response) { //接口返回数据
						// console.log(response)
						var result = response.data;
						if (result.errno == 0) {
							that.goodList = result.data.checkedGoodsList;
							that.addressData = result.data.checkedAddress;
							that.orderStructData.addressId=that.addressData.id;
							that.regionList = result.data.regionList;
							// //以下测试用，随便加一个地址
						 //    if(result.data.checkedAddress!=null&&result.data.checkedAddress.length>0)
							// {
							// 	that.addressData = result.data.checkedAddress;
							// }
							that.goodsTotalPrice = result.data.goodsTotalPrice;
							that.orderTotalPrice = result.data.orderTotalPrice;
							that.orderTotalPriceReal=result.data.orderTotalPrice;
							that.couponPrice = result.data.couponPrice;
							that.freightPrice=result.data.freightPrice;
							that.cartIds="";
							that.goodList.forEach(item => {
								that.cartIds += item.id + ","
							})
						} else {

						}
					}, function(error) {})
				}
				
				// let userInfo = uni.getStorageSync('userInfo');
				// that.bonus = userInfo.bonus;
				// that.couponList = userInfo.ticketsList;
    //             
				// if(userInfo.vipCode!=''){
				// 	that.vipCode=userInfo.vipCode;
				// 	that.isbind=true;
				// }
			},
			getuserInfo(){
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
						that.couponList = userInfo.ticketsList;
						console.log(userInfo)
						that.orderStructData.pickPerson=userInfo.nickName;
						that.orderStructData.pickMobile=userInfo.mobile;
						console.log('VIPCODE'+userInfo.vipCode)
						that.vipCode=userInfo.vipCode;
						if(userInfo.vipCode!=null&&userInfo.vipCode!=''){
							that.isbind=true;
						}
					} else {
				
					}
				}, function(error) {})
			},
			selectCoupon(coupon){
				this.coupon=coupon;
				this.orderTotalPrice=this.orderTotalPrice-coupon.maxAmt;
				this.toggleMask();
			},
			
			selectPickSite(item){
				this.orderStructData.pickSiteId=item.id;
				this.orderStructData.pickSiteName=item.siteName;
				this.sendwayToggleMask();
			},
			
			//显示优惠券面板
			toggleMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(() => {
					this.maskState = state;
				}, timer)
			},
			//显示选择提货点
			sendwayToggleMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.sendwayState = 2;
				setTimeout(() => {
					this.sendwayState = state;
				}, timer)
			},
			
			//显示发票面板
			fapiaotoggleMask(type) {
				let timer = type === 'show' ? 10 : 200;
				let state = type === 'show' ? 1 : 0;
				this.fapiaoState = 2;
				setTimeout(() => {
					this.fapiaoState = state;
				}, timer)
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type) {
				this.payType = type;
			},
			submit() {
				if (this.addressData.name == null) {
					this.$api.msg("请选择收货地址");
					return;
				}

				if (this.goodList == null || this.goodList.length <= 0) {
					this.$api.msg("请选择商品");
					return;
				}
				console.log(this.returnIfOnlyUserBonus,this.orderTotalPrice)
				if(this.returnIfOnlyUserBonus=='true'&&this.orderTotalPrice>0){
					this.$api.msg("该商品只支持用积分购买");
					return;
				}
 
				uni.showLoading({
					title: '请稍后'
				})
				var that = this;
                that.orderStructData.integralPrice=that.useBonusMoney;//积分抵现金额
				that.orderStructData.integralBonus=that.useBonus;//积分
				that.orderStructData.freightPrice=that.freightPrice;//订单运费
				that.orderStructData.coupon=that.coupon;//订单优惠券
				that.orderStructData.fapiao=that.ifKaiFaPiao==true?that.fapiaoDetail:null;//订单发票
				//处理提货时间
				if(that.orderStructData.pickSiteId!=null){
					var time=this.date +" "+this.time;
					that.orderStructData.pickTime=time;		
				}
	
                // console.log(that.orderStructData);
		 
				that.$http({ //调用接口
					method: 'POST',
					data:that.orderStructData,
					// params: {
					// 	cartIds: that.cartIds,
					// 	goodId: that.goodId,
					// 	number: that.number,
					// 	addressId: that.addressData.id,
					// 	message: "",
					// 	comId: that.comId,
					// },
					url: this.global.target + "/wx/order/submit" //this指data
				}).then(function(response) { //接口返回数据
				    uni.hideLoading();
					// console.log(response)
					var result = response.data;
					if (result.errno == 0) {
						if(that.coupon!=null){
							//去除优惠券
							let ticketsList = uni.getStorageSync('userInfo').ticketsList;
							ticketsList.splice(ticketsList.indexOf(that.coupon),1)
						}
						// console.log(123);

						//扣除积分
						//如果需要金额支付跳到支付页面，如果不需要支付，则直接创建订单成功，到待备货状态
						if(that.orderTotalPrice>0)
						{
							uni.redirectTo({
								url: '/pages/money/pay?orderId=' + result.data.orderId + '&pay=' + result.data.pay + '&ordersn=' + result.data
									.orderSn
							})
						} else
						{
							uni.navigateTo({
								url: '/pages/money/paySuccess?price='+that.pay+'&orderid='+result.data.orderId
							})
						}

					} else {
                        that.$api.msg(result.errmsg);
					}
					
				}, function(error) {
					
					uni.hideLoading();
				})



			},
			stopPrevent() {},
			// 切换发票抬头
			change_ins(item){
				this.selectFaPiaoType =item
			},
			change_insg(e){
				this.insg_active=e;
			},
			// 切换运输方式
			change_sendway(item){
				this.orderStructData.sendWay =item
			},
			navToLogin() {
				 
				uni.navigateTo({
					url: '/pages/public/login'
				})
				
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}
	.time .time_right {
		text-align: right;
		color: #FF0000;
		font-size: 24upx;
		margin: 20upx 0 0;
	}
	.time .time_left,
	.tmf_address .tml_left {
		font-size: 24upx;
		flex-shrink: 0;
		padding: 8upx 0 0;
	}
	.st-time{
		.st-times{
			color: #B4B4B4;
			font-size: 20upx;
			margin: 8upx 0 0;
		}
	}
	.time .time_right .p_data,
	.time .time_right .p_time{
		float: right;
		margin: 0 0 0 20upx;
	}
 
	
	// <!-- 取货门店 +时间 end-->
	.sendway{
		display: flex;
		.sendway_li{
			padding: 5px 20px;
			margin: 15px 0px 0px 15px;
			border: 1px solid #f25121;
			font-size: 12px;
			color: #FF0000;
			text-align: center;
			-webkit-border-radius: 33px;
			border-radius: 20px;
		}
		.active{
			background:linear-gradient(239deg,rgba(242,81,33,1),rgba(233,58,39,1));
			color: #fff;
		}
	}
   .sendway_hangzhanlou{
	   font-size: 24upx;
	   padding: 20upx 25upx 27upx 30upx;
	   	.yt-list-cell {
			display: flex;
			align-items: center;
			line-height: 70upx;
			position: relative;
		   .cell-left {
			flex: 1;
			margin-right: 10upx;
		   }
		   .cell-tip {
		   	font-size: 24upx;
		   
		   	&.disabled {
		   		color: $font-color-light;
		   	}
		   
		   	&.active {
		   		color:#FF0000;
		   	}
		   
		   	&.red {
		   		color: $base-color;
		   	}
		   }
	 }
   }

	.address-section {
		padding: 20upx 25upx 27upx;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.cen {
			display: flex;
			flex-direction: column;
			width: 80%;
			font-size: 28upx;
		}

		.red {
			color: #fff;
			font-size: 20upx;
			padding: 2px 14upx;
			background: #ff0000;
			border-radius: 6upx;
			margin: 0 10upx 0 0;
		}

		.name {
			font-size: 24upx;
			color: #909090;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			font-size: 27upx;
			line-height: 40upx;
		}

		.userinfo {
			font-size: 24upx;
			margin: 10upx 0 0;

			.username {
				margin: 0 20upx 0 0;
			}
		}

		.icon-you {
			font-size: 28upx;
			color: #000;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 27upx;
		background: #fff;
		padding-bottom: 27upx;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.co-list-top {
			display: flex;
			padding: 27upx 0 0 27upx;
			align-items: center;

			image {
				width: 38upx;
				height: 38upx;
			}

			text {
				font-size: 29upx;
				margin: 0 0 0 15upx;
			}
		}

		.g-item {
			display: flex;
			padding: 31upx 27upx 0 27upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 246upx;
				height: 234upx;
				margin: 0 43upx 0 54upx;
			}

			.right {
				flex: 1;
				overflow: hidden;
				position: relative;
			}

			.title {
				font-size: 24upx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				white-space: normal;
				.red {
					font-size: 19upx;
					color: #fff;
					padding: 0 14upx;
					border-radius: 18upx;
					background: #FF0000;
					margin: 0 10upx 0 0;
				}
			}

			.spec {
				font-size: 20upx;
				color: #909090;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				justify-content: space-between;
				padding-top: 10upx;
				position: absolute;
				width: 100%;
				bottom: 0;
				.price {
					margin-bottom: 4upx;
					color: #FF3B30;
					font-size: 24upx;
					font-weight: bold;
				}

				.number {
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
		.co-express,
		.co-leave{
			font-size: 24upx;
			display: flex;
			justify-content: space-between;
			padding: 27upx 27upx 0 27upx;
			image{
				width: 33upx;
				height: 9upx;
				margin: 0 0 0 13upx;
			}
			.leave{
				margin: 0 0 0 10upx;
				flex: 1;
				height: 122upx;
				background: #F6F6F6;
				font-size: 24upx;
				padding: 5upx 9upx;
			}
		}
		
		
		
	}

	.yt-list {
		margin-top: 27upx;
		background: #fff;
		padding:20upx 27upx 27upx;
	}
	.yt-list-cell {
		display: flex;
		align-items: center;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}
		.icon-you{
			font-size: 24upx;
			margin: 0 0 0 20upx;
		}
		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 24upx;
			margin-right: 10upx;
			.num{
				margin: 0 0 0 33upx;
				font-weight: bold;
			}
		}
		.switch{
			transform:scale(0.6);
		}
		.cell-tip {
			font-size: 24upx;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color:#FF0000;
			}

			&.red {
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}

	.co-bottom{
		.cell-tip{
			font-weight: bold;
		}
		.red{
			color: #ff0000;
			font-weight: bold;
		}
	}
	/* 支付列表 */
	.pay-list {
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}

		.icon-alipay {
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}

		.tit {
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 98upx;
		justify-content: space-between;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow:0px 0px 9px 0px rgba(47,47,47,0.36);

		.price-content {
			font-size: 27upx;
			color: #FF0000;
			font-weight: bold;
			padding-left: 27upx;
		}
		.price{
			font-size: 40upx;
		}
		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 29upx;
			background:linear-gradient(239deg,rgba(242,81,33,1),rgba(233,58,39,1));
		}
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
	/*发票列表*/
.mask .coupon-items{
	background: #fff;
	border-radius: 40upx 40upx 0 0;
	padding:10upx 27upx;
	
}
.invoice{
	
	.invoice_title{
		font-size: 36upx;
		line-height: 70upx;
		font-weight: bold;
		.right{
			font-size: 24upx;
			font-weight: normal;
			image{
				width: 36upx;
				height: 36upx;
				margin: 0 0 0 20upx;
			}
		}
	}
	.invoice_titles{
		font-size: 28upx;
		line-height: 80upx;
		font-weight: bold;
		margin: 10upx 0 0;
		text{
			font-size: 20upx;
			color: #909090;
			margin: 0 0 0 20upx;
		}
	}
	.invoice_select{
		.select_li{
			padding:10upx 40upx;
			margin: 0 20upx 0 0;
			border:1px solid rgba(242,81,33,1);
			font-size: 26upx;
			color: #FF0000;
			text-align: center;
			border-radius:33px;
			
		}
		.active{
			background:linear-gradient(239deg,rgba(242,81,33,1),rgba(233,58,39,1));
			color: #fff;
		}
	}
	.select_companys{
		margin: 20upx 0upx;
	}
	.user_info{
		font-size: 24upx;
		line-height: 80upx;
		.info_left{
			width: 180upx;
			flex-shrink: 0;
		}
		.info_right{
			flex: 1;
			
		}
	}
	.invoice_gray{
		font-size: 20upx;
		color: #909090;
	}
	.invoice_ok{
		// position: absolute;
		// bottom: 0;
		width: 100%;
		height: 73upx;
		background:linear-gradient(239deg,rgba(242,81,33,1),rgba(233,58,39,1));
		border-radius:33px;
		font-size: 30upx;
		color: #fff;
		margin: 20upx 0 0;
		justify-content: center;
		
	}
	.invoice_title,
	.invoice_title .right,
	.invoice_select,
	.user_info,
	.invoice_ok{
		display: flex;
		align-items: center;
	}
	.invoice_title{
		justify-content: space-between;
	}
	
}
</style>
