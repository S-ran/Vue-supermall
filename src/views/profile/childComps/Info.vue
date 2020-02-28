<template>
<div class='info'>
      <div class='info-money info-item'>
        <div>
          <span class='count'>0.00</span>
          <span>元</span>
        </div>
      <div>我的余额</div>
    </div>
      <div class='info-discount info-item'>
          <div>
            <span class='count'>0</span>
            <span>个</span>
          </div>
      <div>我的优惠</div>
    </div>
    <div class='info-pointer info-item'>
      <div>
        <span class='count'>0</span>
        <span>分</span>
      </div>
      <div>我的积分</div>
    </div>
</div>


</template>

<script>
    export default{
        name:'Info',
        
}
</script>

<style scoped>
.info {
  display: flex;
  font-size: 28rpx;
  text-align: center;
  justify-content: space-between;
  background: #f8f8f8;
}

.info-item {
  width: 33%;
  background: #fff;
  padding: 14px 0;
}

.count {
  color: var(--color-tint);
  font-size: 40rpx;
  font-weight: 700;
  line-height: 1.5;
}
</style>