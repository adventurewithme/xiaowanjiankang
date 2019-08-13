<template>
  <div class="userInfo">
    <div
      class="coms"
      v-for="(item,index) in userSelect "
      :key="index"
      @click="index!=7?checkuser(index,item.flag):''"
    >
      <!-- @click="checkuser(index,item.flag)" -->
      <!-- <div class="weight"  v-if="item.span=='性别'"> -->
      <!-- <div class="weight"  v-if="item.indexs.indexOf(indexs)!='-1'"> -->
      <div class="weight" v-if="item.flag!=''" :style="{borderBottomColor:color}">
        <span>{{item.span}}</span>
        <span v-if="index!=7">{{item.amto}}</span>
        <input type="number" name id v-else-if="index==7" class="xinluipt" @input="xinluipt">
        <!-- <span>{{(item.indexs)}}'ddd'{{indexs}}</span>
        <span>{{item.indexs.indexOf(indexs)}}</span>-->
      </div>
    </div>
    <!-- <div class="coms" v-if="ageweight" @click="checkuser(index,item.flag)">
      <div class="weight" :style="{borderBottomColor:color}">
        <span>体重</span>
        <span>请选择</span>
      </div>
    </div>
    <div class="coms" v-if="sexweight">
      <div class="weight" :style="{borderBottomColor:color}">
        <span>孕妇/哺乳期</span>
        <span>请选择</span>
      </div>
    </div> -->
    <div class="compute" :style="{background:color}" @click="compute">计算</div>
    <!-- <div class="error_info">s</div> -->
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "UserSelectDiv",
  props: ["indexs", "userinfolist", "color"],
  data() {
    return {
      userSelect: [
        {
          span: "性别",
          amto: "请选择",
          indexs: ["1", "2", "3", "5", "7", "8", "11"],
          flag: ""
        },
        // { span: "区域", amto: "请选择", indexs: ["5"], flag: "" },
        {
          span: "体重",
          amto: "请选择KG",
          indexs: ["0", "1", "2", "5", "8"],
          flag: ""
        },
        {
          span: "腰围",
          amto: "请选择CM",
          indexs: ["3", "4", "7"],
          flag: ""
        },
        {
          span: "身高",
          amto: "请选择CM",
          indexs: ["0", "1", "2", "4", "5", "8", "9"],
          flag: ""
        },
        {
          span: "出生日期",
          amto: "请选择CM",
          indexs: ["1", "2", "4", "8", "10"],
          flag: ""
        },
        { span: "运动频率", amto: "请选择", indexs: ["8"], flag: "" },
        { span: "臀围", amto: "请选择", indexs: ["3"], flag: "" },
        { span: "静息心率", amto: "请选择", indexs: ["10"], flag: "" },
        { span: "目标", amto: "请选择", indexs: ["10"], flag: "" },
        { span: "身体状况", amto: "请选择", indexs: ["10"], flag: "" },
        { span: "年龄段", amto: "请选择", indexs: ["11"], flag: "" },
        { span: "体重", amto: "请选择", indexs: ["11"], flag: "" },
        { span: "孕妇/哺乳期", amto: "请选择", indexs: ["11"], flag: "" }
      ],
      currentcheck: "", //当前选择的列表在数组中对应的index
      usersitelist: [], //当前数组显示那些span？
      indexsitelist: [], //当前数组显示那些对应的index;
      flagcheck: "", //选择的列表的index？
    };
  },
  created: function() {
    var haha = 0;
    for (var i = 0; i < this.userSelect.length; i++) {
      for (var j in this.userSelect[i].indexs) {
        if(this.indexs==11&&i==11||this.indexs==11&&i==12){

        }
        else if (this.indexs == this.userSelect[i].indexs[j]) {
          haha += 1;
          // console.log(haha, "haha");
          this.userSelect[i].flag = haha;
          this.indexsitelist.push(i);
          this.usersitelist.push(this.userSelect[i].span);
        }  
        // if (this.indexs == this.userSelect[i].indexs[j]) {
        //   haha += 1;
        //   // console.log(haha, "haha");
        //   this.userSelect[i].flag = haha;
        //   this.indexsitelist.push(i);
        //   this.usersitelist.push(this.userSelect[i].span);
        // }  
        //  if (this.indexs == 11) {
        //   this.userSelect[11].flag = "";
        //   this.userSelect[12].flag = "";
        // }
      }
    }
  },
  methods: {
    checkuser(e, flag) {
      console.log(e, flag, "当前点击对象");
      this.currentcheck = e;
      this.flagcheck = flag - 1;
      this.$emit("windowFlagclick", e);
    },
    compute() {
      console.log(
        this.usersitelist,
        this.indexsitelist,
        this.userSelect,
        "usersitelist"
      );
      var likeflag = 0;
      for (var i = 0; i < this.usersitelist.length; i++) {
        var index = this.indexsitelist[i];
        if (this.usersitelist[i] == this.userSelect[index].span) {
          likeflag += 1;
          Toast({
            message: "请输入" + this.userSelect[index].span,
            duration: 1000
          });
          break;
        }
      }
      this.toresult(likeflag);
      // this.$router.push({path:'/result',query:{indexs:this.indexs,color:this.color}})
    },
    xinluipt(e) {
      console.log(e.target.value, "s");
      this.usersitelist[1] = e.target.value;
      console.log(this.usersitelist);
    },
    toresult: function(e) {
      console.log(this.usersitelist, "this.usersitelist");
      if (e == 0) {
        this.$router.push({
          path: "/result",
          name: "Result",
          query: { indexs: this.indexs, color: this.color },
          params: { usersitelist: this.usersitelist }
        });
      }
    } // toresult:(e)=>{
    //   // console.log(e)
    //   if(e==0){
    //     this.$router.push({path:'/result',query:{indexs:this.indexs,color:this.color}})
    //   }
    // }
  },
  watch: {
    // indexs(e) {
    //   // console.log(e, "change");
    // },
    userinfolist(e) {
      var current = this.currentcheck;
      if (this.userSelect[current].span == "体重") {
        this.userSelect[current].amto = e + "kg";
      } else if (
        this.userSelect[current].span == "身高" ||
        this.userSelect[current].span == "腰围" ||
        this.userSelect[current].span == "臀围"
      ) {
        this.userSelect[current].amto = e + "cm";
      } else {
        this.userSelect[current].amto = e;
      }

      this.usersitelist[this.flagcheck] = e;
      console.log(this.usersitelist,this.flagcheck,'this.usersitelist')
      if (this.indexs == 11 && this.usersitelist[1] != "年龄段") {
        if (
          this.usersitelist[1] == "0-0.5" ||
          this.usersitelist[1] == "0.5-1"
        ) {
          this.usersitelist[2] = "体重";
          this.indexsitelist[2] = 11;
          this.userSelect[11].flag=3;
          this.userSelect[12].flag='';
        } else if (
          this.usersitelist[1] == "18-49" &&
          this.usersitelist[0] == "女"
        ) {
          this.usersitelist[2] = "孕妇/哺乳期";
          this.userSelect[12].flag=3;
          this.userSelect[11].flag='';
          this.indexsitelist[2] = 12;
        }else{
          this.userSelect[11].flag='';
          this.userSelect[12].flag='';
        }
      }
      
      this.usersitelist[this.flagcheck] = e;
      console.log(this.usersitelist,'userssss')
    }
  }
};
</script>
<style scoped>
.coms .weight {
  padding: 0 0.42rem;
  box-sizing: border-box;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: transparent;
  font-size: 0.24rem;
  height: 0.8rem;
  line-height: 0.8rem;
}
.coms > div span:nth-child(2) {
  float: right;
  white-space: nowrap;
  max-width: 4rem;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
}
.compute {
  width: 3.12rem;
  height: 0.66rem;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.66rem;
  border-radius: 0.66rem;
  margin: 0.56rem auto 0 auto;
}
.error_info {
  padding: 0.1rem 0.2rem;
  background: rgba(0, 0, 0, 0.6);
  font-size: 0.28rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.1rem;
  color: #fff;
}
.xinluipt {
  float: right;
  border: none;
  height: 0.8rem;
  text-align: right;
  background: transparent;
}
</style>
