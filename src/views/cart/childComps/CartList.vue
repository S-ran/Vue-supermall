<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <cart-list-item v-for="(item, index) in list" :key="index" :product="item"> 
            </cart-list-item>
        </scroll>
    </div>
</template>

<script>
import CartListItem from './CartListItem'

import Scroll from 'components/common/scroll/Scroll'

import {mapGetters} from 'vuex'  //mapGetters 辅助函数,将stroe中的getters映射到局部的计算属性

    export default{
        name:'CartList',
        components:{
            Scroll,

            CartListItem
        },
        computed:{
           ...mapGetters({
               list:'cartList'
           })
        },
        activated(){
            this.$refs.scroll.refresh()
        }
        
}
</script>

<style scoped>
.cart-list{
    height: calc(100% - 93px - 40px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>