<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <home-swiper :banners = "banners"/>
  <recommend-view :recommends = "recommends"/>
  <feature-view></feature-view>
  <tab-control :titles = "['流行','新款','精选']"/>
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatuerView'


import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'


import {getHomeMultidata} from 'network/Home'

export default {
  name:"home",
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
  },
  data() {
    return {
      banners:[],
      recommends:[],
    }
  },
  created(){
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
}
</script>

<style>
#home{
  padding-top: 44px;
}
.home-nav{
 background-color: var(--color-tint);
 color: white;
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 z-index: 10;
}
</style>
