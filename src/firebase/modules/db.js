import firebaseApp from '../index.js'
import {
  getFirestore,
  serverTimestamp,
  doc,
  collection,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,

} from "firebase/firestore"

const db = getFirestore(firebaseApp)

export default{
  //tableにはStringでテーブル名
  getNewRef(table){
    return doc(collection(db, table))
  },
  getRef(id, table){
    return doc(db, table, id)
  },

  saveData(data, docRef, mode){
    data.updatedAt = serverTimestamp()
    if(mode === "create"){
      data.createdAt = serverTimestamp()
      return setDoc(docRef, {...data})
    }else if(mode === "edit"){
      return updateDoc(docRef, {...data})
    }
  },

  deleteData(id, table){
    const docRef = doc(db, table, id)
    return deleteDoc(docRef)
  },
  getAllData(table){
    const q = query(collection(db, table))
    return getDocs(q)
  },
  getPublicData(table){
    const q = query(collection(db, table), where('isPublic', '==', true))
    return getDocs(q)
  },
  getData(id, table){
    const docRef = doc(db, table, id)
    return getDoc(docRef)
  }


}