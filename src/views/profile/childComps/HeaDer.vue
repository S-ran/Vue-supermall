<template>
      <div class="header">
        <div class='avatar'>
         <img src="~assets/img/profile/avatar.png" alt="">
         
        </div>
        <div class='login-info'>
            <div class='login'>登录/注册</div>
            <div class='phone'>
            <img src="~assets/img/profile/phone.png" alt="">
            暂无绑定手机号
            </div>
        </div>
        <div class='arrow'>
            <img src="~assets/img/profile/arrow-right.png" alt="">
        </div>
    </div>
</template>

<script>
    export default{
        name:'HeaDer',
        
}
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  background:var(--color-tint);
  height: 90px;
  padding: 2px 6px;
  color: #fff;
}
.avatar{
  padding-top: 10px;
}
.avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background: #f2f2f2;
  vertical-align: middle;
}

.login-info {
  vertical-align: middle;
  margin-left: 7px;
}

.login-info .login {
  font-size: 20px;
  margin-top: 20px;
}

.login-info .phone {
  font-size: 6px;
  margin-top: 8px;
}

.phone img {
  width: 15px;
  height: 15px;
  vertical-align: middle;
  position: relative;
  bottom: 2px;
}

.arrow {
  position: absolute;
  right: 13px;
  margin-top: 33px;
}

.arrow img {
  width: 30px;
  height: 30px;
}
</style>