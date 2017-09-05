import {get, isEmpty} from 'lodash';
class Api {
  static getApiUrl(apiID, stage, name, version = 'v1') {
    return `https://${apiID}.execute-api.us-east-1.amazonaws.com/${stage}/${version}/${name}`;
  }

  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }

  static constructQuery(queryObject = {}) {
    const keyTerms = Object.keys(queryObject);
    if(!isEmpty(keyTerms)) {
      return `?${keyTerms
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(get(queryObject, key, ''))}`).join('&')}`;
    }
    return '';
  }

  static get (route = '', params = null, additionalHeaders = {}) {
    return this.xhr(route, params, 'GET', additionalHeaders);
  }

  static put(route = '', params, additionalHeaders = {}) {
    return this.xhr(route, params, 'PUT', additionalHeaders);
  }

  static post(route = '', params, additionalHeaders = {}) {
    return this.xhr(route, params, 'POST', additionalHeaders);
  }

  static delete(route = '', params, additionalHeaders = {}) {
    return this.xhr(route, params, 'DELETE', additionalHeaders);
  }

  static xhr(url = '', params, verb, additionalHeaders = {}) {
    let options = Object.assign({method: verb}, params ? {body: JSON.stringify(params)} : null);
    options.headers = Object.assign(Api.headers(), additionalHeaders);

    return fetch(url, options).then(resp => {
      let json = resp.json();
      if (resp.ok) {
        return json;
      }
      return json.then(err => {
        throw err;
      });
    });
  }

  static getAuthRoute(type = 'auth') {
    return this.getApiUrl('801h1479zl', 'staging', type);
  }

  static getSearchRoute(type = 'gems', getParametersObject = {}) {
    const queryString = this.constructQuery(getParametersObject);
    return this.getApiUrl('0yztfl09qi', 'staging', type) + (isEmpty(queryString) ? '': `/${queryString}`);
  }

  static logIn(email = '', password = '') {
    return this.post(this.getAuthRoute('auth'), {email, password});
  }

  static logOut(token) {
    return this.post(this.getAuthRoute('revoke'), null, {'Authorization': token});
  }

  static user(token) {
    return this.get(this.getAuthRoute('user'), null, {'Authorization': token});
  }

  static search(token, terms) {
    return this.get(this.getSearchRoute('gems', terms), null, {'Authorization': token});
  }

  static hatracks(token, termsWithHatrack) {
    return this.get(this.getSearchRoute('hatracks', termsWithHatrack), null, {'Authorization': token});
  }
}

export default Api;
