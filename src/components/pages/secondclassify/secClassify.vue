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
                <div @click="getFcid(item.link)" v-if="item.image" class="classify1" :link="item.link">
                    <img :src="item.image" alt=""  class="imgClass">
                    <div class="cla">{{item.title}}</div>  
                </div>
                <div v-else @click="getShopId(item.iid)" class="classify2" :iid="item.iid">
                    <div>
                        <img :src="item.show.img" alt="" class="desPic">
                        <div class="cla2">{{item.title}}</div>
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
        name: 'secClass',
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
                var _pid = '?pid'
                var _fcid = '?fcid'
                if(arr[0] === _pid){
                    this.$http.get('/mls/venus/mce/v1/urlMakeUpChange/h5',{
                        params:{
                            channel: 'wap',
                            page: 1,
                            pageSize: 30,
                            pid: pid
                        }
                    }).then(res => {
                        this.items = res.data.value.category_1.list;
                    })
                }
                if(arr[0] == _fcid){
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
                }    
            },
            getShopId(x){
                var id= x;
                console.log(id)
                this.$router.push({
                    path:'/goodsDetail',
                    query:{
                        goodsId:id
                    }
                })
            },
            getFcid(link){
                var x  =link.indexOf('?')
                var y =''
                y=link
                var url =y.substr(x+1)
                var arr = url.split('&')
                var obj = {}; 
                arr.forEach((item)=>{
                    obj[item.split('=')[0]]	= item.split('=')[1]		
                })
                this.$router.push({
					path:'/secdetail',
					query:{
					    fcid:obj.fcid,
					}
		  		})
            }
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
        justify-content: space-between;
        // text-align:center;
        // border-bottom:1px solid #ccc;
        .classify1{
            display:flex;
            flex-wrap:wrap;
            // width:100%;
            flex:1;
            flex-flow: column;
            align-items:center;
            text-align:center;
            .imgClass{
                width:0.8rem;
                height:0.92rem;
            } 
        }
        .classify2{
            display:flex;
            justify-content: space-between;
            // flex-wrap:wrap;
            div {
                flex:1;
                width:50%;
                 display:flex;
                flex-flow: column;
                .cla2{
                    width:1.8rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
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
}
</style>
