// classe pour créer de nouveaux element du DOM avec nom, type et classe

class Element {
  constructor(name, type, classname) {
    this.name = name
    this.type = type
    this.classname = classname
  }
  get elem() {
    return this.creatEl()
  }
  creatEl() {
    this.name = document.createElement(this.type)
    this.name.classList.add(this.classname)
    return this.name
  }
}

//_____________________________________________________________________________________________________________
export { Element }