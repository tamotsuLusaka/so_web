<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="true" :language="'eg'" :isScroll="false"></Line>
    <h1 class="_content-title">{{pageTitle}}</h1>
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <div v-if="isSend" class="after">
        <p class="_jp">
          お問い合わせありがとうございます。お問い合わせを受け付けました。3日営業日以内に改めてご連絡差し上げ上げます。<br>
          自動返信メールが届かない場合は、お手数ですが再度フォームの入力、送信をお願いいたします。
        </p>
      </div>
      <div v-else class="before">
        <div class="_input">
          <label for="email" class="_input-label">Email :</label>
          <input type="email" v-model="message.email" @blur="v$.message.email.$touch()" :class="{'_input-error': v$.message.email.$error}" id="email" placeholder="" class="_input-text" >
          <p v-if="v$.message.email.$error" class="_input-error-message">適正なメールアドレスを入力してください。</p>
        </div>
        <div class="_input">
          <label for="name" class="_input-label">Name :</label>
          <input type="text" v-model="message.name" @blur="v$.message.name.$touch()" :class="{'_input-error': v$.message.name.$error}" id="name" placeholder="" class="_input-text">
          <p v-if="v$.message.name.$error" class="_input-error-message">18字以内で入力してください。</p>
        </div>
        <div class="_input">
          <label for="tag" class="_input-label">Title :</label>
          <div class="_input-box">
            <img  src="@/assets/images/button-arrow.png" alt="" class="_input-icon">
            <select v-model="message.title" required :class="{'_input-select-exist': message.title !== null}" class="_input-select" >
              <option :value="null" disabled >件名を選択</option>
              <option v-for="tag in $store.getters['tagOfMessage']" :key="tag.text" :value="tag.text" :style="{'color': '#131313'}" >{{tag.text}}</option>
            </select>
          </div>
        </div>
        <div class="_input">
          <label for="text" class="_input-label">Message :</label>
          <textarea id="text" v-model="message.text"  @blur="v$.message.text.$touch()" :class="{'_input-error': v$.message.text.$error}" placeholder="" class="_input-textarea" ></textarea>
          <p v-if="v$.message.text.$error" class="_input-error-message">400字以内で入力してください。</p>
        </div>
        <p class="_error">{{errorMessage}}</p>
        <button :disabled="inactiveButton" @click="send()" class="_link  _marginM" >Submit<img src="@/assets/images/arrow.png" class="_link-arrow" alt="矢印"></button>
      </div>
    </div>
  </div>


</template>

<script>
import Mixin from '@/mixin/mixin.js'
import Line from '@/components/Line.vue'
import functions from '@/firebase/modules/functions.js'

import useVuelidate from '@vuelidate/core'
import { required, email, maxLength} from '@vuelidate/validators'

export default {
  name: 'Home',
  mixins:[
    Mixin
  ],
  components: {
    Line,
  },
  setup(){
    return { v$: useVuelidate()}
  },
  data(){
    return{
      pageTitle: "Contact",
      inactiveButton: false,
      errorMessage:"",
      message:{
        email: "",
        name: "",
        title: "",
        text: "",
      },
      isSend: false

    }
  },
  created(){

  },
  methods:{
    send(){
      this.inactiveButton = true
      if(this.v$.message.$invalid ){
        console.log("失敗")
        this.errorMessage = "すべての項目を入力してください。"
      }else{
        functions.sendMail(this.message)
        .then((result)=>{
          if(result.data){
            console.log("成功")
            this.isSend = true
          }else{
            console.log("失敗")
          }
          
        })
      }

    },
    
  },
  computed:{

  },
  beforeDestory(){

  },
  validations(){
    return{
      message:{
        name:{
          required,
          maxLength: maxLength(18)
        },
        email:{
          required,
          email
        },
        title:{
          required,
        },
        text:{
          required,
          maxLength: maxLength(400)
        },


      }
    }
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