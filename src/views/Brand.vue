<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="true" :language="'eg'" :isScroll="false"></Line>
    <h1 class="_content-title">{{pageTitle}}</h1>
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <div class="_container">
        <router-link v-for="item in brands" :key="item" :to="{name: 'ShowBrand', params:{id: item.id}}" class="_box">
          <img  :src="item.imageObjects[0].url" alt="item.title" class="_box-image">
          <p class="_box-tag">{{item.tag}}.</p>
          <h2 class="_box-title _jp">{{item.title}}</h2>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
import Mixin from '@/mixin/mixin.js'
import Line from '@/components/Line.vue'

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
      brands:[],

    }
  },
  created(){
    db.getPublicData("brand")
    .then((querySnapShot)=>{
      querySnapShot.forEach(doc => {
        this.brands.push(doc.data())
      })
      this.brands.sort((a, b)=>{
        if(a.date < b.date){return 1}
        if(a.date > b.date){return -1}
        return 0
      })
    })
  },
  methods:{

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