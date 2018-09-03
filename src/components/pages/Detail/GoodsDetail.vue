<template>
    <div class="goods-detail" v-if = "goods.itemInfo">
        <div ref ="el" class=" banner swiper-container ">
            <div class="swiper-wrapper">
                <div 
                    v-for ="(topimg,i) in goods.itemInfo.topImages"
                    :key= "i"
                    class="swiper-slide">
                    <img :src="topimg" alt="" class="back">
                </div>
            </div>
            <div class="swiper-pagination swiper-pagination-fraction">
                <span class="swiper-pagination-current">1</span> 
                / <span class="swiper-pagination-total">5</span>
            </div>
        </div>
        <div class="goods">
            <p class="title">{{goods.itemInfo.title}}</p>
            <div class="price">
                <span class="nowprice">{{goods.itemInfo.price}}</span>
                <span class="oldprice" v-if="goods.itemInfo.oldPrice">{{goods.itemInfo.oldPrice}}</span>
                <span class="dis" v-if="goods.itemInfo.discountDesc">{{goods.itemInfo.discountDesc}}</span>
            </div>
            <div class="sellnum">
                <span>{{goods.columns[0]}}</span>
                <span>{{goods.columns[1]}}</span>
                <span>{{goods.itemInfo.extra.deliveryTime}}小时发货</span>
                <span>{{goods.itemInfo.extra.sendAddress}}</span>
            </div>
            <div class="service-list"> 
                <span
                v-for="(service,index) in goods.shopInfo.services"
                v-if='index<=2'
                :key= "index"
                 class="service-item"> 
                    <img class="service-icon" v-if="service.icon" :src="service.icon">
                    <span class="service-name">{{service.name}}</span> 
                </span> 
                <img class="service-arrow" src="https://s10.mogucdn.com/mlcdn/c45406/170711_701e7hcfi1j9fe76hgd560bj28d87_14x22.png" alt=""> 
            </div>
        </div>
        <div class="btns">
            <div class="control_nul">
                    <button @click = "num -= (num === 1 ? 0: 1)">-</button>
                    <span>{{num}}</span>
                    <button @click = "num++">+</button>
            </div>
            <button @click = "addcart">加入购物车</button>
        </div>
        <div class="shop">
            <div class="shop-top"> 
                <a class="info-avatar" :href="goods.shopInfo.shopUrl">
                    <img :src="goods.shopInfo.shopLogo"> 
                </a> 
                <div class=" shop-info-container">
                    <div class="shop-title">
                        <div class="title"> {{goods.shopInfo.name }} </div> 
                    </div>
                    <div  @click="save=!save" class="shop-collect"> 
                        <span v-if="save" class="has-marked">已收藏</span> 
                        <span v-else class="not-marked"> 
                            <span class="plus">+</span>
                        收藏 </span> 
                    </div>
                </div>
            </div>
            <div class="info-content"> 
                <div class="count"> 
                    <div class="sale">
                        <span class="fz-18">{{goods.shopInfo.cSells}}</span><br>总销量
                    </div> 
                    <div class="all"><span class="fz-18">{{goods.shopInfo.cGoods}}</span><br>全部宝贝</div>
                    <div class="shop-evaluate">
                        <ul> 
                            <li 
                            v-for="(score,i) in goods.shopInfo.score"
                            :key="i"
                            > <span>{{score.name}}</span>  <em>{{score.score}}</em> <i v-if="score.isBetter">高</i><i v-else>低</i></li>
                        </ul> 
                    </div>  
                </div>
            </div>
            <div class="shop-bottom">
                <button>进店逛逛</button>
            </div>
        </div>
      <app-car-nav></app-car-nav>
       
    </div>
