<template>
    <div class="anwser">
        <div class="title">{{answer.title}}</div>
        <div class="answer_content" v-html='answer.content'></div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            id:'',
            answer:[]
        }
    },
    created(){
        const that=this;
        var id=this.$route.params.id;
        this.id=id;
        console.log(id)
        axios.get('/static/anwser.json')
        .then((res)=>{
            console.log(res.data[id])
            that.answer=res.data[id]
        })
    }
}
</script>
<style scoped>
    *{
        width: 100%;
    }
    .anwser{
        padding: 30px;
        box-sizing: border-box;
        width: 100vw;
    }
    .title{
        font-size: 40px;
        font-weight: bold;
        line-height: 48px;
        padding: 0 0 20px 0;
        box-sizing:border-box;
        border-bottom: 2px solid #f8f8f8;
    }
    .anwser .answer_content{
        margin: 20px 0 0 0;
        font-size: 32px !important;
        line-height: 48px;
        width: 100%;
}
    .anwser .answer_content img{
        width: 100%;
        display: block;
        margin: 20px 0;
    }
</style>


