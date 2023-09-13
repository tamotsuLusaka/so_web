<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="true" :language="design.language" :isScroll="false"></Line>
    <h1 class="_content-title" :class="{'_jp': design.language === 'jp'}">{{pageTitle}}</h1>
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <div class="_slider" :style="{'height': _fullContentHeight + 'px'}">
        <div class="_slider-container" :style="{'height': _fullContentHeight + 'px'}">
          <div v-for="image in itemImages" :key="image.name" class="_slider-box"  :class="{'_move-left': image.order < sliderCounter, '_move-right': image.order > sliderCounter}">
            <img :src="image.url" alt="" class="_slider-image">
          </div>
        </div>
        <div class="_slider-controller" :style="{'height': _fullContentHeight + 'px'}">
          <img v-if="sliderCounter !== 0" @click="slideToLeft()" src="@/assets/images/button-arrow-r.png" alt="矢印" class="_slider-arrow _ _slider-arrow-left">
          <img v-if="sliderCounter !== itemImages.length -1" @click="slideToRight()" src="@/assets/images/button-arrow-r.png" alt="矢印" class="_slider-arrow _ _slider-arrow-right">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Mixin from '@/mixin/mixin.js'
import Line from '@/components/Line.vue'
import Design from '@/class/Design.js'

import db from '@/firebase/modules/db.js'

export default {
  name: 'Home',
  mixins:[
    Mixin
  ],
  components: {
    Line,
  },
  data(){
    return{
      pageTitle: "Design gallery",
      design: new Design(),

      itemImages: [],
      sliderCounter: 0,
    }
  },
  created(){
    db.getData(this.$route.params.id, "design")
    .then((doc)=>{
      this.design = doc.data()
      this.pageTitle = this.design.title 
      this.itemImages = this.design.imageObjects
    })
  },
  methods:{
    slideToLeft(){
      this.sliderCounter --
    },
    slideToRight(){
      this.sliderCounter ++
    },
  },
  computed:{

  },
  beforeDestory(){

  },
}
</script>

<style  scoped>


@media screen and (max-width:599px){

}
</style>