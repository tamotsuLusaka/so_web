<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="true" :language="'eg'" :isScroll="false"></Line>
    <h1 class="_content-title">{{pageTitle}}</h1>
    
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <p class="_error">{{errorMessage}}</p>
      <div v-for="item in brands" :key="item" >
        <router-link :to="{name: 'EditBrand', params:{id: item.id}}" class="_jp _link-bur _marginS" :class="{'_red': !item.isPublic}">{{item.date}} : {{item.title}}</router-link >
      </div>
      <router-link :to="{name: 'CreateBrand'}" class="_link" >Creating Branding<img src="@/assets/images/arrow.png" class="_link-arrow" alt="矢印"></router-link >
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
      pageTitle: "Manager of Branding",
      inactiveButton: false,
      errorMessage:"",

      brands:[],

    }
  },
  created(){
    this._checkAuth()
    db.getAllData("brand")
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
.link{
  display: block;
  margin-bottom: 20px;
}

@media screen and (max-width:599px){

}
</style>