<template>
  <div ref="refName" class="content-title show" :class="{'disappear': !isShow}">
    <slot ></slot>
  </div>
</template>


<script>


export default {
  props:{
    currentPosition: Number,
    distance: Number,
  },
  data(){
    return{
      position: null,
      isShow: true
    }
  },
  created(){
  },
  mounted(){
    this.position = this.$refs.refName.getBoundingClientRect().top
  },
  beforeUnmount(){
  },

  methods:{

  },
  computed: {
    
  },
  watch: {
    currentPosition:{
      handler: function(){
          if(window.innerWidth > 600){
            // PC
            if(this.currentPosition > this.distance){
              this.isShow = false
            }else{
              this.isShow = true
            }
          }else{
            // SP
          }
      }
    },
  }
}
</script>

<style scoped>
.show{
  opacity: 1;
  transition: 0.3s;

}
.disappear{
  opacity: 0;
}
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

@media screen and (max-width:599px) {
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
  
}

/* 90%調整用 */
@media screen and (min-width:600px) and (max-width:1100px){



}
</style>