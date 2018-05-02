<template>
  <div class="cartcontrols">
     <transition name="fade">
          <div class="cart-decrease" @click.stop.prevent="goodSup($event)">
            <transition name="inner">
                <span class="icon-remove_circle_outline" v-show="foods.count > 0"   ></span>      
            </transition>
         </div>
     </transition>
      
        <span class="icon-number" v-if="foods.count > 0">{{foods.count}}</span>
        <span class="icon-add_circle" @click.stop.prevent="goodAdd($event)"></span>
  </div>
</template>

<script type="text/ecmascript-6">
 import Vue from 'vue';
export default {
    props: {
        foods:{
            type:Object,
            
        }
    },
  data() {
    return {
        // count:0,
    }
  },
  methods: {
    goodAdd(event){
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        console.log('tag')
        if (!this.foods.count) {
            Vue.set(this.foods,'count',1)
            console.log('count', this.foods.count)
        }else{
                        
            this.foods.count +=1;
            
        }
    },
    goodSup(event){
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
         this.foods.count -=1;
    }
  }
}
</script>

<style scoped >
    .cartcontrols {
        /* position: absolute;
        bottom : 16px;
        right: 0px; */
        font-size: 24px;
        color :#00a0dc;
        
    }
    .cartcontrols .icon-number{
        font-size: 10px;
        line-height :24px;
        vertical-align: top ;
        text-align :center ;
        width :14px;
        height: 24px;
        display: inline-block;
        color :#93999f;
    } 
    .cart-decrease {
        display: inline-block;
    }
    .fade-enter-active,.fade-leave-active {
        transition: all 0.5s linear;
    }
    .fade-enter, .fade-leave-to {
        transform: translate3d(24px, 0, 0);
        opacity: 0;
    }
    /* .inner */
    .inner-enter-active,.inner-leave-active{
        transition: all 0.5s linear;
    }
    .inner-enter,.inner-leave-to {
        transform: scale(180deg);
        opacity: 0;
    }
</style>
