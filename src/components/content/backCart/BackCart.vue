<template>
  <div class="back-cart">
     <img src="~assets/img/tabbar/cart_active.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackCart"
}
</script>

<style>
   .back-cart {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
  .back-cart img {
    width: 30px;
    height: 30px;
    background-color: snow;
    border-radius: 50%;
  }
</style>