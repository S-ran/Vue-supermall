<template>
    <div class="category">   
            <nav-bar class="nav-bar"><div slot="center">分类流行</div></nav-bar>  
            <title-item class="left" :categories="categories" @onclick="onclick" />
            <det class="right" :subCategories="categoryData[currentIndex].subCategories"
                               :categoryDetail="categoryData[currentIndex].categoryDetail"/>
    </div>
</template>

<script>
import TitleItem from './childComps/Title'
import Det from './childComps/Det'

import NavBar from 'components/common/navbar/NavBar'

import { getCategory,
         getSubcategory,
         getCategoryDetail} from '../../network/category'

    export default{
        name:'Category',
        data(){
            return{
                categories: [], //分类标题
                categoryData: {},//详情数据
                currentIndex: 0, //点击索引
            }
        },
        components:{
            TitleItem,Det,NavBar
        },
        mounted(){
            //数据请求
            this._getData()
        },
        methods:{
            //----------------数据请求------------------  
            _getData(){
                //请求总数据
                getCategory().then(res => {
                //标题数据
                //console.log(res)
                const categories = res.data.data.category.list
                //定义变量接收分类数据
                const categoryDate = {}
                //初始化该变量使得有对应的属性
                for (let i=0;i<categories.length;i++) {
                    categoryDate[i] = {
                        subCategories: [],  //子页面小图片详情
                        categoryDetail: []  //子页面图片详情
                    }
                }
                //初始化本地数据
                this.categories = categories
                this.categoryData = categoryDate
                 //请求第一个子页面分类数据
                 this._getSubcategory(0)
                 this._getCategoryDetail(0)
                })  
            },
             _getSubcategory(index){
                const key = this.categories[index].maitKey;//获取index对应的maitKey请求数据
                getSubcategory(key).then(res =>{
                    const detailData = this.categoryData;    //定义一个变量等于本地categoryData
                    detailData[index].subCategories = res.data.data.list //将对应索引的subCategories属性设置为接收的数据                
                    this.categoryData=detailData  //设置本地数据
                }).catch(err => { console.log(err) })
            },
            //请求第一个子页面分类详情数据
            _getCategoryDetail(index){
                const key = this.categories[index].miniWallkey;//获取index对应的miniWallkey请求数据
                getCategoryDetail(key,'pop').then(res =>{
                const detailDate = this.categoryData   // 定义一个变量等于本地categoryData
                detailDate[index].categoryDetail = res.data //将对应索引的categoryDetail属性设置为接收的数据                  
                  this.categoryData=detailDate //设置本地数据
                }).catch(err => { console.log(err) })
            },




            onclick(index){
                this.currentIndex=index
                this._getSubcategory(index)
                this._getCategoryDetail(index)
            }
        }
        
}
</script>

<style scoped>
.category{
    padding-top: 44px; 
    height: calc(100vh - 96px);
}

.left {
  width: 30%;
}
.right {
  width: 70%;
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