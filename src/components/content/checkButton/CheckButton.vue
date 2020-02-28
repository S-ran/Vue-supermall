<template>
    <div class="check-button" :class="{active:isActive}">
        <!-- <div class="fa fa-ofcheck-square-o"/> -->
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
    export default{
        name:'CheckButton',
        props:{
            isActive:{
                type:Boolean,
                default:false
            }
        }
}
</script>

<style scoped>
@import '../../../assets/css/font-awesome.css';
.check-button{
    background-color: #aaa;
    border-radius:50%; 
    border: 2px solid #aaa;
}
.check-button img{
    width: 16px;
    height: 16px;
}
.active{
    background-color: red;
    border: 2px solid red;
}
</style>