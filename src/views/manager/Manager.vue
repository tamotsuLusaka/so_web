<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="true" :language="'eg'" :isScroll="false"></Line>
    <h1 class="_content-title">{{pageTitle}}</h1>
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <div v-if="$store.getters['isSignedIn']" class="after">
        <router-link :to="{name:'ManagerOfPhoto'}" class="link">Photography</router-link>
        <router-link :to="{name:'ManagerOfMovie'}" class="link">Videography</router-link>
        <router-link :to="{name:'ManagerOfWeb'}" class="link">Web site/app</router-link>
        <router-link :to="{name:'ManagerOfDesign'}" class="link">Design</router-link>
        <router-link :to="{name:'ManagerOfBrand'}" class="link">Branding</router-link>
        <p @click="signOut()">Sign out</p>
      </div>
      <div v-else class="before">
        <p class="_container-title">Sgined in</p>
        <p class="_error">{{errorMessage}}</p>
        <div class="_input">
          <label for="email" class="_input-label">Email :</label>
          <input type="email" v-model="user.email" id="email" placeholder="" class="_input-text">
        </div>
        <div class="_input">
          <label for="password" class="_input-label">Password :</label>
          <input type="password" v-model="user.password" id="password" placeholder="" class="_input-text">
        </div>
        <p @click="signIn" class="_link" >Submit<img src="@/assets/images/arrow.png" class="_link-arrow" alt="矢印"></p>
      </div>
    </div>
  </div>

</template>

<script>
import Mixin from '@/mixin/mixin.js'
import Line from '@/components/Line.vue'

import auth from '@/firebase/modules/auth.js'

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
      pageTitle: "Manager",
      inactiveButton: false,
      errorMessage:"",
      user:{
        email:"",
        password:"",
      },

    }
  },
  created(){

  },
  methods:{
    signIn(){
      this.inactiveButton = true
      auth.signIn(this.user.email, this.user.password)
      .then(()=>{
        this.inactiveButton = false
        this.$router.go({path: this.$router.currentRoute.path, force: true})
      })
      .catch((error)=>{
        this.inactiveButton = false
        if(error.code === "auth/wrong-password"){
          this.errorMessage = "パスワードが間違っています。"
        }else if(error.code === "auth/user-not-found"){
          this.errorMessage = "アカウントが存在しません。"
        }else if(error.code === "auth/user-disabled"){
          this.errorMessage = "アカウントが無効です。"
        }else if(error.code === "auth/invalid-email"){
          this.errorMessage = "メールアドレスが間違っています。"
        }else if(error.code === "auth/too-many-requests"){
          this.errorMessage = "間違ったパスワードが複数回入力されたのでログインがブロックされました。"
        }else{
          this.errorMessage = "ログインに失敗しました。"
        }
      })
    },
    signOut(){
      auth.signOut()
      this.$router.push({name: 'Home'})
    },
    
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