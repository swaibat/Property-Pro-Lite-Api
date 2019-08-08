
class Validate {
  constructor(val,object) {
    this.val = val;
    this.error = null;
    this.status = 400;
    this.object = object;
    function findKey(object, value){
      return Object.keys(object).find(key => object[key] === value);
    }
    this.obj = findKey(object,val)
  }

  

  required() {
    if (!this.val ){
      this.error = `${this.obj} is required`
      return this;
    }
    return this;
  }

  min(len) {
    if (this.val.length < len) {
      this.error = `${this.obj} should be greater than ${len-1}`
      return this;
    }
      return this;
    
  }

  max(len) {
    if (this.val.length > len){
      this.error = `${this.obj} should be less than ${len}`
      return this;
    }
    return this;
  }

  alpha() {
    if (!this.val.match(/^[a-zA-Z]+$/)){
      this.error = `${this.obj} should be alphabetic`
      return this;
    }
    return this;
  }

  alphaNum() {
    if (!this.val.match(/^[a-zA-Z0-9]+$/)){
      this.error = `${this.obj} should be alphanumeric`
      return this;
    }
    return this;
  }

  numeric() {
    if (!this.val.match(/^[0-9]+$/)){
      this.error = `${this.obj} should be numeric`
      return this;
    }
    return this;
  }

  num() {
    if (typeof this.val !== 'number'){
      this.error = `${this.obj} should be a number`
      return this;
    }
    return this;
  }

  bool() {
    if (this.val !== 'boolean'){
      this.error = `${this.obj} should be a boolean`
      return this;
    }
    return this;
  }

  string() {
    if (typeof this.val !== 'string'){
      this.error = `${this.obj} should be a string`
      return this;
    }
    return this;
  }

  email() {
    if (!this.val.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      this.error = `${this.obj} is invalid`
      return this;
    }
    return this;
  }

  types() {
    if (!this.val.match(/^(1bedrooms|3bedrooms|5bedrooms|miniFlat|others)$/)){
      this.error = true;
      return this;
    }
    return this;
  }

  images() {
    if (!this.val.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|webp|gif))/)){
      this.error = `${this.obj} is invalid`
      return this;
    }
    return this;
  }

}


export default Validate;
