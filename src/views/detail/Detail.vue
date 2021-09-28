<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-img = "topImg"/>
      <detail-base-info :goods = "goods"/>
      <detail-shop-info :shop = "shop"/>
      <detail-goods-info :detail-info = "detailInfo" @imageLoad ="imageLoad"/>
      <detail-param-info ref="params" :param-info = "paramInfo"/>
      <detail-comment-info  ref="comment" :comment-info= "commentInfo"/>
      <goods-list ref="recommend" :goods = "recommends"/>
    </scroll>
    <back-cart @click.native="backCartClick"/>
    <detail-bottom-bar @addCart="addToCart"/>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackCart from 'components/content/backCart/BackCart.vue'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
import {debounce} from "common/utils"
import { mapActions } from 'vuex'

// import Toast from 'components/common/toast/Toast.vue'

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
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackCart,
    // Toast
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
      themeTopY: [],
      getThemeTopY: null,
      currentIndex : 0,
      // message: '',
      // show: false
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
    // this.$nextTick(() => {
    // this.themeTopY = [];

    // this.themeTopY.push(0);
    // this.themeTopY.push(this.$refs.params.$el.offsetTop);
    // this.themeTopY.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
    // // console.log(this.themeTopY);
    // })  
    })
     //请求推荐数据
     getRecommend().then(res => {
       this.recommends = res.data.list
    })
  this.getThemeTopY = debounce(() => {
    this.themeTopY = [];
    this.themeTopY.push(0);
    this.themeTopY.push(this.$refs.params.$el.offsetTop);
    this.themeTopY.push(this.$refs.comment.$el.offsetTop);
    this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
    this.themeTopY.push(Number.MAX_VALUE);
  },100)

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
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
    },
    contentScroll(position) {
      const positionY = -position.y
      let length = this.themeTopY.length
      //普通用法
      // for (let i = 0; i < length; i++) {
      //   if(this.currentIndex !==i && ((i<length - 1 && positionY >= this.themeTopY[i] && 
      //   positionY < this.themeTopY[i+1]) || (i === length - 1 && 
      //   positionY >= this.themeTopY[i]))) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
      //hack 用法
      for (let i = 0; i < length-1 ; i++) {
        if (this.currentIndex !==i && (positionY >= this.themeTopY[i] &&
         positionY < this.themeTopY[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
         }
      }
    },
    addToCart() {
      //获取购物车商品信息 
      const product = {}
      product.image = this.topImg[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
    
    //将商品加入购物车(vuex)
       //1.mapActions映射
      this.addCart(product).then(res => {
        //普通用法
        // this.show = ture;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // },1500)

      this.$toast.show(res,2000)
      })
      //2.actions返回promise
      // this.$store.dispatch('addCart',product).then(res => {

      // })

    },
    backCartClick() {
      this.$router.push("/cart");
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
