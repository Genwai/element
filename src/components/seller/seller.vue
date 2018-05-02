<template>
  <div class="sellerN">
      <!-- 必须要有下面这个层，不然无法进行滚动 -->
    <div class="seller-contents">
        <div class="seller-head">
          <div class="sell-top">
            <div class="head-right">
              <P class="title">{{seller.name}}</P>
              <div class="seller-star">
                  <star></star>
                  <span class="head-count">({{seller.ratingCount}})</span>
                  <span class="head-sellcount">月售{{seller.sellCount}}单</span>
              </div>
            </div>
            <div class="head-left">
                <span class="icon-favorite" :class="{'on':iconFavorite}" @click="iconF"></span>
                <div class="add" v-show="!iconFavorite">收藏</div>
                <div class="add oldadd" v-show="iconFavorite">已收藏</div>
            </div>
          </div>
         <div class="sell-content">
             <div class="first">
                 <span class="name">起送价</span>
                 <span class="price">{{seller.minPrice}}</span>元
             </div>
             <div class="second">
                 <span class="name">商家配送</span>
                 <span class="price">{{seller.deliveryPrice}}</span>元
             </div>
             <div class="third">
                 <span class="name">平均配送时间</span>
                 <span class="price">{{seller.deliveryTime}}</span>元
             </div>
         </div>
      </div>
        <split></split>
        <div class="seller-contain">
            <div class="seller-content">
                <h1 class="title">公告与活动</h1>
                <p class="text">{{seller.bulletin}}</p>
            </div>
            <ul class="list">
                <li class="item-list" v-for="support in seller.supports">
                    <span class="icon" :class="classMap[support.type]"  ></span>
                    <span class="text">{{support.description}}</span>
                </li>
            </ul>
        </div>
        <split></split>
        <div class="seller-pic">
            <h1 class="title">商家实景</h1>
            <div class="pics" ref="picWrapper">
                <ul ref="picList" >
                    <li class="pic-item" v-for="pic in seller.pics"><img :src="pic" alt=""></li>
                </ul>
            </div>
        </div>
        <split></split>
        <div class="seller-infor">
            <h1 class="title">商家信息</h1>
            <ul>
                <li class="info-item" v-for="item in seller.infos">{{item}}</li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import BScroll from 'better-scroll';
export default {
    components:{
        star,
        split,
    },
    
    data () {
        return {
            seller:{},
            classMap:['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            iconFavorite:false,
        }
    },
    created(){
      
    var errno_OK = 0;
    this.$http.get('/api/seller').then((res)=>{
        // 请求成功回调
      var response = res.data;
      console.log('response', response.errno)
      if (response.errno === errno_OK) {
        this.seller = response.data;
        console.log('seller评论', this.seller)
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$el, {click: true});
          console.log(this.scroll)
        });

        if (this.seller.pics) {
            let picWith = 120;
            let margin = 6;
            let length = this.seller.pics.length;
            let wrapper = (picWith + margin) * length  - margin + 'px'
            this.$refs.picList.style.width = wrapper ;
            this.$nextTick(()=>{
                this.scroll = new BScroll(this.$refs.picWrapper,{
                    scrollX: true,
                    click:true
                })
            })
        }

      }
       

     
    });
  },
  methods: {
      iconF(){
          this.iconFavorite=!this.iconFavorite
      }
  }
}
</script>

<style  lang="stylus">
 @import "../../common/stylus/mixin.styl"
    .sellerN
        position absolute
        top 175px
        left 0px
        bottom 0px
        overflow hidden
        width 100%
        // height 100%
        .seller-head
            padding 18px
            .sell-top
                position relative
                padding-bottom 18px
                border-bottom 1px solid rgba(7,17,27,0.1)
                .head-right
                    display inline-block
                    .title
                        font-size 10px
                        color rgb(7,17,27)
                        line-height 14px
                        margin-bottom 8px
                    .seller-star
                        font-size 10px
                        color rgb(77,85,93)
                        .star
                            display inline-block
                            vertical-align top    
                            .star-item
                                background-size 15px 15px
                                margin-right 0                     
                        .head-count
                            display inline-block
                            margin-right 12px
                            vertical-align text-bottom 
                        .head-sellcount
                            display inline-block
                            vertical-align text-bottom 
                .head-left
                    position absolute
                    right 0px
                    top 0px
                    width 50px
                    height 50px
                    text-align center 
                    .icon-favorite
                        font-size 24px
                        line-height 24px
                        color #d4d6d9
                        width 50px
                        &.on
                            color red
                    .add
                        font-size 10px
                        line-height 10px
                        // color color
            .sell-content
                font-size 10px
                display flex 
                color rgb(147,153,159)
                text-align center 
                .first,.second,.third
                    flex 1
                    margin 18px 0 0 0
                    border-right  1px solid rgba(7,17,27,0.1)
                    &:last-child
                        border none
                    .name
                        display block
                        margin-bottom 4px
                    .price
                        font-size 24px
                        font-weight 200
                        color rgb(7,17,27)
                        line-height 24px
        .seller-contain
            padding 18px 18px 0 18px
            .seller-content
                .title
                    font-size 14px
                    color #07111b
                    font-weight bold
                    line-height 14px
                .text
                    font-size 10px
                    font-weight 200
                    line-height 20px
                    font-weight 200
                    color rgb(240,20,20)
                    padding 8px 12px 16px 12px
            .list
                .item-list
                    padding 16px 12px 
                    border-top 1px solid rgba(7,17,27,0.1)                    
                    .icon 
                        width 16px
                        height 16px
                        display inline-block
                        vertical-align top 
                        background-size 16px 16px 
                        margin-left 6px
                        &.decrease
                            bg-image('./images/decrease_3')
                        &.discount
                            bg-image('./images/discount_3')
                        &.special
                            bg-image('./images/special_3')
                        &.invoice
                            bg-image('./images/invoice_3')
                        &.guarantee
                            bg-image('./images/guarantee_3')
                    .text
                        display inline-block
                        vertical-align top 
                        font-size 12px
                        font-weight 200
                        color rgb(7,17,27)
                        line-height 16px
        .seller-pic
            padding 18px 
            .title
               font-size 12px
               color #07111b
               line-height 12px 
               margin-bottom 12px
            .pics
                font-size 0
                width 100%
                overflow hidden
                white-space nowrap
                .pic-item
                    display inline-block
                    width 120px
                    height 90px
                    margin-right 6px
                    &:last-chil
                        margin-right 0
                    img 
                        width 120px
                        height 120px
        .seller-infor
            padding 18px
            .title
               font-size 14px
               color #07111b
               line-height 12px 
               margin-bottom 12px
               font-weight 200
            .info-item
                padding 16px 12px
                font-size 12px
                line-height 16px
                border-top 1px solid rgba(7,17,27,0.1)


                
                

                







</style>
