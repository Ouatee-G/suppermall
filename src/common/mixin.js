 import BackTop from 'components/content/backtop/BackTop'
  export const backTopMiXin = {
    components:{
      BackTop
    },
    data() {
      return {
        isShowBackTop:false,
      }
    },
    methods: {
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      listShowBackTop(position){
        this.isShowBackTop = (-position.y) > 1000
      }
    }
}
