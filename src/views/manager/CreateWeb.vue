<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="true" :language="'eg'" :isScroll="false"></Line>
    <h1 class="_content-title">{{pageTitle}}</h1>
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <p class="_error">{{errorMessage}}</p>
      <div class="_input">
        <label for="title" class="_input-label">Title :</label>
        <input type="text" v-model="web.title" id="title" placeholder="" class="_input-text">
      </div>
      <div class="_input">
        <label for="tag" class="_input-label">Tag :</label>
        <div class="_input-box">
          <img  src="@/assets/images/button-arrow.png" alt="" class="_input-icon">
          <select v-model="web.tag" required :class="{'_input-select-exist': web.tag !== null}" class="_input-select" >
            <option :value="null" disabled >Select</option>
            <option v-for="tag in $store.getters['tagOfWeb']" :key="tag.text" :value="tag.text" :style="{'color': '#131313'}" >{{tag.text}}</option>
          </select>
        </div>
      </div>
      <div class="_input">
        <div class="_input-tag">
          <div class="_input-tag-box">
            <input type="radio" id="english" :value="'eg'" v-model="web.language">
            <label for="english" class="_input-tag-label"><span v-if="web.language === 'eg'" class="_input-tag-active"></span></label>
            <label for="english" class="_input-tag-text _eg">English</label>
          </div>
          <div class="_input-tag-box">
            <input type="radio" id="japanese" :value="'jp'" v-model="web.language">
            <label for="japanese" class="_input-tag-label"><span v-if="web.language ==='jp'" class="_input-tag-active"></span></label>
            <label for="japanese" class="_input-tag-text _eg">Japanese</label>
          </div>
        </div>
      </div>
      <div class="_input">
        <label for="date" class="_input-label">Date :</label>
        <input type="number" v-model="web.date" id="date" placeholder="" class="_input-text">
      </div>
      <div class="_input">
        <label for="url" class="_input-label">Url :</label>
        <input type="text" v-model="web.url" id="url" placeholder="" class="_input-text">
      </div>
      <div class="_input">
        <label for="part" class="_input-label">Part :</label>
        <input type="text" v-model="web.part" id="part" placeholder="" class="_input-text">
      </div>
      <div class="_input">
        <label for="technology" class="_input-label">Technology :</label>
        <input type="text" v-model="web.technology" id="technology" placeholder="" class="_input-text">
      </div>
      <div class="_input">
        <div class="_input-tag">
          <div class="_input-tag-box">
            <input type="radio" id="public" :value="true" v-model="web.isPublic">
            <label for="public" class="_input-tag-label"><span v-if="web.isPublic" class="_input-tag-active"></span></label>
            <label for="public" class="_input-tag-text _eg">Public</label>
          </div>
          <div class="_input-tag-box">
            <input type="radio" id="unpublic" :value="false" v-model="web.isPublic">
            <label for="unpublic" class="_input-tag-label"><span v-if="!web.isPublic" class="_input-tag-active"></span></label>
            <label for="unpublic" class="_input-tag-text _eg">Unpublic</label>
          </div>
        </div>
      </div>
      <div class="_input">
        <div class="_input-image-upload-container">
          <div v-for="(imageObject, index) in imageDisp"
                :key="index"
                draggable="true"
                @dragstart="images.dragstart(imageObject, $event)"
                @dragenter="images.dragenter(imageObject)"
                @dragover.stop.prevent="images.dragover"
                @dragend.stop.prevent="images.dragend"
                class="_input-image-box _input-image-preview">
            <div class="_input-image-preview-image" :style="{'background-image': 'url(' + imageObject.url +')'}"></div>
            <img @click="images.deleteImageObject(index)" src="@/assets/images/cross-button-w.png" alt="" class="_input-image-delete">
          </div>
          <div class="box image-upload-button">
            <input type="file" ref="preview" @change="images.setImage($event, $refs)" accept="image/png, image/jpeg" id="image" class="_hide">
            <label for="image" class="_input-image-upload-icon">
              <img  src="@/assets/images/icon-photo.png" alt="カメラアイコン" class="_input-image-camera-icon">
            </label>
          </div>
        </div>
      </div>
      <button v-if="mode === 'create'" :disabled="inactiveButton" @click="dataMethod('create')" class="_button" >Save<img src="@/assets/images/arrow.png" class="_link-arrow" alt="矢印"></button>
      <button v-if="mode === 'edit'" :disabled="inactiveButton" @click="dataMethod('edit')" class="_button _marginM" >Save<img src="@/assets/images/arrow.png" class="_link-arrow" alt="矢印"></button>
      <button v-if="mode === 'edit'" :disabled="inactiveButton" @click="dataMethod('delete')" class="_button" >Delete<img src="@/assets/images/arrow.png" class="_link-arrow" alt="矢印"></button>
      <router-link :to="{name: 'ManagerOfWeb'}" class="_back"><img src="@/assets/images/arrow-s.png" class="_back-arrow" alt="矢印">Back</router-link>
    </div>
  </div>

</template>

<script>
import Mixin from '@/mixin/mixin.js'
import Line from '@/components/Line.vue'
import Web from '@/class/Web.js'
import Images from '@/class/Images.js'
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
      pageTitle: "Creating Web",
      inactiveButton: false,
      errorMessage:"",
      mode:"create", // "create" or "edit"

      web: new Web(),
      images: new Images(),
    }
    
  },
  created(){
    // this._checkAuth()
    if(this.$route.params.id){
      this.mode = "edit"
      db.getData(this.$route.params.id, "web")
      .then((doc)=>{
        this.web = doc.data()
        this.web.imageObjects.sort((a,b)=>{
          if(a.order < b.order){return -1}
          if(a.order > b.order){return 1}
          return 0
        })
        this.images = new Images(this.web.imageObjects)
      })
    }else{
      this.mode = "create"
      this.images = new Images()
    }
  },
  methods:{
    async dataMethod(action){
      this.inactiveButton = true
      let errorResult = null
      const saveObject = {data: this.web, table: "web", afterRouterName: "ManagerOfWeb"}
      if(action === 'create'){
        errorResult = await this.images.create(saveObject.data, saveObject.table, saveObject.afterRouterName)
      }else if(action === 'edit'){
        errorResult = await this.images.edit(saveObject.data, saveObject.table, saveObject.afterRouterName)
      }else if(action === 'delete'){
        errorResult = await this.images.deleteData(saveObject.data, saveObject.table, saveObject.afterRouterName)
      }
      
      if(errorResult){
        this.inactiveButton = errorResult.inactiveButton
        this.errorMessage = errorResult.errorMessage
      }
    },
  },
  computed:{
    imageDisp() {
      return [...this.images.imageObjects].sort((a, b) => a.order - b.order)
    }
  },
  watch: {
    imageDisp:{
      deep: true,
      handler: function (){
        return this.images.imageObjects.sort((a, b) => a.order - b.order)
      }
    }
  },
  beforeDestory(){

  },
}
</script>

<style  scoped>


@media screen and (max-width:599px){

}
</style>