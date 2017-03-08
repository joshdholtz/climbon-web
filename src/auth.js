import { makeRequest, checkStatusJSON } from './api'

module.exports = {
  login(username, password, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    
    makeRequest('/api/session', {
      method: 'POST',
      body: {
        username: username,
        password: password
      }})
      .then(checkStatusJSON)
      .then( (json) => {
        if(json.id) {
          localStorage.token = json.id
          if (cb) cb(true)
          this.onChange(true)
        } else {
          this.logout()
          if (cb) cb(false)
          this.onChange(false)
        }
      })
      .catch( (ex) => {
        this.logout()
        if (cb) cb(false)
        this.onChange(false)
      })
  },
  
  checkSession(cb) {
    makeRequest('/api/session').then(checkStatusJSON)
      .then( (json) => {
        if(json.id) {
          localStorage.token = json.id
          if (cb) cb(true)
          this.onChange(true)
        } else {
          this.deleteToken()
        }
      })
      .catch( (ex) => {
        this.deleteToken()
      })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    makeRequest('/api/session', {
      method: 'DELETE'
    })
      .then(checkStatusJSON)
      .then( (json) => {
        this.deleteToken()
        if (cb) cb()
      })
      .catch( (ex) => {
        this.deleteToken()
        if (cb) cb()
      })
  },
  
  deleteToken(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}
