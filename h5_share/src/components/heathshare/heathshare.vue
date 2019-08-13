<template>
  <div class="Heathshare">
    <!-- 用户信息 -->
    <div class="user_info" :style="{background:'url('+bg+')',backgroundSize:'100% 100%'}">
      <div class="download">
        <img :src="logo" alt>
        <span>小碗健康</span>
        <a href="https://sj.qq.com/myapp/detail.htm?apkName=com.eayyt.bowlhealth">立即下载</a>
      </div>
      <div class="userinfo_conent">
        <img :src="userinfo.userPic" alt>
        <p class="name">{{userinfo.userName}}</p>
        <p class="fangan">{{userinfo.energyRelationship}}</p>
      </div>
    </div>
    <!-- 用户信息 end-->
    <!-- 饮食建议 -->
    <div class="dietary_suggesstion">
      <!-- top -->
      <div class="top">
        <div class="relationship">
          <div class="long">摄入{{userinfo.energyChar}}消耗</div>
          <div class="squre">
            <span>能量关系</span>
          </div>
        </div>
        <div class="gap">
          <div class="squre">
            <span>能量缺口</span>
          </div>
          <div class="long">{{userinfo.energyGap}}千卡</div>
        </div>
      </div>
      <!-- top end -->
      <!-- 饮食建议模块 -->
      <div class="dietary_title">
        <img :src="left" alt>
        <span>饮食建议</span>
        <img :src="right" alt>
      </div>

      <div class="dietary">
        <div class="echart">
          <div class="left" id="main" style="width:2.2rem;height:2.2rem;"></div>
          <div class="right">
            <div>
              <span class="green"></span>
              <span>碳水化合物</span>
              <span>{{Math.floor(userinfo.eatCommand.choPercentage*100)}}%</span>
            </div>
            <div>
              <span class="yellow"></span>
              <span>蛋白质</span>
               <span>{{Math.floor(userinfo.eatCommand.proteinPercentage*100)}}%</span>
            </div>
            <div>
              <span class="orange"></span>
              <span>脂肪</span>
               <span>{{Math.floor(userinfo.eatCommand.fatPercentage*100)}}%</span>
            </div>
          </div>
        </div>
        <p class="explain">
          <span>说明：三大产能营养素的建议摄入比例并不是固定值，碳水化合物50%～60%，蛋白质15%～25%，脂肪20%～30%的比例都是正常的。</span>
        </p>
        <div class="day_suggess">
          <p class="su_p">每日摄入量建议</p>
          <div class="day_table">
            <div class="day_li">
              <span>碳水化合物</span>
              <span>{{userinfo.eatCommand.choWeight}}</span>
            </div>
            <div class="day_li">
              <span>蛋白质</span>
              <span>{{userinfo.eatCommand.proWeight}}</span>
            </div>
            <div class="day_li">
              <span>脂肪</span>
              <span>{{userinfo.eatCommand.fatWeight}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 饮食建议模块 end -->
    </div>
    <!-- 饮食建议 end-->
    <!-- 运动步骤 -->
    <div class="dietary_title motion_titles">
      <img :src="left" alt>
      <span>运动·步骤</span>
      <img :src="right" alt>
    </div>
    <div class="motion_main">
      <div class="motion">
        <div class="motion_warm">
          <div class="title_icon">
            <img :src="icon_origen" alt class="icon_m">
            <span>热身运动</span>
          </div>
          <div class="motion_b">
            <div class="motion_conent">
              <div class="motion_li">
                <div class="motion_li_img">
                  <img
                    :src="userinfo.sportCommand.warmUp.icon"
                    alt
                  >
                </div>
              </div>
            </div>
            <div class="motion_text">
              <p>时长：{{userinfo.sportCommand.warmUp.timeLength}}</p>
              <p>目的：{{userinfo.sportCommand.warmUp.discript}}</p>
            </div>
          </div>
        </div>
        <div class="motion_power">
          <div class="title_icon">
            <img :src="icon_red" alt class="icon_m">
            <span>力量训练</span>
          </div>
          <div class="motion_b">
            <div class="motion_conent">
              <div class="motion_li">
                <div class="motion_li_img">
                  <img :src="leg" alt>
                </div>
                <div class="motion_position">
                  <div>腿</div>
                </div>
              </div>
              <div class="motion_li">
                <div class="motion_li_img">
                  <img :src="bird" alt>
                </div>
                <div class="motion_position">
                  <div>胸</div>
                </div>
              </div>
              <div class="motion_li">
                <div class="motion_li_img">
                  <img :src="back" alt>
                </div>
                <div class="motion_position">
                  <div>背</div>
                </div>
              </div>
            </div>
            <div class="motion_text">
              <p>时长：{{userinfo.sportCommand.strength.timeLength}}</p>
              <p>{{userinfo.sportCommand.strength.discript}}</p>
            </div>
          </div>
        </div>
        <div class="motion_oxygen">
          <div class="title_icon">
            <img :src="icon_blue" alt class="icon_m">
            <span>有氧运动</span>
          </div>
          <div class="motion_b">
            <div class="motion_conent">
              <div class="motion_li">
                <div class="motion_li_img">
                  <img :src="run" alt>
                </div>
                <div class="motion_position">椭圆仪</div>
              </div>
              <div class="motion_li">
                <div class="motion_li_img">
                  <img :src="bycircle" alt>
                </div>
                <div class="motion_position">单车</div>
              </div>
              <div class="motion_li">
                <div class="motion_li_img">
                  <img :src="mountion" alt>
                </div>
                <div class="motion_position">登山机</div>
              </div>
              <div class="motion_li">
                <div class="motion_li_img">
                  <img :src="ship" alt>
                </div>
                <div class="motion_position">划船机</div>
              </div>
            </div>
            <div class="motion_text">
              <p>时长：{{userinfo.sportCommand.aerobic.timeLength}}</p>
              <p>{{userinfo.sportCommand.aerobic.discript}}</p>
            </div>
          </div>
        </div>
        <div class="motion_stretching">
          <div class="title_icon">
            <img :src="icon_green" alt class="icon_m">
            <span>拉伸运动</span>
          </div>
          <div class="motion_b">
            <div class="motion_conent">
              <div class="motion_li">
                <div class="motion_li_img">
                  <img
                    :src="userinfo.sportCommand.strech.icon"
                    alt
                  >
                </div>
              </div>
            </div>
            <div class="motion_text">
              <p>时长：{{userinfo.sportCommand.strech.timeLength}}</p>
              <p>目的：{{userinfo.sportCommand.strech.discript}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logo from "../../assets/logo.png";
import user from "../../assets/user.png";
import left from "../../assets/left.png";
import right from "../../assets/right.png";
import icon_origen from "../../assets/icon_origen.png";
import icon_red from "../../assets/icon_red.png";
import leg from "../../assets/leg.png";
import back from "../../assets/back.png";
import bird from "../../assets/bird.png";
import icon_blue from "../../assets/icon_blue.png";
import run from "../../assets/run.png";
import bycircle from "../../assets/bycircle.png";
import mountion from "../../assets/mountion.png";
import ship from "../../assets/ship.png";
import icon_green from "../../assets/icon_green.png";
import bg from '../../assets/bg.png';
import echarts from "echarts";
import axios from 'axios';
import weixinshare from '../../assets/share.js';
import axiosfail from '@/components/http/axiosfail';
const pings='http://47.105.207.216';
export default {
  name: "Heathshare",
  data() {
    return {
      logo,
      user,
      left,
      right,
      icon_origen,
      icon_red,
      leg,
      back,
      bird,
      icon_blue,
      ship,
      mountion,
      bycircle,
      run,
      icon_green,
      bg,
      charts: "",
      userinfo: {
        eatCommand:{},
        energy: 121,
        precent: ["22", "33", "45"],
        daykg: ["33", "66", "99"],
        sportCommand:{aerobic:{},strech:{},strength:{},warmUp:{}}
      }
    };
  },
  created(){
    // var planId=this.$route.query.planId;
    // var planId=window.location.href.split('planId=')[1];
    var planId = this.$route.query.planId; 
    // var planId=15245397;
    const that=this;
    // axios.get('/share/v1/health/plan/'+planId)
    
axiosfail(that);
    axios.get(process.env.NODE_ENV=== 'production'?(that.pings +'/share/v1/health/plan/'+planId):'/share/v1/health/plan/'+planId)
    .then((res)=>{
      console.log(res.data)
      that.userinfo=res.data.data;

       var imgurl ='https://xiaowan-image.oss-cn-beijing.aliyuncs.com/logo.png';
      var title = res.data.data.userName+'#分享的'+ res.data.data.energyRelationship;
      var desc ='小碗健康-小小一碗，多多健康';
      weixinshare(imgurl,title,desc);


      // that.userinfo=JSON.parse(JSON.stringify(res.data.data));
      this.$nextTick(function() {
        this.drawPie("main");
      });
    })
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      var that=this;
      console.log(that.userinfo.eatCommand.choWeight)
      var option = {
        calculable: false,
        backgroundColor: "#fff",
        color: ["#63CB68", "#FDCB14", "#F98200"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["80%", "100%"],
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: "#fff",
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: "center",
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              }
            },
            data: [
              { value:that.userinfo.eatCommand.choWeight, name: "碳水化合物" },
              { value: that.userinfo.eatCommand.proWeight, name: "蛋白质" },
              { value: that.userinfo.eatCommand.fatWeight, name: "脂肪" }
            ]
          }
        ]
      };
      this.charts.setOption(option);
    }
  }
};
</script>
<style scoped>

