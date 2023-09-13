<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="true" :language="web.language" :isScroll="false"></Line>
    <h1 class="_content-title"  :class="{'_jp': web.language === 'jp'}">{{pageTitle}}</h1>
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <div class="_slider" :style="{'height': _fullContentHeight + 'px'}">

        <div class="_slider-info" :class="{'_slider-info-hide': !isShow}">
          <div class="_slider-info-container">
            <div  class="_slider-info-box">
              <p class="_slider-info-title">Responsible part</p>
              <div class="_slider-info-text">{{ web.part }}</div>
            </div>
            <div  class="_slider-info-box">
              <p class="_slider-info-title">Technology</p>
              <div class="_slider-info-text">{{ web.technology }}</div>
            </div>
            <div  class="_slider-info-box">
              <p class="_slider-info-title">URL</p>
              <a :href="web.url"  target="_blank" rel="noopener noreferrer">{{ web.url }}<img src="@/assets/images/arrow.png" class="_slider-info-arrow" alt="矢印"></a>
            </div>
            <p @click="closeInfo()" class="_slider-info-close _link" ><img src="@/assets/images/arrow-s-black.png" class="_slider-info-arrow-close" alt="矢印">Close</p>
          </div>
        </div>

        <div class="_slider-frame-container" :style="{'height': _fullContentHeight + 'px'}">
            <div v-for="image in itemImages" :key="image.name" class="_slider-box"  :class="{'_move-left': image.order < sliderCounter, '_move-right': image.order > sliderCounter}">
              <img :src="image.url" alt="" class="_slider-frame-image">
            </div>
        </div>
        <div class="_slider-controller" :style="{'height': _fullContentHeight + 'px'}">
          <img v-if="sliderCounter !== 0" @click="slideToLeft()" src="@/assets/images/button-arrow-r.png" alt="矢印" class="_slider-arrow _ _slider-arrow-left">
          <img v-if="sliderCounter !== itemImages.length -1" @click="slideToRight()" src="@/assets/images/button-arrow-r.png" alt="矢印" class="_slider-arrow _ _slider-arrow-right">
          <p @click="openInfo()" class="_slider-info-open _link" >Information<img src="@/assets/images/arrow-s-white.png" class="_slider-link-arrow" alt="矢印"></p>
          
          <!-- <a :href="web.url" class="_slider-link" target="_blank" rel="noopener noreferrer">{{web.url}}<img src="@/assets/images/arrow-s-white.png" class="_slider-link-arrow" alt="矢印"></a> -->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Mixin from '@/mixin/mixin.js'
import Line from '@/components/Line.vue'
import Web from '@/class/Web.js'

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
      pageTitle: "Web site/app gallery",
      web:new Web(),

      itemImages: [],
      sliderCounter: 0,
      isShow: false
    }
  },
  created(){
    db.getData(this.$route.params.id, "web")
    .then((doc)=>{
      this.web = doc.data()
      this.pageTitle = this.web.title 
      this.itemImages = this.web.imageObjects
    })
  },
  methods:{
    slideToLeft(){
      this.sliderCounter --
    },
    slideToRight(){
      this.sliderCounter ++
    },
    openInfo(){
      this.isShow = true
    },
    closeInfo(){
      this.isShow = false
    }
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