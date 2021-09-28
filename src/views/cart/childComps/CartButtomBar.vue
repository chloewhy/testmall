<template>
  <div class="buttom-bar">
    <div class="check-all">
      <check-button :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计:
      <span>{{totalPrice}}</span>
    </div>
    <div class="calc">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: "CartButtomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.getters.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.$store.getters.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.$store.getters.cartList.length === 0) return false
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      return !this.$store.getters.cartList.find(item => !item.checked)
    }
  },
 methods: {
    checkClick() {
      if(this.isSelectAll) { //全部选中
        this.$store.getters.cartList.forEach(item => item.checked = false)
      } else {
        this.$store.getters.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>

<style scoped>
 .buttom-bar {
    height: 30px;
    position: relative;
    display: flex;
    background-color: #eee;
    line-height: 30px;
 }
 .check-all {
  display: flex;
  margin-left: 10px;
   /* align-items: center; */
 }
 .check-all span {
   font-size: 13px;
   width: 38px;
   margin-left: 5px;
 }
 /* .button {
   width: 35px;
   height: 35px;
   line-height: 30px;
 } */
 .total-price {
   font-size: 13px;
   margin-left: 15px;
 }
 .total-price span {
   color: orangered;
 }
 .calc {
   width: 90px;
   text-align: center;
   font-size: 15px;
   background-color: var(--color-tint);
   margin-left: auto;
 }
</style>