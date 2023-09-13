import firebaseApp from '../index.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth"

import store from '@/store/index.js'

const auth = getAuth(firebaseApp)

export default {

  signUp(email, password){
    return createUserWithEmailAndPassword(auth, email, password)
  },
  signIn(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  },
  onSignedIn(){
    onAuthStateChanged(auth, (user)=>{
      if(user){
        store.commit('setIsSignedIn', true)
        store.commit('setUserId', user.uid)
      }else{
        store.commit('setIsSignedIn', false)
        store.commit('setUserId', null)
      }
    })
  },
  signOut(){
    signOut(auth)
    .then(()=>{
      console.log("ログアウト成功")
    })
    .catch((error)=>{
      console.log(error.message)
      console.log("ログアウト失敗")
    })
  },


}