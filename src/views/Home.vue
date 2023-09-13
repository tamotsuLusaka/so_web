<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="false"  :language="'eg'" :isScroll="true"></Line>
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <div class="top-images">
        <h1 class="top-image-container" :style="{'height': topImageHeight + 'px'}">
          <img src="@/assets/images/top-1.jpg" class="top-image" alt="周防大島の海" :class="{'top-image-active': imageMark === 'a'}">
          <img src="@/assets/images/top-2.jpg" class="top-image" alt="蛍" :class="{'top-image-active': imageMark === 'b'}">
          <img src="@/assets/images/top-4.jpg" class="top-image" alt="周防大島の空" :class="{'top-image-active': imageMark === 'c'}">
        </h1>
      </div>
      <h1 class="content-title">Works</h1>
      <div class="work">
        <div id="photo" class="work-container">
          <router-link :to="{name: 'Photo'}" class="work-box">
            <img src="@/assets/images/works-image-photo.jpg" alt="" class="work-image">
            <h2 class="work-title">Photography.</h2>
            <div class="work-link">Gallery<img src="@/assets/images/arrow.png" class="work-arrow-pc" alt="矢印"><img src="@/assets/images/arrow-s.png" class="work-arrow-sp" alt="矢印"></div>
          </router-link>
        </div>
        <div id="movie" class="work-container">
          <router-link :to="{name: 'Movie'}" class="work-box">
            <img src="@/assets/images/works-image-movie.jpg" alt="" class="work-image">
            <h2 class="work-title">Videography.</h2>
            <div class="work-link">Gallery<img src="@/assets/images/arrow.png" class="work-arrow-pc" alt="矢印"><img src="@/assets/images/arrow-s.png" class="work-arrow-sp" alt="矢印"></div>
          </router-link>
        </div>
        <div id="web" class="work-container">
          <router-link :to="{name: 'Web'}" class="work-box">
            <img src="@/assets/images/works-image-web.jpg" alt="" class="work-image">
            <h2 class="work-title">Web site/app.</h2>
            <div class="work-link">Gallery<img src="@/assets/images/arrow.png" class="work-arrow-pc" alt="矢印"><img src="@/assets/images/arrow-s.png" class="work-arrow-sp" alt="矢印"></div>
          </router-link>
        </div>
        <div id="design" class="work-container">
          <router-link :to="{name: 'Design'}" class="work-box">
            <img src="@/assets/images/works-image-package.jpg" alt="" class="work-image">
            <h2 class="work-title">Design.</h2>
            <div class="work-link">Gallery<img src="@/assets/images/arrow.png" class="work-arrow-pc" alt="矢印"><img src="@/assets/images/arrow-s.png" class="work-arrow-sp" alt="矢印"></div>
          </router-link>
        </div>
        <div id="consul" class="work-container">
          <router-link :to="{name: 'Brand'}" class="work-box">
            <img src="@/assets/images/works-image-brand.jpg" alt="" class="work-image">
            <h2 class="work-title">Branding/Consulting.</h2>
            <div class="work-link">Gallery<img src="@/assets/images/arrow.png" class="work-arrow-pc" alt="矢印"><img src="@/assets/images/arrow-s.png" class="work-arrow-sp" alt="矢印"></div>
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Mixin from '@/mixin/mixin.js'
import Line from '@/components/Line.vue'

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
      pageTitle: "Home",
      
      imageMark: "a",
      timer: null,

      elementPhoto: null,
      elementVideo: null,
      elementWeb: null,
      elementDesign: null,
      elementConsul: null,
      setPosition: 0
    }
  },
  created(){
    this.timer = setInterval(this.setImage, 7000)
    // window.addEventListener('scroll', this.snap)
    
  },
  mounted(){
    // this.elementPhoto = document.getElementById('photo')
    // this.elementVideo = document.getElementById('video')
    // this.elementWeb = document.getElementById('web')
    // this.elementDesign = document.getElementById('design')
    // this.elementConsul = document.getElementById('consul')
  },
  methods:{
    setImage(){
      if(this.imageMark === "a"){
        this.imageMark = "b"
      }else if(this.imageMark === "b"){
        this.imageMark = "c"
      }else if(this.imageMark === "c"){
        this.imageMark = "a"
      }
    },
    // scroll(){
    //   this.elementPhoto.scrollIntoView({
    //     behavior: "smooth"
    //   })
    // },
    // snap(){
    //   if (this.setPosition < document.documentElement.scrollTop) {
    //     console.log(`down`)
    //     console.log(this.setPosition)
    //     this.scroll()
    //   } else {
    //     console.log(`up`)
    //     console.log(this.setPosition)
    //   }
    //   this.setPosition = document.documentElement.scrollTop;
    // }
  },
  computed:{
    topImageHeight: function(){
      let adjustHeight = 0
      if(window.innerWidth > 600){
        adjustHeight = 50
      }else{
        adjustHeight = 30
      }
      return this.$store.getters['innerHeight'] - (this.$store.getters['logoHeight'] + this.$store.getters['logoMargin'] + this.$store.getters['topMargin'] + this.$store.getters['footerHeight'] + adjustHeight)
    }
  },
  beforeDestory(){
    clearTimeout(this.timer)
  },
}
</script>

<style  scoped>
.top-images{
  width: 100%;
  margin-bottom: 100px;
}
.top-image-container{
  width: 100%;
  background-color: var(--black);
  position: relative;
}
.top-image{
  display: block;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 2s;
}
.top-image-active{
  opacity: 1;
}
.content-title{
  position: sticky;
  top: 240px;
  writing-mode: vertical-rl;
  transform: translate(-87px, 0);
}
.content-title:after{
  background-color: var(--black);
  top: 5px;
  content: '';
  display: block;
  height: 1px;
  left: 25px;
  position: absolute;
  width: 15px;
}
.work{
  
}
.work-container{
  /* padding-top: 180px; */
  margin-bottom: 200px;
}
.work-box{
  display: block;
  width: 80%;
  min-width: 350px;
  position: relative;
}
.work-image{
  width: calc(100% - 50px);
  object-fit: cover;
  aspect-ratio: 3 / 2;
}
.work-title{
  position: absolute;
  right: 0;
  bottom: 5px;
  text-align: right;
  font-size: 2.0rem;
  writing-mode: vertical-rl;

}
.work-link{
  position: absolute;
  bottom: -45px;
  right: 10px;
  display: block;
  height: 30px;
  font-size: 1.3rem;
  cursor: pointer;
}
.work-arrow-pc{
  width: 100px;
  margin-left: 5px;
}
.work-arrow-sp{
 display: none;
}

@media screen and (max-width:599px){

  .top-images{
    margin-bottom: 100px;
  }
  .content-title{
    position: static;
    writing-mode:horizontal-tb;
    transform: translate(0, 0);
    margin-bottom: 20px;
  }
  .content-title:after{
    background-color: var(--black);
    top: 11px;
    left: -25px;
    width: 15px;
  }
  .work-box{
    width: 100%;
    min-width:auto;
    margin-bottom: 50px;
  }
  .work-image{
    width: 100%;
  }
  .work-title{
    position: static;
    text-align: left;
    font-size: 1.8rem;
    writing-mode:horizontal-tb;
    margin-bottom: 10px;
  }
  .work-link{
    position: static;
    display: block;
    height: 30px;
    font-size: 1.2rem;
  }
  .work-arrow-pc{
    display: none;
  }
  .work-arrow-sp{
    display: inline;
    margin-left: 5px;
    width: 30px;
  }
}
</style>