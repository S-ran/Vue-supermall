<template>
    <div class="goods-item" @click="itemClick">
        <img v-lazy="showImage"  alt="" @load="imageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}&nbsp;&nbsp;&nbsp;</span> 
           <span>
            <span class="fa fa-anchor" style="color:pink;"/>
           {{goodsItem.cfav}}
           </span>         
        </div>
    </div>
</template>

<script>
    export default{
        name:'GoodsListItem',
        props:{
            goodsItem:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
       computed:{
            showImage(){
                if(this.goodsItem.img){return this.goodsItem.img}else{
                    return this.goodsItem.image || this.goodsItem.show.img 
                } 
            }
        },
        methods:{
            imageLoad(){   
                 this.$bus.$emit('itemImageLoad')            
                // if(this.$route.path.indexOf('/home')){
                // this.$bus.$emit('homeitemImageLoad')  
                // console.log('----');
                   
                // }
                // else if(this.$route.path.indexOf('/detail')){
                //     this.$bus.$emit('detailitemImageLoad')
                //      console.log('----');
                // }
            },
            itemClick(){       
                this.$router.push('/detail/'+ this.goodsItem.iid)
            }
        }
}
</script>

<style scoped>
@import '../../../assets/css/font-awesome.css';
.goods-item{
    width: 45%;height: 30%;
    text-align: center;
    margin: auto 0;
    border: so
}
img{
    width: 100%; 
    border-radius:6px;     
}
p{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.price{
    color: var(--color-high-text);
}

</style>