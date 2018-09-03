<template>
<div class="home-topic">
    <ul>
        <li
          v-for="(topic,i) in topics"
          :key = "i"
          class="topic"
        >
            <img :src="topic.image" alt="" class="back">
            <p>{{ topic.title }}</p>
        </li>
    </ul>
</div>
    
</template>
<script>
import Vue from 'vue'
export default {
    name:'homeTopic',
    data () {
        return {
            topics:[]
        }
    },
    methods: {
        getTopics (){
            this.$http.get('/index1/jsonp/multiget/3',{
                params: {
                    pids: '13730',
                    callback: 'jsonp13730'
                }
            }).then(res =>{
                var x = res.data.replace('jsonp13730(','')
                var y = x.substr('',x.length-1)
                var z = window.eval('('+y+')')
                var last = z.data[13730].list
                this.topics = last
            })
        }
    },
    created (){
        this.getTopics()
    }
}
</script>
<style lang="scss" scoped>
    .home-topic{
        width:3.75rem;
        height:1.55rem;
        border-bottom: 0.11rem solid rgb(241, 239, 239);
        padding: 0.1rem 0.1rem 0.3rem 0.1rem;

        ul{
            display: flex;
        .topic{
            width:0.8rem;
            height:1.08rem;
            margin-right: 0.1rem;
            img{
                width:0.8rem;
                height:0.8rem;
                }
            }
        }
        
    }
</style>

