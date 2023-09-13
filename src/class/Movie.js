export default class Movie{

  id = null
  date = null //8桁の数字。順番にも使う
  tag = null
  url = null
  title = null
  language = "eg" //"eg" or "jp"
  isPublic = true
  createdAt = null
  updatedAt = null
  addition = null

  constructor(movie){
    if(movie == null){return}
    this.id = movie.id
    this.date = movie.date
    this.tag = movie.tag
    this.url = movie.url
    this.title = movie.title
    this.language = movie.language
    this.isPublic = movie.isPublic
    this.createdAt = movie.createdAt
    this.updatedAt = movie.updatedAt
    this.addition = movie.addition
  }

}