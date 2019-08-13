<template>
  <div class="result" :style="{background:color}">
    <div class="info" v-if="indexs<9||indexs==10">
      <div v-for="(i,index) in showlist" :key="index">
        <img :src="i.logo" alt class="logo">
        <p class="p1">{{i.p1}}</p>
        <p class="num">{{i.num}}</p>
        <p class="p2">{{i.p2}}</p>
        <img :src="i.img" alt class="styleimg">
        <p class="p3">{{i.p3}}</p>
      </div>
      <div class="recompute"  :style="{background:color}" @click="recompute">重新计算</div>
    </div>
    <div class="info" v-else-if="indexs==9">
      <div v-for="(i,index) in tuilist" :key="index">
        <img :src="i.logo" alt class="logo">
        <p class="p1">{{i.p1}}</p>
        <div class="tuinum">
          <div class="left">
            <div class="num">{{i.datui}}</div>
            <div class="p2">(大腿围)</div>
          </div>
          <div class="right">
            <div class="num">{{i.xiaotui}}</div>
            <div class="p2">(小腿围)</div>
          </div>
        </div>
        <div class="tuimiao">
          <div class="left">大腿围达标值：</div>
          <div class="right">46≤大腿围≤60 最合适的大腿腿围 大腿围&lt;46cm时，患心脏病的几率会增加2倍 大腿围 >60cm时，肥胖的几率会明显增加</div>
        </div>
        <div class="tuimiao">
          <div class="left">小腿围达标值：</div>
          <div class="right">小腿围≥ 33cm 最合适的小腿腿围 小腿围&lt;33cm时，患中风的风险相对增高</div>
        </div>
      </div>
      <div class="recompute"   :style="{background:color}" @click="recompute">重新计算</div>
    </div>
    <div class="info" v-else-if="indexs==11">
      <div v-for="(i,index) in foodlist" :key="index">
        <img :src="i.logo" alt class="logo">
        <p class="p1">{{i.p1}}</p>
        <p class="pDes">RNI/推荐摄入量</p>
        <p class="pDes pDes2">AI/适宜摄入量 &nbsp;</p>
        <p class="pDes pDes2">AMDR/宏量营养素可接受范围</p>

        <ul class="foodlist">
          <li v-for="(i,index) in foodlist[0].lileft" :key="index" :style="{background:index%2==0?'#F2D7B6':''}">
            <span class="left">{{i}}</span>
            <span class="right">{{foodlist[0].rightlist[index]}}</span>
          </li>
        </ul>
      </div>
      <div class="recompute"  :style="{background:color}"  @click="recompute">重新计算</div>
    </div>
  </div>
