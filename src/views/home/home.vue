<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
</div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/Home'

export default {
  name:"home",
  components:{
    NavBar
  },
  data() {
    return {
      banners:[],
      recommends:[],
      dKeywords:[],
      Keywordss:[],
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
.home-nav{
 background-color: var(--color-tint);
 color: white
}
</style>
