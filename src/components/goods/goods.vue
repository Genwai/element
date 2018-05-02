<template>
  <div>
      <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul class="">
                <li class="menu-item" v-for="(item,index) in seller" @click="selectMenu(index,$event)" :class="{'menuActive':index == nowIndex}">
                    <span class="text"><span class="icon" :class="classMap[item.type]" v-if="item.type > 0"></span>
                    {{item.name}}
                    </span>
                </li>
                <!-- <li>1</li> -->
            </ul>
        </div>
        <div class="foot-wrapper" ref="foodWrapper">
            <ul>
                <li class="foot-list food-list-hook" v-for="(item,index) in seller" >
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                    <li class="foot-item" v-for="(foods,index) in item.foods" @click="selectfood(foods,$event)">
                            <div class="icon">
                                <img :src="foods.icon" alt="图片">
                            </div>
                            <div class="content">
                                <h2 class="name">{{foods.name}}</h2>
                                <div class="desc">{{foods.description}}</div>
                                <div class="extra">
                                    <span class="count">月售{{foods.sellCount}}</span>
                                    <span class="count">好评{{foods.rating}}</span> 
                                </div>
                                <div class="price">
                                    <span class="newprice">￥{{foods.price}}</span>
                                    <span class="oldprice">{{foods.oldPrice}}</span>   
                                    
                                </div>
                            </div>
                            <div class="cartControl">
                                <cart-controls :foods="foods"></cart-controls>
                            </div>
                    </li>
                    </ul>
                </li>
                
            </ul>
        </div>
        <div class="">
          <v-shorpcart :select-foods= "selectFoods"></v-shorpcart>
          <v-food :food-list="selectedFood" :fooddetail = "fooddetail" @back ="backfooddetail"></v-food>
        </div>
    </div>
        
  </div>
</template>

<script>
import cartControls from '../cartControls/cartControl'
import vShorpcart from '../shorpcart/sharpcart'
import BScroll from 'better-scroll'
import VFood from '../food/foodDetail'
export default {
    components: {
        vShorpcart,
        cartControls,
        VFood
    },
    data () {
        return {
            seller:{},
            classMap:['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            nowIndex:0,
            scrolly:0,
            selectedFood:{},
            fooddetail:false,
        }
    },
   created(){
    var errno_OK = 0;
    this.$http.get('/api/goods').then((res)=>{
        // 请求成功回调
      var response = res.data;
      console.log('response', response.errno)
      if (response.errno === errno_OK) {
        this.seller = response.data;
        console.log('seller', this.seller)
        // DOM还没有更新
        this.$nextTick(()=> {
            // DOM更新完成
            this._initScroll();
            
        }) 
      }
    })
  },
  computed: {
    selectFoods(){
        let foods =[];
        // console.log('this', this.seller)
        // this.seller.forEach((goods) => {
        //     goods.foods.forEach((food) =>{
        //         if (food.count) {
        //             foods.push(food)
        //         }
        //     })
        // });
        this.seller.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        console.log('foods', foods)
        return foods
    },
   
  },
    methods: {
        selectMenu(index,event){
             if (!event._constructed) { //去掉自带的click事件点击，即pc端直接返回
                return;
            }
            
            let foodsList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
            let el = foodsList[index]
            console.log('event', el)
            this.nowIndex =index;
            this.foodScroll.scrollToElement(el, 300);
        },
        _initScroll() {//计算出ul的高度
            // 初始化scroll区域
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        // 结合BScroll的接口使用，是否将click事件传递，默认被拦截
          click: true
        
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3,//结合Bscroll的接口使用，3实时派发scroll 事件，探针作用
          click: true
        });
        // 监听scroll事件，并获取鼠标坐标，当滚动时能实时暴露scroll
        // this.foodScroll.on('scroll', (pos) => {
        //   this.scrolly = Math.abs(Math.round(pos.y));
        //   console.log('scrolly', pos)
        // });
      },
        selectfood(foods,event){
            if (!event._constructed) {
                return
            }
            this.selectedFood = foods;
            this.fooddetail = true;
            console.log('selecedFood', this.selectedFood)
        },
        backfooddetail(data){
            this.fooddetail =data;
        }
    }
    

}
</script>

<style lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .goods
        display flex 
        width  100%
        top 175px
        position absolute
        bottom 50px
        .menu-wrapper
            width 80px
            flex 0 0 80px
            background-color #f3f5f7
            .menu-item
                height 54px
                width 56px
                font-size 0
                padding 0 12px 
                display table
                position relative
                &:after
                        position absolute
                        width 80%
                        border-bottom 1px solid rgba(7,17,27,0.1)
                        bottom  0
                        left 7px
                        content ""
                        display block 
                &.menuActive
                    margin-top -1px
                    background #ffffff
                    &:after
                        display none  
                .text
                    font-size 12px
                    font-weight 200
                    line-height 14px
                    // vertical-align top 
                    display table-cell
                    vertical-align middle
                    .icon 
                        width 12px
                        height 12px
                        display inline-block
                        vertical-align top 
                        background-size 12px 12px 
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
        .foot-wrapper
            flex 1
            font-size 0
            overflow hidden
            .foot-list
                .title
                    height 26px
                    line-height 26px
                    color #93999f
                    background-color #f3f5f7
                    border-left 2px solid #d9dde1
                    padding-left 27px
                    font-size 12px
                .foot-item
                    display flex 
                    margin 18px
                    position relative
                    padding-bottom 18px
                    &:after
                        position absolute
                        width 100%
                        border-bottom 1px solid rgba(7,17,27,0.1)
                        bottom  0
                        left 0
                        content ""
                        display block 
                    .icon
                        display inline-block
                        flex 0 0 60px
                        img 
                            width 57px
                            height 57px
                            display inline-block
                    .content
                        flex 1
                        display inline-block
                        padding-left 10px
                        .name
                            font-size 14px
                            line-height 14px
                            color rgb(7,17,27)
                        .desc
                            font-size 10px
                            color rgb(147,153,159)
                            line-height 10px
                            margin 8px 0
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
                    .cartControl
                        position absolute
                        bottom  16px
                        right 0px
                        font-size 24px
                        color #00a0dc
                        .icon-number
                            font-size 10px
                            line-height 24px
                            vertical-align top 
                            text-align center 
                            width 14px
                            height 24px
                            display inline-block
                            color #93999f

</style>
