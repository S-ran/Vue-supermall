import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'

export default {
    addCart(context,payload){
       return new Promise((resolve,reject) => {
            //payload中添加的新物品
        let oldProduct = null;
        //1.遍历所有商品有跟之前一样的返回一个数组
        // for (let item of state.cartList){
        //     if(item.iid===payload.iid){
        //         oldProduct = item
        //     }
        // }
        //2.查找之前的商品有一样的则返回
        oldProduct = context.state.cartList.find(item => item.iid === payload.iid)      
        //判断oldProduct是否存在这一件商品
        if(oldProduct){
            //存在商品加1
            //oldProduct.count += 1; 
            context.commit(ADD_COUNTER,oldProduct)
            resolve('数量加1') 
        }
        else{
            payload.count = 1;
            context.commit(ADD_TO_CART,payload)
            resolve('添加了新的商品')     
        }
       })
       
    }
}