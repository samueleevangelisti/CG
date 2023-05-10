var logUtils = {
  _config: {
    isDebug: true,
    isInfo: true,
    isSuccess: true,
    isWarning: true,
    isError: true
  },
  _log: function(text, type='log', paramObj=null) {
    switch(type) {
      case 'log':
        console.log(`%c[${new Date().toISOString()}]`, 'color: blue', text);
        if(paramObj) {
          console.log(paramObj);
        }
        break;
      case 'warn':
        console.warn(`%c[${new Date().toISOString()}]`, 'color: blue', text);
        if(paramObj) {
          console.warn(paramObj);
        }
        break;
      case 'error':
        console.error(`%c[${new Date().toISOString()}]`, 'color: blue', text);
        if(paramObj) {
          console.error(paramObj);
        }
        break;
      default:
        break;
    }
  },
  debug: function(log, paramObj=null) {
    if(this._config.isDebug) {
      this._log(`(DEBUG) ${log}`, 'log', paramObj);
    }
  },
  info: function(log, paramObj=null) {
    if(this._config.isInfo) {
      this._log(`(INFO) ${log}`, 'log', paramObj);
    }
  },
  success: function(log, paramObj=null) {
    if(this._config.isSuccess) {
      this._log(`(SUCCESS) ${log}`, 'log', paramObj);
    }
  },
  warning: function(log, paramObj=null) {
    if(this._config.isWarning) {
      this._log(`(WARNING) ${log}`, 'warn', paramObj);
    }
  },
  error: function(log, paramObj=null) {
    if(this._config.isError) {
      this._log(`(ERROR) ${log}`, 'error', paramObj);
    }
  }
};
