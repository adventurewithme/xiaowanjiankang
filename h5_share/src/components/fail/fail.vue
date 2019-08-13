<template>
  <div class="fail">
    <div class="fail_content">
      <img :src="failimg" alt class="failimg" />
      <div class="failtext">哎呀，分享页面出错了！</div>
    </div>
  </div>
</template>
<script>
import failimg from "@/assets/fail.png";
export default {
  name: "fail",
  data() {
    return {
      failimg
    };
  },
  created() {
    document.title = "";
  },

  mounted() {
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  methods: {
    goBack() {
      // console.log("点击了浏览器的返回按钮");
      window.history.go(-2)
    //   history.pushState(null, null, document.URL);
    }
  }
};
</script>
<style scoped>
.fail {
  width: 100vw;
  height: 100vh;
  background: #f9f9f9;
  position: relative;
}
.fail_content {
  width: 100vw;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.failimg {
  width: 2.06rem;
  height: 2.56rem;
}
.failtext {
  color: #666666;
  font-size: 0.36rem;
  margin: 0.4rem 0 0;
}
</style>
