import { createStore } from 'vuex'

export default createStore({
  state: {
    innerHeight: null,
    logoWidth: null,
    logoHeight: null,
    logoMargin: null,
    topMargin: null,
    footerHeight: null,
    lineHeight: null,
    lineMargin: null,
    currentHeight: null,

    isSignedIn: false,
    userId: null,


    tagOfPhoto:[
      {text: "Image photo"},
      {text: "Item photo"},
      {text: "Landscape photo"},
    ],
    tagOfMovie:[
      {text: "Promotion video"},
      {text: "Explanatory video"},
      {text: "Interview video"},
    ],
    tagOfWeb:[
      {text: "Web site"},
      {text: "Web app"},
    ],
    tagOfDesign:[
      {text: "Package design"},
      {text: "Pamphlet design"},
      {text: "Flyer design"},
    ],
    tagOfBrand:[
      {text: "Consulting"},
      {text: "Branding"},
    ],
    tagOfMessage:[
      {text: "ご依頼"},
      {text: "お問い合わせ"},
    ],

  },
  getters:{
    innerHeight: state => state.innerHeight,
    logoWidth: state => state.logoWidth,
    logoHeight: state => state.logoHeight,
    logoMargin: state => state.logoMargin,
    topMargin: state => state.topMargin,
    footerHeight: state => state.footerHeight,
    lineHeight: state => state.lineHeight,
    lineMargin: state => state.lineMargin,
    currentHeight: state => state.currentHeight,

    isSignedIn: state => state.isSignedIn,
    userId: state => state.userId,

    tagOfPhoto: state => state.tagOfPhoto,
    tagOfMovie: state => state.tagOfMovie,
    tagOfWeb: state => state.tagOfWeb,
    tagOfDesign: state => state.tagOfDesign,
    tagOfBrand: state => state.tagOfBrand,
    tagOfMessage: state => state.tagOfMessage,
  },
  mutations: {
    setInnerHeight(state, payload){
      state.innerHeight = payload
    },
    setLogoWidth(state, payload){
      state.logoWidth = payload
    },
    setLogoHeight(state, payload){
      state.logoHeight = payload
    },
    setLogoMargin(state, payload){
      state.logoMargin = payload
    },
    setTopMargin(state, payload){
      state.topMargin = payload
    },
    setFooterHeight(state, payload){
      state.footerHeight = payload
    },
    setLineHeight(state, payload){
      state.lineHeight = payload
    },
    setLineMargin(state, payload){
      state.lineMargin = payload
    },
    setCurrentHeight(state, payload){
      state.currentHeight = payload
    },
    setIsSignedIn(state, payload){
      state.isSignedIn = payload
    },
    setUserId(state, payload){
      state.userId = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
