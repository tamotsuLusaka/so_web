<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="false"  :language="'eg'" :isScroll="true"></Line>
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">
      <Disappear :currentPosition="$store.getters['currentHeight']" :distance="900">Works</Disappear>
      <div class="work">
        <div v-for="work in works" :key="work.title" class="work-box">
          <p class="work-title">{{work.title}}</p>
          <div v-for="content in work.contents" :key="content">
            <div class="work-content _jp">{{content.work}}<span v-if="content.price ==='consult'" class="work-price">応相談</span><span v-else class="work-price">¥{{content.price}}〜</span></div>
          </div>
          <router-link :to="{name: work.link}" class="work-link">Gallery<img src="@/assets/images/arrow.png" class="work-arrow" alt="矢印"></router-link>
        </div>
      </div>
      <Disappear :currentPosition="$store.getters['currentHeight']" :distance="1700">Member</Disappear>
      <div class="member">
        <div v-for="member in members" :key="member.name" class="member-box">
          <div class="member-left">
            <img :src="member.image" :alt="member.name" class="member-face">
          </div>
          <div class="member-right">
            <div class="member-info">
              <p class="member-position">{{member.position}}</p>
              <p class="member-name">{{member.name}}</p>
              <p class="member-text _marginS">{{member.skill}}</p>
              <p class="member-text">{{member.hobby}}</p>
            </div>
          </div>
        </div>
      </div>
      <h1 class="content-title">Information</h1>
      <div class="info">
        <p class="info-title">SO DESIGN STUDIO</p>
        <p class="info-access">
          Suo-oshima office<br>
          〒742-2802<br>
          Yura, Suo-oshima town, Yamaguchi prefecture
        </p>
        <p class="info-access">
          Shunan studio<br>
          〒745-0831<br>
          Kusunoki, Shunanshi city, Yamaguchi prefecture
        </p>
        <router-link :to="{name: 'Contact'}" class="work-link">Contact<img src="@/assets/images/arrow.png" class="work-arrow" alt="矢印"></router-link>
      </div>
    </div>
  </div>

</template>

<script>
import Mixin from '@/mixin/mixin.js'
import Line from '@/components/Line.vue'
import Disappear from '@/components/Disappear.vue'


export default {
  name: 'Home',
  mixins:[
    Mixin
  ],
  components: {
    Line,
    Disappear,
  },
  data(){
    return{
      pageTitle: "About us",
      members:[
        {
          name:"Naotoshi Nishimura",
          position: "西村 尚倫",
          skill: "Producer / Business consultant",
          hobby: "娘と息子をこよなく愛す二児の父。映像を通して成長日記を制作中。",
          image: require("@/assets/images/face-n.png"),
        },
        {
          name:"Kazuteru Maruyama",
          position: "たもつ",
          skill: "Photographer / Web engineer",
          hobby: "山や海に入って写真撮影によくいく。ただし臆病なので同伴者がいないと不安。",
          image: require("@/assets/images/face-t.png"),
        },
        {
          name:"Aoi Nakagawa",
          position: "中川 碧惟",
          skill: "Illustrator",
          hobby: "特撮と三度の飯が好き。何か様子がおかしい。かゆ うま",
          image: require("@/assets/images/face-a.png"),
        },
      ],
      works:[
        {
          title:"Photography",
          contents:[
            {work: "イメージ写真撮影, イベント撮影, ドローン空撮", price: "20000"},
            {work: "商品写真撮影", price: "3000"},
          ],
          link: "Photo",
        },
        {
          title:"Videography",
          contents:[
            {work: "プロモーション動画制作, インタビュー動画制作", price: "200000"},
            {work: "ドローン空撮", price: "20000"},
          ],
          link: "Movie",
        },
        {
          title:"Web site/app",
          contents:[
            {work: "Webサイト制作", price: "200000"},
            {work: "Webアプリ開発", price: "consult"},
          ],
          link: "Web",
        },
        {
          title:"Design",
          contents:[
            {work: "商品パッケージデザイン, 印刷物デザイン", price: "50000"},
          ],
          link: "Design",
        },
        {
          title:"Branding/Consulting",
          contents:[
            {work: "ブランディング", price: "consult"},
            {work: "コンサルティング ", price: "consult"},
          ],
          link: "Home",
        },
      ],
    }
  },
  created(){

  },
  methods:{

  },
  watch: {

  },
  computed:{

  },
  mounted(){

  },
  beforeDestory(){

  },
}
</script>

<style  scoped>
.content-title{
  position: sticky;
  top: 220px;
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
  margin-bottom: 160px;
  transform: translate(0, -10px);
}
.work-box{
  margin-bottom: 50px;
}
.work-title{
  margin-bottom: 15px;
  font-weight: 700;
}
.work-content{
  margin-right: 5px;
}
.work-price{
  margin-left: 10px;
}
.work-link{
  display: block;
  height: 30px;
  font-size: 1.3rem;
  cursor: pointer;
  margin-top: 10px;
}
.work-arrow{
  display: inline;
  margin-left: 5px;
  width: 70px;
}

.member{
  /* padding-left: 60px; */
  margin-bottom: 160px;
}
.member-box{
  display: flex;
  margin-bottom: 100px;
}
.member-left{
  width: 160px;
  height: 160px;
  position: relative;

}
.member-face{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  
}
.member-right{
  position: relative;
  height: auto;
  border-left: 1px solid var(--black);
  margin-left: 30px;
}
.member-info{
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translate(0, -50%);
  width: 230px;
  max-width: 300px;
}
.member-position{
  font-size: 1.2rem;
}
.member-name{
  font-size: 1.8rem;
  margin-bottom: 15px;
}
.member-text{
  font-family: yu-gothic-pr6n, sans-serif;
  font-size: 1.4rem;
  line-height: 1.8rem;
  text-align: justify;
}


.info{
  transform: translate(0, -50px);
  margin-bottom: 160px;
}
.info-title{
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0px 0 40px;
}
.info-access{
  margin-bottom: 30px;
}
@media screen and (max-width:599px){
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
  .work{
    margin-bottom: 120px;
    padding-top: 20px;
  }
  .work-content{
    margin-bottom: 10px;
  }
  .work-price{
    margin: 0;
    display: block;
  }
  .member{
    padding-left: 0px;
    padding-top: 20px;
    margin-bottom: 120px;
    transform: translate(0, 0);
  }
  .member-box{
    margin-bottom: 80px;
    display: block;
    text-align: left;
  }
  .member-left{
    width: 100%;
    height: auto;
    position: static;

  }
  .member-face{
    width: 40%;
    display: inline;
    position: static;
    transform: translate(0, 0);
    transform: scaleX(-1);
    
  }
  .member-right{
    height: auto;
    border: none;
    margin-left: 0px;
    position: static;
    text-align: left;
  }
  .member-info{
    width: 100%;
    position: static;
    transform: translate(0, 0);
    
  }
  .member-position{
    font-size: 1.2rem;
  }
  .member-name{
    font-size: 1.6rem;
    margin-bottom: 10px;
  }
  .member-text{
    font-size: 1.3rem;
  }
  .info{
    transform: translate(0, 0);
    margin-bottom: 60px;
  }
  .info-title{
      margin: 30px 0 20px;
  }
}
</style>