<template>
  <div class="cmain">
    <div class="cbody">
      <img :src="logos" alt class="logo">
      <div class="child_s">
        <div class="boy">
          <img :src="boy"  @click='changeimg' :data-img='boyl' class="slideInUp animated">
        </div>
        <div class="girl">
          <img :src="girl" alt   @click='changeimg' :data-img='girll'  class="slideInUp animated">
        </div>
      </div>
      <p class="p1">*本工具仅适合1~12岁健康儿童</p>
      <div class="imglist">
          <img :src="imgshowflag" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import logos from "./img/childTit.png";
import boy from "./img/boyHead.png";
import girl from "./img/girlHead.png";
import boyl from './img/boyResult.png';
import girll from './img/girlResult.png';
export default {
  name: "child",
  data() {
    return {
      logos: logos,
      boy: boy,
      girl: girl,
      boyl:boyl,
      girll:girll,
      imgshowflag:boyl
    };
  },
  methods:{
      changeimg(e){
          console.log(e.target.dataset,e,'ss')
          this.imgshowflag=e.target.dataset.img;
      }
  }
};
</script>
<style scoped>
.cmain {
  background: #d1e8b2;
  padding: 1.6rem 0.42rem .4rem;
  box-sizing: border-box;
}
.cbody {
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
  position: relative;
  border-radius: .2rem;
}
.logo {
  width: 1.32rem;
  margin: -0.82rem auto 0;
  height: 1.64rem;
}
.child_s {
  position: absolute;
  width: 100%;
  height: 1.5rem;
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  top: 0;
}
.child_s img {
  width: 1.3rem;
  display: block;
  margin: .24rem 0 0;
}
.p1 {
  font-size: 0.2rem;
  color: rgba(102, 102, 102, 1);
  margin: 0.2rem .2rem 0;
  text-align: left;
}
.imglist img{
    width: 100%;
    margin: .2rem 0 0;
}
.animated{
    animation-iteration-count:infinite;
    animation-direction:alternate;
    animation-duration:2s;
}
</style>


