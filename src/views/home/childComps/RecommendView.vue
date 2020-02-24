<template>
<div class="recommend">
  <div v-for="item in recommends" class="recommends-item">
    <a :href="item.link">
      <img :src="item.image">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name:"RecommendView",
  props:{
    recommends:{
      type:Array,
      default(){
        return[]
      }
    }
  }
}
</script>

<style>
.recommend{
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
}
.recommends-item{
  flex: 1;
}
.recommends-item img{
  width: 75px;
  height: 75px;
  margin-bottom: 10px
}
</style>
