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

  static get (route = '') {
    return this.xhr(route, null, 'GET');
  }

  static put(route = '', params) {
    return this.xhr(route, params, 'PUT');
  }

  static post(route = '', params) {
    return this.xhr(route, params, 'POST');
  }

  static delete(route = '', params) {
    return this.xhr(route, params, 'DELETE');
  }

  static xhr(url = '', params, verb) {
    let options = Object.assign({method: verb}, params ? {body: JSON.stringify(params)} : null);
    options.headers = Api.headers();

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

  static logIn(email = '', password = '') {
    return this.post(this.getAuthRoute(), {email, password});
  }
}

export default Api;
