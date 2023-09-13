export default class Photo{

  id = null
  date = null //8桁の数字。順番にも使う
  tag = null
  imageObjects = []
  title = null
  language = "eg" //"eg" or "jp"
  isPublic = true
  updateCounter = 0
  createdAt = null
  updatedAt = null
  addition = null

  constructor(photo){
    if(photo == null){return}
    this.id = photo.id
    this.date = photo.date
    this.tag = photo.tag
    this.imageObjects = photo.imageObjects
    this.title = photo.title
    this.language = photo.language
    this.isPublic = photo.isPublic
    this.updateCounter = photo.updateCounter
    this.createdAt = photo.createdAt
    this.updatedAt = photo.updatedAt
    this.addition = photo.addition
  }

}