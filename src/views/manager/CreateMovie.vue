<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="true" :language="'eg'" :isScroll="false"></Line>
    <h1 class="_content-title">{{pageTitle}}</h1>
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <p class="_error">{{errorMessage}}</p>
      <div class="_input">
        <label for="title" class="_input-label">Title :</label>
        <input type="text" v-model="movie.title" id="title" placeholder="" class="_input-text">
      </div>
      <div class="_input">
        <div class="_input-tag">
          <div class="_input-tag-box">
            <input type="radio" id="english" :value="'eg'" v-model="movie.language">
            <label for="english" class="_input-tag-label"><span v-if="movie.language === 'eg'" class="_input-tag-active"></span></label>
            <label for="english" class="_input-tag-text _eg">English</label>
          </div>
          <div class="_input-tag-box">
            <input type="radio" id="japanese" :value="'jp'" v-model="movie.language">
            <label for="japanese" class="_input-tag-label"><span v-if="movie.language ==='jp'" class="_input-tag-active"></span></label>
            <label for="japanese" class="_input-tag-text _eg">Japanese</label>
          </div>
        </div>
      </div>
      <div class="_input">
        <label for="tag" class="_input-label">Tag :</label>
        <div class="_input-box">
          <img  src="@/assets/images/button-arrow.png" alt="" class="_input-icon">
          <select v-model="movie.tag" required :class="{'_input-select-exist': movie.tag !== null}" class="_input-select" >
            <option :value="null" disabled >Select</option>
            <option v-for="tag in $store.getters['tagOfMovie']" :key="tag.text" :value="tag.text" :style="{'color': '#131313'}" >{{tag.text}}</option>
          </select>
        </div>
      </div>
      <div class="_input">
        <label for="date" class="_input-label">Date :</label>
        <input type="number" v-model="movie.date" id="date" placeholder="" class="_input-text">
      </div>
      <div class="_input">
        <label for="url" class="_input-label">Youtube id :</label>
        <input type="text" v-model="movie.url" id="url" placeholder="" class="_input-text">
      </div>
      <div class="_input">
        <div class="_input-tag">
          <div class="_input-tag-box">
            <input type="radio" id="public" :value="true" v-model="movie.isPublic">
            <label for="public" class="_input-tag-label"><span v-if="movie.isPublic" class="_input-tag-active"></span></label>
            <label for="public" class="_input-tag-text _eg">Public</label>
          </div>
          <div class="_input-tag-box">
            <input type="radio" id="unpublic" :value="false" v-model="movie.isPublic">
            <label for="unpublic" class="_input-tag-label"><span v-if="!movie.isPublic" class="_input-tag-active"></span></label>
            <label for="unpublic" class="_input-tag-text _eg">Unpublic</label>
          </div>
        </div>
      </div>
      <button v-if="mode === 'create'" :disabled="inactiveButton" @click="createMovie()" class="_button" >Save<img src="@/assets/images/arrow.png" class="_link-arrow" alt="矢印"></button>
      <button v-if="mode === 'edit'" :disabled="inactiveButton" @click="editMovie()" class="_button _marginM" >Save<img src="@/assets/images/arrow.png" class="_link-arrow" alt="矢印"></button>
      <button v-if="mode === 'edit'" :disabled="inactiveButton" @click="deleteMovie()" class="_button" >Delete<img src="@/assets/images/arrow.png" class="_link-arrow" alt="矢印"></button>
      <router-link :to="{name: 'ManagerOfMovie'}" class="_back"><img src="@/assets/images/arrow-s.png" class="_back-arrow" alt="矢印">Back</router-link>
    </div>
  </div>

</template>

<script>
import Mixin from '@/mixin/mixin.js'
import Line from '@/components/Line.vue'
import Movie from '@/class/Movie.js'
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
      pageTitle: "Creating Videography",
      inactiveButton: false,
      errorMessage:"",
      mode:"create", // "create" or "edit"

      movie: new Movie(),
    }
  },
  created(){
    // this._checkAuth()
    if(this.$route.params.id){
      this.mode = "edit"
      db.getData(this.$route.params.id, "movie")
      .then((doc)=>{
        this.movie = doc.data()
      })
    }


  },
  methods:{
    async createMovie(){
      this.inactiveButton = true
      this.movie.date = Number(this.movie.date)
      const docRef = db.getNewRef('movie')
      this.movie.id = await docRef.id
      this.saveData(docRef)
    },
    editMovie(){
      this.inactiveButton = true
      this.movie.date = Number(this.movie.date)
      const docRef = db.getRef(this.movie.id, 'movie')
      this.saveData(docRef)
    },
    saveData(docRef){
      db.saveData(this.movie, docRef, this.mode)
      .then(()=>{
        this.$router.push({name:'ManagerOfMovie'})
      })
      .catch((error)=>{
        console.log(error.message)
        this.inactiveButton = false
        this.errorMessage = "データの保存に失敗しました。"
      })
    },
    deleteMovie(){
      this.inactiveButton = true
      db.deleteData(this.movie.id, "movie")
      .then(()=>{
        this.$router.push({name:'ManagerOfMovie'})
      })
      .catch((error)=>{
        console.log(error.message)
        this.inactiveButton = false
        this.errorMessage = "データの削除に失敗しました。"
      })
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