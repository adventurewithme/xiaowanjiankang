<template>
  <div class="hot">
    <div class="wechat">
      <div class="h_fahter">
        <div class="h_banner">
          <img :src="banner.topPic" class="hb_img" alt />
        </div>
        <div class="h_main">
          <div class="hm_top">
            <span class="hmt_left">{{banner.spcialDescribe}}</span>
            <span>共{{banner.total}}个视频</span>
          </div>
          <div class="hm_flag">{{banner.subhead}}</div>
          <div class="hm_text">{{banner.spcialDescribe}}</div>
        </div>
        <div class="h_imglist">
          <div class="hi_img" v-for="(item,index) in imglist" :key="index">
            <img :src="item.vedioPicBig" alt @click="windowshow" />
          </div>
        </div>
      </div>
      <div class="h_window" :hidden="hide">
        <div class="hw_content">
          <div class="text">
            <span>1.点击右上角</span>
            <img src="@/assets/dots.png" alt />
          </div>
          <div class="text top66">2.选择在浏览器中打开</div>
          <img :src="phonetype=='ios'?ios:android" alt class="hw_share" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ios from "@/assets/ios.png";
import android from "@/assets/android.png";
import axios from "axios";
import { constants } from "fs";
import axiosfail from '@/components/http/axiosfail';
export default {
  name: "Hot",
  data() {
    return {
      phonetype: "",
      hide: true,
      android,
      ios,
      banner: [],
      imglist: []
    };
  },
  created() {
    var that=this;
    axiosfail(that);
    this.getxitong();
    this.getphonetype();
    this.geturldata();
  },
  methods: {
    getxitong() {
      var u = navigator.appVersion;
      var wx =
        u.match(/MicroMessenger/i) &&
        u
          .match(/MicroMessenger/i)
          .toString()
          .toLowerCase() == "micromessenger";
      if (!wx) {
        window.location.href =
          "https://sj.qq.com/myapp/detail.htm?apkName=com.eayyt.bowlhealth";
      }
    },
    getphonetype() {
      var u = navigator.userAgent,
        that = this,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        console.log("安卓机！");
        that.phonetype = "android";
      }
      if (isIOS) {
        console.log("苹果果机！");
        that.phonetype = "ios";
      }
    },
    windowshow() {
      var that = this;
      that.hide = false;
    },
    geturldata() {
      var findSpcialId = this.$route.query.findSpcialId,
        that = this;
      axios
        .get(
          process.env.NODE_ENV === "production"
            ? that.pings + "/share/v1/findspcial/" + findSpcialId
            : "/share/v1/findspcial/" + findSpcialId
        )
        .then(res => {
          that.banner = res.data.data.findSpcial;
          that.imglist = res.data.data.vedioList;
          console.log(that.banner);
        });
    }
  }
};
</script>

<style scoped>
.hot .hb_img {
  width: 100vw;
  height: 4rem;
}
.h_main {
  padding: 0.3rem 0.3rem 0.2rem;
  box-sizing: border-box;
  color: #999999;
  font-size: 0.24rem;
}
.h_main .hm_top {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}
.h_main .hm_top .hmt_left {
  font-size: 0.32rem;
  color: #333333;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 40%,
    rgba(124, 239, 142, 1)
  );
}
.hm_flag {
  font-size: 0.28rem;
  color: #666666;
  line-height: 0.4rem;
  margin: 0.08rem 0 0.12rem 0;
}
.hm_text {
  font-size: 0.28rem;
  line-height: 0.4rem;
}
.h_imglist {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
}
.h_imglist .hi_img {
  width: 2.46rem;
  height: 3.3rem;
  flex-shrink: 0;
  -webkit-flex-shrink: 0;
  margin-bottom: 0.06rem;
}
.h_imglist .hi_img:nth-child(3n + 2) {
  margin: 0 0.06rem 0.06rem;
}
.h_imglist .hi_img > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.h_window {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  color: #fff;
  font-size: 0.32rem;
  padding: 0 0 0 0.3rem;
  box-sizing: border-box;
}
.h_window .text {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}
.h_window .text > img {
  width: 0.48rem;
  height: 0.12rem;
  flex-shrink: 0;
  -webkit-flex-shrink: 0;
  margin: 0 0 0 0.2rem;
}
.h_window .hw_share {
  width: 100%;
}
.h_window .hw_content {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.top66 {
  margin-top: 0.66rem;
}
</style>
