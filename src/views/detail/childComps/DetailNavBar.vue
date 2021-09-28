<template>
  <div class="detail-nav-bar">
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/detailNavBar.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div class="title-item" v-for="(item,index,key) in titles" 
      :key="key" :class="{active: index === currentIndex}"
      @click="titleClick(index)">{{item}}</div>
    </div>  
  </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: "detailNavBar",
  components: {
    NavBar
  },
  data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index);
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .detail-nav-bar{
    background-color: #fff;
  }
  .title {
    display: flex;
    font-size: 13px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-tint);
  }
  .back img {
    width: 15px;
    height: 15px;
    margin-top: 15px;
  }
</style>