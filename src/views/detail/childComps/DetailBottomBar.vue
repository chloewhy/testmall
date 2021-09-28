<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <img src="~assets/img/bottombar/service.svg" alt="" class="img">
        <span class="text">客服</span>
      </div>
      <div>
        <img src="~assets/img/bottombar/shop.svg" alt="" class="img">
        <span class="text">店铺</span>
      </div>
      <div>
        <img src="~assets/img/bottombar/select.svg" alt="" class="img">
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
    <!-- <sport-ball ref="ball" class="sport-ball"></sport-ball> -->
  </div>
</template>

<script>
export default {
  name : "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
 .bottom-bar {
   height: 55px;
   background-color: #fff;
   position: fixed;
   left: 0;
   right: 0;
   bottom: 0;
   
   display: flex;
   text-align: center; 
 }
 .bar-item {
   flex: 1;
   display: flex;
 }
 .bar-item>div {
   flex: 1;
 }
 .bar-item div i {
   width: 26px;
   height: 22px;
 }
 .bar-left .text {
   font-size: 13px;
 }
 /* .bar-left .icon {
   display: block;
   width: 22px;
   height: 22px;
   margin: 10px auto 3px;
 } */
 .bar-left .img {
   display: block;
   width: 23px;
   height: 23px;
   margin: 10px auto 3px;
   /* background: url(~assets/img/bottombar/service.svg); */
   /* background-position: 0 -54px; */
 }
 /* .bar-left .shop {
   width: 22px;
   height: 22px;
   background: url(~assets/img/bottombar/shop.svg);
   background-position: 0 -98px;
 }
 .bar-left .select {
   background: url(~assets/img/bottombar/select.svg);
 } */
 .bar-right {
   font-size: 15px;
   color: #fff;
   line-height: 55px;
 }
 .bar-right .cart {
   background-color: #ffe817;
   color:#333;
 }
 .bar-right .buy {
   background-color: #f69;
 }
 /* .sport-ball {
   position: absolute;
   left: 225px;
   bottom: 20px;
 } */
</style>