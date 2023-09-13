<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="true" :language="'eg'" :isScroll="false"></Line>
    <h1 class="_content-title">{{pageTitle}}</h1>
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <div class="_container">
        <div v-for="item in movies" :key="item" class="_box">
          <div class="_box-movie">
            <iframe :src="`https://www.youtube.com/embed/${item.url}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <p class="_box-tag">{{item.tag}}.</p>
          <h2 class="_box-title _jp">{{item.title}}</h2>
        </div>
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
      pageTitle: "Videography gallery",
      movies:[],

    }
  },
  created(){
    db.getPublicData("movie")
    .then((querySnapShot)=>{
      querySnapShot.forEach(doc => {
        this.movies.push(doc.data())
      })
      this.movies.sort((a, b)=>{
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