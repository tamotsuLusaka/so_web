export default{
  data(){
    return{

    }
  },
  inject: ["mq"], //mq用
  created(){

  },
  methods:{

    _checkAuth(){
      if(!this.$store.getters['isSignedIn']){
        this.$router.push({name: "Manager"})
      }
    },
    _goBack(){
      this.$router.back()
    }

  },

  mounted(){

  },
  beforeDestory(){

  },
  watch: {

  },
  computed:{
    _fullContentHeight: function(){
      let adjustHeight = 0
      if(window.innerWidth > 600){
        adjustHeight = 50
        return this.$store.getters['innerHeight'] - (this.$store.getters['logoHeight'] + this.$store.getters['logoMargin'] + this.$store.getters['topMargin'] + this.$store.getters['footerHeight'] + adjustHeight)
      }else{
        adjustHeight = 80
        return this.$store.getters['innerHeight'] - (this.$store.getters['logoHeight'] + this.$store.getters['logoMargin'] + this.$store.getters['topMargin'] + this.$store.getters['footerHeight'] + adjustHeight)
      }
      
    }
  },
  

}