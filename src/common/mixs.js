import BackTop from 'components/content/backTop/BackTop'
 /*********************防抖代码************************/
export function Debounce(func,delay){
    let timer = null
    return function(...args){
        if(timer)clearTimeout(timer)
        timer =setTimeout(() =>{
            func.apply(this,args)
        },delay)
    }
}
//混入消抖
export const itemListenerMixin = {
    data(){
        return{
            itemImg:null
        }
    },
    mounted(){
        //监听goodsItem中的图片加载完成,消抖处理
        let refresh = Debounce(this.$refs.scroll.refresh,100)
        //对监听事件进行保存
         this.itemImg = () =>{
            refresh()
        }
        this.$bus.$on('itemImageLoad',this.itemImg)
        // console.log('我来加载了');     
    }
}
//混入回顶
export const backTopMixin = {
    data(){
        return{
            isShow:false,       //回顶显示  
        }
    },
    components:{
        BackTop
    },
    methods:{
        //上拉标绑定的事件，通过soclltoll的该方法进行回顶(利用修饰符直接绑定组件事件)
        backClick(){
         this.$refs.scroll.scrollTo(0,0)  
        }, 
        listenShowbackTop(position){
            position.y<-2000?this.isShow=true:this.isShow=false; 
       } 
    }
}