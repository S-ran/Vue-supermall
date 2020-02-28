<template>
    <scroll class="content">
        <div class='subcategory'>
            <div class="item" v-for="(item,index) in subCategories" :key="index">
                   <img :src="item.image"/>
                   <div>{{item.title}}</div> 
            </div>
        </div>
        <div>
            <goods-list :goods="categoryDetail" />
        </div>
    </scroll> 
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

    export default{
        name:'Det',
         props:{
             subCategories:{
                 type:Array,
                 defaul(){
                     return []
                 }
             },
             categoryDetail:{
                 type:Array,
                 defaul(){
                     return []
                 }   
             }  
        },
        components:{
            Scroll,
            GoodsList
        }
        
}
</script>

<style scoped>
.content{
    height: 100%; 
}
.subcategory {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin-top: 15px;
}

.subcategory .item {
  width: 33.33%;
  text-align: center;
}

.subcategory .item img {
  width: 80%;
}

.subcategory .item div {
  font-size: 10px;
  margin: 30px 0;
}
</style>