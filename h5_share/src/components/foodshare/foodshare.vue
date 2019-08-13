<template>
  <div class="foodshare">
    <img :src="fdshare.cookbookPic" alt class="fd-img" v-if="fdshare.cookbookPic">
    <div class="fd-content">
      <div class="title">
        <div>{{fdshare.cookbookName}}</div>
        <div class="right">
            <div class="img">
          <img :src="shichang" alt></div>
          <span>{{fdshare.time}}</span>
        </div>
      </div>
      <div class="futitle" v-if="fdshare.subhead">{{fdshare.subhead}}</div>
      <div class="fd_list">
        <div class="fd_li" v-for="(title,indext) in fdshare.cookbookTitleVos" :key="indext">
          <div class="fd_lititle">{{title.cookTitleName}}</div>
          <div class="fd_limain">
            <div
              v-for="(child,indexc) in title.foodBurdeningVos"
              :key="indexc"
              class="child_div"
              :class="indexc%2==0&&indexc== title.foodBurdeningVos.length-1?'child_even':'child_odd'"
            >
              <span>{{child.foodBurdengingName}}</span>
              <span class="weight">{{child.measure}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="fd_operation">
        <div class="fd_operatitle">步骤</div>
        <div class="fd_operatext" v-html="fdshare.modusOperandi">{{fdshare.modusOperandi}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import utils from '@/js/utils.js'
import shichang from "@/assets/shichang.png";
import weixinshare from '@/assets/share.js';
import logo from "@/assets/logo.png";
import axiosfail from '@/components/http/axiosfail';

export default {
  name: "foodshare",
  data() {
    return {
      shichang,
      logo,
      fdshare: {
        cookbookId: "",
        cookbookName: "",
        cookbookPic:'',
        cookbookTitleVos: [],
        difficulty: "",
        modusOperandi:'',
        time: "",
        subhead:''
      }
    };
  },
  created() {
    this.data(); //获取页面数据
  },
  methods: {
    data() {
        // var a=utils.encrypt('欢迎','')
        // var b=utils.decrypt(a,'')
        // console.log(a,'加密',b,'解密')
      document.title='';
      // var videoid = window.location.href.split("videoId=")[1];
      var videoid = this.$route.query.videoId;
    //   var videoid = 3813;
      const that=this;
      axiosfail(that);
    //   axios.get("/share/v1/cook/" + videoid)
    axios.get(process.env.NODE_ENV=== 'production'?(that.pings +"/share/v1/cook/" + videoid):"/share/v1/cook/" + videoid)
      .then(res=>{
          console.log(res.data)
          that.fdshare=res.data.data;

        var imgurl = res.data.data.cookbookPic?' res.data.data.cookbookPic':'https://xiaowan-image.oss-cn-beijing.aliyuncs.com/logo.png';
      var title =  res.data.data.cookbookName;
      var desc = res.data.data.subhead;
      weixinshare(imgurl,title,desc);
      })
    }
  },
  updated(){
      var obj=document.getElementsByTagName('img');
      for(var i=0;i<obj.length;i++){
          obj[i].style.width='100%'
      }
  }
};
</script>
<style scoped>
.Heathshare{
    width: 100vw;
    overflow-x: hidden;
}
.fd-img {
  width: 100vw;
}
.fd-content {
  padding: 0.1rem 4vw;
  box-sizing: border-box;
}
.fd-content .title {
  font-size: 0.4rem;
  font-weight: 500;
}
.fd-content .title .img {
  width: 0.36rem;
  height: 0.4rem;
  margin: 0 0.2rem 0 0;
}
.fd-content .title .img img{
  width: 100%;
}
.fd-content .title .right {
  color: #666666;
  font-size: 0.24rem;
}
.futitle {
  color: #666;
  font-size: 0.28rem;
  line-height: 0.4rem;
  margin: 0.08rem 0 0 0;
}
.fd_list {
  margin: 0.1rem 0 0 0;
}
.fd_list .fd_li,
.fd_operation {
  padding: 0.26rem 0 0 0;
}
.fd_list .fd_lititle,
.fd_operation .fd_operatitle {
  font-size: 0.32rem;
  color: #333333;
  line-height: 0.72rem;
  border-bottom: 1px solid #e3e3e3;
}
.fd_list .fd_limain {
  font-size: 0.28rem;
}
.fd_list .fd_limain .child_div {
  width: 50%;
  flex-shrink: 0;
  line-height: 0.82rem;
}
.fd_list .fd_limain .child_div:nth-child(odd) {
  padding: 0 0.75rem 0 0;
  box-sizing: border-box;
}
.fd_list .fd_limain .child_div:nth-child(even) {
  padding: 0 0 0 0.75rem;
  box-sizing: border-box;
}
.fd_list .fd_limain .child_odd {
  border-bottom: 1px dashed #ededed;
}
.fd_list .fd_limain .child_even {
  position: relative;
}
.fd_list .fd_limain .child_even::after {
  width: 92vw;
  height: 1px;
  border-bottom: 1px dashed #ededed;
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
}
.fd_list .fd_limain .child_div .weight {
  color: #999999;
}
.fd_operation .fd_operatext {
  font-size: 0.28rem;
  color: #333333;
  line-height: 0.4rem;
  padding: 0.26rem 0;
}

.fd-content .title,
.fd-content .title .right,
.fd_list .fd_limain,
.fd_list .fd_limain .child_div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
</style>
