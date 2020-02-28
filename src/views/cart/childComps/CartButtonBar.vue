<template>
    <div class="bottom-bar">
        <div class="check-content" >
            <check-button :isActive="isSelectAll" class="button" @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="price">
            合计:{{totalPrice}}    
        </div>  
        <div class="calculate" @click="calcClick">
            去算帐:({{checkLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'  //mapGetters 辅助函数,将stroe中的getters映射到局部的计算属性

    export default{
        name:'CartButtonBar',
        components:{
            CheckButton
        },
        data(){
            return{          
            }
        },
        computed:{
            ...mapGetters(['cartList']),//将该函数导出
            totalPrice(){               //算帐            
                return '￥'+this.cartList.filter(item =>{
                    return item.checked //遍历返回勾选商品
                }).reduce((preValue,item) =>{   
                    return preValue+item.price*item.count //返回勾选商品总价格
                },0).toFixed(2)  //保留两位小数
            },
            checkLength(){//返回种类数量
                //遍历每项物品的checked属性，为真的(勾选的)返回该数组长度
                return this.cartList.filter(item => {return item.checked}).length
            },
            isSelectAll(){  
                if(this.cartList.length===0)
                return false          
                // return !(this.cartList.filter(item => {return !item.checked}).length)
                //查找方法如果有值返回该值并停止遍历这里取反如果有值取反返回空false且再次取反为ture
                return !this.cartList.find(item => !item.checked)
                
            }

        },
        methods:{
            checkClick(){ //点击全选        
                if(this.isSelectAll){  //如果有商品
                    this.cartList.forEach(item => item.checked = false) //将每个商品checked属性取false，改变样式

                }else{
                    this.cartList.forEach(item => item.checked = true) //将每个商品checked属性取true，改变样式
                }
            },
            calcClick(){  //点击算帐
                if(!this.isSelectAll){
                 this.$toast.Get_show('请选择购买的商品',1400)    //提示框
                }
                else{
                    this.$store.commit('clearCartList')          //清空
                }
            }
        }
        
}
</script>

<style scoped>
 .bottom-bar{
     position: relative;
     height: 40px;
     background-color: #eee;
     line-height: 40px;
     display: flex;
 }
 .check-content{
     flex: 4;
    display: flex;
    align-items: center;
    margin-left: 10px;
 }
 .button{
     width: 22px;
     height: 22px;
     line-height: 22px;
     margin-right: 5px;
 }
 .price{
     flex: 8;
     margin-left: 15px;
 }
 .calculate{
     background-color: orange;
     flex: 6;
     text-align: center;
     background-color: red;
     color: #fff
 }

</style>