<template>
    <div>
         <nav-bar >
             <div slot="left" class="back" @click="backClick">
                 <img src="../../../assets/img/common/top.png" alt="">
             </div>
             <div slot="center" class="title">
                 <div v-for=" (item,index) in titles" :key="item" class="title-item" 
                 :class="{active:currentIndex==index}" @click="titleClick(index)">
                     {{item}}
                 </div>
             </div> 
         </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

    export default{
        name:'DatailNavBar',
        components:{
            NavBar
        },
        data(){
            return{
                titles:['商品','参数','评论','推荐'],
                currentIndex:0
            }
        },
        methods:{
            titleClick(index){
                this.currentIndex=index;
                this.$emit('titleClick',index)
            },
            backClick(){
                this.$router.back()
            }
        }
}
</script>

<style scoped>
.title{
    display: flex;
    font-size: 12px;
}
.title-item{
    flex:1;
}
.active{
    color:var(--color-high-text)
}
.back img {
    width: 36px;height: 36px;
    margin-top:13px; 
    transform-origin: center; 
    transform: rotate(-90deg);
    margin: 6px auto;
}
</style>