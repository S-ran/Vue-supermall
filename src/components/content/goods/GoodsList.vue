<template>
    <div class="goods">
        <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
    </div>
</template>

<script>
import GoodsListItem from './GoodListItem'

    export default{
        name:'GoodsList',
        components:{
            GoodsListItem
        },
        props:{
            goods:{
                type:Array,
                default(){
                    return []
                }
            }
        }
}
</script>

<style scoped>
.goods{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-flow: wrap row;
    padding: 0 1%;
}
</style>