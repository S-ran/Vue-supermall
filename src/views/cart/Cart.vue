<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <cart-list/>
        <cart-button-bar />
    </div>
</template>

<script>
import CartList from './childComps/CartList'
import CartButtonBar from './childComps/CartButtonBar'

import NavBar from 'components/common/navbar/NavBar'

import {mapGetters} from 'vuex'  //mapGetters 辅助函数,将stroe中的getters映射到局部的计算属性

    export default{
        name:'Cart',
        components:{
            NavBar,
            CartList,
            CartButtonBar
        },
        computed:{
            //一般写法
            // cartLength(){
            //     return this.$store.getters.cartLength
            // }
            //解构写法,直接调用方法,两种写法
            //(数组[一一对应getters里的函数],对象{自定义名称以及对应的方法})
            // ...mapGetters(['cartLength'])
            ...mapGetters({
                length:'cartLength',
            })
        }
}
</script>

<style scoped>
.cart{
    height: 100vh;
}
.nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: bold;
}
</style>