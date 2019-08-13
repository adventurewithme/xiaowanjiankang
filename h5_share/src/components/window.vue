<template>
  <div class="window">
    <div class="window_content">
      <div class="sure" :style="{background:color}">
        <!-- <div class="sure"> -->
        <img :src="close" alt class="closeimg" @click="closefunc">
        <span>{{windowText}}</span>
        <img :src="yes" alt class="yesimg" @click="checkfunc" :data-pickervalues="pickervalue">
      </div>
      <div v-for="(i,index) in windowList" :key="index">
        <mt-picker
          :slots="i.weightPicker"
          @change="onValuesChange"
          value-key="50"
          v-if="currentwindows==index"
        ></mt-picker>
      </div>
      <!-- <mt-picker
        :slots="windowList[0].weightPicker"
        @change="onValuesChange"
        value-key="50"
      ></mt-picker>-->
    </div>
  </div>
</template>
<script>
import { Picker } from "mint-ui";
import close from "./img/close.png";
import yes from "./img/yes.png";
// import func from '../../vue-temp/vue-editor-bridge';
export default {
  name: "window",
  props: ["color", "currentwindows"],
  data() {
    return {
      windowText: "",
      close: close,
      yes: yes,
      pickervalue: 50,
      indexs: "",
      windowList: [
        {
          weightPicker: [
            //性别
            {
              flex: 1,
              values: ["男", "女"],
              className: "slot1",
              textAlign: "center"
            }
          ]
        },
        {
          //体重
          weightPicker: [
            {
              flex: 1,
              values: [],
              className: "slot1",
              textAlign: "center",
              defaultIndex: 15
            },
            {
              flex: 1,
              values: [],
              className: "slot2",
              textAlign: "center"
            }
          ]
        },
        {
          weightPicker: [
            //腰围1.2/40-4.5/150
            {
              flex: 1,
              values: [],
              className: "slot1",
              textAlign: "center",
              defaultIndex: 30
            }
          ]
        },
        {
          weightPicker: [
            //身高150cm-220cm
            {
              flex: 1,
              values: [],
              className: "slot1",
              textAlign: "center",
              defaultIndex: 10
            }
          ]
        },
        {
          weightPicker: [
            //出生日期1930.01.01-2018.12.30
            {
              flex: 1,
              values: [],
              className: "slot1",
              textAlign: "center",
              defaultIndex: 60
            },
            {
              flex: 1,
              values: [],
              className: "slot2",
              textAlign: "center"
            },
            {
              flex: 1,
              values: [],
              className: "slot3",
              textAlign: "center"
            }
          ]
        },
        {
          weightPicker: [
            //运动频率
            {
              flex: 1,
              values: [
                "长时间坐，很少运动或是完全没有运动",
                "偶尔会运动，每周大约少量运动1-3次",
                "有持续运动的习惯，每周大约运动3-5次",
                "热爱运动，每周运动6-7次",
                "工作或生活作息需要大量劳动，相当消耗能量的人"
              ],
              className: "slot1",
              textAlign: "center"
            }
          ]
        },
        {
          weightPicker: [
            //臀围1.80/60--6.01/200
            {
              flex: 1,
              values: [],
              className: "slot1",
              textAlign: "center",
              defaultIndex: 30
            }
          ]
        },
        {
          weightPicker: [
            //静息心率
          ]
        },
        {
          weightPicker: [
            //目标
            {
              flex: 1,
              values: ["减脂", "提高心肺功能"],
              className: "slot1",
              textAlign: "center"
            }
          ]
        },
        {
          weightPicker: [
            //身体状况
            {
              flex: 1,
              values: ["健康状况较差", "普通人群", "身体素质较高"],
              className: "slot1",
              textAlign: "center",
              defaultIndex: 1
            }
          ]
        },
        {
          weightPicker: [
            //年龄段0-80~
            {
              flex: 1,
              values: [
                "0-0.5",
                "0.5-1",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11-13",
                "14-17",
                "18-49",
                "50-64",
                "65-79",
                "80~"
              ],
              className: "slot1",
              textAlign: "center"
            }
          ]
        },
        {//每日膳食体重
          weightPicker: [
            {
              flex: 1,
              values: ['d'],
               className: "slot1",
              textAlign: "center",
            },{
              flex: 1,
              values: ['d'],
               className: "slot2",
              textAlign: "center",
            }
          ]
        },{//每日膳食哺乳期？
          weightPicker:[
            {
              flex:1,
              values:["二者都不是","孕妇早期（1-3月）","孕妇中期（4-6月）","孕妇晚期（7-9月）","哺乳期"],
               className: "slot1",
              textAlign: "center",
            }
          ]
        }
      ]
    };
  },
  created: function(e) {
    var _this = this;
    this.indexs = _this.$route.query.indexs;
    // 体重
    var weightList = [];
    for (var i = 0; i < 116; i++) {
      weightList[i] = i + 35;
    }
    _this.windowList[1].weightPicker[0].values = weightList;
    var weightLists = [];
    for (var i = 0; i < 10; i++) {
      weightLists[i] = i;
    }
    _this.windowList[1].weightPicker[1].values = weightLists;
    _this.windowList[11].weightPicker[1].values = weightLists;
    // 腰围 //腰围1.2/40-4.5/150
    var yaoList = [];
    for (var i = 0; i < 111; i++) {
      var small = 1.2 + i * 0.03;
      var big = 40 + i;
      yaoList[i] = small.toFixed(2) + "/" + big;
    }
    _this.windowList[2].weightPicker[0].values = yaoList;
    // 身高
    var heightList = [];
    for (var i = 0; i < 71; i++) {
      heightList[i] = i + 150;
    }
    _this.windowList[3].weightPicker[0].values = heightList;
    // 出生日期
    var birthYearList = [],
      birthMounthList = [],
      birthDayList = [];
    for (var i = 0; i < 72; i++) {
      var year = i + 1930;
      birthYearList[i] = year;
    }
    for (var i = 0; i < 12; i++) {
      birthMounthList[i] = i + 1;
    }
    for (var i = 0; i < 30; i++) {
      birthDayList[i] = i + 1;
    }
    _this.windowList[4].weightPicker[0].values = birthYearList;
    _this.windowList[4].weightPicker[1].values = birthMounthList;
    _this.windowList[4].weightPicker[2].values = birthDayList;
    //臀围1.80/60--6.01/200
    var buttockList = [];
    for (var i = 0; i < 141; i++) {
      var small = 1.8 + 0.03 * i;
      var big = 60 + i;
      buttockList[i] = small.toFixed(2) + "/" + big;
    }
    _this.windowList[6].weightPicker[0].values = buttockList;
    // 每日膳食体重
    var mfood=[];
    for(var i=0;i<13;i++){
      mfood[i]=i+3;
    }
    _this.windowList[11].weightPicker[0].values=mfood;
  },
  methods: {
    onValuesChange(picker, values) {
      if (values.length == 1) {
        this.pickervalue = values[0];
      } else if (values.length == 2) {
        this.pickervalue = values[0] + "." + values[1];
      } else if (values.length == 3) {
        this.pickervalue = values[0] + "-" + values[1] + "-" + values[2];
      }
      console.log(values, "windows");
      //   if (values[0] > values[1]) {
      //     picker.setSlotValue(1, values[0]);
      //   }
    },
    closefunc() {
      this.$emit("checklist", "closewindow");
    },
    checkfunc(e) {
      // console.log(e.srcElement.dataset.pickervalues);
      this.flag = false;
      this.$emit("checklist", e.srcElement.dataset.pickervalues);
    }
  }
};
</script>

<style scoped>
.window {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #000;
  width: 100vw;
  height: 100vh;
}
.window .window_content {
  position: fixed;
  bottom: 0;
  height: 4.48rem;
}
.window .sure {
  width: 100vw;
  height: 0.88rem;
  line-height: 0.88rem;
}
.picker {
  position: fixed;
  background: #fff;
  width: 100vw;
  height: 3.6rem;
}
.window .closeimg,
.window .yesimg {
  width: 0.44rem;
  margin: 0.22rem 0.44rem;
}
.window .closeimg {
  float: left;
}
.window .yesimg {
  float: right;
}

</style>
