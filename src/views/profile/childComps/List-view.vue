<template>
  <div class='list-view'>
    <div v-for="(item,index) in infos" :key="index">
      <div class='list-item'>
          <img :src="item.icon" alt="">
        <span>{{item.info}}</span>
      </div>
    </div>
 
  </div>
</template>

<script>
    export default{
        name:'List',
        props:{
            infos: {
                type: Array,
                defaul(){
                    return []
                }
             }
        }
}
</script>

<style scoped>
.list-view {
  border-top: 17px solid #f8f8f8;
}

.list-item {
  height: 50px;
  line-height: 60px;
  background: #fff;
  font-size: 16px;
  margin-left: 15px;
  border-bottom: 1px solid #f8f8f8;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.list-item text {
  vertical-align: middle;
  margin-left: 8px;
}
</style>