<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar> 
    <cart-list/>
    <cart-buttom-bar/>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import {mapGetters} from 'vuex'
import CartList from './childComps/CartList.vue'
import CartButtomBar from './childComps/CartButtomBar.vue'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList ,
    CartButtomBar
  },
  computed: {
    //可以直接用计算属性，或用mapGetters(将store中getters映射到计算属性) 
   ...mapGetters(['cartLength'])
  }
}
</script>

<style>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint) ;
    color: #fff;
    font-weight: 500;
  }
</style>