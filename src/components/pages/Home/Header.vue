<template>
        <header class="home-header">
            <form>
                <a href="/"></a>
                <input type="search" :placeholder=keyWord >
                <span></span>
                <img src="../../../assets/header1.png" alt="">
            </form>
        </header>
</template>
<script>
import Vue from 'vue'
export default {
    name:'homeHeader',
    data (){
        return {
            keyWord:[]
        }
    },
    methods:{
        getKeyWord(){
            this.$http.get('/index1/jsonp/multiget/3',{
                params: {
                    pids: '6348',
                    callback: 'jsonp6348'
                }
            }).then(res =>{
                var x = res.data.replace('jsonp6348(','')
                var y = x.substr('',x.length-1)
                var z = window.eval('('+y+')')
                var last = z.data[6348].list
                this.keyWord = last[0].defaultKeyWord
            })
        }
    },
    created (){
        this.getKeyWord()
    }
}
</script>
<style scoped lang="scss">
    .home-header{
        height:0.45rem;
        form {
            display: flex;
            padding-left: 0.15rem;
            a{
            width: 0.29rem;
            height: 0.45rem;
            background: url(../../../assets/log.png) no-repeat center;
            background-size: contain;
            text-align: center;
            }
            input{
                margin-left:0.2rem;
                padding-left:0.3rem;
                width:2.50rem;
                height:0.3rem;
                align-self: center;
                border-radius: 0.06rem;
                background:  #f4f4f4;
            }
            span{
                align-self: center;
                margin-left:0.2rem;
                width: 0.20rem;
                height: 0.3rem;
                background: url(../../../assets/header2.png) no-repeat center;
                background-size: contain;
                text-align: center;
            }
            img{
                width:0.18rem;
                height:0.18rem;
                position:absolute; 
                left:0.7rem;
                top:0.14rem;
            }
        }
    }
</style>

