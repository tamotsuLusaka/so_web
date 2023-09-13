import db from '@/firebase/modules/db.js'
import storage from '@/firebase/modules/storage.js'
import imageCompression from 'browser-image-compression'
import router from '@/router/index.js'

export default class Images{

  imageObjects = []
  imageTrashBox = []
  imageChangeCounter = 0
  draggingItem = null  // ドラッグ中の要素を保持するための変数

  constructor(imageObjects){
    if(imageObjects == null){return}
    this.imageObjects = imageObjects
  }

  
  async setImage(event, refs){
    // プレビュー用
    const file = refs.preview.files[0]
    
    // 保存用
    const originImage = event.target.files[0]
    const options = {
      maxSizeMB: 0.5, //最大ファイルサイズ
      maxWidthOrHeight: 1500, //最大縦横値
    }
    const compressedImage = await imageCompression(originImage, options)
    this.imageObjects.push({url: URL.createObjectURL(file), file: compressedImage})
    this.imageObjects.forEach((object, index)=>{
      object.order = index
    })
    refs.preview.value = null
    this.imageChangeCounter =+ 1

    // return this.imageObjects
  }

  deleteImageObject(index){
    if(this.imageObjects[index].name){
      // すでにストレージに保存されている画像の場合
      const imageTrash = this.imageObjects[index]
      this.imageTrashBox.push(imageTrash)
      this.imageObjects.splice(index, 1)
    }else{
      this.imageObjects.splice(index, 1)
    }
    this.imageObjects.forEach((object, index)=>{
      object.order = index
    })
  }


  async create(data, table, afterRouterName){
    data.date = Number(data.date)
    const docRef = db.getNewRef(table)
    data.id = await docRef.id
    this.imageObjects.forEach((imageObject, index)=>{
      imageObject.order = index
    })
    storage.saveImages(this.imageObjects, data, table)
    .then((savedImageObjects)=>{
      data.imageObjects = savedImageObjects
      data.imageObjects.sort((a,b)=>{
        if(a.order < b.order){return -1}
        if(a.order > b.order){return 1}
        return 0
      })
      db.saveData(data, docRef, "create")
      .then(()=>{
        router.push({name: afterRouterName})
      })
      .catch((error)=>{
        console.log(error.message)
        return {inactiveButton: false, errorMessage: "データの保存に失敗しました。"}
      })
    })
    .catch(()=>{
      return {inactiveButton: false, errorMessage: "画像の保存に失敗しました。"}
    })
  }
  
  edit(data, table, afterRouterName){
    data.date = Number(data.date)
    data.updateCounter += 1
    const docRef = db.getRef(data.id, table)
    this.imageObjects.forEach((imageObject, index)=>{
      imageObject.order = index
    })
    let imageObjectsForStorage = this.imageObjects.filter((object)=>{
      return object.name == null
    })
    this.imageObjects = this.imageObjects.filter((object)=>{
      return object.name != null
    })
    storage.saveImages(imageObjectsForStorage, data, table)
    .then((savedImageObjects)=>{
      savedImageObjects.forEach((imageObject)=>{
        this.imageObjects.push(imageObject)
      })
      this.imageObjects.sort((a,b)=>{
        if(a.order < b.order){return -1}
        if(a.order > b.order){return 1}
        return 0
      })
      // 捨てられた画像を消去
      if(this.imageTrashBox.length !== 0){
        this.imageTrashBox.forEach((imageObject)=>{
          storage.deleteImage(imageObject.name)
        })
      }
      data.imageObjects = this.imageObjects
      db.saveData(data, docRef, "edit")
      .then(()=>{
        router.push({name: afterRouterName})
      })
      .catch((error)=>{
        console.log(error.message)
        return {inactiveButton: false, errorMessage: "データの保存に失敗しました。"}
      })
    })
    .catch(()=>{
      return {inactiveButton: false, errorMessage: "画像の保存に失敗しました。"}
    })
  }


  // 並び替え用
  deleteData(data, table, afterRouterName){
    if(data.imageObjects.length !== 0){
      data.imageObjects.forEach((imageObject)=>{
        storage.deleteImage(imageObject.name)
      })
    }
    db.deleteData(data.id, table)
    .then(()=>{
      router.push({name: afterRouterName})
    })
    .catch((error)=>{
      console.log(error.message)
      return {inactiveButton: false, errorMessage: "削除に失敗しました"}
    })
  }
  dragstart(object, e) {
    this.draggingItem = object; // ドラッグ中の要素を保持
    e.dataTransfer.effectAllowed = 'move'; // 移動モードに設定
    e.target.style.opacity = 0.5; // ドラッグ中要素のスタイルを変更
  }
  dragenter(object) {
    // ドラッグ中の要素とドラッグ先の要素の表示順を入れ替える
    [object.order, this.draggingItem.order] = [this.draggingItem.order, object.order];
  }
  dragover(e) {
    e.dataTransfer.dropEffect = 'move'; // 移動モードに設定
  }
  dragend(e) {
    e.target.style.opacity = 1; // ドラッグ中要素のスタイルを変更（元に戻す）
    this.draggingItem = null; // ドラッグ中の要素をクリア
  }

}