export default class Web{

  id = null
  date = null //8桁の数字。順番にも使う
  tag = null
  imageObjects = []
  title = null
  language = "eg" //"eg" or "jp"
  url = null
  part = null
  technology = null
  isPublic = true
  updateCounter = 0
  createdAt = null
  updatedAt = null
  addition = null

  constructor(web){
    if(web == null){return}
    this.id = web.id
    this.date = web.date
    this.tag = web.tag
    this.imageObjects = web.imageObjects
    this.title = web.title
    this.language = web.language
    this.url = web.url
    this.part = web.part
    this.technology = web.technology
    this.isPublic = web.isPublic
    this.updateCounter = web.updateCounter
    this.createdAt = web.createdAt
    this.updatedAt = web.updatedAt
    this.addition = web.addition
  }

}