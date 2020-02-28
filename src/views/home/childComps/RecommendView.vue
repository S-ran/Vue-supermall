<template>
    <div class="recommendre">
        <div v-for="(item, index) in recommends" :key="index" class="recommendre-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default{
        name:'RecommendView',
        props:{
            recommends:{
                type:Array,
                default(){
                    return []
                }
            }
        }
}
</script>

<style scoped>
    .recommendre{
        display: flex;
        text-align: center;
        font-size: 12px;
        padding: 15px 0 15px 0;
        border-bottom: 10px solid #cccccc
    }
    .recommendre-item{
        flex: 1;  
    }
    img {
        width: 65px;
        margin-bottom: 10px;

    }
</style>