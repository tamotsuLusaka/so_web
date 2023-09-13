<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="true" :language="brand.language" :isScroll="true"></Line>
    <h1 class="_content-title" :class="{'_jp': brand.language === 'jp'}">{{pageTitle}}</h1>
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <img :src="topImage" class="top-image" :alt="brand.title">
      <p>Works</p>
      <p class="text _jp">{{brand.text}}</p>
      <a v-if="mq.current === 'lg'" :href="brand.url" class="link" target="_blank" rel="noopener noreferrer">{{brand.url}}<img src="@/assets/images/arrow.png" class="_link-arrow" alt="矢印"></a>
      <a v-if="mq.current === 'md'" :href="brand.url" class="link" target="_blank" rel="noopener noreferrer">Website<img src="@/assets/images/arrow.png" class="_link-arrow" alt="矢印"></a>
      <img v-for="image in itemImages" :key="image.order" :src="image.url" alt="" class="image">
    </div>
  </div>

</template>

<script>
import Mixin from '@/mixin/mixin.js'
import Line from '@/components/Line.vue'
import Brand from '@/class/Brand.js'

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
      pageTitle: "Branding/Consulting gallery",
      brand:new Brand(),

      topImage: null,
      itemImages: [],
      sliderCounter: 0,
    }
  },
  created(){
    db.getData(this.$route.params.id, "brand")
    .then((doc)=>{
      this.brand = doc.data()
      this.pageTitle = this.brand.title 
      this.brand.imageObjects.forEach((image, index) => {
        if(index === 0){
          this.topImage = image.url
        }else{
          this.itemImages.push(image)
        }
      })
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

.top-image{
  width: 100%;
  object-fit: cover;
  margin-bottom: 30px;
}
.text{
  white-space: pre-wrap;
  margin-bottom: 10px;
}
.link{
  display: block;
  font-size: 1.5rem;
  margin-bottom: 80px;
  cursor: pointer;
}
.image{
  width: 80%;
  min-width: 300px;
  margin-bottom: 10px;
}
@media screen and (max-width:599px){
  .image{
    width: 100%;
    min-width:unset;
  }
}
</style>