</template>
<script>
import logo0 from "./img/bmiTit.png";
import logo1 from "./img/bmrTit.png";
import logo2 from "./img/bfrTit.png";
import logo3 from "./img/waistTit.png";
import logo4 from "./img/waistHei.png";
import logo5 from "./img/adultTit.png";
import logo7 from "./img/fatTit.png";
import logo8 from "./img/kaluTit.png";
import logo9 from "./img/tuiTit.png";
import logo10 from "./img/heartTit.png";
import logo11 from "./img/DaliFood.png";
import goddess from "./img/goddess.gif";
import heathy from "./img/heathy.gif";
import fatNv from "./img/fatNv.gif";
import silly from "./img/silly.gif";
import ku from "./img/ku.gif";
import fatNan from "./img/fatNan.gif";
export default {
  // props:["indexs","color","usersitelist"],
  data() {
    return {
      indexs: "",
      color: "",
      usersitelist: [],
      showlist: [
        {
          p1: "",
          num: "",
          p2: "",
          img: "",
          p3: "",
          logo: ""
        }
      ], //展示信息
      userready:[],
      tuilist: [{ logo: "" }],
      foodlist: [
        {
          lileft: [
            "每日所需能量(kcal)(E)",
            "总碳水化合物(%E)",
            "总脂肪(%E)",
            "蛋白质(g/d)",
            "钙(mg/d)",
            "铁(mg/d)","锌(µg/d)","钾(mg/d)","钠(mg/d)","镁(mg/d)","磷(mg/d)","硒(µg/d)","氯(mg/d)","碘(µg/d)","铜(mg/d)","锰(mg/d)","维生素A(µg RAE/d)","维生素C(mg/d)","维生素D(µg/d)",
            "维生素B1(mg/d)","维生素B2(mg/d)","维生素B3(mg NE/d)","维生素B5(mg/d)","维生素B6(mg/d) ","维生素B12(µg/d)","维生素E(mgα— TE/d)","维生素K(µg/d) ","叶酸(µg DFE/d)","胆碱(mg/d)"
          ],
          rightlist:[]
        }
      ]
    };
  },
  created: function() {
    this.getParams();
    this.userready=localStorage.getItem('userready');
    
  },
  methods: {
    getParams() {
      this.indexs = this.$route.query.indexs;
      this.color = this.$route.query.color;
      this.usersitelist = this.$route.params.usersitelist;
      this.computes(this.$route.params.usersitelist);
    },
    bfrcompute(sex, result, age) {
      console.log(sex, result, age, "brf");
      var p2text;
      if (sex == "男") {
        if (result >= 5 && result < 11) {
          p2text = "(偏瘦)";
        } else if (result >= 11 && result < 12) {
          if (age >= 18 && age <= 39) {
            p2text = "(标准)";
          } else {
            p2text = "(偏瘦)";
          }
        } else if (result >= 12 && result < 14) {
          if (age >= 60) {
            p2text = "(偏瘦)";
          } else {
            p2text = "(标准)";
          }
        } else if (result >= 14 && result < 22) {
          p2text = "(标准)";
        } else if (result >= 22 && result < 23) {
          if (age >= 18 && age <= 39) {
            p2text = "(超重)";
          } else {
            p2text = "(标准)";
          }
        } else if (result >= 23 && result < 25) {
          if (age >= 60) {
            p2text = "(标准)";
          } else {
            p2text = "(超重)";
          }
        } else if (result >= 25 && result < 27) {
          p2text = "(超重)";
        } else if (result >= 27 && result < 28) {
          if (age >= 18 && age <= 39) {
            p2text = "(肥胖)";
          } else {
            p2text = "(超重)";
          }
        } else if (result >= 28 && result < 30) {
          if (age >= 60) {
            p2text = "(超重)";
          } else {
            p2text = "(肥胖)";
          }
        } else if (result >= 30) {
          p2text = "(肥胖)";
        }
      } else {
        if (result >= 5 && result < 21) {
          p2text = "(偏瘦)";
        } else if (result >= 21 && result < 23) {
          if (age >= 60) {
            p2text = "(偏瘦)";
          } else {
            p2text = "(标准)";
          }
        } else if (result >= 23 && result < 35) {
          p2text = "(标准)";
        } else if (result >= 35 && result < 36) {
          if (age >= 18 && age <= 39) {
            p2text = "(超重)";
          } else {
            p2text = "(标准)";
          }
        } else if (result >= 36 && result < 37) {
          if (age >= 60) {
            p2text = "(标准)";
          } else {
            p2text = "(超重)";
          }
        } else if (result >= 37 && result < 40) {
          p2text = "(超重)";
        } else if (result >= 40 && result < 41) {
          if (age >= 18 && age < 39) {
            p2text = "(肥胖)";
          } else {
            p2text = "(超重)";
          }
        } else if (result >= 41 && result < 42) {
          if (age >= 60) {
            p2text = "(超重)";
          } else {
            p2text = "(肥胖)";
          }
        } else if (result >= 42) {
          p2text = "(肥胖)";
        }
      }
      this.showlist[0].p2 = p2text;
      if (p2text == "(偏瘦)") {
        this.showlist[0].p3 =
          "您的身体脂肪率约为" +
          result +
          "%，属于偏瘦，注意营养均衡和科学运动。";
        if (sex == "男") {
          this.showlist[0].img = silly;
        } else {
          this.showlist[0].img = goddess;
        }
      } else if (p2text == "(标准)") {
        this.showlist[0].p3 =
          "您的身体脂肪率约为" + result + "%，属于正常，继续保持哦。";
        if (sex == "男") {
          this.showlist[0].img = ku;
        } else {
          this.showlist[0].img = heathy;
        }
      } else if (p2text == "(超重)") {
        this.showlist[0].p3 =
          "您的身体脂肪率约为" +
          result +
          "%，属于超重，请您合理调整饮食结构，科学运动能帮助您健康减重。";
        if (sex == "男") {
          this.showlist[0].img = fatNan;
        } else {
          this.showlist[0].img = fatNv;
        }
      } else {
        this.showlist[0].p3 =
          "您的身体脂肪率约为" +
          result +
          "%，属于肥胖，请您合理调整饮食结构，科学运动能帮助您健康减重。";
        if (sex == "男") {
          this.showlist[0].img = fatNan;
        } else {
          this.showlist[0].img = fatNv;
        }
      }
    },
    waistcompute(sex, result) {
      console.log(sex, result, "indexs");
      if (sex == "男") {
        if (result > 0.9) {
          this.showlist[0].p2 = "(中心性肥胖)";
          this.showlist[0].img = fatNan;
        } else if (result >= 0.85 && result <= 0.9) {
          this.showlist[0].p2 = "(最佳身材)";
          this.showlist[0].img = ku;
        } else {
          this.showlist[0].p2 = "(腹部脂肪量偏低，注意加强营养)";
          this.showlist[0].img = ku;
        }
      } else {
        if (result > 0.8) {
          this.showlist[0].p2 = "(中心性肥胖)";
          this.showlist[0].img = fatNv;
        } else if (result >= 0.75 && result <= 0.8) {
          this.showlist[0].p2 = "(健康身材)";
          this.showlist[0].img = heathy;
        } else if (result == 0.7) {
          this.showlist[0].p2 = "(最具魅力)";
          this.showlist[0].img = goddess;
        } else {
          this.showlist[0].p2 =
            "(属于欧美模特身材，但是腹部脂肪量偏少，注意加强营养)";
          this.showlist[0].img = goddess;
        }
      }
    },
    waistHeight(age, result) {
      if (age >= 18 && age <= 40) {
        if (result <= 0.5) {
          this.showlist[0].img = heathy;
          this.showlist[0].p2 = "(您的腰高比比较适中， 请继续保持。)";
        } else {
          this.showlist[0].img = fatNv;
          this.showlist[0].p2 =
            "(您的腰高比偏高，腹部脂肪堆积比较严重，请合理调整饮食结构并科学锻炼吧。)";
        }
      } else {
        if (result <= 0.6) {
          this.showlist[0].img = heathy;
          this.showlist[0].p2 = "(您的腰高比比较适中， 请继续保持。)";
        } else {
          this.showlist[0].img = fatNv;
          this.showlist[0].p2 =
            "(您的腰高比偏高，腹部脂肪堆积比较严重，请合理调整饮食结构并科学锻炼吧。)";
        }
      }
    },
    adult(weight, result, sex) {
      var chazhi = (weight - result) / result;
      if (Math.abs(chazhi <= 0.1)) {
        this.showlist[0].p2 = "(标准体重)";
        this.showlist[0].p3 = "您的体重很标准， 请继续保持哦！";
        if (sex == "男") {
          this.showlist[0].img = ku;
        } else {
          this.showlist[0].img = heathy;
        }
      } else if (Math.abs(chazhi) > 0.1 && Math.abs(chazhi) <= 0.2) {
        if (chazhi > 0) {
          this.showlist[0].p2 = "(体重偏重)";
          this.showlist[0].p3 =
            "您的体重偏重，请您合理调整饮食结构，科学减肥和运动能帮助您健康减重。";
          if (sex == "男") {
            this.showlist[0].img = ku;
          } else {
            this.showlist[0].img = fatNv;
          }
        } else {
          this.showlist[0].p2 = "(体重偏轻)";
          this.showlist[0].p3 = "您的体重偏轻， 请您加强膳食营养和体育锻炼。";
          if (sex == "男") {
            this.showlist[0].img = ku;
          } else {
            this.showlist[0].img = goddess;
          }
        }
      } else {
        if (chazhi > 0) {
          this.showlist[0].p2 = "(肥胖)";
          this.showlist[0].p3 =
            "您的体重过重，请您合理调整饮食结构，科学减肥和运动能帮助您健康减重。";
          if (sex == "男") {
            this.showlist[0].img = fatNan;
          } else {
            this.showlist[0].img = fatNv;
          }
        } else {
          this.showlist[0].p2 = "(体重不足)";
          this.showlist[0].p3 =
            "您的体重不足，请您加强营养， 高蛋白低纤维的食物和合理运动能帮助您健康增重。";
          if (sex == "男") {
            this.showlist[0].img = silly;
          } else {
            this.showlist[0].img = goddess;
          }
        }
      }
    },
    bmrcompute(bmr, motion) {
      var result;
      if (motion == "长时间坐，很少运动或是完全没有运动") {
        result = bmr * 1.2;
      } else if (motion == "偶尔会运动，每周大约少量运动1-3次") {
        result = bmr * 1.3;
      } else if (motion == "有持续运动的习惯，每周大约运动3-5次") {
        result = bmr * 1.5;
      } else if (motion == "热爱运动，每周运动6-7次") {
        result = bmr * 1.7;
      } else {
        result = bmr * 1.9;
      }
      this.showlist[0].num = result.toFixed(0);
    },
    heartcompute(age, heart, mubiao, body) {
      var result1, result2, result3;
      if (body == "身体素质较高") {
        result1 = (200 - age) * 0.65 + heart;
        result2 = (200 - age) * 0.75 + heart;
        result3 = (200 - age) * 0.85 + heart;
      } else {
        result1 = (200 - age) * 0.6;
        result2 = (200 - age) * 0.7;
        result3 = (200 - age) * 0.8;
      }
      console.log(result1, result2, result3);
      if (mubiao == "减脂") {
        this.showlist[0].num =
          parseInt(result1) + "~" + parseInt(result2) + "次/分钟";
      } else {
        this.showlist[0].num =
          parseInt(result2) + "~" + parseInt(result3) + "次/分钟";
      }
    },
    dailycompute(sex,age,status){
      if(sex=='男'){
        if(age=='0-0.5'){
          this.foodlist[0].rightlist=[parseInt(90*status),'--','48(AI)','9(AI)','200(AI)','0.3(AI)','2.0(AI)','350(AI)','170(AI)','20(AI)','100(AI)','15(AI)','260(AI)','85(AI)','0.3(AI)','0.01(AI)','300(AI)','40(AI)','10(AI)','0.1(AI)','0.4(AI)','2(AI)','1.7(AI)','0.2(AI)','0.3(AI)','3(AI)','2(AI)','65(AI)','120(AI)'];
        }else if(age=='0.5-1'){
          this.foodlist[0].rightlist=[parseInt(80*status),'--','40(AI)','20(RNI)','250(AI)','10(RNI)','3.5(RNI)','550(AI)','350(AI)','65(AI)','180(AI)','20(AI)','550(AI)','115(AI)','0.3(AI)','0.7(AI)','350(AI)','40(AI)','10(AI)','0.3(AI)','0.5(AI)','3(AI)','1.9(AI)','0.4(AI)','0.6(AI)','4(AI)','10(AI)','100(AI)','150(AI)'];
        }else if(age==1){
          this.foodlist[0].rightlist=['900','50-65','35(AI)','25(RNI)','600(RNI)','9(RNI)','4.0(RNI)','900(AI)','700(AI)','140(RNI)','300(RNI)','25(RNI)','1100(AI)','90(RNI)','0.3(RNI)','1.5(AI)','310(RNI)','40(RNI)','10(RNI)','0.6(RNI)','0.6(RNI)','6(RNI)','2.1(AI)','0.6(RNI)','1.0(RNI)','6(AI)','30(AI)','160(RNI)','200(AI)'];
        }else if(age==2||age==3){
          this.foodlist[0].rightlist=['1100','50-65','35(AI)','25(RNI)','600(RNI)','9(RNI)','4.0(RNI)','900(AI)','700(AI)','140(RNI)','300(RNI)','25(RNI)','1100(AI)','90(RNI)','0.3(RNI)','0.6(AI)','310(RNI)','40(RNI)','10(RNI)','0.6(RNI)','0.6(RNI)','6(RNI)','2.1(AI)','0.6(RNI)','1.0(RNI)','6(AI)','30(AI)','160(RNI)','200(AI)'];
          if(age==3){
            this.foodlist[0].rightlist[0]='1250';
            this.foodlist[0].rightlist[3]='30(RNI)';
          }
        }else if(age==4||age==5||age==6){
           this.foodlist[0].rightlist=['1300','50-65','20-30(AMDR)','30(RNI)','800(RNI)','10(RNI)','5.5(RNI)','1200(AI)','900(AI)','160(RNI)','350(RNI)','30(RNI)','1400(AI)','90(RNI)','0.4(RNI)','2.0(AI)','360(RNI)','50(RNI)','10(RNI)','0.8(RNI)','0.7(RNI)','8(RNI)','2.5(AI)','0.7(RNI)','1.2(RNI)','7(AI)','40(AI)','190(RNI)','250(AI)'];
           if(age==5||age==6){
             this.foodlist[0].rightlist[0]='1400';
           }else if(age==6){
             this.foodlist[0].rightlist[3]='35(RNI)';
           }
        }else if(age==7||age==8||age==9||age==10){
          this.foodlist[0].rightlist=['1500','50-65','20-30(AMDR)','40(RNI)','1000(RNI)','13(RNI)','7.0(RNI)','1500(AI)','1200(AI)','220(RNI)','470(RNI)','40(RNI)','1900(AI)','90(RNI)','0.5(RNI)','3.0(AI)','500(RNI)','65(RNI)','10(RNI)','1.0(RNI)','1.0(RNI)','11(RNI)','3.5(AI)','1.0(RNI)','1.6(RNI)','9(AI)','50(AI)','250(RNI)','300(AI)']
          if(age==8){
            this.foodlist[0].rightlist[0]='1650';
          }else if(age==9){
             this.foodlist[0].rightlist[0]='1750';
          }else if(age==10){
            this.foodlist[0].rightlist[0]='1800';
            this.foodlist[0].rightlist[3]='50(RNI)';
          }
        }else if(age=='11-13'){
          this.foodlist[0].rightlist=['2050','50-65','20-30(AMDR)','60(RNI)','1200(RNI)','15(RNI)','10(RNI)','1900(AI)','1400(AI)','300(RNI)','640(RNI)','55(RNI)','2200(AI)','110(RNI)','0.7(RNI)','4.0(AI)','670(RNI)','90(RNI)','10(RNI)','1.3(RNI)','1.3(RNI)','14(RNI)','4.5(AI)','1.3(RNI)','2.1(RNI)','13(AI)','70(AI)','350(RNI)','400(AI)'];
        }else if(age=='14-17'){
          this.foodlist[0].rightlist=['2500','50-65','20-30(AMDR)','75(RNI)','1000(RNI)','16(RNI)','11.5(RNI)','2200(AI)','1600(AI)','320(RNI)','710(RNI)','60(RNI)','2500(AI)','120(RNI)','0.8(RNI)','4.5(AI)','820(RNI)','100(RNI)','10(RNI)','1.6(RNI)','1.5(RNI)','16(RNI)','5.0(AI)','1.4(RNI)','2.4(RNI)','14(AI)','75(AI)','400(RNI)','500(AI)'];
        }else if(age=='18-49'||age=='50-64'||age=='65-79'||age=='80~'){
          this.foodlist[0].rightlist=['2250','50-65','20-30(AMDR)','65(RNI)','800(RNI)','12(RNI)','12.5(RNI)','2000(AI)','1500(AI)','330(RNI)','720(RNI)','60(RNI)','2300(AI)','120(RNI)','0.8(RNI)','4.5(AI)','800(RNI)','100(RNI)','10(RNI)','1.4(RNI)','1.4(RNI)','15(RNI)','5.0(AI)','1.4(RNI)','2.4(RNI)','14(AI)','80(AI)','400(RNI)','500(AI)']
          if(age=='50-64'){
            this.foodlist[0].rightlist[0]='2100';
            this.foodlist[0].rightlist[4]='1000(RNI)';
            this.foodlist[0].rightlist[8]='1400(AI)';
            this.foodlist[0].rightlist[12]='2200(AI)';
            this.foodlist[0].rightlist[21]='14(RNI)';
            this.foodlist[0].rightlist[23]='1.6(RNI)';
          }else if(age=='65-79'){
            this.foodlist[0].rightlist[0]='2050';
            this.foodlist[0].rightlist[9]='320(RNI)';
            this.foodlist[0].rightlist[4]='1000(RNI)';
            this.foodlist[0].rightlist[8]='1400(AI)';
            this.foodlist[0].rightlist[12]='2200(AI)';
            this.foodlist[0].rightlist[18]='15(RNI)';
            this.foodlist[0].rightlist[21]='14(RNI)';
            this.foodlist[0].rightlist[23]='1.6(RNI)';
          }else if(age=='80~'){
             this.foodlist[0].rightlist[0]='1900';
             this.foodlist[0].rightlist[4]='1000(RNI)';
             this.foodlist[0].rightlist[8]='1300(AI)';
             this.foodlist[0].rightlist[9]='310(RNI)';
             this.foodlist[0].rightlist[10]='670(RNI)';
             this.foodlist[0].rightlist[12]='2000(AI)';
              this.foodlist[0].rightlist[18]='15(RNI)';
              this.foodlist[0].rightlist[21]='13(RNI)';
              this.foodlist[0].rightlist[23]='1.6(RNI)';
          }
        }
      }else if(sex=='女'){
        console.log('nahaizi')
        if(age=='0-0.5'){
          this.foodlist[0].rightlist=[parseInt(90*status),'--','48(AI)','9(AI)','200(AI)','0.3(AI)','2.0(AI)','350(AI)','170(AI)','20(AI)','100(AI)','15(AI)','260(AI)','85(AI)','0.3(AI)','0.01(AI)','300(AI)','40(AI)','10(AI)','0.1(AI)','0.4(AI)','2(AI)','1.7(AI)','0.2(AI)','0.3(AI)','3(AI)','2(AI)','65(AI)','120(AI)'];
        }else if(age=='0.5-1'){
          this.foodlist[0].rightlist=[parseInt(80*status),'--','40(AI)','20(RNI)','250(AI)','10(RNI)','3.5(RNI)','550(AI)','350(AI)','65(AI)','180(AI)','20(AI)','550(AI)','115(AI)','0.3(AI)','0.7(AI)','350(AI)','40(AI)','10(AI)','0.3(AI)','0.5(AI)','3(AI)','1.9(AI)','0.4(AI)','0.6(AI)','4(AI)','10(AI)','100(AI)','150(AI)'];
        }else if(age==1){
          this.foodlist[0].rightlist=['800','50-65','35(AI)','25(RNI)','600(RNI)','9(RNI)','4.0(RNI)','900(AI)','700(AI)','140(RNI)','300(RNI)','25(RNI)','1100(AI)','90(RNI)','0.3(RNI)','1.5(AI)','310(RNI)','40(RNI)','10(RNI)','0.6(RNI)','0.6(RNI)','6(RNI)','2.1(AI)','0.6(RNI)','1.0(RNI)','6(AI)','30(AI)','160(RNI)','200(AI)'];
        }else if(age==2||age==3){
          this.foodlist[0].rightlist=['1000','50-65','35(AI)','25(RNI)','600(RNI)','9(RNI)','4.0(RNI)','900(AI)','700(AI)','140(RNI)','300(RNI)','25(RNI)','1100(AI)','90(RNI)','0.3(RNI)','0.6(AI)','310(RNI)','40(RNI)','10(RNI)','0.6(RNI)','0.6(RNI)','6(RNI)','2.1(AI)','0.6(RNI)','1.0(RNI)','6(AI)','30(AI)','160(RNI)','200(AI)'];
          if(age==3){
            this.foodlist[0].rightlist[0]='1200';
            this.foodlist[0].rightlist[3]='30(RNI)';
          }
        }else if(age==4||age==5||age==6){
           this.foodlist[0].rightlist=['1250','50-65','20-30(AMDR)','30(RNI)','800(RNI)','10(RNI)','5.5(RNI)','1200(AI)','900(AI)','160(RNI)','350(RNI)','30(RNI)','1400(AI)','90(RNI)','0.4(RNI)','2.0(AI)','360(RNI)','50(RNI)','10(RNI)','0.8(RNI)','0.7(RNI)','8(RNI)','2.5(AI)','0.7(RNI)','1.2(RNI)','7(AI)','40(AI)','190(RNI)','250(AI)'];
           if(age==5){
             this.foodlist[0].rightlist[0]='1300';
           }else if(age==6){
              this.foodlist[0].rightlist[0]='1250';
             this.foodlist[0].rightlist[3]='35(RNI)';
           }
        }else if(age==7||age==8||age==9||age==10){
          this.foodlist[0].rightlist=['1350','50-65','20-30(AMDR)','40(RNI)','1000(RNI)','13(RNI)','7.0(RNI)','1500(AI)','1200(AI)','220(RNI)','470(RNI)','40(RNI)','1900(AI)','90(RNI)','0.5(RNI)','3.0(AI)','500(RNI)','65(RNI)','10(RNI)','1.0(RNI)','1.0(RNI)','10(RNI)','3.5(AI)','1.0(RNI)','1.6(RNI)','9(AI)','50(AI)','250(RNI)','300(AI)']
          if(age==8){
            this.foodlist[0].rightlist[0]='1450';
          }else if(age==9){
             this.foodlist[0].rightlist[0]='1550';
              this.foodlist[0].rightlist[3]='45(RNI)';
          }else if(age==10){
            this.foodlist[0].rightlist[0]='1650';
            this.foodlist[0].rightlist[3]='50(RNI)';
          }
        }else if(age=='11-13'){
          this.foodlist[0].rightlist=['1800','50-65','20-30(AMDR)','55(RNI)','1200(RNI)','18(RNI)','9(RNI)','1900(AI)','1400(AI)','300(RNI)','640(RNI)','55(RNI)','2200(AI)','110(RNI)','0.7(RNI)','4.0(AI)','630(RNI)','90(RNI)','10(RNI)','1.1(RNI)','1.1(RNI)','12(RNI)','4.5(AI)','1.3(RNI)','2.1(RNI)','13(AI)','70(AI)','350(RNI)','400(AI)'];
        }else if(age=='14-17'){
          this.foodlist[0].rightlist=['2000','50-65','20-30(AMDR)','60(RNI)','1000(RNI)','18(RNI)','8.5(RNI)','2200(AI)','1600(AI)','320(RNI)','710(RNI)','60(RNI)','2500(AI)','120(RNI)','0.8(RNI)','4.5(AI)','630(RNI)','100(RNI)','10(RNI)','1.3(RNI)','1.2(RNI)','13(RNI)','5.0(AI)','1.4(RNI)','2.4(RNI)','14(AI)','75(AI)','400(RNI)','400(AI)'];
        }else if(age=='18-49'){
          if(status=='二者都不是'){
            this.foodlist[0].rightlist=['1800','50-65','20-30(AMDR)','55(RNI)','800(RNI)','20(RNI)','7.5(RNI)','2000(AI)','1500(AI)','330(RNI)','720(RNI)','60(RNI)','2300(AI)','120(RNI)','0.8(RNI)','4.5(AI)','700(RNI)','100(RNI)','10(RNI)','1.3(RNI)','1.2(RNI)','13(RNI)','5.0(AI)','1.4(RNI)','2.4(RNI)','14(AI)','80(AI)','400(RNI)','400(AI)'];
          }else if(status=='孕妇早期（1-3月）'){
            this.foodlist[0].rightlist=['1800','50-65','20-30(AMDR)','55(RNI)','800(RNI)','20(RNI)','9.5(RNI)','2000(AI)','1500(AI)','370(RNI)','720(RNI)','65(RNI)','2300(AI)','230(RNI)','0.9(RNI)','4.9(AI)','700(RNI)','100(RNI)','10(RNI)','1.2(RNI)','1.2(RNI)','12(RNI)','6.0(AI)','2.2(RNI)','2.9(RNI)','14(AI)','80(AI)','600(RNI)','420(AI)'];
          }else if(status=='孕妇中期（4-6月）'||status=='孕妇晚期（7-9月）'){
            this.foodlist[0].rightlist=['2100','50-65','20-30(AMDR)','70(RNI)','1000(RNI)','24(RNI)','9.5(RNI)','2000(AI)','1500(AI)','370(RNI)','720(RNI)','65(RNI)','2300(AI)','230(RNI)','0.9(RNI)','4.9(AI)','770(RNI)','115(RNI)','10(RNI)','1.4(RNI)','1.4(RNI)','12(RNI)','6.0(AI)','2.2(RNI)','2.9(RNI)','14(AI)','80(AI)','600(RNI)','420(AI)']
            if(status=='孕妇晚期（7-9月）'){
              this.foodlist[0].rightlist[0]='2250';
              this.foodlist[0].rightlist[3]='85(RNI)';
              this.foodlist[0].rightlist[5]='29(RNI)';
              this.foodlist[0].rightlist[20]=this.foodlist[0].rightlist[19]='1.5(RNI)';
            }
          }else if(status=='哺乳期'){
            this.foodlist[0].rightlist=['2300','50-65','20-30(AMDR)','80(RNI)','1000(RNI)','24(RNI)','12(RNI)','2000(AI)','1500(AI)','330(RNI)','720(RNI)','78(RNI)','2300(AI)','240(RNI)','1.4(RNI)','4.8(AI)','1300(RNI)','150(RNI)','10(RNI)','1.5(RNI)','1.5(RNI)','15(RNI)','7.0(AI)','1.7(RNI)','3.2(RNI)','17(AI)','80(AI)','550(RNI)','520(AI)']
          }
        }else if(age=='50-64'||age=='65-79'||age=='80~'){
          this.foodlist[0].rightlist=['1750','50-65','20-30(AMDR)','55(RNI)','1000(RNI)','12(RNI)','7.5(RNI)','2000(AI)','1400(AI)','330(RNI)','720(RNI)','60(RNI)','2200(AI)','120(RNI)','0.8(RNI)','4.5(AI)','700(RNI)','100(RNI)','10(RNI)','1.2(RNI)','1.2(RNI)','12(RNI)','5.0(AI)','1.6(RNI)','2.4(RNI)','14(AI)','80(AI)','400(RNI)','400(AI)']
          if(age=='65-79'){
            this.foodlist[0].rightlist[0]='1700';
            this.foodlist[0].rightlist[9]='320(RNI)';
            this.foodlist[0].rightlist[10]='700(RNI)';
            this.foodlist[0].rightlist[18]='15(RNI)';
            this.foodlist[0].rightlist[21]='11(RNI)';
          }else if(age=='80~'){
            this.foodlist[0].rightlist[0]='1500';
            this.foodlist[0].rightlist[8]='1300(AI)';
            this.foodlist[0].rightlist[9]='310(AI)';
            this.foodlist[0].rightlist[10]='670(RNI)';
            this.foodlist[0].rightlist[12]='2000(AI)';
            this.foodlist[0].rightlist[18]='15(RNI)';
            this.foodlist[0].rightlist[21]='10(RNI)';
          }
        }
      }
    },
    computes(e) {
      var _this = this;
      var year = new Date().getFullYear();
      console.log(e, "compute");
      if (_this.indexs == 0) {
        var height = e[1] / 100;
        var result = (e[0] / (height * height)).toFixed(2);
        console.log(result, "compute result");
        _this.showlist[0].p1 = "您的BMI为";
        _this.showlist[0].num = result;
        _this.showlist[0].logo = logo0;
        if (result < 18) {
          _this.showlist[0].p2 = "(偏瘦)";
          _this.showlist[0].img = goddess;
        } else if (result >= 18 && result <= 24) {
          _this.showlist[0].p2 = "(标准)";
          _this.showlist[0].img = heathy;
        } else if (result > 24 && result <= 28) {
          _this.showlist[0].p2 = "(超重)";
          _this.showlist[0].img = fatNv;
        } else {
          _this.showlist[0].p2 = "(肥胖)";
          _this.showlist[0].img = fatNv;
        }
        console.log(_this.showlist[0]);
        var userready=this.userready;
        userready[0]=result;
        localStorage.setItem('userready',userready)
      } else if (_this.indexs == 1) {
        _this.showlist[0].p1 = "您的BMR为";
        _this.showlist[0].logo = logo1;
        var result;
        if (e[0] == "男") {
          //男性： 66+（13.7×体重KG）+（5.0×身高CM）-（6.8×年龄Years）
          result =
            66 + 13.7 * e[1] + 5 * e[2] - 6.8 * (year - e[3].split("-")[0]);
        } else {
          //女性： 655+（9.6×体重KG）+（1.7×身高CM）-（4.7×年龄Years）
          result =
            655 + 9.6 * e[1] + 1.7 * e[2] - 4.7 * (year - e[3].split("-")[0]);
        }
        _this.showlist[0].num = result.toFixed(0);
        var userready=this.userready;
        userready[1]=result.toFixed(0);
        localStorage.setItem('userready',userready)
      } else if (_this.indexs == 2) {
        //         1.2×BMI + 0.23×年龄 - 5.4 -10.8×性别（男性为1，女性为0）
        // BMI（Body Mass Index)身体质量指数 = 体重（kg)/身高（m)²
        _this.showlist[0].p1 = "您的BFR为";
        _this.showlist[0].logo = logo2;
        var bmi = e[1] / Math.pow(e[2] / 100, 2);
        console.log(bmi, "bmi");
        var result;
        if (e[0] == "男") {
          result = 1.2 * bmi + 0.23 * (year - e[3].split("-")[0]) - 5.4 - 10.8;
        } else {
          result = 1.2 * bmi + 0.23 * (year - e[3].split("-")[0]) - 5.4;
        }
        _this.showlist[0].num = result.toFixed(2);
        _this.bfrcompute(e[0], result.toFixed(2), year - e[3].split("-")[0]);
      } else if (_this.indexs == 3) {
        _this.showlist[0].logo = logo3;
        _this.showlist[0].p1 = "您的腰臀比为";
        var result = e[1].split("/")[1] / e[2].split("/")[1];
        _this.showlist[0].num = result.toFixed(2);
        _this.waistcompute(e[0], result.toFixed(2));
      } else if (_this.indexs == 4) {
        _this.showlist[0].logo = logo4;
        _this.showlist[0].p1 = "您的腰高比为";
        var result = e[0].split("/")[1] / e[1];
        _this.showlist[0].num = result.toFixed(2);
        _this.waistHeight(year - e[2].split("-")[0], result);
      } else if (_this.indexs == 5) {
        _this.showlist[0].logo = logo5;
        _this.showlist[0].p1 = "您的标准体重为";
        var result;
        if (e[0] == "男") {
          result = (e[2] - 100) * 0.9;
        } else {
          result = (e[2] - 100) * 0.9 - 2.5;
        }
        _this.showlist[0].num = result;

        _this.adult(e[1], result, e[0]);
      } else if (_this.indexs == 7) {
        _this.showlist[0].logo = logo7;
        _this.showlist[0].p1 = "您的腰围为";
        _this.showlist[0].num = e[1].split("/")[1];
        if (e[0] == "男") {
          if (e[1].split("/")[1] > 90) {
            _this.showlist[0].p2 = "(您属于中心性肥胖)";
            _this.showlist[0].img = fatNan;
          } else {
            _this.showlist[0].p2 = "(您不属于中心性肥胖)";
            _this.showlist[0].img = ku;
          }
        } else {
          if (e[1].split("/")[1] > 70) {
            _this.showlist[0].p2 = "(您属于中心性肥胖)";
            _this.showlist[0].img = fatNv;
          } else {
            _this.showlist[0].p2 = "(您不属于中心性肥胖)";
            _this.showlist[0].img = heathy;
          }
        }
      } else if (_this.indexs == 8) {
        _this.showlist[0].logo = logo8;
        _this.showlist[0].p1 = "您的每日所需卡路里为";
        var bmr;
        if (e[0] == "男") {
          bmr = 66 + 13.7 * e[1] + 5 * e[2] - 6.8 * (year - e[3].split("-")[0]);
        } else {
          bmr =
            655 + 9.6 * e[1] + 1.7 * e[2] - 4.7 * (year - e[3].split("-")[0]);
        }
        _this.bmrcompute(bmr, e[4]);
      } else if (_this.indexs == 9) {
        _this.tuilist[0].logo = logo9;
        _this.tuilist[0].p1 = "您的标准腿围为";
        _this.tuilist[0].datui = (e[0] * 0.26 + 7.8).toFixed(1);
        _this.tuilist[0].xiaotui = (e[0] * 0.18).toFixed(1);
      } else if (_this.indexs == 10) {
        _this.showlist[0].logo = logo10;
        _this.showlist[0].p1 = "您的目标心率范围为";
        _this.showlist[0].p3 =
          "您的运动心率在以上范围内会达到比较好的" + e[2] + "效果";
        _this.heartcompute(year - e[0].split("-")[0], e[1], e[2], e[3]);
      } else if (_this.indexs == 11) {
        _this.foodlist[0].logo = logo11;
        _this.foodlist[0].p1 = "您的每日膳食营养素为";
        _this.dailycompute(e[0],e[1],e[2]);
      }
      _this.setbendi();
    },
    setbendi(){
      console.log(this.indexs,'indesx')
      if(this.indexs!=9){
        localStorage.setItem('userready'+this.indexs,this.showlist[0].num)
        localStorage.setItem('usertext'+this.indexs,this.showlist[0].p2)
        if(this.indexs==2){
          localStorage.setItem('userready'+this.indexs,this.showlist[0].num+'%')
        }else if(this.indexs==3){
          if(this.showlist[0].p2=='(腹部脂肪量偏低，注意加强营养)'){
            localStorage.setItem('usertext'+this.indexs,'(偏瘦)')
          }
        }else if(this.indexs==4){
          console.log(this.showlist[0].p2.indexOf('适中'),'this.showlist[0].p2.indexO')
          if(this.showlist[0].p2.indexOf('适中')){
            localStorage.setItem('usertext'+this.indexs,'(适中)')
          }else if(this.showlist[0].p2.indexOf('偏高')){
            localStorage.setItem('usertext'+this.indexs,'(偏高)')
          }else if(this.showlist[0].p2.indexOf('偏低')){
            localStorage.setItem('usertext'+this.indexs,'(偏低)')
          }
        }else if(this.indexs==5){
          localStorage.setItem('userready'+this.indexs,this.showlist[0].num+'Kg')
        }else if(this.indexs==7){
          if(this.showlist[0].p2=='(您不属于中心性肥胖)'){
            localStorage.setItem('usertext'+this.indexs,'(非中心性肥胖)')
          }else{
            localStorage.setItem('usertext'+this.indexs,'(中心性肥胖)')
          }
        }else if(this.indexs==8){
          localStorage.setItem('userready'+this.indexs,this.showlist[0].num+'千卡')
        }else if(this.indexs==10){
          localStorage.setItem('usertext'+this.indexs,'(建议值)')
        }
      }else{
        localStorage.setItem('userready'+this.indexs,this.tuilist[0].datui+'cm~'+this.tuilist[0].xiaotui+'cm');
        localStorage.setItem('usertext'+this.indexs,'大腿围-小腿围');
      }
    },
    recompute(){
      this.$router.go(-1)
      // this.$router.push({path:'/goodsdetail',query:{productId:'101'}})
    }
  }
};
</script>
<style scoped>
.result {
  padding: 1.6rem 0.42rem .4rem;
  box-sizing: border-box;
  min-height: 100vh;
  text-align: center;
}
.info {
  background: rgba(255, 255, 255, 0.5);
  padding: 0 0 0.4rem 0;
  box-sizing: border-box;
  text-align: center;
  border-radius: 0.2rem;
  position: relative;
  min-height: 80vh;
}
.logo {
  margin: -0.82rem auto 0;
  width: 1.32rem;
}
.p1 {
  font-size: 0.36rem;
}
.num {
  font-size: 0.8rem;
  line-height: 0.96rem;
  margin: 0.14rem 0 0 0;
}
.p2 {
  font-size: 0.24rem;
}
.p3 {
  font-size: 0.28rem;
  padding: 0 0.6rem;
  box-sizing: border-box;
}
.styleimg {
  width: 1.66rem;
  margin: 0.34rem 0 0;
}
.recompute {
  position: absolute;
  left: 50%;
  bottom: 0.6rem;
  background: #e8d7c5;
  width: 3.12rem;
  height: 0.66rem;
  border-radius: 0.5rem;
  text-align: center;
  line-height: 0.66rem;
  font-size: 0.32rem;
  transform: translateX(-50%);
}
.tuinum,
.tuimiao {
  display: flex;
  display: -webkit-flex;
}
.tuinum {
  justify-content: space-around;
  -webkit-justify-content: space-around;
  margin-bottom: 3.44rem;
}
.tuimiao {
  padding: 0 0.32rem;
  box-sizing: border-box;
  text-align: left;
  font-size: 0.2rem;
}
.tuimiao .left {
  width: 1.8rem;
  flex-shrink: 0;
  -webkit-flex-shrink: 0;
}
.pDes {
  font-size: 0.2rem;
  margin: 0.56rem 0 0;
}
.pDes2 {
  margin: 0.1rem 0 0;
}
.foodlist {
  font-size: 0.28rem;
  list-style: none;
  padding: 0.22rem 0 2rem;
  box-sizing: border-box;
}
.foodlist li {
  height: 0.54rem;
  line-height: 0.54rem;
  padding: 0 0.65rem 0;
  box-sizing: border-box;
}
.foodlist .left {
  float: left;
}
.foodlist .right {
  float: right;
}
</style>



