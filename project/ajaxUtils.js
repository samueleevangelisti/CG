var ajaxUtils = {
  _config: {
    isAuthentication: false,
    idHeader: 'DSE-Authentication-Id',
    tokenHeader: 'DSE-Authentication-Token'
  },
  _request: function(method, url, bodyObj=null, headerObj={}) {
    logUtils.debug('(ajaxUtils._request)', {
      method: method,
      url: url,
      bodyObj: bodyObj,
      headerObj: headerObj
    });
    optionObj = {
      method: method,
      headers: headerObj,
      body: bodyObj ? JSON.stringify(bodyObj) : null,
    }
    if(this._config.isAuthentication) {
      optionObj.headers[this._config.idHeader] = localStorageUtils.retrieveId();
      optionObj.headers[this._config.tokenHeader] = localStorageUtils.retrieveToken();
    }
    return fetch(url, optionObj)
      .then((response) => {
        logUtils.debug('(ajaxUtils._request)', {
          response: response
        });
        return new Promise((resolve, reject) => {
          response.clone().json()
            .then((response) => {
              logUtils.debug('(ajaxUtils._request)', {
                response: response
              });
              if(this._config.isAuthentication) {
                localStorageUtils.storeId(response[this._config.idHeader]);
                localStorageUtils.storeToken(response[this._config.tokenHeader]);
                delete response[this._config.idHeader]
                delete response[this._config.tokenHeader]
              }
              resolve(response);
            })
            .catch((error) => {
              logUtils.warning('(ajaxUtils._request)', {
                error: error
              });
              response.clone().text()
                .then((response) => {
                  logUtils.debug('(ajaxUtils._request)', {
                    response: response
                  });
                  resolve(response);
                });
            });
        });
      });
  },
  get: function(url) {
    logUtils.debug('(ajaxUtils.get)', {
      url: url
    });
    return this._request('GET', url);
  },
  post: function(url, bodyObj=null) {
    logUtils.debug('(ajaxUtils.post)', {
      url: url,
      bodyObj: bodyObj
    });
    return this._request('POST', url, bodyObj, {
      'Content-Type': 'application/json'
    });
  },
  put: function(url, bodyObj=null) {
    logUtils.debug('(ajaxUtils.put)', {
      url: url,
      bodyObj: bodyObj
    });
    return this._request('PUT', url, bodyObj, {
      'Content-Type': 'application/json'
    });
  },
  patch: function(url, bodyObj=null) {
    logUtils.debug('(ajaxUtils.patch)', {
      url: url,
      bodyObj: bodyObj
    });
    return this._request('PATCH', url, bodyObj, {
      'Content-Type': 'application/json'
    });
  },
  delete: function(url) {
    logUtils.debug('(ajaxUtils.delete)', {
      url: url
    });
    return this._request('DELETE', url);
  }
};

if(ajaxUtils._config.isAuthentication) {
  if(typeof(localStorageUtils) == 'undefined') {
    logUtils.error('ajaxUtils._config.isAuthentication is enabled but localStorageUtils is not detected');
    alert('FATAL ERROR: ajaxUtils._config.isAuthentication is enabled but localStorageUtils is not detected');
  }
  if(!ajaxUtils._config.idHeader) {
    logUtils.error('ajaxUtils._config.isAuthentication is enabled but ajaxUtils._config.idHeader is not defined');
    alert('FATAL ERROR: ajaxUtils._config.isAuthentication is enabled but ajaxUtils._config.idHeader is not defined');
  }
  if(!ajaxUtils._config.tokenHeader) {
    logUtils.error('ajaxUtils._config.isAuthentication is enabled but ajaxUtils._config.tokenHeader is not defined');
    alert('FATAL ERROR: ajaxUtils._config.isAuthentication is enabled but ajaxUtils._config.tokenHeader is not defined');
  }
  if(ajaxUtils._config.idHeader == 'DSE-Authentication-Id') {
    logUtils.warning('ajaxUtils._config.idHeader has default value');
  }
  if(ajaxUtils._config.tokenHeader == 'DSE-Authentication-Token') {
    logUtils.warning('ajaxUtils._config.tokenHeader has default value');
  }
}
if(!ajaxUtils._config.isAuthentication) {
  logUtils.warning('ajaxUtils._config.isAuthentication is disabled');
}
