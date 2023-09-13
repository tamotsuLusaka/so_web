<template>
  <div class="frame">
    <div class="header">
      <div class="header-container" :style="{'top': $store.getters['topMargin'] + 'px'}">
        <img @click="go('Home')" src="@/assets/images/so.png" alt="so" class="logo" :style="{'width': $store.getters['logoWidth'] + 'px', 'height': $store.getters['logoHeight'] + 'px', 'margin-bottom': $store.getters['logoMargin']}">
      </div>
    </div>
    <div :style="{'height': ($store.getters['topMargin'] + $store.getters['logoHeight'] + 4) + 'px'}" class="navi">
      <div v-if="mq.current === 'lg'" class="navi-container">
        <router-link :to="{name: 'About'}" class="navi-text _link">ABOUT</router-link>
        <router-link :to="{name: 'Contact'}" class="navi-text _link">CONTACT</router-link>
      </div>
    </div>

    <router-view/>

    <div class="footer">
      <!-- <div v-if="mq.current === 'lg'" class="works">
        <router-link :to="{name: 'Photo'}"><img src="@/assets/images/icon-photo.png" alt="" class="works-icon"></router-link>
        <div @click="go('Movie')"><img src="@/assets/images/icon-movie.png" alt="" class="works-icon"></div>
        <div @click="go('Web')"><img src="@/assets/images/icon-pc.png" alt="" class="works-icon"></div>
        <div @click="go('Design')"><img src="@/assets/images/icon-bag.png" alt="" class="works-icon"></div>
        <div @click="go('Home')"><img src="@/assets/images/icon-document.png" alt="" class="works-icon"></div>
      </div> -->
      <div  @click="showMenu()" class="menu-open">
        <div class="menu-open-button">
          <p class="menu-open-text">Menu</p>
          <img src="@/assets/images/arrow-s.png" alt="" class="menu-open-arrow">
        </div>
      </div>
      <div class="copy" :style="{'height': $store.getters['footerHeight'] + 'px', 'line-height': $store.getters['footerHeight'] + 'px'}">
        <p>Copyright &copy; SO DESIGN STUDIO. ALL rights reserved.</p>
      </div>
    </div>
    <div  class="menu" :class="{'appear-menu': isShownMenu}" :style="{'height': $store.getters['innerHeight'] + 'px'}">
      <div class="menu-base">
        <div @click="showMenu()" class="menu-close">
          <div class="menu-close-button">
            <p class="menu-close-text">Close</p>
            <img src="@/assets/images/arrow-s.png" alt="" class="menu-close-arrow">
          </div>
        </div>
        <div class="menu-content">
          <img @click="go('Home')" src="@/assets/images/so.png" alt="so" class="menu-logo" :style="{'width': $store.getters['logoWidth'] + 'px', 'height': $store.getters['logoHeight'] + 'px', 'margin-bottom': $store.getters['logoMargin']}">
          <div class="menu-lists">
            <div @click="go('About')" class="menu-list _link">About</div>
            <div @click="go('Contact')" class="menu-list _link ">Contact</div>
            <div @click="go('Policy')" class="menu-list _link  marginS">Privacy policy</div>
            <p class="menu-list">Gallery</p>
            <div @click="go('Photo')" class="menu-list _link">- Photography</div>
            <div @click="go('Movie')" class="menu-list _link">- Videography</div>
            <div @click="go('Web')" class="menu-list _link">- Web site/app</div>
            <div @click="go('Design')" class="menu-list _link">- Design</div>
            <div @click="go('Home')" class="menu-list _link">-  Branding</div>
            
          </div>
        </div>
      </div>

    </div>
  </div>
  
</template>

<script>
import Mixin from '@/mixin/mixin.js'
import auth from '@/firebase/modules/auth.js'

