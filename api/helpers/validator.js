
class Validate {
  constructor(value) {
    this.value = value;
    this.error = null
    this.status = 400
  }

  required() {
    if (!this.value ){
      this.error = 'required'
      return this;
    } 
    return this;
  }

  min(len) {
    if (this.value.length < len) {
      this.error = 'its less'
      return this;
    }
      return this;
    
  }

  max(len) {
    if (this.value.length > len){
      this.error = 'its more'
      return this;
    }
    return this;
  }

  alpha() {
    if (!this.value.match(/^[a-zA-Z]+$/)){
      this.error = 'should be alphabetic'
      return this;
    }
    return this;
  }

  alphaNum() {
    if (!this.value.match(/^[a-zA-Z0-9]+$/)){
      this.error = 'should be alphanumeric'
      return this;
    }
    return this;
  }

  numeric() {
    if (!this.value.match(/^[0-9]+$/)){
      this.error = 'should be numeric'
      return this;
    }
    return this;
  }

  num() {
    if (typeof this.value !== 'number'){
      this.error = 'should be a number'
      return this;
    }
    return this;
  }

  bool() {
    if (this.value !== 'boolean'){
      this.error = 'should be a boolean'
      return this;
    }
    return this;
  }

  string() {
    if (typeof this.value !== 'string'){
      this.error = 'should be a string'
      return this;
    }
    return this;
  }

}


export default Validate;
