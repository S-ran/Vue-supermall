<template>
         <scroll class="title">
            <div :class="{active:currentIndex==index}" 
                 v-for="(item,index) in categories" 
                 :key="index"
                 @click="onClick(index)">
                <div class="item" >{{item.title}}</div>
            </div>   
        </scroll> 
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

    export default{
        name:'Title',
        data(){
            return{
                currentIndex: 0
            }
        },
        props:{
             categories:{
                 type:Array,
                 defaul(){
                     return []
                 }
             }  
        },
        components:{
            Scroll
        },
        mounted(){
           console.log(this.categories)     
        },
        methods:{
           onClick(index){
               this.currentIndex=index
               this.$emit('onclick',index)
           }
        }
      
}
</script>

<style scoped>
.title{
    height: 100%; 
}
.item {
  height: 46px;
  line-height: 45px;
  text-align: center;
}
.active {
  color: #c800f0;
  font-weight: 700;
  background: #eee;
  border-left: 3px solid #c800f0;
  border-bottom: 3px solid #c800f0;
}
</style>