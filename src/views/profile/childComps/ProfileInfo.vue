<template>
  <div class="profile-info">
    <div class="info-log">
        <img src="~assets/img/profile/log.svg" alt="" class="person">
        <span>登录/注册</span>
        <img src="~assets/img/profile/set.svg" alt="" class ="set">
    </div>
    <div class="info-item">
      <div class="item">
        <img src="~assets/img/profile/favor.svg" alt="">
        <div>收藏</div>
      </div>  
      <div class="item">
        <img src="~assets/img/profile/shop.svg" alt="">
        <div>订阅店铺</div>
      </div>
      <div class="item">
        <img src="~assets/img/profile/footprint.svg" alt="">
        <div>足迹</div>
      </div>
      <div class="item">
        <img src="~assets/img/profile/money_bag.svg" alt="">
        <div>零钱</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileInfo",
}
</script>

<style scoped>
  .profile-info {
    /* height: 60px; */
    position: relative;
    background-color: var(--color-tint);
    line-height: 30px;
  }
  .info-log {
    display: flex;
  }
  .person {
    width: 45px;
    height: 45px;
    border-radius: 50%;  
    margin-left: 20px;
  }
  .set {
    width: 25px;
    height: 25px;
    margin-left: auto;
  }
  .profile-info span {
    font-size: 14px;
    margin-left: 15px;
  }
  .info-item {
    width: 70%;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    text-align: center;
    margin-top: 15px;
    margin-left: 40px;
  }
  .item img{
    width: 25px;
    height: 25px;
  }

</style>