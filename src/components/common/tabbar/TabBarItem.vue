<template>
  <div  class="tab-bar-item" @click="itemclick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor : {
      type: String ,
      default: 'red'
    }
  },
  data(){
    return{
      // isActive: true
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path)!== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemclick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
   .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 12px;
  }
  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 0px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>