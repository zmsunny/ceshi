<template>
    <div class="app-car page page-top">
        <div class="top">
            <a @click = "$router.go(-1)"><i class="fa fa-angle-left"></i></a>
            <div>购物车</div>
            <div></div>
        </div>
        <ul>
            <li v-for = "good in commons.goods" :key = "good.good_id">
                <div class="detail">
                    <div class="imgDescrible">
                        <img :src="good.pic">
                    </div>
                    <div class="describle"> 
                        <p class="goodname">{{good.name}}</p>
                        <span  class="price" style="color:#f00">{{good.price}}</span>
                        <span class="num">
                            <button @click="reduce(good.good_id)">-</button>
                            <span>{{good.num}}</span>
                            <button @click = "add(good.good_id)">+</button>
                        </span>
                    </div>
                   
                </div>
                 <div class="color"></div>
            </li>
        </ul>
        <app-nav></app-nav>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:'car',
    computed: {
       ...mapState(['commons']),
    }
}
</script>
<style lang="scss" scoped>
    @import "../../../stylesheets/_base.scss";
    .app-car{
        width:100%;
        display:flex;
        flex-wrap:wrap;
        .top{
           display:flex;
           padding-top:0.1rem;
           width:100%;
           height:0.4rem;
           justify-content: space-between;
           a{
               font-size:0.2rem;
               padding-left:0.2rem;
               font-weight:bold;
           }
           div{
               font-size:0.18rem;
           }
        }
        ul{
            padding-bottom:1rem;
           li{
               width:100%;
               .detail{
                   height:1.2rem;
                   display:flex;
                   .imgDescrible{
                       flex:1;
                       img{
                            width:1rem;
                            height:1.2rem;
                       }
                   }
                   .describle{
                        flex:1;
                        text-align:left;
                        margin-left:0.12rem;
                        .goodname{
                            width:2.58rem;
                            padding-top:0.1rem;
                            // overflow: hidden;
                            // text-overflow:ellipsis;
                            // white-space: nowrap;
                        }
                        .price{
                           display:inline-block;
                           padding-top:0.1rem;
                        }
                        .num{
                            width:100%;
                            display:inline-block;
                            text-align:right;
                        }
                   }
               }
            } 
            .color{
                width:100%;
                height:0.1rem;
                background:#eee;
            }
        }
        
    }
    
</style>

