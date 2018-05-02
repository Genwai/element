<template>
  <div class="star" :class="starType">
      <span class="star-item" v-for="(item,index) in starArray" :class="item"></span>
      <!-- <span class="star-item"></span>
      <span class="star-item"></span>
      <span class="star-item"></span> -->
  </div>
</template>

<script>
    const length = 5;
    const star_on ='on';
    const star_half ='half';
    const star_off ='off';

export default {
    props: {
        size:{
            type:Number,
            default:48

        },
        score:{
            type:Number,
            default:4.2
        }
    },
    data () {
        return {
            
        }
    },
    computed: {
        starType(){
            return 'star-' + this.size
        },
        starArray(){
            let starArray =[];
            let starInt = Math.ceil(this.score);
            let numStr = this.score.toString().split('.');
            let xiaoshu =numStr[1];
            let off_num = this.score - starInt;
            // console.log('numstr', xiaoshu)

            for (let index = 0; index < starInt-1; index++) {
                starArray.push(star_on)
            }
            if (xiaoshu>=5) {
                starArray.push(star_on)
            }else {
                starArray.push(star_half)
            }
            for (let index = 0; index < off_num -1; index++) {
               starArray.push(star_off)  
            }

            console.log('starArray', starArray)
            return('starArray', starArray)

        }
    },
   
}
</script>

<style lang="stylus" >
// 需要添加分号
    @import "../../common/stylus/mixin.styl";
    .star
        text-align center 
        .star-item
            display inline-block
            width 20px
            height 20px
            background-size 20px 20px
            background-repeat no-repeat
            margin-right 20px
            &.on
                bg-image('./images/star24_on')
            &.half
                bg-image('./images/star24_half')
            &.off
                bg-image('./images/star24_off')
            

            
</style>