/* userinfo */
.user_info {
  width: 100vw;
  height: 5.08rem;
  /* background-image: url("~../../assets/bg.png"); */
  background-size: 100% 100%;
  color: #fff;

  font-size: 0.28rem;
}
.user_info .download {
  height: 0.88rem;
  width: 100vw;
  background: rgba(0, 0, 0, 0.1382);
  padding: 0 0.4rem;
  box-sizing: border-box;
  line-height: 0.88rem;
}
.download > img {
  width: 0.68rem;
  float: left;
  margin: 0.1rem 0.12rem 0 0;
}
.download > a {
  width: 1.58rem;
  height: 0.58rem;
  border-radius: 0.3rem;
  background: #27c553;
  float: right;
  color: #fff;
  line-height: 0.58rem;
  text-align: center;
  margin: 0.16rem 0 0;
}
.user_info .userinfo_conent {
  text-align: center;
  /* padding: 1.4rem 0 0; */
  padding: 0.52rem 0 0;
  box-sizing: border-box;
}
.user_info .userinfo_conent > img {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 100%;

}
.user_info .userinfo_conent .name {
  font-size: 0.36rem;
  margin: 0.16rem 0 0 0;
  line-height: 0.5rem;
}
.user_info .userinfo_conent .fangan {
  font-size: 0.28rem;
  line-height: 0.4rem;
}
/* 饮食建议 */
/* top */
.top {
  color: #fff;
  padding: 0 0.54rem 0 0.56rem;
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  height: 1.9rem;
  justify-content: space-around;
  -webkit-justify-content: space-around;
}
.top > div {
  width: 3.08rem;
  position: relative;
  overflow: hidden;
}
.top .relationship .long {
  background: linear-gradient(
    270deg,
    rgba(1, 186, 254, 1) 0%,
    rgba(205, 241, 255, 0.2) 100%
  );
}

