export default class Brand{

  id = null
  date = null //8桁の数字。順番にも使う
  tag = null
  imageObjects = []
  title = null
  language = "eg" //"eg" or "jp"
  text = null
  url = null
  isPublic = true
  updateCounter = 0
  createdAt = null
  updatedAt = null
  addition = null

  constructor(brand){
    if(brand == null){return}
    this.id = brand.id
    this.date = brand.date
    this.tag = brand.tag
    this.imageObjects = brand.imageObjects
    this.title = brand.title
    this.language = brand.language
    this.text = brand.text
    this.url = brand.url
    this.isPublic = brand.isPublic
    this.updateCounter = brand.updateCounter
    this.createdAt = brand.createdAt
    this.updatedAt = brand.updatedAt
    this.addition = brand.addition
  }

}