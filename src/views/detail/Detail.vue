<template>
    <div id="detail">
      <datail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
          <datail-swiper :top-images="topImages"> </datail-swiper>
          <detail-base-info :goods="goods"/>
          <detail-shop-info :shop="shop"/>
          <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
          <detail-param-info ref="params" :param-info="paramInfo" />
          <datail-comment-info ref="comment" :comment-info="commentInfo" />
          <goods-list ref="recommed" :goods="recommends"/>
      </scroll>
       <datail-bottom-bar @addToCart="addToCart"/>
       <back-top @click.native="backClick" v-show="isShow"/>
    </div>
</template>

<script>
import DatailNavBar from './childComps/DatailNavBar'
import DatailSwiper from './childComps/DatailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DatailCommentInfo from './childComps/DatailCommentInfo'
import DatailBottomBar    from  './childComps/DatailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {Debounce,itemListenerMixin,backTopMixin} from 'common/mixs'

import {mapActions} from 'vuex'

    export default{
        name:'Detail',
        components:{
            DatailNavBar,
            DatailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DatailCommentInfo,
            GoodsList,
            DatailBottomBar,

            Scroll,
        },
        data(){
            return{
                iid:null,       //商品总数据
                topImages:[],   //轮播图数据
                goods:{},       //商品信息数据
                shop:{},        //店铺信息数据
                detailInfo:{},  //商品详情数据
                paramInfo:{},   //参数信息数据
                commentInfo:{}, //评论信息数据
                recommends:[],  //推荐数据
                themeTopYs:[],  //各数据分界Y轴值
                getThemeTopY:null,  //
                positionInY:0,      //获取动态分界Y轴值
                curerentIndex:0,    //判断是哪个分解点
            }
        },      
        created(){
            //保存传入的iid
            this.iid = this.$route.params.iid;
            //根据iid请求详情数据
            getDetail(this.iid).then(res => {
                
                const data = res.data.result;
                //获取轮播图数据
                this.topImages = data.itemInfo.topImages
                //获取商品信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                //获取店铺信息对象
                this.shop = new Shop(data.shopInfo)
                //获取商品详情数据
                this.detailInfo = data.detailInfo
                //获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
                //取出评论信息
                if(data.rate.cRate!==0){
                    this.commentInfo = data.rate.list[0] 
                }
   
            }),
                //请求推荐数据
                getRecommend().then(res =>{
                    this.recommends = res.data.data.list
                })

        },
        mixins:[itemListenerMixin,backTopMixin],//混入写法监听是否加载完,回顶函数
        mounted(){
            //监听goodsItem中的图片加载完成,消抖处理
            // let refresh = Debounce(this.$refs.scroll.refresh,100)
            // //对监听事件进行保存
            //  this.itemImg = () =>{
            //     refresh()
            // }
            // this.$bus.$on('itemImageLoad',this.itemImg)

        },
        destroyed(){
            //取消全局事件监听
            this.$bus.$off('itemImageLoad',this.itemImg)
        },
        methods:{
            //映射store的acyions异步操作对象
            ...mapActions(['addCart']),
            //主页数据加载完确定的最终top
            imageLoad(){
                // this.$refs.scroll.refresh()
                let refresh = Debounce(this.$refs.scroll.refresh,100)
                this.$bus.$on('itemImageLoad',this.itemImg)
                 this.themeTopYs = [];
                        this.themeTopYs.push(0);
                        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                        this.themeTopYs.push(this.$refs.recommed.$el.offsetTop);
                        this.themeTopYs.push(Number.MAX_VALUE)
                        console.log(this.themeTopYs);
            },
            titleClick(index){//点击到达指定锚点
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
            },
            contentScroll(position){ //监听滑动对齐标题
                const positionInY = -position.y
                // console.log(positionInY);
                // console.log(this.themeTopYis[0]+','+this.themeTopYs[3]);
                let length = this.themeTopYs.length
                for(let i=0; i< length; i++){
                    // if(this.curerentIndex!==i && ((i<length-1&&positionInY >= this.themeTopYs[i] && 
                    //  positionInY < this.themeTopYs[i+1])||(i===length-1 && positionInY > this.themeTopYs[i] )))
                    //{
                    //     this.curerentIndex = i;
                    //     console.log(this.curerentIndex);       
                    //     this.$refs.nav.currentIndex = this.curerentIndex
                    // } 
                    if(this.curerentIndex !== i && (positionInY >= this.themeTopYs[i] && 
                      positionInY <= this.themeTopYs[i+1])){
                          this.curerentIndex = i;       
                          this.$refs.nav.currentIndex = this.curerentIndex
                      }
                }
               this.listenShowbackTop(position);
            },
            addToCart(){
                
                //获取购物车要展示的信息
                const product = {};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                 product.iid = this.iid;
                //2.将商品添加到购物车            
                //this.$store.commit('addCart',product)             
                // this.$store.dispatch('addCart',product).then(res =>{
                //     console.log(res);
                // })
                this.addCart(product).then(res =>{
                    console.log( this.$toast);
                    this.$toast.Get_show(res,2000)  //提示框
                })
            }     
        },
}
</script>

<style scoped>
#detail{
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: white
}
.detail-nav{
    position: relative;
    z-index: 9;
    background-color: white
}
.content{
     height: calc(100% - 93px);
}
</style>