<template>
  <div class="ratingchoose">
        <div class="rating-select">
            <span class="block all" :class="{'active':nowIndex == 2}" @click="choosetype(2,$event)">{{desc.all}}<span class="text">{{ratings.length}}</span></span>
            <span class="block positive" :class="{'active':nowIndex == 0}" @click="choosetype(0,$event)">{{desc.positive}}<span class="text">{{positives}}</span></span>
            <span class="block negative" :class="{'active':nowIndex == 1}" @click="choosetype(1,$event)">{{desc.negative}}<span class="text">{{negatives}}</span></span>
        </div>
        <div class="rating-switch" @click="ratingChange($event)">
            <span class="icon-check_circle " :class="{'on':readOnly}" ></span><span>只看有内容的评论</span>
        </div>
       
  </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE =0 ;
const NEGATIVE =1;
const ALL = 2;
export default {
    props: {
        desc:{
            type:Object,
        },
        nowIndex:{
            type:Number,
            default:NEGATIVE
        },
        readOnly:{
            type:Boolean,
            default:false
        },
        ratings:{
            type:Array,
          
        }
    },
  data() {
    return {
        // nowIndex:2
    }
  },
  methods: {
      choosetype(num,event){
           if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        this.nowIndex = num
        console.log('num', num)
        this.$emit('choose-type',num)
      },
      ratingChange(event){
           if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        console.log('readOnly', this.readOnly)
        this.$emit('on-readonly',this.readOnly)
      }
  },
  computed: {
      positives(){
       let newArray= this.ratings.filter((rating)=>{
           console.log('rating', rating)
           return rating.rateType === POSITIVE
         })
         return newArray.length
      },
      negatives(){
          let newArray= this.ratings.filter((rating)=>{
              return rating.rateType === NEGATIVE
          })
          return newArray.length
      },
  },
  created () {
    console.log('ratings',this.ratings)  
    console.log('positives', this.positives)
  },

}
</script>

<style scoped lang="stylus">
    .rating-select
        border-bottom 1px solid rgba(1,17,27,0.1)  
        padding-bottom 18px
        .block
          display inline-block
          padding 8px 18px 
          margin-right 12px
          font-size 12px
          border-radius 1px
          color #4d555d
          &.all
            background rgba(0,160,220,0.2)
            &.active
              background #00a0dc
              color #ffffff
          &.positive
            background rgba(0,160,220,0.2)
            &.active
              background #00a0dc
              color #ffffff
          &.negative
            background rgba(77,85,93,0.2)
            &.active
              background #4d555d
              color #ffffff
        
          .text
            display inline-block
            font-size 8px
            margin-left 2px
            line-height 10px
    .rating-switch
        color #93999f
        border-bottom 1px solid rgba(1,17,27,0.1)
        padding 12px 0
        .icon-check_circle
            font-size 24px
            line-height 24px
            display inline-block
            vertical-align top 
            margin-right 4px
            &.on
                color #00c850
        span 
            display inline-block
            line-height 12px
            font-size 12px
            vertical-align text-bottom
        


      
</style>
