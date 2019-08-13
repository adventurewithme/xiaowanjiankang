<template>
  <div class="goodsdetail">
    <!-- banner -->
    <div class="gd_bannerdiv">
      <mt-swipe :auto="4000" class="gd_banner" :showIndicators="false" @change="changebanner">
        <mt-swipe-item class="gd_bannerli" v-for="(item,index) in banner.productLeadPicList" :key="index">
          <img :src="item" alt class="gd_bannerimg">
        </mt-swipe-item>
      </mt-swipe>
      <div class="gd_bannernum">
        <span class="bold">{{current_banner}}</span>
        /{{banner.productLeadPicList.length}}
      </div>
    </div>
    <!-- banner end-->
    <!-- title -->
    <div class="gd_title">
      <div class="gd_titles">
        <div class="gd_title_left">
          <div class="title">{{banner.name1}}</div>
          <div class="text">{{banner.name2}}</div>
        </div>
        <!-- <div class="gd_title_price">￥{{banner.price.toString().split(".")[1].length<=1?banner.price+'0':banner.price}}</div> -->
        <div class="gd_title_price">￥{{banner.price}}</div>
      </div>
      <div class="gd_titlsicon">
          <div v-for="(item,index) in gd_titlsicon" :key="index" class="gd_tili">
              <img :src="imgs" alt="" class="gd_tiimg">
              <span>{{item}}</span>
          </div>
      </div>
    </div>
    <!-- title end-->
    <!-- 图文详情 -->
    <div class="gd_imgdetail">
        <img :src="item.imagePath" v-for="(item,index) in details" :key="index" alt="" class="gd_id_img" >
    </div>
    <!-- 图文详情 end-->
    <!-- 倒流 -->
    <div class="gd_down">
        <img :src="logo" alt="" class="gd_downimg">
        <span>小碗健康</span>
        <a class="gd_downbtn" href="https://sj.qq.com/myapp/detail.htm?apkName=com.eayyt.bowlhealth">立即下载</a >
    </div>
    <!-- 倒流 end-->
  </div>
</template>
<script>
const pings='http://47.105.207.216';
import { Swipe, SwipeItem } from "mint-ui";
import axios from 'axios';
import weixinshare from '../../assets/share.js';
import axiosfail from '@/components/http/axiosfail';
import imgs from '@/assets/imgs.png';
import logo from '@/assets/xwlogo.png'
export default {
  name: "Goodsdetail",
  component: {
    Swipe,
    SwipeItem
  },
  data() {
    return {
      banner: {productLeadPicList:[]},
      current_banner: 1 ,//当前banner的序号
      gd_titlsicon:["平台甄选","质量保证","7天无理由退换"],
      details:[],
      imgs,
      logo
    };
  },
  created(){
    var that=this;
    // var productId=window.location.href.split('productId=')[1];
    var productId = this.$route.query.productId;
    // var productId=101;
    console.log(productId,'productId')
    axiosfail(that);
    // axios.get('share/v1/product/shareProduct/101')
    axios.get(process.env.NODE_ENV=== 'production'?(that.pings + '/share/v1/product/shareProduct/'+productId):'/share/v1/product/shareProduct/'+productId)
    .then((res)=>{
      var goodsde=res.data.data.product;
      goodsde.price=goodsde.price.toFixed(2);
      that.banner=goodsde;
      that.details=goodsde.productDescriptionList;

      var imgurl = goodsde.productLeadPicList[0];
      var title = goodsde.name1;
      var desc =goodsde.name2;
      weixinshare(imgurl,title,desc);
    })
  },
  methods: {
    changebanner(e) {
      this.current_banner = e + 1;
    }
  }
};
</script>
<style scoped>
.goodsdetail {
  background: #f3f3f7;
}
.gd_banner {
  width: 100vw;
  height: 100vw;
}
.gd_banner .gd_bannerimg {
  width: 100vw;
  height: 100vw;
}
.gd_bannerdiv {
  position: relative;
}
.gd_bannernum {
  position: absolute;
  right: 0.4rem;
  text-align: right;
  bottom: 0.12rem;
  font-size: 0.34rem;
  color: #666666;
}
.gd_bannernum .bold {
  font-size: 0.38rem;
  font-weight: bold;
  color: #333333;
}
.gd_title {
  background: #fff;
  width: 100%;
  padding: 0.3rem 0.24rem 0;
  box-sizing: border-box;
  color: #333333;
}
.gd_title .gd_titles{
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding-bottom: .24rem;
  border-bottom: 0.01rem solid #f3f3f7;    
  margin-bottom: 0.24rem;
}
.gd_title .title {
  font-size: 0.38rem;
  font-weight: bold;
}
.gd_title .text {
  font-size: 0.28rem;
  color: #666666;
}
.gd_title .gd_title_price {
  color: #333333;
  font-size: 0.4rem;
  /* width: 1.5rem; */
  flex-shrink: 0;
}
.gd_titlsicon{
    display: flex;
    justify-content: space-between;
    font-size: 0.24rem;
    color: #898989;
    padding: 0.1rem 0;
}
.gd_tiimg{
    width: 0.26rem;
    height: 0.26rem;
    margin:  0 .1rem 0 0;
    vertical-align: middle;
}
.gd_imgdetail{
    width: 100vw;
    margin: .2rem 0 0;
    padding: .2rem 0 .98rem 0;
    box-sizing: border-box;
    background: #fff;
}
.gd_imgdetail .gd_id_img{
    display: block;
    width: 100vw;
}
.gd_down{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.98rem;
    background: rgba(0,0,0,0.70);
    z-index: 300;
    font-size: 0.28rem;
    padding: 0 0.32rem;
    box-sizing: border-box;
    color: #fff;
    line-height: .98rem;
}
.gd_down .gd_downimg{
    display: block;
    width: 0.78rem;
    height: 0.78rem;
    margin:.1rem 0.2rem 0 0 ;
    float: left;
}
.gd_down .gd_downbtn{
    float: right;
    width: 1.58rem;
    height: 0.58rem;
    line-height: 0.58rem;
    text-align: center;
    background: #66BB6A;
    border-radius: 0.34rem;
    margin: .2rem 0;
    color: #fff;
}
</style>
