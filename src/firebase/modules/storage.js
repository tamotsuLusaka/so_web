import firebaseApp from '../index.js'
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,

} from "firebase/storage"

const storage = getStorage(firebaseApp)

export default{
  saveImage(imageName, file){
    const storageRef = ref(storage, imageName)
    return uploadBytes(storageRef, file)
  },
  getUrl(imageName){
    return getDownloadURL(ref(storage, imageName))
  },
  deleteImage(imageName){
    const desertRef = ref(storage, imageName);
    return deleteObject(desertRef)
  },
  async saveImages(imageObjects, data, table){
    let savedImageObjects = []
    let promises = []

    imageObjects.forEach((imageObject)=>{
      const imageName = `${table}/${data.id + "_" + String(data.updateCounter) + "_" + String(imageObject.order)}`
      promises.push(this.saveImage(imageName, imageObject.file)
      .then( async ()=>{
        const url = await this.getUrl(imageName)
        savedImageObjects.push({url: url, order: imageObject.order, name: imageName})
      }))
    })
    return Promise.all(promises).then(()=>{return savedImageObjects})
  }
}