<template>
  <div class="hello">
   <ul class="question">
     <li class="question_li"  v-for="(item ,index) in questionlist" :key='index' @click="toanswer(item.id)">
       <div class="text">{{item.question}}</div>
       <img :src="arrow" alt="" class="arrow">
     </li>
   </ul>
  </div>
</template>

<script>
import arrow from '../assets/arrow-right.png'
import axios from 'axios'
import Vue from 'vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      arrow:arrow,
      // Json:Json,
      questionlist:[]
    }
  },
  created(){
    const that = this;
    axios.get('/static/question.json')
    .then((res)=>{
      that.questionlist=res.data
    });
    console.log(that.questionlist)
  },
  methods:{
    toanswer(id){
      console.log(id)
      this.$router.push({path:'/Anwser',name:'Anwser',params:{id:id}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question{
  padding: 30px 0 0 56px;
  box-sizing: border-box;

}
.question_li{
  font-size: 32px;
  line-height: 52px;
  border-bottom: 1px solid #dfdfdf;
  display: flex;
  display: -webkit-flex;
  position: relative;
  padding:  20px 10px;
  box-sizing: border-box;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}
.question_li::after{
  position: absolute;
  content:'';
  width: 10px;
  height: 36px;
  border-radius: 10px;
  background: #4FD564;
  top: 50%;
  transform: translateY(-50%);
  left: -30px;
}
.question_li .arrow{
  width: 52px;
  height: 52px;
  flex-shrink:0;
  -webkit-flex-shrink:0;
}

</style>
