<template>
  <div class="header">
      <div class="content-wrapper">
          <div class="avatar">
              <img :src="seller.avatar" alt="图片" srcset="" width="64" height="64">
          </div>
          <div class="content">
              <div class="title">
              <span class="brand"></span>
              <span>{{seller.name}}</span>
              </div>
              <div class="description">
                  {{seller.description}} / {{seller.deliveryTime}}分钟送达
              </div>
             <div class="support">
                 <!-- 动态小图片 -->
                 <!-- <span><img src="./images/decrease_1@2x.png" alt="减价" srcset=""></span> -->
                 <span class="icon" :class="classMap[1]"></span>
                 <span>{{seller.supports[0].description}}</span>
             </div>
          </div>
          <div class="supports-count" @click="showDetail">
              <span class="count">{{seller.supports.length}}</span>
              <span class="icon-keyboard_arrow_right"></span>
              <!-- <span>></span> -->
          </div>
      </div>
      <div class="bulletin-wrapper" @click="showDetail">
          <span class="bulletin"><img src="./images/bulletin@2x.png" alt="" srcset=""></span>
          <span class="icon" :class="classMap[0]"></span>
          <span>{{seller.bulletin}}</span>
          <!-- 详细箭头 -->
          <!-- <span class="icon-keyboard_arrow_right"></span> -->
      </div>
      <div class="background">
          <img :src="seller.avatar" width="100%" height="100%">
      </div>

      <!-- transition -->
    <transition name="fade">
        <div class="detail-wrap" v-show="deatail">
            <div class="detail-main">
                <h1 class="name">{{seller.name}}</h1>
            </div>
            <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
                <!-- <span class="line"></span> -->
                <span class="text">优惠信息</span>
            </div>
            <div class="detail-artical">
                <ul class="support">
                    <li class="support-item" v-for="(item,index) in seller.supports">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <div class="title">
                <span class="text">商家公告</span>
            </div>
            <div class="detail-artical">
               <p class="detail-p">
                   {{seller.bulletin}}
               </p>
            </div>
            <div class="detail-close" @click="hideDetail">
                <span class="span-close">X</span>
            </div>
        </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star'
export default {
    components: {
      star  
    },
    props: {
        seller:{
            type:Object
        }
    },
    data () {
        return {
            classMap:['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            deatail:false
        }

    },
    methods: {
        hideDetail(){
            this.deatail = false
        },
        showDetail(){
            this.deatail = true

        }
    }

}
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl";
    .header 
        position: relative
        color :#ffffff
        background rgba(7,17,27,0.5)
        .content-wrapper 
            position relative
            padding 24px 12px 18px  24px
            color #ffffff
            font-size 0
            .avatar
                display inline-block
                img 
                    vertical-align top 
                    border-radius 2px
                    display inline-block
            .content
                display inline-block
                margin-left 16px
                vertical-align top 
                .brand 
                    width 30px
                    height 18px
                    display inline-block
                    bg-image('./images/brand')
                    background-size 30px 18px
                    background-repeat no-repeat
                    vertical-align top 
                .title
                    font-size 16px
                    font-weight bold
                    line-height 18px
                    margin-top 2px
                    img 
                        width 30px
                        height 18px
                        display inline-block
                        vertical-align top
                .description 
                    font-size 12px
                    font-weight 200
                    line-height 12px
                    margin-top 8px
                .support
                    font-size 10px
                    font-weight 200
                    line-height 12px
                    margin-top 10px
                    img 
                        width 12px
                        height 12px
                        display inline-block
                        vertical-align top
                    .icon 
                        width 12px
                        height 12px
                        display inline-block
                        vertical-align top
                        background-size 12px 12px
                        // decrease', 'discount', 'special', 'invoice', 'guarantee'
                        &.decrease
                            bg-image('./images/decrease_1')
                        &.discount
                            bg-image('./images/discount_1')
                        &.special
                            bg-image('./images/special_1')
                        &.invoice
                            bg-image('./images/invoice_1')
                        &.guarantee
                            bg-image('./images/guarantee_1')    
            .supports-count
                position absolute
                right 12px
                bottom 14px
                font-size 10px
                color rgb(255,255,255)
                font-weight 200
                line-height 12px
                width 24px
                height 24px
                padding 0 8px
                border-radius 12px
                background rgba(0,0,0,0.2)
                .count
                    font-size 10px
                    display inline-block
                    margin-top 5px
            .icon-keyboard_arrow_right
                font-size 12px
                vertical-align middle
        .bulletin-wrapper
            position relative
            height 28px
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            font-size 10px
            line-height 28px
            // display inline-block 下面会多出一个像素点
            vertical-alin middle  
            background rgba(7,17,27,0.2)
            span 
                vertical-align middle
            img 
                width 22px
                height 12px
                display inline-block
                padding 0 5px 0 15px
                vertical-align -2px
            // .icon-keyboard_arrow_right
            //     position absolute
            //     top 0px 
            //     right 10px
            //     display inline-block
            //     width 12px
            //     height 12px
            //     z-index 5
            //     background rgba(7, 17, 27, 0.2)

        .background
            position absolute
            left 0
            top 0px
            bottom 0
            right 0px
            z-index -1
            filter blur(10px)

    .detail-wrap
        position fixed
        top 0px
        left 0px
        background-color rgba(7,17,27,0.8)
        width 100%
        height 100%
        z-index 1
        // filter blur(10px)
        
        .detail-main
            margin-top 64px
            margin-bottom 16px
            text-align center 
        .star-wrapper
            margin-bottom 24px
            text-align center 
            h1 
               font-size 16px
               font-weight 700
               color rgb(255,255,255) 
               line-height 16px
        .title
            margin 0 36px 24px
            text-align center
            position relative  
            .text 
                padding 0 12px 
                display inline-block
                &:after
                    content ""
                    border 1px solid rgba(255,255,255,0.2)
                    position absolute
                    top 50%
                    right 0px 
                    width 40%
                    // z-index -1
                &:before
                    content ""
                    border 1px solid rgba(255,255,255,0.2)
                    position absolute
                    top 50%
                    left 0px
                    width 40%
                    // z-index -1    

        .detail-artical
            margin 0 36px 24px
            .support
                margin 0 12px
                .support-item
                    padding 0 12px 
                    font-size 0
                    margin-bottom 12px
                .icon
                    width 16px
                    height 16px
                    background-size 16px 16px
                    display inline-block
                    margin-right 5px
                    vertical-align top 
                    &.decrease
                        bg-image('./images/decrease_1')
                    &.discount
                        bg-image('./images/discount_1')
                    &.special
                        bg-image('./images/special_1')
                    &.invoice
                        bg-image('./images/invoice_1')
                    &.guarantee
                        bg-image('./images/guarantee_1')   
                .text
                    font-size 12px
                    line-height 12px
                    vertical-align top 
            .detail-p
                font-size 12px
                font-weight 200
                line-height 24px

        .detail-close
            position fixed
            bottom 32px
            left 50%
            font-size 32px
















                    




</style>

