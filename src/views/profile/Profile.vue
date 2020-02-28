<template>
   <div class="profile">
        <nav-bar class="nav-bar"><div slot="center">我的</div></nav-bar>  
        <div class="active">
            <hea-der />
            <info/>
            <list-view :infos="orderList"/>
            <list-view :infos="serviceList"/>
        </div>
   </div>
</template>

<script>
import HeaDer from './childComps/HeaDer'
 import Info from './childComps/Info'
 import ListView from './childComps/List-view'

import NavBar from 'components/common/navbar/NavBar'

    export default{
        name:'Profile',
        data(){
            return{
                orderList: [
                    { icon: require('../../assets/img/profile/message.png'), info: '我的消息' },
                    { icon: require('../../assets/img/profile/pointer.png'), info: '积分商城' },
                    { icon: require('../../assets/img/profile/vip.png'), info: '会员卡' },
                ],
                serviceList: [
                    { icon: require('../../assets/img/profile/cart.png'), info: '我的购物车' },
                    { icon: require('../../assets/img/profile/app.png'), info: '下载购物APP' },
                ]
            }
        },
        components:{
            HeaDer,
            Info,
            ListView,
            NavBar
        }
}
</script>

<style scoped>
.profile {
     height: 100%;
    
}
.active{
     padding-top: 44px; 
}
.nav-bar {  
       position: fixed;
       background-color: var(--color-tint);
       left: 0;
       top: 0;
       right: 0;
       z-index: 9;
  } 
</style>