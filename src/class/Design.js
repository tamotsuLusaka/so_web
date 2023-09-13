export default class Design{

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

  constructor(design){
    if(design == null){return}
    this.id = design.id
    this.date = design.date
    this.tag = design.tag
    this.imageObjects = design.imageObjects
    this.title = design.title
    this.language = design.language
    this.isPublic = design.isPublic
    this.updateCounter = design.updateCounter
    this.createdAt = design.createdAt
    this.updatedAt = design.updatedAt
    this.addition = design.addition
  }

}