export default {
  name: 'Home',
  mixins:[
    Mixin
  ],
  components: {

  },
  data(){
    return{
      isShownMenu: false,
      transition: {
        enter: '',
        leave: '',
        duration: 100,
      },
    }
  },
  methods:{
    //スクロール位置取得
    setCurrentPosition(){
      this.$store.commit('setCurrentHeight', window.scrollY)
    },
    resize(){
      this.$store.commit('setInnerHeight', window.innerHeight)
      if(window.innerWidth > 600){
        this.$store.commit('setLogoWidth', 196)
        this.$store.commit('setLogoHeight', 78)
        this.$store.commit('setLogoMargin', 20)
        this.$store.commit('setTopMargin', 60)
        this.$store.commit('setFooterHeight', 80)
      }else{
        this.$store.commit('setLogoWidth', 120)
        this.$store.commit('setLogoHeight', 47)
        this.$store.commit('setLogoMargin', 20)
        this.$store.commit('setTopMargin', 30)
        this.$store.commit('setFooterHeight', 50)
      }
    },
    showMenu(){
      this.isShownMenu = !this.isShownMenu
      this.stop(this.isShownMenu)
    },
    go(name){
      this.isShownMenu = false
      this.stop(this.isShownMenu)
      this.$router.push({name: name})
    },
    stop(fixed){
      /**
       * 表示されているスクロールバーとの差分を計測し、背面固定時はその差分body要素に余白を生成する
       */
      const scrollbarWidth = window.innerWidth - document.body.clientWidth;
      document.body.style.paddingRight = fixed ? `${scrollbarWidth}px` : '';
    
      /**
       * スクロール位置を取得する要素を出力する(`html`or`body`)
       */
      const scrollingElement = () => {
        const browser = window.navigator.userAgent.toLowerCase();
        if ('scrollingElement' in document) return document.scrollingElement;
        if (browser.indexOf('webkit') > 0) return document.body;
        return document.documentElement;
      };
    
      /**
       * 変数にスクロール量を格納
       */
      const scrollY = fixed
        ? scrollingElement().scrollTop
        : parseInt(document.body.style.top || '0');
    
      /**
       * CSSで背面を固定
       */
      const styles = {
        height: '100vh',
        left: '0',
        overflow: 'hidden',
        position: 'fixed',
        top: `${scrollY * -1}px`,
        width: '100vw',
      };
    
      Object.keys(styles).forEach((key) => {
        document.body.style[key] = fixed ? styles[key] : '';
      });
    
      /**
       * 背面固定解除時に元の位置にスクロールする
       */
      if (!fixed) window.scrollTo(0, scrollY * -1);
    },
  },
  computed:{

  },
  watch: {

  },
  beforeCreate(){
    auth.onSignedIn()
  },
  created(){
    this.resize()
  },
  mounted(){
    window.addEventListener('scroll', this.setCurrentPosition)
    window.addEventListener('resize', this.resize)
  },
  beforeDestory(){
    window.removeEventListener('scroll', this.setCurrentPosition)
    window.removeEventListener('resize', this.resize)
  },
}
</script>

<style  scoped>
.frame{
  position: relative;
  top: 0;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
.navi{
  position: relative;
  width: 100%;
   /* _baseの開始位置になる */
  margin-bottom: 40px;
}
.navi-container{
  position: absolute;
  bottom: 0;
  right: 30px;
  width: 300px;
  margin: 0 auto;
  text-align: right;
  z-index: 30;
}
.navi-text{
  margin-left: 20px;
}
.header{
  position: fixed;
  width: 100%;
  z-index: 20;
}
.header-container{
  position: absolute;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.logo{
  display: block;
  margin-left:30px;
}

.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  z-index: 20;

}
.works{
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 30px;
  bottom: 70px;
}
.works-icon{
  width: 30px;
  height: 30px;
  margin-top: 10px;
}
.copy{
  background-color: var(--white);
}
.copy p{
  margin-right: 30px;
  font-size: 1.2rem;
  text-align: right;
}

.menu-open{
  position: absolute;
  width: 70px;
  height: 12px;
  cursor: pointer;
  bottom: 80px;
  right: 8px;
}
.menu-open-button{
  -webkit-transform:rotateZ(90deg);
  transform:rotateZ(90deg);
  position: absolute;
  width: 100%;
}
.menu-open-text{
  position: absolute;
  font-size: 1.1rem;
  bottom: 0;
  right: 0;
  text-align: right;
}
.menu-open-arrow{
  position: absolute;
  display: block;
  width: 40px;
  height: 6px;
  bottom: 4px;
  left: 0;
  -webkit-transform: scale(-1, 1);
  transform: scale(-1, 1);
}
.menu{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  z-index: 50;
  background-color: var(--white);
  -webkit-transform: translate(0, 115%);
  transform: translate(0, 115%);
  transition: 0.4s;
}
.menu-base{
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}
.appear-menu{
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}
.menu-content{
  width: calc(100% - 60px);
  margin: 60px auto;
}
.menu-logo{
  margin-bottom: 30px;
}
.menu-lists{
  display: flex;
  flex-direction: column;
}
.menu-list{
  display: block;
  margin-bottom: 10px;
}
.menu-close{
  position: absolute;
  width: 70px;
  height: 12px;
  top: 35px;
  right: 8px;
  cursor: pointer;
}
.menu-close-button{
  -webkit-transform:rotateZ(90deg);
  transform:rotateZ(90deg);
  position: absolute;
  width: 100%;
}
.menu-close-text{
  position: absolute;
  font-size: 1.1rem;
  bottom: 0;
  left: 0;
  text-align: right;
}
.menu-close-arrow{
  position: absolute;
  display: block;
  width: 40px;
  height: 6px;
  bottom: 4px;
  right: 0;
}

.marginS{
  margin-bottom: 30px;
}

@media screen and (max-width:599px){
  .header{
    background-color: var(--white);
    padding: 43px 0;
  }
  .header-container{
    background-color: var(--white);
  }
  .navi{
    margin-bottom: 30px;
  }
  .logo{
    margin-left:15px;
  }

  .line{
    width: 20px;
  }
  .works{
    right: 15px;
  }
  .copy p{
    margin-right: 15px;
    font-size: 1.0rem;
  }

  .menu-open{
    position: absolute;
    width: 70px;
    height: 12px;
    bottom: 70px;
    right: -10px;
  }
  .menu-close{
    position: absolute;
    width: 70px;
    height: 12px;
    top: 30px;
    right: -10px;
  }
  .menu-content{
    width: calc(100% - 60px);
    margin: 30px auto;
  }
}
</style>
