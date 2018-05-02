<template>
  <div class="seller">
      <div >
          <div class="seller-head">
          <div class="head-right">
              <p class="head-rating">{{seller.score}}</p>
              <p class="head-rate">综合评分</p>
              <p class="head-persent">高于周边商家{{seller.rankRate}}%</p>
          </div>
          <div class="head-left">
              <div class="head-atitu">
                  <span class="first">服务态度</span>
                  <span class="star"><star :score="seller.serviceScore" :size="36"></star></span>
                  <span class="num">{{seller.serviceScore}}</span>
              </div>
              <div class="head-rating">
                  <span class="first">商品评分</span>
                  <span class="star"><star :score="seller.foodScore"></star></span>
                  <span class="num">{{seller.foodScore}}</span>
              </div>
              <div class="head-time">
                  <span class="first">送达时间</span>
                  <span class="tiem">{{seller.deliveryTime}}分钟</span>
              </div>
          </div>
      </div>
      <split></split>
      <div class="rating-wrapper">
          <div class="rating-top">
              <rating-choose 
              :desc="desc" 
              :ratings="ratings"
              :nowIndex="selectedType"
              :readOnly="readOnly"
              @on-readonly="ratingRead" 
              @choose-type="ratingType"
              ></rating-choose>
          </div>
          <div class="rate-content">
              <ul>
                  <li class="rate-item" v-for="rating in ratings" v-show="nowShow(rating.rateType,rating.text)">
                      <div class="rete-img">
                          <img :src="rating.avatar" width="28" alt="">
                      </div>
                      <div class="rate-right">
                          <div class="user">
                              <h1 class="name">{{rating.username}}</h1>
                              <span class="time">{{rating.rateTime| formatDate}}</span>
                          </div>
                          <div class="rate-star">
                              <div class="star">
                                <star></star>                                  
                              </div>
                              <span class="time">{{rating.deliveryTime}}<span v-show="rating.deliveryTime">分钟送达</span></span>
                          </div>
                          <p class="text">{{rating.text}}</p>
                          <div class="foods">
                              <span class="icon " :class="{'icon-thumb_up':rating.rateType == 0}"></span>
                              <ul class="food-list">
                                 <li class="food" v-for="food in rating.recommend">{{food}}</li> 
                              </ul>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
      </div>
  </div>
</template>

<script>
 const POSITIVE = 0;
 const NEGATIVE = 1;
 const ALL = 2;
import star from '../star/star'
import split from '../split/split'
import ratingChoose from '../ratingchoose/ratingchoose'
import BScroll from 'better-scroll'
import {formatDate} from '../../common/js/date'
export default {
    filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
    components: {
        star,
        split,
        ratingChoose,

    },
    data () {
        return {
            seller:{},
            ratings:[],
            desc:{
               all:'全部',
                positive:'满意',
                negative:'吐槽'
            },
            readOnly:true,
            selectedType:ALL,
            readOnly:false,
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
          if (!this.scroll) {
            this.scroll = new BScroll(this.$el, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
     
    })
    this.$http.get('/api/ratings').then((res)=>{
        // 请求成功回调
      var response = res.data;
      console.log('response', response.errno)
      if (response.errno === errno_OK) {
        this.ratings = response.data;
        console.log('ratings-loveyou', this.ratings)
      }
    })
  },
   methods: {
       ratingRead(){
           if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
           this.readOnly=!this.readOnly
       },
    ratingType(type){
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
      this.selectedType = type;
      console.log('type', type)
    },
    nowShow(type,text){
        
        if (this.readonly && text=="") {
            return false;
        }
        if (this.selectedType === ALL) {
            return true
        }else{
            return  this.selectedType === type
        }
        console.log(type,text)
    }
   }
}
</script>

<style  lang="stylus">
.seller
    position absolute
    top 175px
    left 0
    bottom 0
    overflow hidden
    .seller-head
        display flex 
        padding 18px 0 18px 18px
        .head-right
            flex 110px 0 0
            text-align center
            border-right 1px solid rgba(7,17,27,0.1)
            .head-rating
                font-size 24px
                color rgb(255,153,0)
                line-height 28px
                margin-bottom 6px
            .head-rate
                font-size 14px
                color #93999f
                line-height 25px
                // font-weight bold
                margin-bottom 6px
            .head-persent
                font-size 10px
                color rgb(7,17,27)
                line-height 10px
                margin-bottom 6px
        .head-left
            flex 1
            padding 3px 0 18px 5px
            .head-atitu,.head-rating,.head-time
                margin-bottom 8px
                .first
                    display inline-block
                    font-size 12px
                    line-height 18px
                    color #07111b
                    vertical-align top 
                    margin-right 5px
                .star
                    display inline-block
                    vertical-align top 
                    .star-item
                        background-size 15px 15px
                        margin-right 0px
                        margin-left 0px
                .num
                    display inline-block
                    font-size 12px
                    color #f90
                    vertical-align middle
            .head-time
                .tiem
                    font-size 12px
                    line-height 18px
                    color #93999f
          
                
    .rating-wrapper
        .rating-top
            padding 18px 18px 0 18px
        .rate-content
            .rate-item
                border-bottom 1px solid rgba(1,17,27,0.1)
                margin 18px
                padding-bottom 18px
                display flex 
                .rete-img
                    flex 40px 0 0
                    img
                        border-radius 50%
                .rate-right
                    flex 1
                    .user
                        display flex 
                        justify-content space-between
                        margin-bottom 4px
                        .name
                            display inline-block
                            font-size 10px
                            line-height 12px
                            color #07111b
                            font-weight 700
                            vertical-align top 
                        .time
                            display inline-block
                            vertical-align top
                            font-size 10px
                            color #93999f
                            line-height 12px
                    .rate-star
                        margin-bottom 6px
                        margin-top 6px
                        .star
                            display inline-block
                            vertical-align bottom  
                            .star-item
                                background-size 10px 10px
                                margin-right 0px
                        .time
                            display inline-block
                            vertical-align top
                            font-size 10px
                            color #93999f
                            line-height 18px
                            margin-bottom 6px
                    .text
                        font-size 12px
                        line-height 18px
                        color #07111b
                        margin-bottom 8px
                    .foods
                        .icon
                            font-size 12px
                            line-height 16px
                            display inline-block
                            margin-right 8px
                            &.icon-thumb_up
                                color #00a0dc
                        .food-list
                            display inline-block                            
                            .food
                                display inline-block
                                margin-right 8px
                                color rgb(0,160,220)
                                color #93999f
                                border 1px solid rgba(7,17,27,0.1)
                                border-radius 1px
                                padding 3px 6px
                                font-size 9px
                            

                        


                          



                



</style>
