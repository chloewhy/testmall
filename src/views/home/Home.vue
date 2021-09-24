<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl1" 
      class="tab-control" v-show="isTabFixed"/>
   <scroll class="content" ref="scroll" 
    :probe-type="3" @scroll="contentScroll" 
    :pull-up-load= "true"
    @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl2"/>
    <goods-list :goods= "showGoods"/>
   </scroll>
   <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import { getHomeMultidata,getHomeGoods } from 'network/home'
import {debounce} from "common/utils"

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
     banners: [],
     recommends:[],
     goods: {     
       'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
     },
     currentType: 'pop',
     isShowBackTop: false,
     tabOffsetTop: 0,
     isTabFixed: false,
     saveY: 0,
     homeItemListener:null
    }   
  },
  methods: {
     //事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      //点击一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
      //backtop是否显示
      this.isShowBackTop = (-position.y) > 1000
      //是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      //  console.log(res)
       this.banners = res.data.banner.list;  //保存函数调用的数据
       this.recommends = res.data.recommend.list; 
     })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
     })
    }   
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  destroyed(){

  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    //取消全局事件监听
    this.$bus.$off('itemImgLoad',this.homeItemlistener)

  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
   
  },
  mounted() {
    //监听item图片加载
    const refresh = debounce(this.$refs.scroll.refresh,50)    
    this.homeItemListener = () => {
       refresh()
    }
    this.$bus.$on('itemImgLoad',() => {
    refresh()
    })
    //获取tabControl的offsetTop
     
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /* 原生滚动才需要 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  /* 无效 */
  /* .tab-control {
    position: relative;
    top: 44px;
    z-index: 9;
  } */
  .content {
    /* height: calc(100% - 93px);
    margin-top: 44px; */
    overflow: hidden;

    position: absolute;
    top: 40px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>