</template>
<script>
import Vue from 'vue'
import Swiper from 'swiper'
export default {
    name:'goodsDetail',
    data(){
        return {
            // id: this.$route.query.goodsId,
            loading:false,
            goods:[],
            save:false,
            num:1
        }
    },
    methods:{
        fetchData(){
            this.loading = true;
            var params= this.$route.query;
            this.$http.get('/detail/detail/mls/v1/h5',{
                params:{
                    iid:params.goodsId,
                    _ajax:1,
                }
            }).then( res=>{
                this.goods=res.data.result
                console.log(res)
                    Vue.nextTick(() =>{
                        new Swiper(this.$refs.el,{
                            autoplay: {
                                delay: 2000,
                                stopOnLastSlide: false,
                                disableOnInteraction: true,
                            },
                            pagination:{
                                el:'.swiper-pagination',
                                type: 'fraction',
                            }
                        })
                    })
            })
            this.loading = false;
        },
        addcart(){
            this.$store.dispatch('action_add_good_in_cart', {
                good_id: this.$route.query.goodsId,
                price: this.goods.itemInfo.price,
                name: this.goods.itemInfo.title,
                num: this.num,
                pic: this.goods.itemInfo.topImages[0]
            })
        }
    },
    created(){
        this.fetchData()
        
    }
}
</script>
<style lang="scss" scoped>
.goods-detail{
    width: 100%;
    height: 100%;
    .swiper-container {
        background:  #fff;
      .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;
            img{
                width: 2.9rem; 
                height:4.30rem;
            }
        }
        .swiper-pagination{
            position: absolute;
            left:3.14rem;
            bottom:0.18rem;
            line-height: 0.25rem;
            z-index: 2;
            width:0.5rem;
            height: 0.25rem;
            color: #fff;
            font-size: 0.14rem;
            -webkit-border-radius: .4rem;
            -moz-border-radius: .4rem;
            border-radius: .4rem;
            background: rgba(0,0,0,.3);
            span{
                color:#000;

            }
        } 
    }
    .goods{
        background:  #fff;
        padding-top:0.1rem;
        padding-left:0.15rem;
        >p{
            text-align: left;
            margin-bottom:0.12rem;
        }
        .price{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 0.12rem;
            span{
                margin-right:0.15rem;
            }
            .nowprice{
                font-size:0.20rem;
                color:#f69;
            }
            .oldprice{
                text-decoration: line-through;
                font-size:0.12rem;
                color:#999;
            }
            .dis{
                line-height: 0.2rem;
                padding:0 0.05rem;
                height: .2rem;
                color: #fff;
                font-size: .12rem;
                background: #FF6699;
                -webkit-border-radius: .4rem;
                -moz-border-radius: .4rem;
                border-radius: .4rem;
            }
        }
        .sellnum{
            display: flex;
            height:0.28rem;
            justify-content: space-between;
            font-size:0.12rem;
            color:#999;
            padding-bottom: 0.12rem;
            border-bottom:1px solid #ccc;
        }
        .service-list{
            margin-bottom: 0.12rem;
            display: flex;
            justify-content: space-around;
            padding-right:0.1rem;
            height:0.62rem;
            align-items: center;
            border-bottom: 0.05rem solid rgb(240, 237, 237);;
            span{
                color:#666;
            }
            .service-item{
                text-align: center;
                font-size: 0.12rem;

                .service-icon{
                    width:0.12rem;
                    height:0.12rem;
                }
            }
            .service-arrow{
                width:0.08rem;
                height:0.08rem;
            }
        }
    }
    .btns {
        display: flex;
        padding: 0px .15rem;
        justify-content: space-between;
        align-items: center;
        .control_nul{
            button{
                height:0.3rem;
                vertical-align: middle;
            }
            span{
                border:1px solid #ccc;
                display: inline-block;
                width:0.4rem;
                height:0.3rem;
                line-height:0.3rem;
                text-align:center;
                vertical-align: middle;
            }
        }
    }
    .shop{
        .shop-top{
            width:100%;
            height:0.45rem;
            display: flex;
            padding:0 0.2rem;
            a img{
                width:0.45rem;
                height:0.45rem;
                border-radius: 0.45rem;
                margin-right: 0.15rem;
            }
            .shop-info-container{
                display: flex;
                width:100%;
                justify-content: space-between;
                align-items: center; 
                .shop-collect{
                        >span{
                            display: inline-block;
                            width:0.65rem;
                            line-height: 0.25rem;
                            height:0.25rem;
                            border-radius: 0.1rem;
                            background: #999;
                            color:#fff;
                            font-size: 0.12rem;
                        }
                        .not-marked{
                            background: #f69;

                        }
                } 
                
            }
            
        }
        .info-content{
            height:0.66rem;
            .count{
                display: flex;
                align-items: center; 
                justify-content: space-around;
                .shop-evaluate{
                    border-left:1px solid #ccc;
                    width:1.60rem;
                    padding-left:0.4rem;
                    ul{
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        li{
                            em{
                                color:#f13e3a;
                            }
                            i{
                                color:#f13e3a;
                            }
                        }
                    }
                }
            }
        }
        .shop-bottom{
            button{
                display: inline-block;
                width:1.5rem;
                height: 0.3rem;
                line-height: 0.3rem;
                -webkit-border-radius: 1.2rem;
                -moz-border-radius: 1.2rem;
                border-radius: 1.2rem;
                color: #666;
                font-size: 0.16rem;
                background: #f2f5f8;
            }
            
        }

    }
}
    

    
</style>


