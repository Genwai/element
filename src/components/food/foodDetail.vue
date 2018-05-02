<template>
 <transition name="fooddetail">
  <div class="foodDetail" v-show="fooddetail">
     
        <div class="food-contain">
          <div class="food-img">
            <img :src="foodList.image"  alt="foodlist.img">
            <span class="icon-keyboard_arrow_right" @click.stop.prevent="back"></span>
          </div>
          <div class="food-content">
              <h1>{{foodList.name}}</h1>
              <div class="extra">
                <span class="count">月售{{foodList.sellCount}}</span>
                <span class="count">好评{{foodList.rating}}%</span> 
              </div>
              <div class="price">
                <span class="newprice">￥{{foodList.price}}</span>
                <span class="oldprice">{{foodList.oldPrice}}</span>   
              </div>
              <div class="cartcontrol">
                <cart-control :foods="foodList"></cart-control>            
              </div>
              <div class="fooddetail-shopping" v-show="!foodList.count " @click="addFirst">
                购物车
              </div>
          </div>
          <split></split>
          <div class="shopInfor" v-show="foodList.info" >
            <h1 class="title">商品评价</h1>
            <p class="text">{{foodList.info}}</p>
          </div>
          <split v-show="foodList.info"></split>
          <div class="rating">
            <h1 class="title">商品信息</h1>
            <rating-choose :desc="desc" 
            :ratings="foodList.ratings" 
            @on-readonly="ratingRead" 
            :readOnly="readOnly" 
            :now-index="selectedType" 
            @choose-type="ratingType"></rating-choose>
          </div>
          <div class="rating-wrapper">
            <ul>
              <li class="rating-item" v-for="rating in foodList.ratings" v-show="nowShow(rating.rateType,rating.text)">
                <div class="rating-user">
                  <span class="tiem">{{rating.rateTime | formatDate}}</span>
                  <div class="user-left">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" width="12" alt="" >
                    
                  </div>
                </div>
                <div class="rating-content">
                  <span class="icon" :class="[{'icon-thumb_down':rating.rateType ==1},{'icon-thumb_up':rating.rateType == 0}]"></span>
                  <span class="text">{{rating.text}}</span>
                </div>
            
              </li>
            </ul>
          </div>
          <!-- <div class="" style="height:600px;width:100%">
              
          </div> -->
        </div>
  </div>
</transition>

</template>

<script type="text/ecmascript-6">
import cartControl from '../cartControls/cartControl';
import BScroll from 'better-scroll'
import Vue from 'vue';
import split from '../split/split'
import ratingChoose from '../ratingchoose/ratingchoose'
import {formatDate} from '../../common/js/date'
 const POSITIVE = 0;
 const NEGATIVE = 1;
 const ALL = 2;
export default {
  components: {
    cartControl,
    split,
    ratingChoose
  },
  props:{
    foodList:{
      type:Object
    },
    fooddetail:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      desc:{
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
      },
      selectedType:ALL,
      readOnly:false,
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  created () {
    console.log('foodlist', this.foodList);
    // if (this.fooddetail) {
       this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$el, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
    // }
  },
  methods: {
    ratingRead(){
      if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
          this.readOnly =!this.readOnly;
      console.log('readOnlys', this.readOnly)
    },
    back(){
      if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
      this.fooddetail =false;
      this.$emit('back',this.fooddetail)
    },
    addFirst(event){
       if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        Vue.set(this.foodList,'count',1)
    },
    ratingType(type){
      this.selectedType = type;
      console.log('type', type)
    },
    nowShow(type,text){
      // 第一要先过滤 
      if (this.readOnly && text == "") {
        return false
      }
      if (this.selectedType === ALL) {
        return true
      }else{
        // 返回满足该条件
        return this.selectedType  === type
      }
    }

  },
  computed: {
    foodShop(){
      let shopcartshow = true;
      if (!this.foodList.count || this.foodList.count ==0) {
        console.log('shopshow', shopcartshow)
        return shopcartshow
      }else {
        shopcartshow =false;
        console.log('shopshow', shopcartshow)
        
        return shopcartshow
      }
    }
  }  
}
</script>

<style scoped lang="stylus">
  .foodDetail
    position fixed
    bottom 50px
    left 0px
    width 100%
    background-color #ffffff
    height 100%
    z-index 4
    &.fooddetail-enter-active,&.fooddetail-leave-active
      transition all 0.3s linear
      transform translate3d(0,0,0)
    &.fooddetail-enter,&.fooddetail-leave-to
      transform translate3d(100%,0,0)
      opacity 0
    .food-contain
      .food-img
        display block
        width 100%
        padding-top 100%
        position relative
        img
          position absolute
          top 0px
          left 0px
          width 100%
          height 100%
        .icon-keyboard_arrow_right
          position absolute
          top 17%
          left 10px
          font-size 50px
          color #ffffff
          z-index 30
    .food-content
      margin 18px 
      position relative
      h1
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
        margin-bottom 18px
      .extra
        font-size 10px
        color rgb(147,153,159)
        line-height 10px
        margin-bottom 8px
      .price
        .newprice
            font-size 14px
            line-height 24px
            font-weight 700
            color #f01414
        .oldprice
            font-size 14px
            line-height 24px
            font-weight 700
            margin-left 8px
            text-decoration line-through
            color rgb(147,153,159)  
      .cartcontrol
        position absolute
        bottom 0
        right 0px
        color #00a0dc
        font-size 24px
          .icon-number
            vertical-align text-bottom 
      .fooddetail-shopping
        position absolute
        bottom 0
        right 0
        padding 0 18px
        color #ffffff
        font-size 12px
        height 24px
        line-height 24px
        background #00a0dc
        border-radius 12px
    .shopInfor
      padding 18px
      .title
        font-size 14px
        line-height 14px
        margin-bottom 6px
        color #07111b
      .text
        font-size 12px
        line-height 24px
        padding 0 8px
        color #4d555d
    .rating
      padding 18px
      .title
        font-size 14px
        line-height 14px
        margin-bottom 18px
        color #07111b
    .rating-wrapper
      padding 18px
      .rating-item
        font-size 10px
        color rgb(147,153,159)
        line-height 24px
        position relative
        border-bottom 1px solid rgba(1,17,27,0.1)
        .tiem
          display inline-block
          
        .user-left
          position absolute
          top 0px
          right 10px
          .name
            margin-right 6px
            display inline-block
            vertical-align top 
          img 
            display inline-block
            border-radius 50%
            width 12px
            height 12px
        .rating-content
          padding 6px 0 16px
          .icon
            font-size 12px
            line-height 24px
            &.icon-thumb_up
              color rgb(0,160,220)
            &.icon-thumb_down
              color #93999f
          .text
            color #07111b
            font-size 12px
            line-height 16px

        
    
</style>
