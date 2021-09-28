<template>
  <div class="check-button">
    <img v-if="!isChecked" src="~assets/img/cart/button.svg" alt="">
    <img v-else src="~assets/img/cart/button_act.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type:Boolean,
      default: false
    }
 }
}
</script>

<style>

</style>