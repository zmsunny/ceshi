<template>
    <div class="home-goods-type">
        <div class="type">
            <router-link active-class="active"  :to = "{name: type.name}" v-for="type in types"
                :key = "type.id" > 
                {{type.title}}
            </router-link>
        </div>
      <router-view></router-view>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    name:'homeGoodsType',
    data(){
        return {
            types:[
                    {id:1,title:"流行",name:"goodsPop"},
                    {id:2,title:"新款",name:"goodsNew"},
                    {id:3,title:"精选",name:"goodsBase"}
                ]
        }
    },
}
</script>
<style lang="scss" scoped>
    .home-goods-type{
        width:100%;
        .type{
            display: flex;
            justify-content: space-around;
            a{
                cursor: pointer;
                height:0.35rem;
                line-height: 0.35rem;
                font-size: 14px;
                &.active {
                    color: red;
                    border-bottom:1px solid red;
                }
            }
           
        }
        
    }
</style>

