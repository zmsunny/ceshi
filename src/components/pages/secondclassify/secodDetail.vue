<template>
    <div class="secclassify">
        <div class="top">
            <div @click="$router.go(-1)" class="out fa fa-chevron-left"></div>
            <div class="second">二级分类</div>
            <div></div>
        </div>
        <div class="title">应季流行</div>
        <div>
            <div class="list" v-for="(item,i) in items" :key="i">
                <div @click="getShopId(item.iid)" class="classify2" :iid="item.iid">
                    <div v-if="item.show.img">
                        <img :src="item.show.img" alt="" class="desPic">
                        <p class="cla2">{{item.title}}</p>
                        <span class="oldprice">{{item.orgPrice}}</span>
                        <span class="nowprice">￥{{item.price}}</span>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'secodDetail',
        data(){
            return {
                items:[]
            }
        },
        methods:{
            getData(){
                var url =location.search;
                var arr =url.split('=');
                var pid = arr[1];
                this.$http.get('/list/search',{
                    params:{
                        frame: 0,
                        page: 1 ,
                        sort: 'pop',
                        cKey: 'wap-cate',
                        _mgjuuid: 'b10123d6-bb98-401c-bd8d-7f6947ab3d4d',
                        fcid: pid               
                    }
                }).then(res => {
                    this.items = res.data.data.list
                })
            },
            getShopId(x){
                var id= x;
                this.$router.push({
                    path:'/goodsDetail',
                    query:{
                         goodsId:id
                    }
                })
            },    
        },
        created(){
            this.getData()
        }      
    }     
</script>
<style lang="scss" scoped>
    .secclassify {
     width:100%;
     display:flex;
     flex-wrap:wrap;
     overflow: hidden;
     padding-bottom:1rem;
    .top{
        display:flex;
        flex-wrap:nowrap;
        justify-content: space-between;
        font-size:18px;
        padding-top:0.1rem;
        width:100%;
        border-bottom:1px solid #ccc;
        .out{
            // margin-left:0.2rem;
            text-align:left;
           
        }
        .second{
        //    margin-left:1.45rem;
           color:#ff1877;
         
        }
    }
    .title {
        padding:0.15rem 0;
        font-size:0.18rem;
        width:100%;
    }
    div{
        display:flex;
        flex-wrap:wrap;
        .list {
            flex:1;
            align-self: center;
            width:1.8rem;
            height:3.2rem;
            padding:0.1rem;
            img{
               width:1.70rem;
                height:2.40rem;
               margin-bottom: 0.05rem; 
            }
            p{
                width:1.6rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow:ellipsis;
            }
            .desPic{
                width:1.8rem;
                height:2.69rem;
            }
            .oldprice{
                text-decoration: line-through;
            }
            .nowprice{
                color:red;
            }
        }
    }   
}
</style>