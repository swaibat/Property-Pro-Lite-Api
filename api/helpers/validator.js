
class Validate {
  constructor(data) {
    this.key = Object.entries(data)[0][0];
    this.val = Object.entries(data)[0][1].body[this.key];
    this.error = null;
    this.status = 400;
  }
  string() {
    if (typeof this.val !== 'string'){
      this.error = `${this.key} should be a string`
      this.val = JSON.stringify(this.val)
      return this;
    }
    return this;
  }
  required() {
    if (!this.val ){
      this.error = `${this.key} is required`
      return this;
    }
    return this;
  }

  min(len) {
    if (this.val.length < len) {
      this.error = `${this.key} should be greater than ${len-1}`
      return this;
    }
      return this;
    
  }

  max(len) {
    if (this.val.length > len){
      this.error = `${this.key} should be less than ${len}`
      return this;
    }
    return this;
  }

  alpha() {
    if (!this.val.match(/^[a-zA-Z]+$/)){
      this.error = `${this.key} should be alphabetic`
      return this;
    }
    return this;
  }

  alphaNum() {
    if (!this.val.match(/^[a-zA-Z0-9]+$/)){
      this.error = `${this.key} should be alphanumeric`
      return this;
    }
    return this;
  }

  numeric() {
    if (!this.val.match(/^[0-9]+$/)){
      this.error = `${this.key} should be numeric`
      return this;
    }
    return this;
  }

  email() {
    if (!this.val.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      this.error = `${this.key} is invalid`
      return this;
    }
    return this;
  }

  types() {
    if (!this.val.match(/^(1bedrooms|3bedrooms|5bedrooms|miniFlat|others)$/)){
      this.error = 'We only have these types singlerooms, 3bedrooms, 5bedrooms, miniFlat ,others';
      return this;
    }
    return this;
  }
}


export default Validate;
