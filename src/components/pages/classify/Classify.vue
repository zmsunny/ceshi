<template>
   <div class="classify">
	   <h2>本周流行</h2>
	   <ul>
		   <li @click="selectClas(item.link)" v-for="(item,sort) in items" :key="sort" :href="item.link">
			   <a href:="#">
				   <img class="" :src="item.image" alt="">
			   </a>
			   <h4>{{item.title}}</h4>
		   </li>
	   </ul>
	  <app-nav></app-nav>  
   </div>
  
</template>

<script>
export default {
   name: 'Classify',
   data(){
	   return {
		   items:[]
	   }
   },
   methods:{
	   getClassify(){
		   this.$http.get('/mls/venus/mce/v1/urlChange/pc',{
			   params:{
				   pid: 20783,
				   channel:'wap',
				   page: 1,
				   pageSize: 30,
				//    _: 1533094985340
			   }
		   }).then(res => {
			   this.items = res.data.value;
			  
		   })
	    },
	    selectClas(link){
		    var x  =link.indexOf('?')
		    var y =''
		    y=link
		    var url =y.substr(x+1)
		    var arr = url.split('&')
		    var obj = {}; 
			arr.forEach((item)=>{
				obj[item.split('=')[0]]	= item.split('=')[1]		
			})
			console.log(obj)
			if(obj.pid){
				this.$router.push({
					path:'/sencondcla',
					query:{
					    pid:obj.pid,
					}
		  		})
			}
			else{
				this.$router.push({
					path:'/sencondcla',
					query:{
					    fcid:obj.fcid,
					}
		  		})
			}		   
	    }
    },
   created(){
	   this.getClassify()
   }
}
</script>
<style scoped lang="scss">
	.classify{
		
		h2{
			color: #333;
			font-size: 0.16rem;
			font-weight: normal;
			padding:10px;
		}
		ul{
			display:flex;
			flex-wrap:wrap;
			overflow:hidden;
			border-left:1px solid #ddd;
			border-top:1px solid #ddd;
			li{
				flex:1;
				height:1.22rem;
				border-right:1px solid #ddd;
				border-bottom:1px solid #ddd;
				text-align:center;
				
				a{
					img{
						width:0.8rem;
						height:0.92rem;
						
					}
				}
				h4{
					text-align:center;
					margin-top:8px;
					margin-bottom:8px;
					font-size:14px;
				}
			}
		}
	}
</style>
