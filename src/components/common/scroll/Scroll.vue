<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
              <slot>  </slot>
        </div>
      
    </div>
</template>

<script>
import BScroll from 'better-scroll'
    export default{
        name:'Scroll',
        data(){
            return{
                scroll:null
            }
        },
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        mounted(){
            //创建监听对象
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad
            })
      
            //监听滚动位置
            this.scroll.on('scroll',(position) => {
                this.$emit('scroll',position)          
            })

            //监听上拉事件
             this.scroll.on('pullingUp',(position) => {
              this.$emit('pullingUp',position)       
                         
            })
        },
        methods:{
            scrollTo(x,y,time=300){ //调用该方法回顶
                this.scroll.scrollTo(x,y,time)
            },
            finishPullUp(){
                //调用该方法才能继续触发监听上拉事件
                this.scroll.finishPullUp()
            },
            refresh(){ //调用该方法确定最终可拉框的距离  
            console.log('--');
                this.scroll.refresh()
            },
            getScrollY(){
                return this.scroll ? this.scroll.y : 0
            }
        }
}
</script>

<style scoped>

</style>