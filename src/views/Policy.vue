<template>
  <div class="_base">
    <Line :title="pageTitle" :isTitle="true" :language="'eg'" :isScroll="true"></Line>
    <h1 class="_content-title">Privacy policy</h1>
    <div class="_content" :style="{'padding-bottom': $store.getters['footerHeight'] + 'px'}">

    <div class="container">

      <div class="box">
        <h2>個人情報の利用目的</h2>
        当サイトでは、メールでのお問い合わせの際に、お名前・メールアドレス等の個人情報をご登録いただく場合があります。
        これらの個人情報は、質問に対する回答や必要な情報をご連絡するために利用し、それ以外の目的では利用しません。
      </div>

      <div class="box">
        <h2>個人情報の第3者への開示</h2>
        個人情報は適切に管理し、以下に該当する場合を除いて第3者に開示することはありません。
        <ul>
          <li>・本人のご了解がある場合</li>
          <li>・法令等への協力のため、開示が必要となる場合</li>
        </ul>
      </div>

      <div class="box">
        <h2>個人情報の開示・訂正・追加・削除・利用停止</h2>
        個人情報の開示・訂正・追加・削除・利用停止をご希望の場合には、ご本人であることを確認したうえで、速やかに対応致します。
      </div>

      <div class="box">
        <h2>Cookieについて</h2>
        当サイトでは、一部のコンテンツにおいてCookieを利用しています。
        Cookieとは、webコンテンツへのアクセスに関する情報であり、お名前・メールアドレス・住所・電話番号は含まれません。<br>
        また、お使いのブラウザ設定からCookieを無効にすることが可能です。
      </div>

      <div class="box">
        <h2>アクセス解析ツールについて</h2>
        当サイトでは、Google Inc.が提供するアクセス解析ツール「Googleアナリティクス」を利用しています。
        Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ます。
        Googleアナリティクスの詳細は「<a href="https://marketingplatform.google.com/about/analytics/terms/jp/">Googleアナリティクス利用規約</a>」をご覧ください。
      </div>

      <div class="box">
        <h2>著作権について</h2>
        当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属します。権利を侵害する目的ではありません。
        記事の内容や掲載画像等に問題がある場合、各権利所有者様本人が直接メールでご連絡下さい。本人確認後、対応致します。
        また、当サイトのコンテンツ（記事・画像・その他プログラム）について、許可なく転載することを禁じます。引用の際は、当サイトへのリンクを掲載するとともに、転載であることを明記してください。
      </div>

      <div class="box">
        <h2>免責事項</h2>
        当サイトからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。<br>
        当サイトのコンテンツについて、可能な限り正確な情報を掲載するよう努めていますが、誤情報が入り込んだり、情報が古くなっている場合があります。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
      </div>

      <div class="box">
        <h2>プライバシーポリシーの変更について</h2>
        当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。<br>
        修正された最新のプライバシーポリシーは常に本ページにて開示されます。<br>
      </div>

      <div class="box">
        <h2>お問い合わせ</h2>
        <p class="_marginS">個人情報の取り扱いに関しては下記までお問い合わせください。</p>
        <!-- 個人情報の取り扱いに関するお問い合わせは、Contactページよりお願いいたします。 -->
        <!-- <router-link :to="{name: 'Contact'}" class="work-link">Contact<img src="@/assets/images/arrow.png" class="work-arrow" alt="矢印"></router-link> -->
        <p>株式会社 Serori</p>
        <a href="mailto:info@so-design-studio.com" class="mail">info@so-design-studio.com</a>
      </div>

      <div class="day">
        初出掲載：2022.5.20<br>
        <!-- 最終更新：2021.11.19 -->
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
      pageTitle: "Privacy policy",

    }
  },
  created(){

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
.container{


}
.box{
  margin-bottom: 50px;
  text-align: justify;
  font-family: yu-gothic-pr6n, sans-serif;
  font-size: 1.4rem;
}
.box h2{
  font-size: 1.6rem;
  margin-bottom: 10px;
}
.day{
  text-align:right;
  font-family: yu-gothic-pr6n, sans-serif;
  font-size: 1.4rem;
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
.mail{
  display: block;
}
@media screen and (max-width:599px){

}
</style>