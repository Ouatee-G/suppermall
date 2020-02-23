<template>
  <div id="zh-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot class="indicator">
    </slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item,index) in slideCount" class="indi-item" :class="{active:index === currentIndex - 1}" :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'Swiper',
  props:{
    interval:{
      type:Number,
      default:3000
    },
    animDuration:{
      type:Number,
      default:300
    },
    moveRatio:{
      type:Number,
      default:0.25
    },
    showIndicator:{
      type:Boolean,
      default:true
    }
  },
  data:function () {
    return {
      slideCount:0,    //元素的个数
      totalWidth:0,    //swiper（轮播图）的宽度
      swiperStyle:{},  //swiper的样式
      currentIndex:1,  //当前的index
      scrolling:false, //是否正在滚动
    }
  },
  mounted:function () {
    //1操作DOM，在前后添加slide（幻灯片）
    setTimeout(() => {
      this.handleDom();
      //2.开启定时器
      this.startTimer();
    },100)
  },
   //添加一些方法
  methods: {
    //定时器操作
    startTimer:function () {
      //使用setinterval（）来开启定时操作
      this.playTimer = window.setInterval(() =>{
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      },this.interval)
    },
    stopTimer:function () {
      //取消由setinterval（）函数设定的playtimer定时操作
      window.clearInterval(this.playTimer)
    },

    //滚动到正确的位置
    scrollContent:function (currentPosition){
      //设置正在滚动
      this.scrolling = true;
      //开始滚动动画
      this.swiperStyle.transition = 'transform' + this.animDuration + 'ms';
      this.setTransform(currentPosition);
      //判断滚动到的位置
      this.checkPosition();
      //滚动完成
      this.scrolling = true;
    },

    //检查正确的位置
    checkPosition:function(){
      window.setTimeout(() =>{
        //校验正确的位置
        this.swiperStyle.transition = '0ms';
        if(this.currentIndex >= this.slideCount + 1){
          this.currentIndex = 1;
          this.setTransform(-this.currentPosition * this.totaWidth);
        }else if(this.currentIndex <= 0){
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentPosition * this.totaWidth);
        }
        //结束移动后的回调
        this.$emit('transitionEnd',this.currentIndex - 1);
      },this.animDuration)
    },

      //设置滚动的位置
      setTransform:function(position){
        this.swiperStyle.transform = `translate3d(${position}px,0,0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px,0,0)`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px,0,0)`;
      },

      //操作DOM，在DOM前面添加Slide
      handleDom:function(){
        //获取要操作的元素
        let swiperEL = document.querySelector('.swiper');
        let slidesELs = swiperEL.getElementsByClassName('slide');
        //保存个数
        this.slideCount = slidesELs.length;
        //如果大于1个，那么在前后分别添加一个slide
        if(this.slideCount > 1){
          let cloneFirst = slidesELs[0].cloneNode(true);
          let cloneLast = slidesELs[this.slideCount - 1].cloneNode(true);
          swiperEL.insertBefore(cloneLast,slidesELs[0]);
          swiperEL.appendChild(cloneFirst);
          this.totalWidth = swiperEL.offsetWidth;
          this.swiperStyle = swiperEL.style;
        }
        //让swiper元素显示第一个（目前显示前面添加的最后一个元素）
        this.setTransform(-this.totalWidth);
      },

      //拖动事件的处理
      touchStart:function(e){
        //如果正在滚动，不可以拖动
        if(this.scrolling) return;
        //停止定时器
        this.stopTimer();
        //保存开始滚动的位置
        this.startX = e.touches[0].pageX;
      },
      touchMove:function(e){
        //计算出用户拖动的距离
        this.currentX = e.touches[0].pageX;  //获取当前事件对象的pageX
        this.distance = this.currentX - this.startX;    //计算出距离
        let currentPosition = this.currentIndex * this.totalWidth;
        let moveDistance = this.distance + currentPosition;
        //设置当前的位置
        this.setTransform(moveDistance);
      },
      touchEnd:function(e){
        //获取移动的距离
        let currentMove = Math.abs(this.distance);
        //判断最终的距离
        if(this.distance === 0){
          return
        }else if(this.distance > 0 && currentMove > this.totalWidth * this.moveRatio){
          this.currentIndex --
        }else if(this.distance < 0 && currentMove > this.totalWidth * this.moveRatio){
          this.currentIndex ++
        }
        //移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth);
        //移动完成后重新开始定时器
        this.startTimer();
      },

      //控制上一个下一个
      previous:function () {
        this.changeItem(-1);
      },
      next:function () {
        this.changeItem(1);
      },
      changeItem:function () {

        //移除定时器
        this.stopTimer();

        //修改index的位置
        this.currentIndex += num;
        this.scrollContent(-this.currentIndex * this.totalWidth);

        //添加定时器
        this.startTimer();
      }
  }

}
</script>

<style>
 #zh-swiper{
   overflow:hidden;
   position:relative;
 }
 .swiper{
   display: flex
 }
 .indicator{
   display: flex;
   justify-content: center;
   position: absolute;
   width: 100%;
   bottom: 8px
 }
 .indi-item{
   box-sizing: border-box;
   width: 8px;
   height: 8px;
   border-radius: 4px;
   background-color: #ffffff;
   line-height: 8px;
   text-align: center;
   font-size: 12px;
   margin: 0 5px;
 }
 .indi-item.active{
   background-color: rgba(212, 62, 46, 1.0)
 }
</style>
