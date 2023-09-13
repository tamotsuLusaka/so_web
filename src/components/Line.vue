<template>
  <div class="back">
    <div :style="{'height': lineHeight + 'px'}" class="back-container">
      <div :style="{'height': lineHeight + 'px'}" class="line"></div>
      <h1 v-if="isTitle" class="title" :class="{'_jp': language === 'jp'}">{{title}}</h1>
      <div v-if="isScroll" class="scroll" :class="{'disappear': currentPosition > 100, 'blinking': currentPosition <= 100}">
        <div class="scroll-text">Scroll</div>
        <img src="@/assets/images/button-arrow.png" alt="" class="scroll-arrow">
        <img src="@/assets/images/button-arrow.png" alt="" class="scroll-arrow2">
      </div> 
    </div>
  </div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'

export default {
  mixins:[
    Mixin
  ],
  props:{
    title: String,
    isTitle: Boolean,
    language: String,
    isScroll: Boolean,
  },
  data(){
    return{
    }
  },
  methods:{

  },
  computed:{
    lineHeight: function(){
      return this.$store.getters['innerHeight'] - (this.$store.getters['logoHeight'] + this.$store.getters['logoMargin'] + this.$store.getters['topMargin'])
    },
    lineTop: function(){
      return this.$store.getters['logoHeight'] + this.$store.getters['logoMargin'] + this.$store.getters['topMargin']
    },
    currentPosition: function(){
      return this.$store.getters['currentHeight']
    },
  },
}
</script>

<style scoped>

.back{
  position: fixed;
  width: 100%;
  z-index: -10;
}
.back-container{
  position: absolute;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.line{
  position: absolute;
  width: 80px;
  border-right: 1px solid var(--black);
  transform: translate(0, -20px);
}
.title{
  position: absolute;
  top: -5px;
  left: 40px;
  writing-mode: vertical-rl;
  height: 250px;
}
.title:after{
  background-color: var(--black);
  top: 5px;
  content: '';
  display: block;
  height: 1px;
  left: 25px;
  position: absolute;
  width: 15px;
}
.scroll{
  position:absolute;
  width: 20px;
  height: 52px;
  left: 40px;
  bottom: 110px;
  opacity: 1;
  transition: 0.3s;
}
.scroll-text{
  position: absolute;
  writing-mode: vertical-rl;
  font-size: 1.3rem;
  top: 0;
  left: 0;
}
.scroll-arrow{
  position: absolute;
  width: 10px;
  left: 4px;
  bottom: 0;
}
.scroll-arrow2{
  position: absolute;
  width: 10px;
  left: 4px;
  bottom: 6px;
}
.disappear{
  opacity: 0;
}
.blinking{
  animation: blinking 1.5s ease-in-out infinite alternate;
}
@keyframes blinking {
	0% {opacity: 0;}
	100% {opacity: 1;}
}

@media screen and (max-width:599px){
  .line{
    width: 20px;
  }
  .title{
    display: none;
  }
  .title:after{
    display: none;
  }
  .scroll{
    display: none;
  }
}
</style>