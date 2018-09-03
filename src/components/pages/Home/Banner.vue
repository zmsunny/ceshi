<template>
    <div ref ="el" class="home-banner swiper-container back">
        <div class="swiper-wrapper">
            <div 
                v-for ="(banner,i) in banners"
                :key = "i"
                class="swiper-slide">
                <img :src="banner.image" alt="">
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
import Vue from 'vue'
import Swiper from 'swiper'
export default {
    name:'homeBanner',
    data () {
        return {
            banners: []
        }
    },
    methods :{
        getBanners (){
            this.$http.get('/index1/jsonp/multiget/3',{
                params: {
                    pids: '43542',
                    callback: 'jsonp43542'
                }
            }).then(res => {
                var x = res.data.replace('jsonp43542(','')
                var y = x.substr('',x.length-1)
                var z = window.eval('('+y+')')
                var last = z.data[43542].list
                this.banners = last
                Vue.nextTick(() =>{
                    new Swiper(this.$refs.el,{
                        autoplay: {
                            delay: 2000,
                            stopOnLastSlide: false,
                            disableOnInteraction: true,
                        },
                        pagination:{
                            el:'.swiper-pagination'
                        }
                    })
                })
            })
        }
    },
    created () {
        this.getBanners()
    }
}
</script>
<style lang = "scss">
    .home-banner {
        .swiper-wrapper {
            width: 100%;
            height: 1.875rem;
        }
        .swiper-slide {
            img {width: 100%; }
        }
        .swiper-pagination  {
            .swiper-pagination-bullet {
                width: 6px; height: 6px;
                background: rgb(0, 0, 0);
            }
            .swiper-pagination-bullet-active {
                background: rgb(243, 95, 95);
            }
        }
    }
    
</style>
