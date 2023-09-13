<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="true" :language="'eg'" :isScroll="false"></Line>
    <h1 class="_content-title">{{pageTitle}}</h1>
    
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <p class="_error">{{errorMessage}}</p>
      <div v-for="item in photos" :key="item">
        <router-link :to="{name: 'EditPhoto', params:{id: item.id}}" class="_jp _link-bur _marginM" :class="{'_red': !item.isPublic}">{{item.date}} : {{item.title}}</router-link >
      </div>
      <router-link :to="{name: 'CreatePhoto'}" class="_link" >Creating Photo<img src="@/assets/images/arrow.png" class="_link-arrow" alt="矢印"></router-link >
      <router-link :to="{name: 'Manager'}" class="_back"><img src="@/assets/images/arrow-s.png" class="_back-arrow" alt="矢印">Back</router-link>
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
      pageTitle: "Manager of Photography",
      inactiveButton: false,
      errorMessage:"",

      photos:[],

    }
  },
  created(){
    this._checkAuth()
    db.getAllData("photo")
    .then((querySnapShot)=>{
      querySnapShot.forEach(doc => {
        this.photos.push(doc.data())
      })
      this.photos.sort((a, b)=>{
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
.link{
  display: block;
  margin-bottom: 20px;
}

@media screen and (max-width:599px){

}
</style>