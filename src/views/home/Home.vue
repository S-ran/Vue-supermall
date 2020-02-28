<template>
    <div id="home">
        <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
         <tab-control class="tab-control act" :titles="['流行','新款','精选']" 
         @tabClick="tabClick" v-show="isShowtop" ref="topTabConotrol"/>
            <scroll class="content" ref="scroll" :probe-type="3" 
                    @scroll="contentScroll" :pull-up-load="true"
                    @pullingUp="loadMore"  >
                <home-swiper :banners="banners"/>
                <recommend-view :recommends="recommends"/>
                <feature-view/> 
                <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabConotrol"/>
                <goods-list :goods="showGoods"/>
            </scroll>
        <back-top @click.native="backClick" v-show="isShow"/>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl' 
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'


import {getHomeMultidata,getHomeGoods} from "network/home"
import {Debounce,itemListenerMixin,backTopMixin} from 'common/mixs'

export default{
        name:'Home',
        components:{
            NavBar,         //导航条组件
            TabControl,     //三大分类导航条组件
            GoodsList,      //三大分类数据组件
            Scroll,         //滑动组件

            HomeSwiper,     //轮播图组件
            RecommendView,  //轮播图下面的组件
            FeatureView,    //本周流行

        },
        data(){
            return{
                banners:[],//轮播图数据
                recommends:[],//轮播图下面的数据
                goods:{//请求的三大分类的数据
                    'pop':{page:0,list:[]},
                    'new':{page:0,list:[]},
                    'sell':{page:0,list:[]}
                },
                currentType:'pop',//网络请求三大分类
                isShowtop:false,  //假三
                saveY:0,
               
            }
        },
        computed:{
            showGoods(){//给子组件某个分类返回一个当前分类的数据展示
                return this.goods[this.currentType].list
            }
        },
        created(){
             //请求多个数据
            this.getHomeMultidata();

             //请求商品数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');

            
            
        },
        mixins:[itemListenerMixin,backTopMixin],//混入写法监听是否加载完,回顶函数
        mounted(){

        },
        methods:{
              /*****************事件监听相关代码************************/
              tabClick(index){ //子组件点击时通过index值请求相关分类数据
                 switch(index){
                     case 0:this.currentType = 'pop'; break;
                     case 1:this.currentType = 'new'; break;
                     case 2:this.currentType = 'sell'; break;
                 }
                //让两个top一致curentIndex
                this.$refs.topTabConotrol.curentIndex = index;
                this.$refs.tabConotrol.curentIndex = index;
              },
              //上拉标显示通过soclltoll的监听偏移值
              contentScroll(position){
                  this.listenShowbackTop(position);
                  position.y<-535?this.isShowtop=true:this.isShowtop=false;              
              },
              //加载更多
              loadMore(){
                  this.getHomeGoods(this.currentType);//调用该方法,继续请求当前分类的数据
                  this.$refs.scroll.finishPullUp();//调用soroll的该方法,再次触发下拉事件
              },
            /*****************网络请求相关代码************************/
            getHomeMultidata(){
                //请求多个数据
                getHomeMultidata().then(res =>{  
                this.banners=res.data.data.banner.list;
                this.recommends=res.data.data.recommend.list;     
            })
            },
            getHomeGoods(type){
                //请求商品数据
                const page = this.goods[type].page+1;
                getHomeGoods(type,page).then(res =>{
                this.goods[type].list.push(...res.data.data.list)
                this.goods[type].page++;
                })
            } 
        },
  
        activated(){
            //console.log(this.saveY);
            this.$refs.scroll.scrollTo(0,this.saveY)  //再次活跃到达刚刚保存的y位置 
            // this.$refs.scroll.refresh()
        },
        deactivated(){//将上一次滚动的值保存至deta
            this.saveY = this.$refs.scroll.getScrollY()    
            //取消全局事件监听
            this.$bus.$off('itemImageLoad',this.itemImg)
        }
        
}
</script>

<style scoped>
    #home{
          padding-top: 44px;  
          height: calc(100% - 49px); 
    }
  .nav-bar {
       position: fixed;
       background-color: var(--color-tint);
        left: 0;
        top: 0;
        right: 0;
        z-index: 9;
  } 
 
.tab-control{
    position: sticky;
    top:44px;
}
.content{
    height: 100% ;
    overflow: hidden;
    /* position: absolute;
    top: 44px;bottom: 54px;
    left: 0;right: 0; */
}
.act{
    z-index: 9;
}
</style>