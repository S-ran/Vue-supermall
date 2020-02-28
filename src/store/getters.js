export default{
    cartLength(state){ //获取商品种类数量
        return state.cartList.length
    },
    cartList(state){   //获取商品数组
        return state.cartList
    }
}