.gap .long {
  background: linear-gradient(
    270deg,
    rgba(255, 219, 201, 0.2) 0%,
    rgba(255, 130, 68, 1) 100%
  );
  float: right;
}

.top .long {
  width: 2.62rem;
  height: 0.98rem;
  border-radius: 0.2rem;
  margin: 0.4rem 0;
  font-size: 0.28rem;
  line-height: 0.98rem;
}
.top .squre {
  width: 1.28rem;
  height: 1.28rem;
  position: relative;
  box-shadow: 0px 0px 10px 0px rgba(65, 176, 84, 0.2);
  background: #fff;
  border-radius: 0.08rem;
  position: absolute;
  top: 0.24rem;
  transform: rotate(45deg);
  font-size: 0.26rem;
}
.relationship .squre::after {
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  content: "";
  background: #01bafe;
  left: 0.04rem;
  top: 0.04rem;
  border-radius: 0.08rem;
}
.gap .squre::after {
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  content: "";
  background: #ff8244;
  left: 0.04rem;
  top: 0.04rem;
  border-radius: 0.08rem;
}
.relationship .squre {
  left: 2.02rem;
}
.gap .squre {
  right: 2.02rem;
}
.relationship .long {
  color: #019cd5;
  text-indent: 0.32rem;
}
.gap .long {
  color: #d36d3b;
  text-indent: 0.96rem;
}
.top .squre > span {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 0.32rem;
  display: inline-block;
  transform: rotate(315deg);
  left: 0.48rem;
  top: -0.1rem;
}
/* top end */
/* 饮食建议模块 */
.dietary {
  padding: 1.1rem 0.46rem 0.6rem 0.46rem;
  box-sizing: border-box;
  background: url("../../assets/dietary_bg.png") no-repeat;
  background-size: 7.3rem auto;
  background-position: center;
}
.dietary_title {
  padding: 0 0.56rem;
  box-sizing: border-box;
  font-size: 0.32rem;
  text-align: center;
  margin: 0.7rem 0 0.4rem 0;
}
.dietary_title > img {
  width: 2.16rem;
}
.dietary_title > img:first-child {
  float: left;
}
.dietary_title > img:last-child {
  float: right;
}
.echart {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  padding: 0 0.14rem 0 0.16rem;
  box-sizing: border-box;
}
.echart .left {
  flex-shrink: 0;
  -webkit-flex-shrink: 0;
  margin: 0.12rem 0 0;
}
.echart .right {
  width: 3.44rem;
  font-size: 0.24rem;
  color: #333;
}
.echart .right > div {
  line-height: 0.82rem;
}
.echart .right > div > span:first-child {
  width: 0.2rem;
  height: 0.2rem;
  display: inline-block;
  margin: 0.32rem 0.2rem 0 0;
  float: left;
}
.echart .right > div .green {
  background: #63cb68;
}
.echart .right > div .yellow {
  background: #fdcb14;
}
.echart .right > div .orange {
  background: #f98200;
}
.echart .right > div > span:last-child {
  float: right;
}
.dietary .explain {
  font-size: 0.2rem;
  color: #999999;
  line-height: 0.28rem;
  margin: 0.28rem 0 0;
}
.dietary .explain > span {
  /* transform: scale(0.833);
    display: inline-block; */
}
.dietary .day_suggess {
  margin: 0.38rem 0 0;
}
.day_suggess .su_p {
  color: #333;
  font-size: 0.32rem;
  line-height: 0.8rem;
  font-weight: bold;
}
.day_suggess .day_table .day_li {
  height: 1rem;
  font-size: 0.28rem;
  line-height: 1rem;
  color: #333333;
  background: #f0faf0;
  padding: 0 0.4rem;
  box-sizing: border-box;
}
.day_suggess .day_table .day_li > span:last-child {
  float: right;
}
.day_suggess .day_table .day_li:nth-child(2n) {
  background: #e0f5e1;
}

