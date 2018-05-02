<template>
  <div class="shopCart" >
      <div class="shop-main" >
        <div class="content">
          <div class="content-left" @click="toggleList($event)">
            <div class="logo-wrapper">
              <div class="logo highlight">
                   <span class="icon icon-shopping_cart span_icon highlight" ></span>
                   <div :class="{'num':totalCount > 0}">{{totalCount}}</div>
              </div>
            </div>
            <!-- 这里是金额 -->
            <div class="price"  :class="{'highlight':totalPrice>0 }">￥{{totalPrice}}</div>
            <div class="desc">
              <!-- 这里是固定的 -->
              另需配送费￥{{deliveryPrice}}元
            </div>
          </div>
          <!-- 20元起送 -->
          <div class="content-right" :class="{'enough':totalPrice>=20}">
            {{payDesc}}
          </div>
        </div>
      </div>
      <!-- 购物车详情页 -->
      <transition name="shopcart">
        <div class="sharpcart-list" v-show="shorpListShow" >
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="sharpcart-food" v-for="item in selectFoods">
                <div class="name">{{item.name}}</div>
                <div class="price">
                  ￥{{item.price}}
                </div>
                <div class="cartControl">
                   <cartControl :foods="item"></cartControl>
                </div>
              </li>
            </ul>
          </div>
       </div>
      </transition>
      <!-- 遮罩层 -->
      <transition name="listmask">
        <div class="list-mask" v-show="shorpListShow"></div>
      </transition>
  </div>
</template>

<script >
import cartControl from '../cartControls/cartControl'
import BScroll from 'better-scroll'

export default {
  methods: {
      toggleList(event){
         if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
        console.log('fold', this.fold)
      },
      empty(){
        console.info(this.selectFoods)
        this.selectFoods.forEach(item =>{
          item.count = 0
        })
      }
  },
  props: {
    deliveryPrice:{
      type:Number,
      default:5
    },
    selectFoods: {
    type: Array,
    default() {
      return [
        {price: 20, count: 10},
        {price: 15, count:1}
        ];
    }
  },
  },  
  data() {
    return {
      price:'20元起送',
      // shorpList:false,
      fold:true,
      // changeprice:0
    }
  },
  computed:{
     totalPrice() {
       let total =0;
       this.selectFoods.forEach(food => {
         total = total + food.price * food.count
       });
       return total
     },
     totalCount(){
       let count = 0;
       this.selectFoods.forEach(function (food) {
         count = count + food.count;
        })
        return count;
     },
     payDesc(){
       if (this.totalPrice <= 0) {
         return `￥20元起送`
       }else if (this.totalPrice < 20) {
         let newprice = 20 - this.totalPrice;
         return   `还差${newprice}元起送`
       }else if (this.totalPrice >= 20 ) {
         return `去结算`
       }
     },
     shorpListShow(){
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        // console.log('show', show)
        return show;
      }

     
  },
   components: {
      cartControl,

  }
}
</script>

<style lang="stylus" >
    .shopCart
      
      .shop-main
        position fixed
        left 0px
        bottom 0px
        width 100%
        height 50px
        z-index 100
        .content
          display flex 
          height 50px
          line-height 50px
          background #141d27 
          .content-left
            flex 1
            .logo-wrapper
              position relative
              top -10px
              left 10px
              width 66px
              height 66px
              background-color #141d27
              text-align center 
              border-radius 50%
              display inline-block
              .num
                color #ffffff
                position absolute
                top -9px
                right -7px
                width 24px
                height 24px
                line-height 24px
                text-align center
                background red
                box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                border-radius 50%
                font-size 10px
                font-weight 700
              .logo
                width 45px
                height 45px
                position relative
                top 7px
                left 10px
                background-color #2b343c
                border-radius 50%
                &.highlight
                  background rgb(0, 160, 220)
                .span_icon
                  font-size 30px
                  color #80858a
                  line-height 50px
                  &.highlight
                    color #ffffff
            .price
              display inline-block
              font-size 20px
              font-weight bold
              line-height 16px
              color #80858a
              width 50px
              vertical-align top 
              text-align center
              margin-top 15px
              padding-right 12px
              border-right 1px solid rgba(255,255,255,0.1)
              &.highlight
                color #ffffff !important
            .desc
              display inline-block
              color rgba(255,255,255,0.4)
              vertical-align top 
              text-align center
              font-size 14px
              margin-left 12px
          .content-right
            width 105px
            background #2b333b
            color rgba(255,255,255,0.4)
            text-align center 
            font-size 12px
            font-weight 700
            &.enough
              background-color #00b43c
              color #ffffff
      .sharpcart-list
        position absolute
        bottom 0px
        left 0px
        width 100%
        z-index 10
        transform translate3d(0,0,0)
        &.shopcart-enter-active,&.shopcart-leave-active
          transition all 0.5s 
          transform translate3d(0, 0%,0)
        &.shopcart-enter,&.shopcart-leave-to
          transform translate3d(0,100%,0)
        .list-header
          height 40px
          line-height 40px
          background #f3f5f7
          display flex 
          justify-content space-between
          padding 0 18px
          border-bottom 1px solid rgba(7,17,27,0.1) 
          .title
            display inline-block
            font-size 14px
            font-weight 200
            color rgb(7,17,27)
          .empty
            display inline-block 
            font-size 12px
            color #00a0dc
        .list-content
          max-height 217px
          background #ffffff
          overflow hidden
          .sharpcart-food
            height 48px
            line-height 48px
            position relative
            border-bottom 1px solid rgba(7,17,27,0.1)
            margin 0  18px
            .name
              font-size 14px
              color rgb(7,17,27)
              line-height 24px
              display inline-block
            .price
              display inline-block
              position absolute
              top 0
              right 90px
              color #f01414
              font-size 14px
              line-height 50px
            .cartControl
              position absolute
              bottom  -5px
              right 0px
              font-size 24px
              color #00a0dc
              .icon-number
                  vertical-align text-top 
                  padding-top 2px
      
      .list-mask
        position fixed
        top 0px
        left 0px
        bottom 60px
        width 100%
        height 100%
        background-color rgba(7,17,27,0.6) 
        z-index 5     
        // opacity 1    
        filter blur(1px)
        &.listmask-enter-active,&.listmask-leave-active
          // opacity 1
          // background  rgba(7,17,27,0.6)   
          transition all 0.5s 
        &.listmask-enter,&.listmask-leave-to
          opacity 0   
          // background rgba(7, 17, 27, 0)

            
</style>
