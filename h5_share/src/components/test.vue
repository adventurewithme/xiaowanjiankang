<template>
  <div class="main">
    <!-- <div v-for="(item,index) of list" :key='index' > -->
    <div
      v-for="(item,index) in list"
      :key="index"
    >
    <div v-if="index==indexs" 
      class="test"
      :style="{background:item.color,position:windowflag?'fixed':''}"> 
      <div class="content">
        <img :src="item.img" alt class="img_top">
        <p class="f_black">{{item.rule}}</p>
        <p class="f_gray">{{item.explain}}</p>
        <div class="coms" :style="{marginTop:item.margintop}">
          <p class="mesTit">请输入您的个人信息</p>
          <UserSelectDiv :indexs="indexs" :userinfolist="userinfo"  :color="list[index].color" @windowFlagclick="windowshow"></UserSelectDiv>
          <Window
            :indexs="indexs"
            :color="list[index].color"
            :currentwindows="currentwindows"
            @checklist="checklists"
            v-show="windowflag"
          ></Window>
          <!-- <component :is='UserSelectDivs' :indexs='indexs'></component> -->
        </div>
      </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>
<script>
import bmiTit from "./img/bmiTit.png";
import bmrTit from "./img/bmrTit.png";
import bfrTit from "./img/bfrTit.png";
import waistTit from "./img/waistTit.png";
import waistHei from "./img/waistHei.png";
import adultTit from "./img/adultTit.png";
import childTit from "./img/childTit.png";
import fatTit from "./img/fatTit.png";
import kaluTit from "./img/kaluTit.png";
import tuiTit from "./img/tuiTit.png";
import heartTit from "./img/heartTit.png";
import DaliFood from "./img/DaliFood.png";
import Vue from "vue";
import UserSelectDiv from "./user_select";
import Window from "./window";
// Vue.component(Picker.name, Picker);
export default {
  name: "test",
  data() {
    return {
      windowflag: false,
      list: [
        {
          color: "#EDE1D5",
          img: bmiTit,
          rule:
            "BMI（英文为Body Mass Index，简称BMI），是用体重公斤数除以身高米数平方得出的数字，是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。",
          explain: "*本工具仅适合18~65岁健康成年人（孕妇，运动员除外）",
          margintop: "2.4rem"
        },
        {
          color: "#C0BEDE",
          img: bmrTit,
          rule:
            "基础代谢率（BMR）是指人体在清醒而又极端安静的状态下，不受肌肉活动、环境温度、食物及精神紧张等影响时的能量代谢率。 ",
          explain: "*本工具仅适合18~65岁健康成年人（孕妇，运动员除外）",
          margintop: "1.18rem"
        },
        {
          color: "#E0DDAD",
          img: bfrTit,
          rule:
            "人体内脂肪重量在人体总体重中所占的比例，又称体脂百分数，它反映人体内脂肪含量的多少。",
          explain: "*本工具仅适合18~65岁健康成年人(孕妇，运动员除外)",
          margintop: "1.88rem"
        },
        {
          color: "#BFEEEF",
          img: waistTit,
          rule:
            "腰臀比(Waist-to-Hip Ratio, WHR)是腰围和臀围的比值，是判定中心性肥胖的重要指标。使用测量人的腰臀围比率的方法，是预测一个人是否肥胖和是否面临患心脏病危险的最佳方法，是预测女性生育力的有效线索，是评价女性吸引力的重要尺度。当男性腰臀比大于0.9，女性腰臀比大于0.8，那么即可判定为中心性肥胖。",
          explain: "*本工具仅适合18~65岁健康成年人(孕妇，运动员除外)",
          margintop: ".78rem"
        },
        {
          color: "#DFB5B0",
          img: waistHei,
          rule:
            "腰高比（Waist-to-Height Ratio, WHtR）指腰围和身高的比值，一般在0.5以下。腰高比高往往是老板肚或啤酒肚，表示腹部尤其是内脏有脂肪堆积，如肝、心、肾等。因此高血压、冠心病、心肌梗死、脑卒中及糖尿病等多发于腰高比偏高人群。",
          explain: "*本工具仅适合18~65岁健康成年人(孕妇，运动员除外)",
          margintop: "1.54rem"
        },
        {
          color: "#FADDEA",
          img: adultTit,
          rule:
            "标准体重是反映和衡量一个人健康状况的重要标志之一。过胖和过瘦都不利于健康，也不会给人以健美感。",
          explain: "",
          margintop: "3.72rem"
        },
        {
          //儿童
          color: "#D1E8B2",
          img: childTit,
          rule:
            "人体内脂肪重量在人体总体重中所占的比例，又称体脂百分数，它反映人体内脂肪含量的多少。",
          explain: "*本工具仅适合18~65岁健康成年人(孕妇，运动员除外)",
          margintop: "2.2rem"
        },
        {
          color: "#D9C9BF",
          img: fatTit,
          rule:
            "中心性肥胖又称为腹型肥胖、向心性肥胖，过多的脂肪不仅堆积在皮下，更重要的是堆积在内脏，从而诱发糖尿病等代谢性疾病和心血管疾病。当男人的腰围增加到2尺7寸，即90公分以上，女人的腰围长到2尺5寸，即85公分以上时，就要意识到腰腹部脂肪过于肥厚，使身体的负担加重，对心脏的压力增大，是个临界信号，要引起重视。",
          explain: "*本工具仅适合18~65岁健康成年人(孕妇，运动员除外)",
          margintop: "1.58rem"
        },
        {
          color: "#C4B8CD",
          img: kaluTit,
          rule:
            "人体每天所需要的热量就是人体基础代谢所需要的基本热量，体力活动所需要的热量和消化食物所需要的热量之和，只有清楚地了解到自己每日所需热量，才能更有效的规划健康的，科学的饮食与运动习惯。",
          explain: "*本工具仅适合18~65岁健康成年人(孕妇，运动员除外)",
          margintop: "0"
        },
        {
          color: "#E2CEAE",
          img: tuiTit,
          rule:
            "腿围指的是人体腿部围度的大小，是人体形态指标之一。主要分为大腿围和小腿围两种，它反映人体腿部肌肉发育水平及发达程度。",
          explain: "*本工具仅适合18~65岁健康成年人(孕妇，运动员除外)",
          margintop: "3.9rem"
        },
        {
          color: "#C8E3CC",
          img: heartTit,
          rule:
            "运动心率，即人体在运动时保持的心率状态，不管是有氧运动，还是无氧运动，都有一个合适的心率才能达到较佳的运动效果。保持最佳运动心率对于运动效果和运动安全都很重要。",
          explain: "*本工具仅适合18~65岁健康成年人(孕妇，运动员除外)",
          margintop: "1.12rem"
        },
        {
          color: "#F2D7B6",
          img: DaliFood,
          rule: "数据摘自于中国居民膳食营养素参考摄入量表（DRls2013）",
          explain: "",
          margintop: "4.1rem"
        }
      ],
      indexs: "",
      userinfo: [],
      currentwindows: "",
      title:['体质指数','基础代谢率','体脂率','臀腰比','腰高比','成人标准体重','儿童标准体重','中心性肥胖','每日所需卡路里','女性腿围标准','有氧运动中心','每日膳食营养素'],

    };
  },
  // computed:{
  //   UserSelectDivs(){
  //     return ()=> import ('./user_select')
  //   }
  // },
  components: {
    UserSelectDiv: UserSelectDiv,
    Window: Window
  },
  created: function() {
    var index = this.$route.query.index;
    this.indexs = index;
    document.title=this.title[this.indexs]
  },
  methods: {
    checklists(data) {
      if (data != "closewindow") {
        this.userinfo = data;
      }
      this.windowflag = false;
    },
    windowshow(data) {
      this.windowflag = true;
      this.currentwindows = data;
    }
  }
};
</script>
<style scoped>
.test {
  padding: 1.6rem 0.42rem .4rem;
  box-sizing: border-box;
  min-height: 100vh;
}
.content {
  background: rgba(255, 255, 255, 0.5);
  padding: .1rem 0 .4rem 0;
  box-sizing: border-box;
  text-align: center;
  border-radius:.2rem;
}
.img_top {
  /* position: absolute; */
  margin: -0.82rem auto 0;
  width: 1.32rem;
}
.f_black {
  color: #000;
  font-size: 0.26rem;
  line-height: 0.38rem;
}
.f_gray {
  color: rgba(102, 102, 102, 1);
  font-size: 0.2rem;
  margin: 0.2rem 0 0 0;
}
.mesTit {
  font-size: 0.32rem;
  color: #000;
}
.content > p {
  text-align: left;
  margin: 0 0 0.3rem 0;
  padding: 0 0.42rem;
  box-sizing: border-box;
}
.coms {
  text-align: left;
}
.coms > p {
  padding: 0 0.42rem;
  box-sizing: border-box;
  margin: 0 0 0.2rem 0;
}
</style>

