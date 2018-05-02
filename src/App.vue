<template>
  <div >
    <!-- 头部 -->
   <v-header :seller ="seller"></v-header>
   <!-- 主题切换 -->
   <div class="tap border-1px">
     <div class="tap-item">
       <router-link :seller = "seller" :to="{path:'/goods'}" active-class="active">商品</router-link>
     </div>
     <div class="tap-item">
       <router-link :to="{path:'/ratings'}" active-class="active">评论</router-link>
     </div>
      <div class="tap-item"> 
       <router-link :to="{path:'/seller'}" active-class="active" >商家</router-link>
     </div>
   </div>
    <keep-alive class="detail-right">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vHeader from './components/header/header'

export default {
  components:{
    vHeader,
  },
  name: 'App',
  data () {
    return {
      seller:{},
      
    };
  },
  created(){
    var errno_OK = 0;
    this.$http.get('/api/seller').then((res)=>{
      var response = res.data;
      // console.log(res);
      console.log('response', response.errno)
      if (response.errno === errno_OK) {
        // console.log('avater', response.data.name);
        this.seller = response.data;
        console.log('seller', this.seller)
      }
      
    })
  }

}
</script>

<style lang="stylus" >

@import "common/stylus/mixin.styl";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  text-decoration none
}
 body,html {
   margin: 0;
   padding: 0;
 }
    .tap
      background #ffffff;
      font-size 14px
      height 40px
      line-height 40px
      color #4d555d
      border-bottom 1px solid rgba(7,17,27,0.1)
      display flex 
    // .border-1px(rgba(7,17,27,0.1))
      // justify-content space-around 
      .tap-item 
        flex 1
        cursor pointer
        text-align center 
        & > a 
          display block
          font-size 14px
          color rgb(77,85,93)
          &.active 
            color red


        

</style>
