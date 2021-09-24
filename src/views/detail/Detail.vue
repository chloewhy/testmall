<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-img = "topImg"/>
      <detail-base-info :goods = "goods"/>
      <detail-shop-info :shop = "shop"/>
      <detail-goods-info :detail-info = "detailInfo" @imageLoad ="imageLoad"/>
      <detail-param-info ref="params" :param-info = "paramInfo"/>
      <detail-comment-info  ref="comment" :comment-info= "commentInfo"/>
      <goods-list ref="recommend" :goods = "recommends"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/detailCommentInfo.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImg: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopY: []
    }
  },
  created() {
    this.iid = this.$route.params.iid
    //请求详情数据
    getDetail(this.iid).then(res => {
      //获取轮播图数据
      //  console.log(res);
      const data = res.result;
      this.topImg = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //获取商品详情信息
      this.detailInfo = data.detailInfo
      //获取详情参数
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //取出评论信息
      if (data.rate.cRate !== 0) {
         this.commentInfo = data.rate.list[0]
      }  
        //保证下面的offsetTop都有值，但是图片还没加载完，高度依然是不对的
    this.$nextTick(() => {
    this.themeTopY = [];

    this.themeTopY.push(0);
    this.themeTopY.push(this.$refs.params.$el.offsetTop);
    this.themeTopY.push(this.$refs.comment.$el.offsetTop);
    this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopY);
    })  
    })
     //请求推荐数据
     getRecommend().then(res => {
       this.recommends = res.data.list
    })
  },
  mounted() {  
  },
  // updated() {
  //   this.themeTopY = [];
  //   this.themeTopY.push(0);
  //   this.themeTopY.push(this.$refs.params.$el.offsetTop);
  //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
  //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
  // },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    /* overflow: hidden;
    height: calc(100% - 44px); */
    overflow: hidden;

    position: absolute;
    top: 40px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
