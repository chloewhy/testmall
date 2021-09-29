<template>
  <div class="profile-item">
    <div>
      <img src="~assets/img/profile/message.svg" alt="">
      <span>我的消息</span>
    </div>
    <div>
      <img src="~assets/img/profile/integration.svg" alt="">
      <span>积分商城</span>
    </div>
    <div>
      <img src="~assets/img/profile/vip.svg" alt="">
      <span>会员中心</span>
    </div>
    <div>
      <img src="~assets/img/profile/redpacket.svg" alt="">
      <span>红包卡券</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileItem"
}
</script>

<style>
  .profile-item {
    font-size: 13px;
  }
  .profile-item div {
    height: 35px;
    margin-top: 10px;
    border-bottom: 3px solid #eeeeec;
  }
  .profile-item img {
    margin-left: 10px;
    width: 20px;
    height: 20px;
  }
  .profile-item span {
    position: absolute;
    margin-left: 8px;
    margin-top: 4px;
  }
</style>