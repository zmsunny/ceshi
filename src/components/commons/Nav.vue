<template>
    <footer class="nav-bar">
        <router-link :to = "nav.path" v-for = " nav in navs " :key = "nav.id" class="tab-item external" 
            active-class="active">
                <span :class="['fa', 'fa-' + nav.fa]"></span>
                <span class="tab-label">{{ nav.title }}</span>
        </router-link>    
    </footer>
</template>
<script>
    export default {
        name:'app-nav',
        data () {
            return {
                navs:[
                    { id: 1, title: '首页', fa: 'file-text-o ', path: '/home', name: 'home' },
                    { id: 2, title: '分类', fa: 'shopping-bag', path: '/classify', name: 'Classify' },
                    { id: 3, title: '购物车', fa: 'car', path: '/car', name: 'car' },
                    { id: 4, title: '我', fa: 'user-circle-o', path: '/login', name: 'login' }
                ]
            }
        }
    }
</script>
<style scoped lang="scss">
    footer{
        height:0.55rem;
        width:100%;
        position: fixed;
        display:flex;
        border-top:1px solid #ccc;
        bottom:0;
        left:0;
        background:#fff;
        a{
            flex:1;
            height:0.55rem;
            display:flex;
            flex-wrap:wrap;
            flex-direction:column;
            justify-content:center;
            align-items: center;
            font-size:18px;
            color:lightcoral; 
        } 
        
    }
    .active{
         background:#ff1877; 
         color:#fff;  
    }
     
</style>

