<template>
  <div class="order">
    <div class="order-title">
      <div>我的订单</div>
      <div>全部></div>
    </div>
    <div class="order-item">
      <div>
        <img src="~assets/img/profile/pay.svg" alt="">
        <div>待付款</div>
      </div>  
      <div>
        <img src="~assets/img/profile/send.svg" alt="">
        <div>待发货</div>
      </div>
      <div>
        <img src="~assets/img/profile/deliver.svg" alt="">
        <div>待收货</div>
      </div>
      <div>
        <img src="~assets/img/profile/evaluate.svg" alt="">
        <div>待评价</div>
      </div>
      <div>
        <img src="~assets/img/profile/refund.svg" alt="">
        <div>退款/售后</div>
      </div> 
    </div>
  </div>
</template>

<script>

export default {
  name: "ProfileOrder",
}
</script>

<style scoped>
 .order {
    margin-top: 10px;
    border-bottom: 15px solid #f2f5f8;
  }
  .order-title {
    margin-left: 5px;
    display: flex;
    justify-content: space-between;
  }
  .order-item {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    text-align: center;
    margin-top: 15px;
    margin-left: 5px;
  }
</style>