/* 饮食建议模块end */
/* 运动建议模块 */
.motion > div {
  margin: 0.56rem 0 0 0;
  padding: 0 0.34rem;
  box-sizing: border-box;
  position: relative;
}
.motion .motion_warm::after {
  position: absolute;
  content: "";
  left: 0.64rem;
  top: 0.68rem;
  width: 1px;
  height: 100%;
  background: linear-gradient(#ffd979 0%, #ff3366 100%);
}
.motion > div .title_icon {
  height: 0.68rem;
  line-height: 0.68rem;
  font-size: 0.32rem;
}

.motion > div .title_icon .icon_m {
  width: 0.7rem;
  float: left;
  margin: 0 0.2rem 0 0;
}
.motion > div .title_icon .icon_q {
  width: 0.32rem;
  float: right;
  margin: 0.18rem 0;
}
.motion_b {
  margin: 0.16rem 0 0 0.8rem;
}
.motion_conent {
  display: flex;
  display: -webkit-flex;
}
.motion_conent .motion_li {
  flex: 1;
  -webkit-flex: 1;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(65, 176, 84, 0.2);
  border-radius: 0.08rem;
}
.motion_li_img {
  width: 100%;
  text-align: center;
}
.motion_warm .motion_li_img > img {
  width: 2.38rem;
  height: 2.6rem;
  margin: 0.82rem auto;
  display: block;
}
.motion_power .motion_li .motion_li_img > img {
  width: 1.96rem;
  display: block;
}
.motion_power .motion_li:not(:first-child) {
  margin: 0 0 0 0.1rem;
}
.motion_text {
  font-size: 0.24rem;
  line-height: 0.34rem;
  margin: 0.3rem 0 0.14rem 0;
}
.motion_position {
  height: 0.72rem;
  background: #01bafe;
  margin: 0.28rem 0 0;
  position: relative;
}
.motion_power .motion_li {
  border-radius: 0.08rem;
  overflow: hidden;
}
.motion_position > div {
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 100%;
  border: 1px solid #019cd5;
  background: #ffffff;
  top: -0.28rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  line-height: 0.6rem;
  font-size: 0.28rem;
}
.motion .motion_power::after {
  position: absolute;
  content: "";
  left: 0.64rem;
  top: 0.68rem;
  width: 1px;
  height: 100%;
  background: linear-gradient(#ff3366 0%, #9dbffb 100%);
}
.motion_oxygen .motion_li .motion_li_img > img {
  width: 2.96rem;
  display: block;
}
.motion_oxygen .motion_conent {
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
}
.motion_oxygen .motion_li .motion_position {
  height: 0.84rem;
  line-height: 0.84rem;
  color: #fff;
  margin: 0;
  font-size: 0.24rem;
  text-align: center;
  border-radius: 0 0 0.08rem 0.08rem;
}
.motion_oxygen .motion_li:nth-child(2n) {
  margin-left: 0.18rem;
  overflow: hidden;
}
.motion_oxygen .motion_li {
  margin-bottom: 0.18rem;
  width: 3.48rem;
}

.motion_oxygen .motion_text {
  margin: 0.12rem 0 0.14rem 0;
}
.motion .motion_oxygen::after {
  position: absolute;
  content: "";
  left: 0.64rem;
  top: 0.68rem;
  width: 1px;
  height: 100%;
  background: linear-gradient(#9dbffb 0%, #a6f047 100%);
}
.motion_stretching .motion_li .motion_li_img > img {
  width: 2.22rem;
  margin: 0.78rem auto;
  display: block;
}
.motion .motion_stretching::after {
  position: absolute;
  content: "";
  left: 0.64rem;
  top: 0.68rem;
  width: 1px;
  height: 80%;
  background: linear-gradient(#a6f047 0%, #666666 100%);
}
.motion_titles {
  margin: 0.3rem 0 0.2rem 0;
}
.motion_main {
  background: url("../../assets/motion_bg.png") no-repeat;
  background-size: 7.24rem auto;
  background-position: top center;
  padding: 0.24rem 0 0;
  box-sizing: border-box;
}
.motion .motion_stretching {
  padding: 0 0.34rem 0.94rem 0.34rem;
}

/* 运动建议模块end */
/* 二维码 */
.code {
  text-align: center;
  font-size: 0.24rem;
  color: #333;
}
.code img {
  width: 2.2rem;
  margin: 0.42rem 0 0;
}
.code .t_green {
  color: #41b054;
  margin: 0.2rem 0 0;
  line-height: 0.7rem;
  position: relative;
}
.code .t_green::after,
.code .t_green::before {
  position: absolute;
  content: "";
  width: 0.6rem;
  height: 1px;
  background: linear-gradient(
    270deg,
    rgba(43, 201, 155, 1) 0%,
    rgba(58, 233, 124, 1) 100%
  );
  right: 2.42rem;
  top: 0.34rem;
}
.code .t_green::before {
  left: 2.42rem;
}
/* 二维码 end*/
</style>
