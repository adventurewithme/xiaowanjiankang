<template>
  <div class="share">
    <div class="s_down">
      <img :src="s_logo" alt class="s_logo">
      <a class="s_btn" href="https://sj.qq.com/myapp/detail.htm?apkName=com.eayyt.bowlhealth">立即下载</a >
    </div>
    <div class="s_video">
      <!-- <video class="s_videos"  
            :poster="video.vedioPicBig"
            id="videoPlay"
            muted
            @pause="pause"
             x5-playsinline="" playsinline="" webkit-playsinline="" 
            >
            <source  :src="video.vedioFilePath" type="video/mp4">
      </video>-->
      <video
        class="s_videos"
        id="videoPlay"
        @pause="pause"
        @play="play"
        autobuffer
        x5-playsinline
        playsinline="true"
        webkit-playsinline="true"
        x-webkit-airplay="allow"
        x5-video-orientation="portraint"
        x5-video-player-fullscreen="true"
        preload="auto"
        :poster="video.vedioPicBig"
      >
        <source :src="video.vedioFilePath" type="video/mp4">
      </video>
      <!-- <video poster="https://xiaowan-image.oss-cn-beijing.aliyuncs.com/operation/video/2019-04-04/30/35d6925e-b77c-44a2-9669-f924699c45f7(big).jpg"> -->

      <!-- </video> -->
      <div class="s_video_index" @click="videopause_btn">
        <img :src="videoBtn" alt class="video_btn" @click.stop="videoplay_btn" v-show="play_show">
        <div class="s_video_text">
          <div class="s_title">{{video.title}}</div>
          <div class="s_text">{{video.lable}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import s_logo from "../../assets/indexActive.png";
import videoBtn from "../../assets/videoBtn.png";
import axios from "axios";
import weixinshare from '../../assets/share.js';
import axiosfail from '@/components/http/axiosfail';

const pings = "http://47.105.207.216";
export default {
  name: "share",
  data() {
    return {
      s_logo,
      videoBtn,
      play_show: true,
      video: {
        vedioPicBig: "",
        vedioFilePath: "",
        title: "会拉丝的榴莲披萨会拉丝的榴莲披萨会拉丝的榴莲披萨",
        lable:
          "自己动手成就感十足自己动手成就感十足自己动手成就感十足,果味飘香,还能帮你省下一笔巨款"
      }
    };
  },
  created() {
    var that = this;
    // var contentId=window.location.href.split('contentId=')[1].split('&')[0];
    // var contentType=window.location.href.split('contentType=')[1].split('&')[0];
    var contentId = this.$route.query.contentId;
    var contentType = this.$route.query.contentType;
    // var contentId = 3780;
    // var contentType = 1;
    console.log(contentId, contentType, "contentType");

    var that = this;
    axiosfail(that);
    // axios.get('/share/v1/vedio/showShareContent/3780/1')
    axios
      .get(
        process.env.NODE_ENV === "production"
          ? that.pings +
              "/share/v1/vedio/showShareContent/" +
              contentId +
              "/" +
              contentType
          : "/share/v1/vedio/showShareContent/" + contentId + "/" + contentType
      )
      .then(res => {
        console.log(res.data.data);
        that.video = res.data.data;
        document.title = res.data.data.name;
        
      var imgurl =res.data.data.vedioPicBig;
      var title = res.data.data.name;
      var desc =res.data.data.title;
      weixinshare(imgurl,title,desc);


    var playPromise;
    var vdo = document.getElementById("videoPlay");
        vdo.src = res.data.data.vedioFilePath;
        
      });
  },
  methods: {
    videoplay_btn() {
      var vdo = document.getElementById("videoPlay");

      this.play_show = false;
      vdo.play();
    },
    videopause_btn() {
      var vdo = document.getElementById("videoPlay");
      vdo.pause();
    },
    pause() {
      this.play_show = true;
      console.log("pause");
    },
    play() {
      console.log("a");
    }
  }
};
</script>
<style scoped>
.s_down {
  width: 100vw;
  height: 1rem;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 10;
  top: 0;
  padding: 0.16rem;
  box-sizing: border-box;
}
.s_down .s_logo {
  width: 0.68rem;
  float: left;
}
.s_down .s_btn {
  float: right;
  width: 1.58rem;
  height: 0.58rem;
  background: #27c553;
  color: #fff;
  text-align: center;
  line-height: 0.58rem;
  border-radius: 0.34rem;
  font-size: 0.28rem;
  margin-top: 0.05rem;
}
.s_video {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.s_video .s_videos {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.s_video_index {
  position: absolute;
  z-index: 2;
  /* background: rgba(0,23,23,.3); */
  width: 100%;
  height: 100%;
  top: 0;
}
.s_video_index .video_btn {
  width: 1.48rem;
  height: 1.48rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.s_video_text {
  color: #fff;
  position: absolute;
  bottom: 0.2rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
}
.s_video_text .s_title {
  font-size: 0.36rem;
  font-weight: 500;
  line-height: 0.5rem;
}
.s_video_text .s_text {
  font-size: 0.24rem;
  font-weight: 400;
  line-height: 0.34rem;
  margin-top: 0.16rem;
}
</style>

