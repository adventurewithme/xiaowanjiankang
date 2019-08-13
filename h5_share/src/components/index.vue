<template>
  <div class="main" id="main">
    <p class="f12">家家必备健康“小工具”，小细节也能成就“大健康”！</p>
    <div class="list">
      <div
        v-for="(item,index) of list"
        :key="index"
        class="li flipInY animated"
        :id="item.index"
        :class="(bendi[index]!=null&&bendi[index]!='')?'have':''"
        :style="{animationDuration:index*0.4+'s',background:(bendi[index]!=null&&bendi[index]!='')?color[index]:''}"
        @click="toCalculation(index)"
      >
        <div class="li_c">
          <img :src="(bendi[index]!=null&&bendi[index]!='')?item.imgs:item.img" alt />
        </div>
        <p class="name">{{item.name}}</p>
        <!-- <p>{{index}}</p> -->
        <p class="result" :style="{'font-size':(index==9||index==10)?'.24rem':''}">{{bendi[index]}}</p>
        <p class="resulttext">{{benditext[index]}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "weixin-js-sdk";
import bmiIcon from "./img/bmiIcon.png";
import bmiIcons from "./img/bmiXiao.png";
import bmrIcon from "./img/bmrIcon.png";
import bmrIcons from "./img/bmrXiao.png";
import bfrIcon from "./img/bfrIcon.png";
import bfrIcons from "./img/bfrXiao.png";
import whr from "./img/whr.png";
import whrs from "./img/whrXiao.png";
import whtr from "./img/whtr.png";
import whtrs from "./img/whtrXiao.png";
import adlutW from "./img/adlutW.png";
import adlutWs from "./img/adlutWXiao.png";
import childW from "./img/childW.png";
// import childWs from './';
import centerO from "./img/centerO.png";
import centerOs from "./img/centerOXiao.png";
import kalu from "./img/kalu.png";
import kalus from "./img/kaluXiao.png";
import womenW from "./img/womenW.png";
import womenWs from "./img/womenWXiao.png";
import heart from "./img/heart.png";
import hearts from "./img/heartXiao.png";
import foodIcon from "./img/foodIcon.png";
import vip from "./img/vip.jpg";
// import foodIcons  from './';
import "../assets/animate.css";
import axios from "axios";

import weixinshare from "../assets/share.js";
import axiosfail from '@/components/http/axiosfail';

export default {
  name: "index",
  data() {
    return {
      list: [
        {
          img: bmiIcon,
          name: "体质指数",
          result: "",
          resulttext: "",
          background: "",
          imgs: bmiIcons
        },
        {
          img: bmrIcon,
          imgs: bmrIcons,
          name: "基础代谢率",
          result: "",
          resulttext: ""
        },
        {
          img: bfrIcon,
          imgs: bfrIcons,
          name: "体脂率",
          result: "",
          resulttext: ""
        },
        {
          img: whr,
          imgs: whrs,
          name: "腰臀比",
          result: "",
          resulttext: ""
        },
        {
          img: whtr,
          imgs: whtrs,
          name: "腰高比",
          result: "",
          resulttext: ""
        },
        {
          img: adlutW,
          imgs: adlutWs,
          name: "成人标准体重",
          result: "",
          resulttext: ""
        },
        {
          img: childW,
          name: "儿童标准体重",
          result: "",
          resulttext: ""
        },
        {
          img: centerO,
          imgs: centerOs,
          name: "中心性肥胖",
          result: "",
          resulttext: ""
        },
        {
          img: kalu,
          imgs: kalus,
          name: "每日所需卡路里",
          result: "",
          resulttext: ""
        },
        {
          img: womenW,
          imgs: womenWs,
          name: "女性腿围标准",
          result: "",
          resulttext: ""
        },
        {
          img: heart,
          imgs: hearts,
          name: "有氧运动心率",
          result: "",
          resulttext: ""
        },
        {
          img: foodIcon,
          name: "每日膳食营养素",
          result: "",
          resulttext: ""
        }
      ],
      color: [
        "#E1CBB4",
        "#C0BEDE",
        "#DAD589",
        "#9BDEDF",
        "#DEA39C",
        "#F6C6DB",
        "",
        "#CABBB2",
        "#AB9FB4",
        "#DBBB8A",
        "#B0E1B7",
        ""
      ],
      bendi: [],
      benditext: []
    };
  },
  created() {
    this.getbendi();
    document.title = "健康指标";
    var imgurl = "https://xiaowan-image.oss-cn-beijing.aliyuncs.com/wxfx.png";
    var title = "健康小工具 轻松测出您的健康";
    var desc = "家家必备健康“小工具”，小细节也能成就“大健康”！";
    weixinshare(imgurl, title, desc);
  },
  methods: {
    userinfo(token) {
      var user = "";
      const that = this;
      // var token = "memberSession_871c05d2ef854e4fb01fb6c2b3f75969";
      axios.defaults.headers.common["token"] = token;
     
    axiosfail(that);
      
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? that.pings + "/share/v1/tool/baseInfo/"
            : "/share/v1/tool/baseInfo/"
        )
        .then(res => {
          if (res.data.code == 200) {
            var usernum = res.data.data;
            that.bendi[0] = usernum.bmi;
            // that.bendi.splice(0, 0, usernum.bmi);
            that.bendi[1] = usernum.bmr;
            that.bendi[2] = usernum.bod;
            that.bendi[8] = usernum.goal;
            if (usernum.bmi < 18) {
              that.benditext[0] = "偏瘦";
            } else if (usernum.bmi >= 18 && usernum.bmi <= 24) {
              that.benditext[0] = "标准";
            } else if (usernum.bmi > 24 && usernum.bmi <= 28) {
              that.benditext[0] = "超重";
            } else {
              that.benditext[0] = "肥胖";
            }
            that.$forceUpdate();
          }
        });
    },
    toCalculation(index) {
      if (index == 6) {
        this.$router.push({ path: "/child" });
      } else {
        this.$router.push({ path: "/test", query: { index: index } });
      }
    },
    getbendi() {
      var bendi = [],
        benditext = [];
      var token = this.$route.query.token; //from 要修改为从app端携带来的参数
      //  var token = "memberSession_560c142e71f24cf7bb6558a24cc9079b";
      // var token = window.location.href.split("token=")[1];
      for (var i = 0; i < this.list.length; i++) {
        bendi[i] = localStorage.getItem("userready" + i);
        benditext[i] = localStorage.getItem("usertext" + i);
        this.bendi[i] = bendi[i];
        this.benditext[i] = benditext[i];
      }
      if (token) {
        this.userinfo(token);
      }
    }
  }
};
</script>
<style scoped>
.main {
  background: #f5f5f5;
  height: 100vh;
  min-height: 14.34rem;
  padding: 1.16rem 0.3rem 0;
  box-sizing: border-box;
}
.f12 {
  font-size: 0.24rem;
  color: rgba(155, 155, 155, 1);
  text-align: center;
  line-height: 0.34rem;
  padding: 0.5rem 0 0.74rem;
}
.list {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  padding-bottom: 0.5rem;
  box-sizing: border-box;
}
.list .li {
  width: 2.16rem;
  height: 2.48rem;
  background: #fff;
  border-radius: 0.2rem;
  margin-bottom: 0.25rem;
  font-size: 0.28rem;
  text-align: center;
}
.list .li:not(:nth-child(3n)) {
  margin-right: 0.2rem;
}
.list .li img {
  /* width: .56rem; */
  transform: translate(-50%, -50%) scale(0.3);
  position: absolute;
  left: 50%;
  top: 50%;
  /* margin: .4rem auto 0; */
}
.have {
  color: #fff;
}
.li_c {
  height: 1.82rem;
  position: relative;
}
.have .li_c {
  height: 1rem;
}
.result {
  font-size: 0.4rem;
  margin: 0.1rem 0 0;
  height: 0.48rem;
  line-height: 0.48rem;
}
</style>

