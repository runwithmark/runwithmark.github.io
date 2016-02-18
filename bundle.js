webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _alt = __webpack_require__(158);

	var _alt2 = _interopRequireDefault(_alt);

	var _reactDom = __webpack_require__(170);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(171);

	var _reactRouter2 = _interopRequireDefault(_reactRouter);

	var _axios = __webpack_require__(218);

	var _axios2 = _interopRequireDefault(_axios);

	var _history = __webpack_require__(231);

	var _history2 = _interopRequireDefault(_history);

	var _routes = __webpack_require__(233);

	var _routes2 = _interopRequireDefault(_routes);

	var _AuthActions = __webpack_require__(238);

	var _AuthActions2 = _interopRequireDefault(_AuthActions);

	var _AuthStore = __webpack_require__(236);

	var _AuthStore2 = _interopRequireDefault(_AuthStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Try to connect user from local storage value
	_AuthActions2.default.localLogin();

	// Handle API request errors
	_axios2.default.interceptors.response.use(function (response) {
	  return response;
	}, function (error) {
	  return new Promise(function (resolve, reject) {
	    if (error.status === 401 && error.data.error_description === 'The access token provided has expired.') {
	      _AuthActions2.default.refreshToken({ initialRequest: error.config, resolve: resolve, reject: reject });
	    } else if (error.status === 401 && error.statusText === 'Unauthorized') {
	      _AuthActions2.default.logout();
	    } else {
	      reject(error);
	    }
	  });
	});

	_reactDom2.default.render(_react2.default.createElement(_reactRouter2.default, { history: _history2.default, routes: _routes2.default }), document.getElementById('wrapper'));

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "app.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(219);

/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(220);
	var utils = __webpack_require__(221);
	var dispatchRequest = __webpack_require__(222);
	var InterceptorManager = __webpack_require__(229);

	var axios = module.exports = function (config) {
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge({
	    method: 'get',
	    headers: {},
	    timeout: defaults.timeout,
	    transformRequest: defaults.transformRequest,
	    transformResponse: defaults.transformResponse
	  }, config);

	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || defaults.withCredentials;

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  axios.interceptors.request.forEach(function (interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  axios.interceptors.response.forEach(function (interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Expose defaults
	axios.defaults = defaults;

	// Expose all/spread
	axios.all = function (promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(230);

	// Expose interceptors
	axios.interceptors = {
	  request: new InterceptorManager(),
	  response: new InterceptorManager()
	};

	// Provide aliases for supported request methods
	(function () {
	  function createShortMethods() {
	    utils.forEach(arguments, function (method) {
	      axios[method] = function (url, config) {
	        return axios(utils.merge(config || {}, {
	          method: method,
	          url: url
	        }));
	      };
	    });
	  }

	  function createShortMethodsWithData() {
	    utils.forEach(arguments, function (method) {
	      axios[method] = function (url, data, config) {
	        return axios(utils.merge(config || {}, {
	          method: method,
	          url: url,
	          data: data
	        }));
	      };
	    });
	  }

	  createShortMethods('delete', 'get', 'head');
	  createShortMethodsWithData('post', 'put', 'patch');
	})();


/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(221);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	module.exports = {
	  transformRequest: [function (data, headers) {
	    if(utils.isFormData(data)) {
	      return data;
	    }
	    if (utils.isArrayBuffer(data)) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
	      // Set application/json if no Content-Type has been specified
	      if (!utils.isUndefined(headers)) {
	        utils.forEach(headers, function (val, key) {
	          if (key.toLowerCase() === 'content-type') {
	            headers['Content-Type'] = val;
	          }
	        });

	        if (utils.isUndefined(headers['Content-Type'])) {
	          headers['Content-Type'] = 'application/json;charset=utf-8';
	        }
	      }
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function (data) {
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN'
	};


/***/ },

/***/ 221:
/***/ function(module, exports) {

	'use strict';

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return toString.call(val) === '[object FormData]';
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    return ArrayBuffer.isView(val);
	  } else {
	    return (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if a value is an Arguments object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Arguments object, otherwise false
	 */
	function isArguments(val) {
	  return toString.call(val) === '[object Arguments]';
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createelement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array or arguments callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Check if obj is array-like
	  var isArrayLike = isArray(obj) || isArguments(obj);

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArrayLike) {
	    obj = [obj];
	  }

	  // Iterate over array values
	  if (isArrayLike) {
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  }
	  // Iterate over object keys
	  else {
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/*obj1, obj2, obj3, ...*/) {
	  var result = {};
	  forEach(arguments, function (obj) {
	    forEach(obj, function (val, key) {
	      result[key] = val;
	    });
	  });
	  return result;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};


/***/ },

/***/ 222:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  return new Promise(function (resolve, reject) {
	    try {
	      // For browsers use XHR adapter
	      if ((typeof XMLHttpRequest !== 'undefined') || (typeof ActiveXObject !== 'undefined')) {
	        __webpack_require__(223)(resolve, reject, config);
	      }
	      // For node use HTTP adapter
	      else if (typeof process !== 'undefined') {
	        __webpack_require__(223)(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 223:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*global ActiveXObject:true*/

	var defaults = __webpack_require__(220);
	var utils = __webpack_require__(221);
	var buildUrl = __webpack_require__(224);
	var parseHeaders = __webpack_require__(225);
	var transformData = __webpack_require__(226);

	module.exports = function xhrAdapter(resolve, reject, config) {
	  // Transform request data
	  var data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Merge headers
	  var requestHeaders = utils.merge(
	    defaults.headers.common,
	    defaults.headers[config.method] || {},
	    config.headers || {}
	  );

	  if (utils.isFormData(data)) {
	    delete requestHeaders['Content-Type']; // Let the browser set it
	  }

	  // Create the request
	  var request = new (XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
	  request.open(config.method.toUpperCase(), buildUrl(config.url, config.params), true);

	  // Set the request timeout in MS
	  request.timeout = config.timeout;

	  // Listen for ready state
	  request.onreadystatechange = function () {
	    if (request && request.readyState === 4) {
	      // Prepare the response
	      var responseHeaders = parseHeaders(request.getAllResponseHeaders());
	      var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
	      var response = {
	        data: transformData(
	          responseData,
	          responseHeaders,
	          config.transformResponse
	        ),
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config: config
	      };

	      // Resolve or reject the Promise based on the status
	      (request.status >= 200 && request.status < 300 ?
	        resolve :
	        reject)(response);

	      // Clean up request
	      request = null;
	    }
	  };

	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.
	  if (utils.isStandardBrowserEnv()) {
	    var cookies = __webpack_require__(227);
	    var urlIsSameOrigin = __webpack_require__(228);

	    // Add xsrf header
	    var xsrfValue = urlIsSameOrigin(config.url) ?
	        cookies.read(config.xsrfCookieName || defaults.xsrfCookieName) :
	        undefined;

	    if (xsrfValue) {
	      requestHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue;
	    }
	  }

	  // Add headers to the request
	  utils.forEach(requestHeaders, function (val, key) {
	    // Remove Content-Type if data is undefined
	    if (!data && key.toLowerCase() === 'content-type') {
	      delete requestHeaders[key];
	    }
	    // Otherwise add header to the request
	    else {
	      request.setRequestHeader(key, val);
	    }
	  });

	  // Add withCredentials to request if needed
	  if (config.withCredentials) {
	    request.withCredentials = true;
	  }

	  // Add responseType to request if needed
	  if (config.responseType) {
	    try {
	      request.responseType = config.responseType;
	    } catch (e) {
	      if (request.responseType !== 'json') {
	        throw e;
	      }
	    }
	  }

	  if (utils.isArrayBuffer(data)) {
	    data = new DataView(data);
	  }

	  // Send the request
	  request.send(data);
	};


/***/ },

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(221);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildUrl(url, params) {
	  if (!params) {
	    return url;
	  }

	  var parts = [];

	  utils.forEach(params, function (val, key) {
	    if (val === null || typeof val === 'undefined') {
	      return;
	    }

	    if (utils.isArray(val)) {
	      key = key + '[]';
	    }

	    if (!utils.isArray(val)) {
	      val = [val];
	    }

	    utils.forEach(val, function (v) {
	      if (utils.isDate(v)) {
	        v = v.toISOString();
	      }
	      else if (utils.isObject(v)) {
	        v = JSON.stringify(v);
	      }
	      parts.push(encode(key) + '=' + encode(v));
	    });
	  });

	  if (parts.length > 0) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
	  }

	  return url;
	};


/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(221);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {}, key, val, i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },

/***/ 226:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(221);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  utils.forEach(fns, function (fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * WARNING:
	 *  This file makes references to objects that aren't safe in all environments.
	 *  Please see lib/utils.isStandardBrowserEnv before including this file.
	 */

	var utils = __webpack_require__(221);

	module.exports = {
	  write: function write(name, value, expires, path, domain, secure) {
	    var cookie = [];
	    cookie.push(name + '=' + encodeURIComponent(value));

	    if (utils.isNumber(expires)) {
	      cookie.push('expires=' + new Date(expires).toGMTString());
	    }

	    if (utils.isString(path)) {
	      cookie.push('path=' + path);
	    }

	    if (utils.isString(domain)) {
	      cookie.push('domain=' + domain);
	    }

	    if (secure === true) {
	      cookie.push('secure');
	    }

	    document.cookie = cookie.join('; ');
	  },

	  read: function read(name) {
	    var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	    return (match ? decodeURIComponent(match[3]) : null);
	  },

	  remove: function remove(name) {
	    this.write(name, '', Date.now() - 86400000);
	  }
	};


/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * WARNING:
	 *  This file makes references to objects that aren't safe in all environments.
	 *  Please see lib/utils.isStandardBrowserEnv before including this file.
	 */

	var utils = __webpack_require__(221);
	var msie = /(msie|trident)/i.test(navigator.userAgent);
	var urlParsingNode = document.createElement('a');
	var originUrl;

	/**
	 * Parse a URL to discover it's components
	 *
	 * @param {String} url The URL to be parsed
	 * @returns {Object}
	 */
	function urlResolve(url) {
	  var href = url;

	  if (msie) {
	    // IE needs attribute set twice to normalize properties
	    urlParsingNode.setAttribute('href', href);
	    href = urlParsingNode.href;
	  }

	  urlParsingNode.setAttribute('href', href);

	  // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	  return {
	    href: urlParsingNode.href,
	    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	    host: urlParsingNode.host,
	    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	    hostname: urlParsingNode.hostname,
	    port: urlParsingNode.port,
	    pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	              urlParsingNode.pathname :
	              '/' + urlParsingNode.pathname
	  };
	}

	originUrl = urlResolve(window.location.href);

	/**
	 * Determine if a URL shares the same origin as the current location
	 *
	 * @param {String} requestUrl The URL to test
	 * @returns {boolean} True if URL shares the same origin, otherwise false
	 */
	module.exports = function urlIsSameOrigin(requestUrl) {
	  var parsed = (utils.isString(requestUrl)) ? urlResolve(requestUrl) : requestUrl;
	  return (parsed.protocol === originUrl.protocol &&
	        parsed.host === originUrl.host);
	};


/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(221);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function (fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function (id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `remove`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function (fn) {
	  utils.forEach(this.handlers, function (h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },

/***/ 230:
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function (arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createBrowserHistory = __webpack_require__(232);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _createBrowserHistory2.default)();

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "history.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 233:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(171);

	var _App = __webpack_require__(234);

	var _App2 = _interopRequireDefault(_App);

	var _Login = __webpack_require__(235);

	var _Login2 = _interopRequireDefault(_Login);

	var _Dashboard = __webpack_require__(243);

	var _Dashboard2 = _interopRequireDefault(_Dashboard);

	var _AuthStore = __webpack_require__(236);

	var _AuthStore2 = _interopRequireDefault(_AuthStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function requireAuth(nextState, replaceState) {
	  if (_AuthStore2.default.getState().accessToken === null) {
	    replaceState({ nextPathname: nextState.location.pathname }, '/login');
	  }
	}

	var routes = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Dashboard2.default, onEnter: requireAuth }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _Login2.default })
	);

	exports.default = routes;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "routes.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(171);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
	  _inherits(App, _Component);

	  function App() {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'main' },
	        this.props.children
	      );
	    }
	  }]);

	  return App;
	}(_react.Component);

	exports.default = App;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "App.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(171);

	var _reactRouter2 = _interopRequireDefault(_reactRouter);

	var _AuthStore = __webpack_require__(236);

	var _AuthStore2 = _interopRequireDefault(_AuthStore);

	var _AuthActions = __webpack_require__(238);

	var _AuthActions2 = _interopRequireDefault(_AuthActions);

	var _connectToStores = __webpack_require__(242);

	var _connectToStores2 = _interopRequireDefault(_connectToStores);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Login = function (_Component) {
	  _inherits(Login, _Component);

	  function Login(props) {
	    _classCallCheck(this, Login);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this, props));

	    _this.state = { redirect: false };
	    return _this;
	  }

	  _createClass(Login, [{
	    key: 'onClickLogin',
	    value: function onClickLogin() {
	      window.location = 'https://runkeeper.com/apps/authorize?client_id=bce71a6415ec442eabf5c7a77d465fb3&response_type=code&redirect_uri=http%3A%2F%2Frunwithmark.github.io%2Flogin';
	    }
	  }, {
	    key: 'onRedirect',
	    value: function onRedirect(code) {
	      _AuthActions2.default.login({
	        code: code
	      });
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var query = this.props.location.query;

	      if (query.code) {
	        this.setState({ redirect: true });
	        this.onRedirect(query.code);
	      } else {
	        this.setState({ redirect: false });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var divError = _AuthStore2.default.getState().error ? _react2.default.createElement(
	        'p',
	        null,
	        _AuthStore2.default.getState().error
	      ) : null;

	      return this.state.redirect ? _react2.default.createElement('div', null) : _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h1',
	          null,
	          'Will you run 1 mile every day?'
	        ),
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Mark Zuckerberg committed to running 365 miles in 2016.'
	        ),
	        _react2.default.createElement(
	          'h1',
	          null,
	          'Accept his challenge and track your progress!'
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: this.onClickLogin.bind(this) },
	          'Join with Runkeeper'
	        )
	      );
	    }
	  }], [{
	    key: 'getStores',
	    value: function getStores() {
	      return [_AuthStore2.default];
	    }
	  }, {
	    key: 'getPropsFromStores',
	    value: function getPropsFromStores() {
	      return _AuthStore2.default.getState();
	    }
	  }]);

	  return Login;
	}(_react.Component);

	exports.default = (0, _connectToStores2.default)(Login);

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Login.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alt = __webpack_require__(237);

	var _alt2 = _interopRequireDefault(_alt);

	var _AuthActions = __webpack_require__(238);

	var _AuthActions2 = _interopRequireDefault(_AuthActions);

	var _InterceptorUtil = __webpack_require__(239);

	var _InterceptorUtil2 = _interopRequireDefault(_InterceptorUtil);

	var _config = __webpack_require__(240);

	var _config2 = _interopRequireDefault(_config);

	var _history = __webpack_require__(231);

	var _history2 = _interopRequireDefault(_history);

	var _axios = __webpack_require__(218);

	var _axios2 = _interopRequireDefault(_axios);

	var _jsuri = __webpack_require__(241);

	var _jsuri2 = _interopRequireDefault(_jsuri);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AuthStore = function () {
	  function AuthStore() {
	    _classCallCheck(this, AuthStore);

	    this.bindActions(_AuthActions2.default);

	    // State
	    this.accessToken = null;
	    this.refreshToken = null;
	    this.user = null;
	    this.fitness = null;
	    this.error = null;
	  }

	  /**
	   * Login handler
	   * @param credentials
	   */

	  _createClass(AuthStore, [{
	    key: 'onLogin',
	    value: function onLogin(credentials) {
	      var _this = this;

	      _axios2.default.post('https://runkeeper.com/apps/token', 'grant_type=authorization_code' + '&code=' + credentials.code + '&client_id=' + _config2.default.clientId + '&client_secret=' + _config2.default.clientSecret + '&redirect_uri=http%3A%2F%2Frunwithmark.github.io%2Flogin', {
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	      }).then(function (response) {
	        _this.saveTokens(response.data);
	        return _axios2.default.get(_config2.default.apiUrl + '/user');
	      }).then(function (response) {
	        _this.loginSuccess(response.data);
	      }).catch(function (response) {
	        _this.loginError(response);
	      });
	    }

	    /**
	     * Process login success
	     * @param user
	     */

	  }, {
	    key: 'loginSuccess',
	    value: function loginSuccess(user) {
	      localStorage.setItem('user', JSON.stringify(user));

	      this.setState({ user: user });
	      try {
	        _history2.default.replaceState(null, '/');
	      } catch (e) {}
	    }
	  }, {
	    key: 'refreshFitness',
	    value: function refreshFitness() {
	      var _this2 = this;

	      _axios2.default.get(_config2.default.apiUrl + this.user.fitness_activities + '?pageSize=1000').then(function (response) {
	        _this2.saveFitness(response.data);
	      }).catch(function (response) {
	        console.log(response);
	      });
	    }

	    /**
	     * Save fitness activity login success
	     * @param user
	     */

	  }, {
	    key: 'saveFitness',
	    value: function saveFitness(fitness) {
	      localStorage.setItem('fitness', JSON.stringify(fitness));

	      this.setState({ fitness: fitness });
	    }

	    /**
	     * Handle login error
	     * @param response
	     */

	  }, {
	    key: 'loginError',
	    value: function loginError(response) {
	      this.setState({ accessToken: null, refreshToken: null, error: response.data.error_description, user: null });
	    }

	    /**
	     * Try to connect user from local storage
	     */

	  }, {
	    key: 'onLocalLogin',
	    value: function onLocalLogin() {
	      var accessToken = localStorage.getItem('access_token');
	      // let refreshToken = localStorage.getItem('refresh_token');
	      var user = JSON.parse(localStorage.getItem('user'));
	      var fitness = JSON.parse(localStorage.getItem('fitness'));

	      if (accessToken /*&& refreshToken*/ && user) {
	        this.saveTokens({ access_token: accessToken /*, refresh_token: refreshToken*/ });
	        this.loginSuccess(user);
	        this.saveFitness(fitness);
	      }
	    }

	    /**
	     * Try to refresh user access token
	     */

	  }, {
	    key: 'onRefreshToken',
	    value: function onRefreshToken(params) {
	      var _this3 = this;

	      var refreshToken = localStorage.getItem('refresh_token');

	      if (refreshToken) {
	        _axios2.default.interceptors.request.eject(_InterceptorUtil2.default.getInterceptor());
	        _axios2.default.get(this.getAuthEndpoint('refresh_token') + '&refresh_token=' + refreshToken).then(function (response) {
	          _this3.saveTokens(response.data);

	          // Replay request
	          (0, _axios2.default)(params.initialRequest).then(function (response) {
	            params.resolve(response);
	          }).catch(function (response) {
	            params.reject(response);
	          });
	        }).catch(function () {
	          _this3.onLogout();
	        });
	      }
	    }

	    /**
	     * Logout user
	     */

	  }, {
	    key: 'onLogout',
	    value: function onLogout() {
	      localStorage.clear();

	      this.setState({ accessToken: null, refreshToken: null, error: null });

	      _axios2.default.interceptors.request.eject(_InterceptorUtil2.default.getInterceptor());

	      _history2.default.replaceState(null, '/login');
	    }

	    /**
	     * Save tokens in local storage and automatically add token within request
	     * @param params
	     */

	  }, {
	    key: 'saveTokens',
	    value: function saveTokens(token) {
	      var access_token = token.access_token;

	      localStorage.setItem('access_token', access_token);
	      // localStorage.setItem('refresh_token', refresh_token);
	      this.setState({ accessToken: access_token, /*refreshToken: refresh_token,*/error: null });

	      // Automatically add access token
	      var interceptor = _axios2.default.interceptors.request.use(function (config) {
	        config.url = new _jsuri2.default(config.url).addQueryParam('access_token', access_token);
	        config.headers = {
	          "Accept": "*/*"
	        };
	        return config;
	      });

	      _InterceptorUtil2.default.setInterceptor(interceptor);
	    }

	    /**
	     * Return API endpoint with given grant type (default password)
	     * @param grantType
	     * @returns {string}
	     */

	  }, {
	    key: 'getAuthEndpoint',
	    value: function getAuthEndpoint() {
	      var grantType = arguments.length <= 0 || arguments[0] === undefined ? 'password' : arguments[0];

	      return _config2.default.apiUrl; // + '/oauth/v2/token?client_id=' + Config.clientId + '&client_secret=' + Config.clientSecret + '&grant_type=' + grantType;
	    }
	  }]);

	  return AuthStore;
	}();

	exports.default = _alt2.default.createStore(AuthStore, 'AuthStore');

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "AuthStore.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alt = __webpack_require__(158);

	var _alt2 = _interopRequireDefault(_alt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = new _alt2.default();

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "alt.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alt = __webpack_require__(237);

	var _alt2 = _interopRequireDefault(_alt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AuthActions = function AuthActions() {
	  _classCallCheck(this, AuthActions);

	  this.generateActions('login', 'localLogin', 'refreshToken', 'refreshFitness', 'logout');
	};

	exports.default = _alt2.default.createActions(AuthActions);

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "AuthActions.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 239:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InterceptorUtil = function () {
	  function InterceptorUtil() {
	    _classCallCheck(this, InterceptorUtil);
	  }

	  _createClass(InterceptorUtil, [{
	    key: "constuctor",
	    value: function constuctor() {
	      this.interceptor = null;
	    }
	  }, {
	    key: "setInterceptor",
	    value: function setInterceptor(interceptor) {
	      this.interceptor = interceptor;
	    }
	  }, {
	    key: "getInterceptor",
	    value: function getInterceptor() {
	      return this.interceptor;
	    }
	  }]);

	  return InterceptorUtil;
	}();

	exports.default = new InterceptorUtil();

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "InterceptorUtil.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = function config() {
	  return {
	    apiUrl: 'https://api.runkeeper.com/',
	    clientId: 'bce71a6415ec442eabf5c7a77d465fb3',
	    clientSecret: 'f46e037cb7c44f91880b07794ca3d65a'
	  };
	};

	exports.default = new config();

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "config.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jsUri
	 * https://github.com/derek-watson/jsUri
	 *
	 * Copyright 2013, Derek Watson
	 * Released under the MIT license.
	 *
	 * Includes parseUri regular expressions
	 * http://blog.stevenlevithan.com/archives/parseuri
	 * Copyright 2007, Steven Levithan
	 * Released under the MIT license.
	 */

	 /*globals define, module */

	(function(global) {

	  var re = {
	    starts_with_slashes: /^\/+/,
	    ends_with_slashes: /\/+$/,
	    pluses: /\+/g,
	    query_separator: /[&;]/,
	    uri_parser: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@]*))?)?@)?(\[[0-9a-fA-F:.]+\]|[^:\/?#]*)(?::(\d+|(?=:)))?(:)?)((((?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	  };

	  /**
	   * Define forEach for older js environments
	   * @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach#Compatibility
	   */
	  if (!Array.prototype.forEach) {
	    Array.prototype.forEach = function(callback, thisArg) {
	      var T, k;

	      if (this == null) {
	        throw new TypeError(' this is null or not defined');
	      }

	      var O = Object(this);
	      var len = O.length >>> 0;

	      if (typeof callback !== "function") {
	        throw new TypeError(callback + ' is not a function');
	      }

	      if (arguments.length > 1) {
	        T = thisArg;
	      }

	      k = 0;

	      while (k < len) {
	        var kValue;
	        if (k in O) {
	          kValue = O[k];
	          callback.call(T, kValue, k, O);
	        }
	        k++;
	      }
	    };
	  }

	  /**
	   * unescape a query param value
	   * @param  {string} s encoded value
	   * @return {string}   decoded value
	   */
	  function decode(s) {
	    if (s) {
	        s = s.toString().replace(re.pluses, '%20');
	        s = decodeURIComponent(s);
	    }
	    return s;
	  }

	  /**
	   * Breaks a uri string down into its individual parts
	   * @param  {string} str uri
	   * @return {object}     parts
	   */
	  function parseUri(str) {
	    var parser = re.uri_parser;
	    var parserKeys = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "isColonUri", "relative", "path", "directory", "file", "query", "anchor"];
	    var m = parser.exec(str || '');
	    var parts = {};

	    parserKeys.forEach(function(key, i) {
	      parts[key] = m[i] || '';
	    });

	    return parts;
	  }

	  /**
	   * Breaks a query string down into an array of key/value pairs
	   * @param  {string} str query
	   * @return {array}      array of arrays (key/value pairs)
	   */
	  function parseQuery(str) {
	    var i, ps, p, n, k, v, l;
	    var pairs = [];

	    if (typeof(str) === 'undefined' || str === null || str === '') {
	      return pairs;
	    }

	    if (str.indexOf('?') === 0) {
	      str = str.substring(1);
	    }

	    ps = str.toString().split(re.query_separator);

	    for (i = 0, l = ps.length; i < l; i++) {
	      p = ps[i];
	      n = p.indexOf('=');

	      if (n !== 0) {
	        k = decode(p.substring(0, n));
	        v = decode(p.substring(n + 1));
	        pairs.push(n === -1 ? [p, null] : [k, v]);
	      }

	    }
	    return pairs;
	  }

	  /**
	   * Creates a new Uri object
	   * @constructor
	   * @param {string} str
	   */
	  function Uri(str) {
	    this.uriParts = parseUri(str);
	    this.queryPairs = parseQuery(this.uriParts.query);
	    this.hasAuthorityPrefixUserPref = null;
	  }

	  /**
	   * Define getter/setter methods
	   */
	  ['protocol', 'userInfo', 'host', 'port', 'path', 'anchor'].forEach(function(key) {
	    Uri.prototype[key] = function(val) {
	      if (typeof val !== 'undefined') {
	        this.uriParts[key] = val;
	      }
	      return this.uriParts[key];
	    };
	  });

	  /**
	   * if there is no protocol, the leading // can be enabled or disabled
	   * @param  {Boolean}  val
	   * @return {Boolean}
	   */
	  Uri.prototype.hasAuthorityPrefix = function(val) {
	    if (typeof val !== 'undefined') {
	      this.hasAuthorityPrefixUserPref = val;
	    }

	    if (this.hasAuthorityPrefixUserPref === null) {
	      return (this.uriParts.source.indexOf('//') !== -1);
	    } else {
	      return this.hasAuthorityPrefixUserPref;
	    }
	  };

	  Uri.prototype.isColonUri = function (val) {
	    if (typeof val !== 'undefined') {
	      this.uriParts.isColonUri = !!val;
	    } else {
	      return !!this.uriParts.isColonUri;
	    }
	  };

	  /**
	   * Serializes the internal state of the query pairs
	   * @param  {string} [val]   set a new query string
	   * @return {string}         query string
	   */
	  Uri.prototype.query = function(val) {
	    var s = '', i, param, l;

	    if (typeof val !== 'undefined') {
	      this.queryPairs = parseQuery(val);
	    }

	    for (i = 0, l = this.queryPairs.length; i < l; i++) {
	      param = this.queryPairs[i];
	      if (s.length > 0) {
	        s += '&';
	      }
	      if (param[1] === null) {
	        s += param[0];
	      } else {
	        s += param[0];
	        s += '=';
	        if (typeof param[1] !== 'undefined') {
	          s += encodeURIComponent(param[1]);
	        }
	      }
	    }
	    return s.length > 0 ? '?' + s : s;
	  };

	  /**
	   * returns the first query param value found for the key
	   * @param  {string} key query key
	   * @return {string}     first value found for key
	   */
	  Uri.prototype.getQueryParamValue = function (key) {
	    var param, i, l;
	    for (i = 0, l = this.queryPairs.length; i < l; i++) {
	      param = this.queryPairs[i];
	      if (key === param[0]) {
	        return param[1];
	      }
	    }
	  };

	  /**
	   * returns an array of query param values for the key
	   * @param  {string} key query key
	   * @return {array}      array of values
	   */
	  Uri.prototype.getQueryParamValues = function (key) {
	    var arr = [], i, param, l;
	    for (i = 0, l = this.queryPairs.length; i < l; i++) {
	      param = this.queryPairs[i];
	      if (key === param[0]) {
	        arr.push(param[1]);
	      }
	    }
	    return arr;
	  };

	  /**
	   * removes query parameters
	   * @param  {string} key     remove values for key
	   * @param  {val}    [val]   remove a specific value, otherwise removes all
	   * @return {Uri}            returns self for fluent chaining
	   */
	  Uri.prototype.deleteQueryParam = function (key, val) {
	    var arr = [], i, param, keyMatchesFilter, valMatchesFilter, l;

	    for (i = 0, l = this.queryPairs.length; i < l; i++) {

	      param = this.queryPairs[i];
	      keyMatchesFilter = decode(param[0]) === decode(key);
	      valMatchesFilter = param[1] === val;

	      if ((arguments.length === 1 && !keyMatchesFilter) || (arguments.length === 2 && (!keyMatchesFilter || !valMatchesFilter))) {
	        arr.push(param);
	      }
	    }

	    this.queryPairs = arr;

	    return this;
	  };

	  /**
	   * adds a query parameter
	   * @param  {string}  key        add values for key
	   * @param  {string}  val        value to add
	   * @param  {integer} [index]    specific index to add the value at
	   * @return {Uri}                returns self for fluent chaining
	   */
	  Uri.prototype.addQueryParam = function (key, val, index) {
	    if (arguments.length === 3 && index !== -1) {
	      index = Math.min(index, this.queryPairs.length);
	      this.queryPairs.splice(index, 0, [key, val]);
	    } else if (arguments.length > 0) {
	      this.queryPairs.push([key, val]);
	    }
	    return this;
	  };

	  /**
	   * test for the existence of a query parameter
	   * @param  {string}  key        add values for key
	   * @param  {string}  val        value to add
	   * @param  {integer} [index]    specific index to add the value at
	   * @return {Uri}                returns self for fluent chaining
	   */
	  Uri.prototype.hasQueryParam = function (key) {
	    var i, len = this.queryPairs.length;
	    for (i = 0; i < len; i++) {
	      if (this.queryPairs[i][0] == key)
	        return true;
	    }
	    return false;
	  };

	  /**
	   * replaces query param values
	   * @param  {string} key         key to replace value for
	   * @param  {string} newVal      new value
	   * @param  {string} [oldVal]    replace only one specific value (otherwise replaces all)
	   * @return {Uri}                returns self for fluent chaining
	   */
	  Uri.prototype.replaceQueryParam = function (key, newVal, oldVal) {
	    var index = -1, len = this.queryPairs.length, i, param;

	    if (arguments.length === 3) {
	      for (i = 0; i < len; i++) {
	        param = this.queryPairs[i];
	        if (decode(param[0]) === decode(key) && decodeURIComponent(param[1]) === decode(oldVal)) {
	          index = i;
	          break;
	        }
	      }
	      if (index >= 0) {
	        this.deleteQueryParam(key, decode(oldVal)).addQueryParam(key, newVal, index);
	      }
	    } else {
	      for (i = 0; i < len; i++) {
	        param = this.queryPairs[i];
	        if (decode(param[0]) === decode(key)) {
	          index = i;
	          break;
	        }
	      }
	      this.deleteQueryParam(key);
	      this.addQueryParam(key, newVal, index);
	    }
	    return this;
	  };

	  /**
	   * Define fluent setter methods (setProtocol, setHasAuthorityPrefix, etc)
	   */
	  ['protocol', 'hasAuthorityPrefix', 'isColonUri', 'userInfo', 'host', 'port', 'path', 'query', 'anchor'].forEach(function(key) {
	    var method = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
	    Uri.prototype[method] = function(val) {
	      this[key](val);
	      return this;
	    };
	  });

	  /**
	   * Scheme name, colon and doubleslash, as required
	   * @return {string} http:// or possibly just //
	   */
	  Uri.prototype.scheme = function() {
	    var s = '';

	    if (this.protocol()) {
	      s += this.protocol();
	      if (this.protocol().indexOf(':') !== this.protocol().length - 1) {
	        s += ':';
	      }
	      s += '//';
	    } else {
	      if (this.hasAuthorityPrefix() && this.host()) {
	        s += '//';
	      }
	    }

	    return s;
	  };

	  /**
	   * Same as Mozilla nsIURI.prePath
	   * @return {string} scheme://user:password@host:port
	   * @see  https://developer.mozilla.org/en/nsIURI
	   */
	  Uri.prototype.origin = function() {
	    var s = this.scheme();

	    if (this.userInfo() && this.host()) {
	      s += this.userInfo();
	      if (this.userInfo().indexOf('@') !== this.userInfo().length - 1) {
	        s += '@';
	      }
	    }

	    if (this.host()) {
	      s += this.host();
	      if (this.port() || (this.path() && this.path().substr(0, 1).match(/[0-9]/))) {
	        s += ':' + this.port();
	      }
	    }

	    return s;
	  };

	  /**
	   * Adds a trailing slash to the path
	   */
	  Uri.prototype.addTrailingSlash = function() {
	    var path = this.path() || '';

	    if (path.substr(-1) !== '/') {
	      this.path(path + '/');
	    }

	    return this;
	  };

	  /**
	   * Serializes the internal state of the Uri object
	   * @return {string}
	   */
	  Uri.prototype.toString = function() {
	    var path, s = this.origin();

	    if (this.isColonUri()) {
	      if (this.path()) {
	        s += ':'+this.path();
	      }
	    } else if (this.path()) {
	      path = this.path();
	      if (!(re.ends_with_slashes.test(s) || re.starts_with_slashes.test(path))) {
	        s += '/';
	      } else {
	        if (s) {
	          s.replace(re.ends_with_slashes, '/');
	        }
	        path = path.replace(re.starts_with_slashes, '/');
	      }
	      s += path;
	    } else {
	      if (this.host() && (this.query().toString() || this.anchor())) {
	        s += '/';
	      }
	    }
	    if (this.query().toString()) {
	      s += this.query().toString();
	    }

	    if (this.anchor()) {
	      if (this.anchor().indexOf('#') !== 0) {
	        s += '#';
	      }
	      s += this.anchor();
	    }

	    return s;
	  };

	  /**
	   * Clone a Uri object
	   * @return {Uri} duplicate copy of the Uri
	   */
	  Uri.prototype.clone = function() {
	    return new Uri(this.toString());
	  };

	  /**
	   * export via AMD or CommonJS, otherwise leak a global
	   */
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Uri;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	    module.exports = Uri;
	  } else {
	    global.Uri = Uri;
	  }
	}(this));


/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 'Higher Order Component' that controls the props of a wrapped
	 * component via stores.
	 *
	 * Expects the Component to have two static methods:
	 *   - getStores(): Should return an array of stores.
	 *   - getPropsFromStores(props): Should return the props from the stores.
	 *
	 * Example using old React.createClass() style:
	 *
	 *    const MyComponent = React.createClass({
	 *      statics: {
	 *        getStores(props) {
	 *          return [myStore]
	 *        },
	 *        getPropsFromStores(props) {
	 *          return myStore.getState()
	 *        }
	 *      },
	 *      render() {
	 *        // Use this.props like normal ...
	 *      }
	 *    })
	 *    MyComponent = connectToStores(MyComponent)
	 *
	 *
	 * Example using ES6 Class:
	 *
	 *    class MyComponent extends React.Component {
	 *      static getStores(props) {
	 *        return [myStore]
	 *      }
	 *      static getPropsFromStores(props) {
	 *        return myStore.getState()
	 *      }
	 *      render() {
	 *        // Use this.props like normal ...
	 *      }
	 *    }
	 *    MyComponent = connectToStores(MyComponent)
	 *
	 * A great explanation of the merits of higher order components can be found at
	 * http://bit.ly/1abPkrP
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _functions = __webpack_require__(163);

	function connectToStores(Spec) {
	  var Component = arguments.length <= 1 || arguments[1] === undefined ? Spec : arguments[1];
	  return (function () {
	    // Check for required static methods.
	    if (!(0, _functions.isFunction)(Spec.getStores)) {
	      throw new Error('connectToStores() expects the wrapped component to have a static getStores() method');
	    }
	    if (!(0, _functions.isFunction)(Spec.getPropsFromStores)) {
	      throw new Error('connectToStores() expects the wrapped component to have a static getPropsFromStores() method');
	    }

	    var StoreConnection = _react2['default'].createClass({
	      displayName: 'Stateful' + (Component.displayName || Component.name || 'Container'),

	      getInitialState: function getInitialState() {
	        return Spec.getPropsFromStores(this.props, this.context);
	      },

	      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState(Spec.getPropsFromStores(nextProps, this.context));
	      },

	      componentDidMount: function componentDidMount() {
	        var _this = this;

	        var stores = Spec.getStores(this.props, this.context);
	        this.storeListeners = stores.map(function (store) {
	          return store.listen(_this.onChange);
	        });
	        if (Spec.componentDidConnect) {
	          Spec.componentDidConnect(this.props, this.context);
	        }
	      },

	      componentWillUnmount: function componentWillUnmount() {
	        this.storeListeners.forEach(function (unlisten) {
	          return unlisten();
	        });
	      },

	      onChange: function onChange() {
	        this.setState(Spec.getPropsFromStores(this.props, this.context));
	      },

	      render: function render() {
	        return _react2['default'].createElement(Component, (0, _functions.assign)({}, this.props, this.state));
	      }
	    });
	    if (Component.contextTypes) {
	      StoreConnection.contextTypes = Component.contextTypes;
	    }

	    return StoreConnection;
	  })();
	}

	exports['default'] = connectToStores;
	module.exports = exports['default'];

/***/ },

/***/ 243:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _connectToStores = __webpack_require__(242);

	var _connectToStores2 = _interopRequireDefault(_connectToStores);

	var _AuthStore = __webpack_require__(236);

	var _AuthStore2 = _interopRequireDefault(_AuthStore);

	var _AuthActions = __webpack_require__(238);

	var _AuthActions2 = _interopRequireDefault(_AuthActions);

	var _reactChartjs = __webpack_require__(244);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dashboard = function (_Component) {
	  _inherits(Dashboard, _Component);

	  function Dashboard(props) {
	    _classCallCheck(this, Dashboard);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).call(this, props));

	    _this.state = _AuthStore2.default.state;
	    return _this;
	  }

	  _createClass(Dashboard, [{
	    key: 'onClickLogout',
	    value: function onClickLogout() {
	      _AuthActions2.default.logout();
	    }
	  }, {
	    key: 'filterRunsAndDate',
	    value: function filterRunsAndDate(activity) {
	      return activity.type == "Running" && new Date(activity.start_time).getFullYear() == 2016;
	    }
	  }, {
	    key: 'filterByDate',
	    value: function filterByDate(activity, i) {
	      return new Date(activity.start_time) < this;
	    }
	  }, {
	    key: 'mapDistance',
	    value: function mapDistance(activity) {
	      // return activity.total_distance * 0.00062137;
	      return Math.floor(activity.total_distance * 0.00062137 * 2) / 2;
	    }
	  }, {
	    key: 'reduceDistance',
	    value: function reduceDistance(a, b) {
	      return a + b;
	    }
	  }, {
	    key: 'progressDay',
	    value: function progressDay(now, day, runs) {
	      var thatDay = new Date(now.getFullYear(), 0, day + 1);

	      var filteredRuns = runs.filter(this.filterByDate, thatDay);

	      var runMiles = filteredRuns.map(this.mapDistance).reduce(this.reduceDistance, 0);

	      var dayNum = day;
	      var dayNumWindow = Math.max(dayNum - 14, 0);

	      var progress = Math.round(Math.max(runMiles - dayNumWindow, 0) / Math.max(dayNum - dayNumWindow, 1) * 100);

	      return [new Date(now.getFullYear(), 0, day), progress /*, day, runMiles, filteredRuns.length*/];
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _AuthStore2.default.listen(this.onStoreChange.bind(this));
	      _AuthActions2.default.refreshFitness();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _AuthStore2.default.unlisten(this.onStoreChange.bind(this));
	    }
	  }, {
	    key: 'onStoreChange',
	    value: function onStoreChange(state) {
	      this.setState(state);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var fitness = this.state.fitness || { items: [] };
	      var runs = fitness.items.filter(this.filterRunsAndDate);

	      var runMiles = runs.map(this.mapDistance).reduce(this.reduceDistance, 0);

	      var now = new Date();
	      var dayNum = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
	      var dayNumWindow = Math.max(dayNum - 14, 0);

	      var progress = Math.round(Math.max(runMiles - dayNumWindow, 0) / Math.max(dayNum - dayNumWindow, 1) * 100);
	      var progressRound5 = progress <= 100 ? Math.round(progress / 5) * 5 : 101;

	      var graphData = [];
	      for (var i = 1; i <= dayNum; i++) {
	        graphData.push(this.progressDay(now, i, runs));
	      }

	      var options = {
	        // tooltips
	        pointHitDetectionRadius: 1,
	        tooltipTemplate: "<%= value %>%",

	        // y axis
	        scaleOverride: true,
	        scaleSteps: 3,
	        scaleStepWidth: 50,
	        scaleStartValue: 0
	      };

	      var data = {
	        labels: graphData.map(function (x) {
	          return x[0].getDay() % 7 == 0 ? 1 + x[0].getMonth() + '/' + x[0].getDate() : '';
	        }),
	        datasets: [{
	          fillColor: "rgba(151,187,205,0.2)",
	          strokeColor: "rgba(151,187,205,1)",
	          pointColor: "rgba(151,187,205,1)",
	          pointStrokeColor: "#fff",
	          pointHighlightFill: "#fff",
	          pointHighlightStroke: "rgba(151,187,205,1)",
	          data: graphData.map(function (x) {
	            return x[1];
	          })
	        }]
	      };

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'logout' },
	          _react2.default.createElement(
	            'button',
	            { onClick: this.onClickLogout.bind(this) },
	            'Logout'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'box1' },
	          _react2.default.createElement(
	            'p',
	            { className: 'fw fw1' },
	            'Day ',
	            dayNum
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'wrap' },
	            _react2.default.createElement(
	              'div',
	              { className: "progress-radial progress-" + progressRound5 },
	              _react2.default.createElement(
	                'div',
	                { className: 'overlay' },
	                _react2.default.createElement(
	                  'p',
	                  { className: 'fw fw2' },
	                  runMiles
	                ),
	                _react2.default.createElement(
	                  'p',
	                  { className: 'fw fw3' },
	                  'miles / 365'
	                )
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(_reactChartjs.Line, { data: data, options: options })
	      );
	    }
	  }]);

	  return Dashboard;
	}(_react.Component);

	exports.default = Dashboard;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/emanuele/d/run/react-oauth2-example/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Dashboard.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 244:
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  Bar: __webpack_require__(245),
	  Doughnut: __webpack_require__(249),
	  Line: __webpack_require__(250),
	  Pie: __webpack_require__(251),
	  PolarArea: __webpack_require__(252),
	  Radar: __webpack_require__(253),
	  createClass: __webpack_require__(246).createClass
	};


/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(246);

	module.exports = vars.createClass('Bar', ['getBarsAtEvent']);


/***/ },

/***/ 246:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(170);

	module.exports = {
	  createClass: function(chartType, methodNames, dataKey) {
	    var classData = {
	      displayName: chartType + 'Chart',
	      getInitialState: function() { return {}; },
	      render: function() {
	        var _props = {
	          ref: 'canvass'
	        };
	        for (var name in this.props) {
	          if (this.props.hasOwnProperty(name)) {
	            if (name !== 'data' && name !== 'options') {
	              _props[name] = this.props[name];
	            }
	          }
	        }
	        return React.createElement('canvas', _props);
	      }
	    };

	    var extras = ['clear', 'stop', 'resize', 'toBase64Image', 'generateLegend', 'update', 'addData', 'removeData'];
	    function extra(type) {
	      classData[type] = function() {
	        return this.state.chart[type].apply(this.state.chart, arguments);
	      };
	    }

	    classData.componentDidMount = function() {
	      this.initializeChart(this.props);
	    };

	    classData.componentWillUnmount = function() {
	      var chart = this.state.chart;
	      chart.destroy();
	    };

	    classData.componentWillReceiveProps = function(nextProps) {
	      var chart = this.state.chart;
	      if (nextProps.redraw) {
	        chart.destroy();
	        this.initializeChart(nextProps);
	      } else {
	        dataKey = dataKey || dataKeys[chart.name];
	        updatePoints(nextProps, chart, dataKey);
	        if (chart.scale) {
	          chart.scale.xLabels = nextProps.data.labels;
	          chart.scale.calculateXLabelRotation();
	        }
	        chart.update();
	      }
	    };

	    classData.initializeChart = function(nextProps) {
	      var Chart = __webpack_require__(247);
	      var el = ReactDOM.findDOMNode(this);
	      var ctx = el.getContext("2d");
	      var chart = new Chart(ctx)[chartType](nextProps.data, nextProps.options || {});
	      this.state.chart = chart;
	    };

	    // return the chartjs instance
	    classData.getChart = function() {
	      return this.state.chart;
	    };

	    // return the canvass element that contains the chart
	    classData.getCanvass = function() {
	      return this.refs.canvass;
	    };

	    classData.getCanvas = classData.getCanvass;

	    var i;
	    for (i=0; i<extras.length; i++) {
	      extra(extras[i]);
	    }
	    for (i=0; i<methodNames.length; i++) {
	      extra(methodNames[i]);
	    }

	    return React.createClass(classData);
	  }
	};

	var dataKeys = {
	  'Line': 'points',
	  'Radar': 'points',
	  'Bar': 'bars'
	};

	var updatePoints = function(nextProps, chart, dataKey) {
	  var name = chart.name;

	  if (name === 'PolarArea' || name === 'Pie' || name === 'Doughnut') {
	    nextProps.data.forEach(function(segment, segmentIndex) {
	      if (!chart.segments[segmentIndex]) {
	        chart.addData(segment);
	      } else {
	        Object.keys(segment).forEach(function (key) {
	          chart.segments[segmentIndex][key] = segment[key];
	        });
	      }
	    });
	  } else {
	    while (chart.scale.xLabels.length > nextProps.data.labels.length) {
	      chart.removeData();
	    }
	    nextProps.data.datasets.forEach(function(set, setIndex) {
	      set.data.forEach(function(val, pointIndex) {
	        if (typeof(chart.datasets[setIndex][dataKey][pointIndex]) == "undefined") {
	          addData(nextProps, chart, setIndex, pointIndex);
	        } else {
	          chart.datasets[setIndex][dataKey][pointIndex].value = val;
	        }
	      });
	    });
	  }
	};

	var addData = function(nextProps, chart, setIndex, pointIndex) {
	  var values = [];
	  nextProps.data.datasets.forEach(function(set) {
	    values.push(set.data[pointIndex]);
	  });
	  chart.addData(values, nextProps.data.labels[setIndex]);
	};


/***/ },

/***/ 247:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Chart.js
	 * http://chartjs.org/
	 * Version: 1.0.2
	 *
	 * Copyright 2015 Nick Downie
	 * Released under the MIT license
	 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
	 */


	(function(){

		"use strict";

		//Declare root variable - window in the browser, global on the server
		var root = this,
			previous = root.Chart;

		//Occupy the global variable of Chart, and create a simple base class
		var Chart = function(context){
			var chart = this;
			this.canvas = context.canvas;

			this.ctx = context;

			//Variables global to the chart
			var computeDimension = function(element,dimension)
			{
				if (element['offset'+dimension])
				{
					return element['offset'+dimension];
				}
				else
				{
					return document.defaultView.getComputedStyle(element).getPropertyValue(dimension);
				}
			}

			var width = this.width = computeDimension(context.canvas,'Width');
			var height = this.height = computeDimension(context.canvas,'Height');

			// Firefox requires this to work correctly
			context.canvas.width  = width;
			context.canvas.height = height;

			var width = this.width = context.canvas.width;
			var height = this.height = context.canvas.height;
			this.aspectRatio = this.width / this.height;
			//High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
			helpers.retinaScale(this);

			return this;
		};
		//Globally expose the defaults to allow for user updating/changing
		Chart.defaults = {
			global: {
				// Boolean - Whether to animate the chart
				animation: true,

				// Number - Number of animation steps
				animationSteps: 60,

				// String - Animation easing effect
				animationEasing: "easeOutQuart",

				// Boolean - If we should show the scale at all
				showScale: true,

				// Boolean - If we want to override with a hard coded scale
				scaleOverride: false,

				// ** Required if scaleOverride is true **
				// Number - The number of steps in a hard coded scale
				scaleSteps: null,
				// Number - The value jump in the hard coded scale
				scaleStepWidth: null,
				// Number - The scale starting value
				scaleStartValue: null,

				// String - Colour of the scale line
				scaleLineColor: "rgba(0,0,0,.1)",

				// Number - Pixel width of the scale line
				scaleLineWidth: 1,

				// Boolean - Whether to show labels on the scale
				scaleShowLabels: true,

				// Interpolated JS string - can access value
				scaleLabel: "<%=value%>",

				// Boolean - Whether the scale should stick to integers, and not show any floats even if drawing space is there
				scaleIntegersOnly: true,

				// Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
				scaleBeginAtZero: false,

				// String - Scale label font declaration for the scale label
				scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

				// Number - Scale label font size in pixels
				scaleFontSize: 12,

				// String - Scale label font weight style
				scaleFontStyle: "normal",

				// String - Scale label font colour
				scaleFontColor: "#666",

				// Boolean - whether or not the chart should be responsive and resize when the browser does.
				responsive: false,

				// Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
				maintainAspectRatio: true,

				// Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
				showTooltips: true,

				// Boolean - Determines whether to draw built-in tooltip or call custom tooltip function
				customTooltips: false,

				// Array - Array of string names to attach tooltip events
				tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],

				// String - Tooltip background colour
				tooltipFillColor: "rgba(0,0,0,0.8)",

				// String - Tooltip label font declaration for the scale label
				tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

				// Number - Tooltip label font size in pixels
				tooltipFontSize: 14,

				// String - Tooltip font weight style
				tooltipFontStyle: "normal",

				// String - Tooltip label font colour
				tooltipFontColor: "#fff",

				// String - Tooltip title font declaration for the scale label
				tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

				// Number - Tooltip title font size in pixels
				tooltipTitleFontSize: 14,

				// String - Tooltip title font weight style
				tooltipTitleFontStyle: "bold",

				// String - Tooltip title font colour
				tooltipTitleFontColor: "#fff",

				// Number - pixel width of padding around tooltip text
				tooltipYPadding: 6,

				// Number - pixel width of padding around tooltip text
				tooltipXPadding: 6,

				// Number - Size of the caret on the tooltip
				tooltipCaretSize: 8,

				// Number - Pixel radius of the tooltip border
				tooltipCornerRadius: 6,

				// Number - Pixel offset from point x to tooltip edge
				tooltipXOffset: 10,

				// String - Template string for single tooltips
				tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

				// String - Template string for single tooltips
				multiTooltipTemplate: "<%= value %>",

				// String - Colour behind the legend colour block
				multiTooltipKeyBackground: '#fff',

				// Function - Will fire on animation progression.
				onAnimationProgress: function(){},

				// Function - Will fire on animation completion.
				onAnimationComplete: function(){}

			}
		};

		//Create a dictionary of chart types, to allow for extension of existing types
		Chart.types = {};

		//Global Chart helpers object for utility methods and classes
		var helpers = Chart.helpers = {};

			//-- Basic js utility methods
		var each = helpers.each = function(loopable,callback,self){
				var additionalArgs = Array.prototype.slice.call(arguments, 3);
				// Check to see if null or undefined firstly.
				if (loopable){
					if (loopable.length === +loopable.length){
						var i;
						for (i=0; i<loopable.length; i++){
							callback.apply(self,[loopable[i], i].concat(additionalArgs));
						}
					}
					else{
						for (var item in loopable){
							callback.apply(self,[loopable[item],item].concat(additionalArgs));
						}
					}
				}
			},
			clone = helpers.clone = function(obj){
				var objClone = {};
				each(obj,function(value,key){
					if (obj.hasOwnProperty(key)) objClone[key] = value;
				});
				return objClone;
			},
			extend = helpers.extend = function(base){
				each(Array.prototype.slice.call(arguments,1), function(extensionObject) {
					each(extensionObject,function(value,key){
						if (extensionObject.hasOwnProperty(key)) base[key] = value;
					});
				});
				return base;
			},
			merge = helpers.merge = function(base,master){
				//Merge properties in left object over to a shallow clone of object right.
				var args = Array.prototype.slice.call(arguments,0);
				args.unshift({});
				return extend.apply(null, args);
			},
			indexOf = helpers.indexOf = function(arrayToSearch, item){
				if (Array.prototype.indexOf) {
					return arrayToSearch.indexOf(item);
				}
				else{
					for (var i = 0; i < arrayToSearch.length; i++) {
						if (arrayToSearch[i] === item) return i;
					}
					return -1;
				}
			},
			where = helpers.where = function(collection, filterCallback){
				var filtered = [];

				helpers.each(collection, function(item){
					if (filterCallback(item)){
						filtered.push(item);
					}
				});

				return filtered;
			},
			findNextWhere = helpers.findNextWhere = function(arrayToSearch, filterCallback, startIndex){
				// Default to start of the array
				if (!startIndex){
					startIndex = -1;
				}
				for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
					var currentItem = arrayToSearch[i];
					if (filterCallback(currentItem)){
						return currentItem;
					}
				}
			},
			findPreviousWhere = helpers.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex){
				// Default to end of the array
				if (!startIndex){
					startIndex = arrayToSearch.length;
				}
				for (var i = startIndex - 1; i >= 0; i--) {
					var currentItem = arrayToSearch[i];
					if (filterCallback(currentItem)){
						return currentItem;
					}
				}
			},
			inherits = helpers.inherits = function(extensions){
				//Basic javascript inheritance based on the model created in Backbone.js
				var parent = this;
				var ChartElement = (extensions && extensions.hasOwnProperty("constructor")) ? extensions.constructor : function(){ return parent.apply(this, arguments); };

				var Surrogate = function(){ this.constructor = ChartElement;};
				Surrogate.prototype = parent.prototype;
				ChartElement.prototype = new Surrogate();

				ChartElement.extend = inherits;

				if (extensions) extend(ChartElement.prototype, extensions);

				ChartElement.__super__ = parent.prototype;

				return ChartElement;
			},
			noop = helpers.noop = function(){},
			uid = helpers.uid = (function(){
				var id=0;
				return function(){
					return "chart-" + id++;
				};
			})(),
			warn = helpers.warn = function(str){
				//Method for warning of errors
				if (window.console && typeof window.console.warn == "function") console.warn(str);
			},
			amd = helpers.amd = ("function" == 'function' && __webpack_require__(248)),
			//-- Math methods
			isNumber = helpers.isNumber = function(n){
				return !isNaN(parseFloat(n)) && isFinite(n);
			},
			max = helpers.max = function(array){
				return Math.max.apply( Math, array );
			},
			min = helpers.min = function(array){
				return Math.min.apply( Math, array );
			},
			cap = helpers.cap = function(valueToCap,maxValue,minValue){
				if(isNumber(maxValue)) {
					if( valueToCap > maxValue ) {
						return maxValue;
					}
				}
				else if(isNumber(minValue)){
					if ( valueToCap < minValue ){
						return minValue;
					}
				}
				return valueToCap;
			},
			getDecimalPlaces = helpers.getDecimalPlaces = function(num){
				if (num%1!==0 && isNumber(num)){
					return num.toString().split(".")[1].length;
				}
				else {
					return 0;
				}
			},
			toRadians = helpers.radians = function(degrees){
				return degrees * (Math.PI/180);
			},
			// Gets the angle from vertical upright to the point about a centre.
			getAngleFromPoint = helpers.getAngleFromPoint = function(centrePoint, anglePoint){
				var distanceFromXCenter = anglePoint.x - centrePoint.x,
					distanceFromYCenter = anglePoint.y - centrePoint.y,
					radialDistanceFromCenter = Math.sqrt( distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);


				var angle = Math.PI * 2 + Math.atan2(distanceFromYCenter, distanceFromXCenter);

				//If the segment is in the top left quadrant, we need to add another rotation to the angle
				if (distanceFromXCenter < 0 && distanceFromYCenter < 0){
					angle += Math.PI*2;
				}

				return {
					angle: angle,
					distance: radialDistanceFromCenter
				};
			},
			aliasPixel = helpers.aliasPixel = function(pixelWidth){
				return (pixelWidth % 2 === 0) ? 0 : 0.5;
			},
			splineCurve = helpers.splineCurve = function(FirstPoint,MiddlePoint,AfterPoint,t){
				//Props to Rob Spencer at scaled innovation for his post on splining between points
				//http://scaledinnovation.com/analytics/splines/aboutSplines.html
				var d01=Math.sqrt(Math.pow(MiddlePoint.x-FirstPoint.x,2)+Math.pow(MiddlePoint.y-FirstPoint.y,2)),
					d12=Math.sqrt(Math.pow(AfterPoint.x-MiddlePoint.x,2)+Math.pow(AfterPoint.y-MiddlePoint.y,2)),
					fa=t*d01/(d01+d12),// scaling factor for triangle Ta
					fb=t*d12/(d01+d12);
				return {
					inner : {
						x : MiddlePoint.x-fa*(AfterPoint.x-FirstPoint.x),
						y : MiddlePoint.y-fa*(AfterPoint.y-FirstPoint.y)
					},
					outer : {
						x: MiddlePoint.x+fb*(AfterPoint.x-FirstPoint.x),
						y : MiddlePoint.y+fb*(AfterPoint.y-FirstPoint.y)
					}
				};
			},
			calculateOrderOfMagnitude = helpers.calculateOrderOfMagnitude = function(val){
				return Math.floor(Math.log(val) / Math.LN10);
			},
			calculateScaleRange = helpers.calculateScaleRange = function(valuesArray, drawingSize, textSize, startFromZero, integersOnly){

				//Set a minimum step of two - a point at the top of the graph, and a point at the base
				var minSteps = 2,
					maxSteps = Math.floor(drawingSize/(textSize * 1.5)),
					skipFitting = (minSteps >= maxSteps);

				var maxValue = max(valuesArray),
					minValue = min(valuesArray);

				// We need some degree of seperation here to calculate the scales if all the values are the same
				// Adding/minusing 0.5 will give us a range of 1.
				if (maxValue === minValue){
					maxValue += 0.5;
					// So we don't end up with a graph with a negative start value if we've said always start from zero
					if (minValue >= 0.5 && !startFromZero){
						minValue -= 0.5;
					}
					else{
						// Make up a whole number above the values
						maxValue += 0.5;
					}
				}

				var	valueRange = Math.abs(maxValue - minValue),
					rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange),
					graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude),
					graphMin = (startFromZero) ? 0 : Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude),
					graphRange = graphMax - graphMin,
					stepValue = Math.pow(10, rangeOrderOfMagnitude),
					numberOfSteps = Math.round(graphRange / stepValue);

				//If we have more space on the graph we'll use it to give more definition to the data
				while((numberOfSteps > maxSteps || (numberOfSteps * 2) < maxSteps) && !skipFitting) {
					if(numberOfSteps > maxSteps){
						stepValue *=2;
						numberOfSteps = Math.round(graphRange/stepValue);
						// Don't ever deal with a decimal number of steps - cancel fitting and just use the minimum number of steps.
						if (numberOfSteps % 1 !== 0){
							skipFitting = true;
						}
					}
					//We can fit in double the amount of scale points on the scale
					else{
						//If user has declared ints only, and the step value isn't a decimal
						if (integersOnly && rangeOrderOfMagnitude >= 0){
							//If the user has said integers only, we need to check that making the scale more granular wouldn't make it a float
							if(stepValue/2 % 1 === 0){
								stepValue /=2;
								numberOfSteps = Math.round(graphRange/stepValue);
							}
							//If it would make it a float break out of the loop
							else{
								break;
							}
						}
						//If the scale doesn't have to be an int, make the scale more granular anyway.
						else{
							stepValue /=2;
							numberOfSteps = Math.round(graphRange/stepValue);
						}

					}
				}

				if (skipFitting){
					numberOfSteps = minSteps;
					stepValue = graphRange / numberOfSteps;
				}

				return {
					steps : numberOfSteps,
					stepValue : stepValue,
					min : graphMin,
					max	: graphMin + (numberOfSteps * stepValue)
				};

			},
			/* jshint ignore:start */
			// Blows up jshint errors based on the new Function constructor
			//Templating methods
			//Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
			template = helpers.template = function(templateString, valuesObject){

				// If templateString is function rather than string-template - call the function for valuesObject

				if(templateString instanceof Function){
				 	return templateString(valuesObject);
			 	}

				var cache = {};
				function tmpl(str, data){
					// Figure out if we're getting a template, or if we need to
					// load the template - and be sure to cache the result.
					var fn = !/\W/.test(str) ?
					cache[str] = cache[str] :

					// Generate a reusable function that will serve as a template
					// generator (and which will be cached).
					new Function("obj",
						"var p=[],print=function(){p.push.apply(p,arguments);};" +

						// Introduce the data as local variables using with(){}
						"with(obj){p.push('" +

						// Convert the template into pure JavaScript
						str
							.replace(/[\r\t\n]/g, " ")
							.split("<%").join("\t")
							.replace(/((^|%>)[^\t]*)'/g, "$1\r")
							.replace(/\t=(.*?)%>/g, "',$1,'")
							.split("\t").join("');")
							.split("%>").join("p.push('")
							.split("\r").join("\\'") +
						"');}return p.join('');"
					);

					// Provide some basic currying to the user
					return data ? fn( data ) : fn;
				}
				return tmpl(templateString,valuesObject);
			},
			/* jshint ignore:end */
			generateLabels = helpers.generateLabels = function(templateString,numberOfSteps,graphMin,stepValue){
				var labelsArray = new Array(numberOfSteps);
				if (labelTemplateString){
					each(labelsArray,function(val,index){
						labelsArray[index] = template(templateString,{value: (graphMin + (stepValue*(index+1)))});
					});
				}
				return labelsArray;
			},
			//--Animation methods
			//Easing functions adapted from Robert Penner's easing equations
			//http://www.robertpenner.com/easing/
			easingEffects = helpers.easingEffects = {
				linear: function (t) {
					return t;
				},
				easeInQuad: function (t) {
					return t * t;
				},
				easeOutQuad: function (t) {
					return -1 * t * (t - 2);
				},
				easeInOutQuad: function (t) {
					if ((t /= 1 / 2) < 1) return 1 / 2 * t * t;
					return -1 / 2 * ((--t) * (t - 2) - 1);
				},
				easeInCubic: function (t) {
					return t * t * t;
				},
				easeOutCubic: function (t) {
					return 1 * ((t = t / 1 - 1) * t * t + 1);
				},
				easeInOutCubic: function (t) {
					if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
					return 1 / 2 * ((t -= 2) * t * t + 2);
				},
				easeInQuart: function (t) {
					return t * t * t * t;
				},
				easeOutQuart: function (t) {
					return -1 * ((t = t / 1 - 1) * t * t * t - 1);
				},
				easeInOutQuart: function (t) {
					if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t;
					return -1 / 2 * ((t -= 2) * t * t * t - 2);
				},
				easeInQuint: function (t) {
					return 1 * (t /= 1) * t * t * t * t;
				},
				easeOutQuint: function (t) {
					return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
				},
				easeInOutQuint: function (t) {
					if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t * t;
					return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
				},
				easeInSine: function (t) {
					return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
				},
				easeOutSine: function (t) {
					return 1 * Math.sin(t / 1 * (Math.PI / 2));
				},
				easeInOutSine: function (t) {
					return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
				},
				easeInExpo: function (t) {
					return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
				},
				easeOutExpo: function (t) {
					return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
				},
				easeInOutExpo: function (t) {
					if (t === 0) return 0;
					if (t === 1) return 1;
					if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
					return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
				},
				easeInCirc: function (t) {
					if (t >= 1) return t;
					return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
				},
				easeOutCirc: function (t) {
					return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
				},
				easeInOutCirc: function (t) {
					if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
					return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
				},
				easeInElastic: function (t) {
					var s = 1.70158;
					var p = 0;
					var a = 1;
					if (t === 0) return 0;
					if ((t /= 1) == 1) return 1;
					if (!p) p = 1 * 0.3;
					if (a < Math.abs(1)) {
						a = 1;
						s = p / 4;
					} else s = p / (2 * Math.PI) * Math.asin(1 / a);
					return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
				},
				easeOutElastic: function (t) {
					var s = 1.70158;
					var p = 0;
					var a = 1;
					if (t === 0) return 0;
					if ((t /= 1) == 1) return 1;
					if (!p) p = 1 * 0.3;
					if (a < Math.abs(1)) {
						a = 1;
						s = p / 4;
					} else s = p / (2 * Math.PI) * Math.asin(1 / a);
					return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
				},
				easeInOutElastic: function (t) {
					var s = 1.70158;
					var p = 0;
					var a = 1;
					if (t === 0) return 0;
					if ((t /= 1 / 2) == 2) return 1;
					if (!p) p = 1 * (0.3 * 1.5);
					if (a < Math.abs(1)) {
						a = 1;
						s = p / 4;
					} else s = p / (2 * Math.PI) * Math.asin(1 / a);
					if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
					return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
				},
				easeInBack: function (t) {
					var s = 1.70158;
					return 1 * (t /= 1) * t * ((s + 1) * t - s);
				},
				easeOutBack: function (t) {
					var s = 1.70158;
					return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
				},
				easeInOutBack: function (t) {
					var s = 1.70158;
					if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
					return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
				},
				easeInBounce: function (t) {
					return 1 - easingEffects.easeOutBounce(1 - t);
				},
				easeOutBounce: function (t) {
					if ((t /= 1) < (1 / 2.75)) {
						return 1 * (7.5625 * t * t);
					} else if (t < (2 / 2.75)) {
						return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
					} else if (t < (2.5 / 2.75)) {
						return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
					} else {
						return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
					}
				},
				easeInOutBounce: function (t) {
					if (t < 1 / 2) return easingEffects.easeInBounce(t * 2) * 0.5;
					return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
				}
			},
			//Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
			requestAnimFrame = helpers.requestAnimFrame = (function(){
				return window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function(callback) {
						return window.setTimeout(callback, 1000 / 60);
					};
			})(),
			cancelAnimFrame = helpers.cancelAnimFrame = (function(){
				return window.cancelAnimationFrame ||
					window.webkitCancelAnimationFrame ||
					window.mozCancelAnimationFrame ||
					window.oCancelAnimationFrame ||
					window.msCancelAnimationFrame ||
					function(callback) {
						return window.clearTimeout(callback, 1000 / 60);
					};
			})(),
			animationLoop = helpers.animationLoop = function(callback,totalSteps,easingString,onProgress,onComplete,chartInstance){

				var currentStep = 0,
					easingFunction = easingEffects[easingString] || easingEffects.linear;

				var animationFrame = function(){
					currentStep++;
					var stepDecimal = currentStep/totalSteps;
					var easeDecimal = easingFunction(stepDecimal);

					callback.call(chartInstance,easeDecimal,stepDecimal, currentStep);
					onProgress.call(chartInstance,easeDecimal,stepDecimal);
					if (currentStep < totalSteps){
						chartInstance.animationFrame = requestAnimFrame(animationFrame);
					} else{
						onComplete.apply(chartInstance);
					}
				};
				requestAnimFrame(animationFrame);
			},
			//-- DOM methods
			getRelativePosition = helpers.getRelativePosition = function(evt){
				var mouseX, mouseY;
				var e = evt.originalEvent || evt,
					canvas = evt.currentTarget || evt.srcElement,
					boundingRect = canvas.getBoundingClientRect();

				if (e.touches){
					mouseX = e.touches[0].clientX - boundingRect.left;
					mouseY = e.touches[0].clientY - boundingRect.top;

				}
				else{
					mouseX = e.clientX - boundingRect.left;
					mouseY = e.clientY - boundingRect.top;
				}

				return {
					x : mouseX,
					y : mouseY
				};

			},
			addEvent = helpers.addEvent = function(node,eventType,method){
				if (node.addEventListener){
					node.addEventListener(eventType,method);
				} else if (node.attachEvent){
					node.attachEvent("on"+eventType, method);
				} else {
					node["on"+eventType] = method;
				}
			},
			removeEvent = helpers.removeEvent = function(node, eventType, handler){
				if (node.removeEventListener){
					node.removeEventListener(eventType, handler, false);
				} else if (node.detachEvent){
					node.detachEvent("on"+eventType,handler);
				} else{
					node["on" + eventType] = noop;
				}
			},
			bindEvents = helpers.bindEvents = function(chartInstance, arrayOfEvents, handler){
				// Create the events object if it's not already present
				if (!chartInstance.events) chartInstance.events = {};

				each(arrayOfEvents,function(eventName){
					chartInstance.events[eventName] = function(){
						handler.apply(chartInstance, arguments);
					};
					addEvent(chartInstance.chart.canvas,eventName,chartInstance.events[eventName]);
				});
			},
			unbindEvents = helpers.unbindEvents = function (chartInstance, arrayOfEvents) {
				each(arrayOfEvents, function(handler,eventName){
					removeEvent(chartInstance.chart.canvas, eventName, handler);
				});
			},
			getMaximumWidth = helpers.getMaximumWidth = function(domNode){
				var container = domNode.parentNode;
				// TODO = check cross browser stuff with this.
				return container.clientWidth;
			},
			getMaximumHeight = helpers.getMaximumHeight = function(domNode){
				var container = domNode.parentNode;
				// TODO = check cross browser stuff with this.
				return container.clientHeight;
			},
			getMaximumSize = helpers.getMaximumSize = helpers.getMaximumWidth, // legacy support
			retinaScale = helpers.retinaScale = function(chart){
				var ctx = chart.ctx,
					width = chart.canvas.width,
					height = chart.canvas.height;

				if (window.devicePixelRatio) {
					ctx.canvas.style.width = width + "px";
					ctx.canvas.style.height = height + "px";
					ctx.canvas.height = height * window.devicePixelRatio;
					ctx.canvas.width = width * window.devicePixelRatio;
					ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
				}
			},
			//-- Canvas methods
			clear = helpers.clear = function(chart){
				chart.ctx.clearRect(0,0,chart.width,chart.height);
			},
			fontString = helpers.fontString = function(pixelSize,fontStyle,fontFamily){
				return fontStyle + " " + pixelSize+"px " + fontFamily;
			},
			longestText = helpers.longestText = function(ctx,font,arrayOfStrings){
				ctx.font = font;
				var longest = 0;
				each(arrayOfStrings,function(string){
					var textWidth = ctx.measureText(string).width;
					longest = (textWidth > longest) ? textWidth : longest;
				});
				return longest;
			},
			drawRoundedRectangle = helpers.drawRoundedRectangle = function(ctx,x,y,width,height,radius){
				ctx.beginPath();
				ctx.moveTo(x + radius, y);
				ctx.lineTo(x + width - radius, y);
				ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
				ctx.lineTo(x + width, y + height - radius);
				ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
				ctx.lineTo(x + radius, y + height);
				ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
				ctx.lineTo(x, y + radius);
				ctx.quadraticCurveTo(x, y, x + radius, y);
				ctx.closePath();
			};


		//Store a reference to each instance - allowing us to globally resize chart instances on window resize.
		//Destroy method on the chart will remove the instance of the chart from this reference.
		Chart.instances = {};

		Chart.Type = function(data,options,chart){
			this.options = options;
			this.chart = chart;
			this.id = uid();
			//Add the chart instance to the global namespace
			Chart.instances[this.id] = this;

			// Initialize is always called when a chart type is created
			// By default it is a no op, but it should be extended
			if (options.responsive){
				this.resize();
			}
			this.initialize.call(this,data);
		};

		//Core methods that'll be a part of every chart type
		extend(Chart.Type.prototype,{
			initialize : function(){return this;},
			clear : function(){
				clear(this.chart);
				return this;
			},
			stop : function(){
				// Stops any current animation loop occuring
				cancelAnimFrame(this.animationFrame);
				return this;
			},
			resize : function(callback){
				this.stop();
				var canvas = this.chart.canvas,
					newWidth = getMaximumWidth(this.chart.canvas),
					newHeight = this.options.maintainAspectRatio ? newWidth / this.chart.aspectRatio : getMaximumHeight(this.chart.canvas);

				canvas.width = this.chart.width = newWidth;
				canvas.height = this.chart.height = newHeight;

				retinaScale(this.chart);

				if (typeof callback === "function"){
					callback.apply(this, Array.prototype.slice.call(arguments, 1));
				}
				return this;
			},
			reflow : noop,
			render : function(reflow){
				if (reflow){
					this.reflow();
				}
				if (this.options.animation && !reflow){
					helpers.animationLoop(
						this.draw,
						this.options.animationSteps,
						this.options.animationEasing,
						this.options.onAnimationProgress,
						this.options.onAnimationComplete,
						this
					);
				}
				else{
					this.draw();
					this.options.onAnimationComplete.call(this);
				}
				return this;
			},
			generateLegend : function(){
				return template(this.options.legendTemplate,this);
			},
			destroy : function(){
				this.clear();
				unbindEvents(this, this.events);
				var canvas = this.chart.canvas;

				// Reset canvas height/width attributes starts a fresh with the canvas context
				canvas.width = this.chart.width;
				canvas.height = this.chart.height;

				// < IE9 doesn't support removeProperty
				if (canvas.style.removeProperty) {
					canvas.style.removeProperty('width');
					canvas.style.removeProperty('height');
				} else {
					canvas.style.removeAttribute('width');
					canvas.style.removeAttribute('height');
				}

				delete Chart.instances[this.id];
			},
			showTooltip : function(ChartElements, forceRedraw){
				// Only redraw the chart if we've actually changed what we're hovering on.
				if (typeof this.activeElements === 'undefined') this.activeElements = [];

				var isChanged = (function(Elements){
					var changed = false;

					if (Elements.length !== this.activeElements.length){
						changed = true;
						return changed;
					}

					each(Elements, function(element, index){
						if (element !== this.activeElements[index]){
							changed = true;
						}
					}, this);
					return changed;
				}).call(this, ChartElements);

				if (!isChanged && !forceRedraw){
					return;
				}
				else{
					this.activeElements = ChartElements;
				}
				this.draw();
				if(this.options.customTooltips){
					this.options.customTooltips(false);
				}
				if (ChartElements.length > 0){
					// If we have multiple datasets, show a MultiTooltip for all of the data points at that index
					if (this.datasets && this.datasets.length > 1) {
						var dataArray,
							dataIndex;

						for (var i = this.datasets.length - 1; i >= 0; i--) {
							dataArray = this.datasets[i].points || this.datasets[i].bars || this.datasets[i].segments;
							dataIndex = indexOf(dataArray, ChartElements[0]);
							if (dataIndex !== -1){
								break;
							}
						}
						var tooltipLabels = [],
							tooltipColors = [],
							medianPosition = (function(index) {

								// Get all the points at that particular index
								var Elements = [],
									dataCollection,
									xPositions = [],
									yPositions = [],
									xMax,
									yMax,
									xMin,
									yMin;
								helpers.each(this.datasets, function(dataset){
									dataCollection = dataset.points || dataset.bars || dataset.segments;
									if (dataCollection[dataIndex] && dataCollection[dataIndex].hasValue()){
										Elements.push(dataCollection[dataIndex]);
									}
								});

								helpers.each(Elements, function(element) {
									xPositions.push(element.x);
									yPositions.push(element.y);


									//Include any colour information about the element
									tooltipLabels.push(helpers.template(this.options.multiTooltipTemplate, element));
									tooltipColors.push({
										fill: element._saved.fillColor || element.fillColor,
										stroke: element._saved.strokeColor || element.strokeColor
									});

								}, this);

								yMin = min(yPositions);
								yMax = max(yPositions);

								xMin = min(xPositions);
								xMax = max(xPositions);

								return {
									x: (xMin > this.chart.width/2) ? xMin : xMax,
									y: (yMin + yMax)/2
								};
							}).call(this, dataIndex);

						new Chart.MultiTooltip({
							x: medianPosition.x,
							y: medianPosition.y,
							xPadding: this.options.tooltipXPadding,
							yPadding: this.options.tooltipYPadding,
							xOffset: this.options.tooltipXOffset,
							fillColor: this.options.tooltipFillColor,
							textColor: this.options.tooltipFontColor,
							fontFamily: this.options.tooltipFontFamily,
							fontStyle: this.options.tooltipFontStyle,
							fontSize: this.options.tooltipFontSize,
							titleTextColor: this.options.tooltipTitleFontColor,
							titleFontFamily: this.options.tooltipTitleFontFamily,
							titleFontStyle: this.options.tooltipTitleFontStyle,
							titleFontSize: this.options.tooltipTitleFontSize,
							cornerRadius: this.options.tooltipCornerRadius,
							labels: tooltipLabels,
							legendColors: tooltipColors,
							legendColorBackground : this.options.multiTooltipKeyBackground,
							title: ChartElements[0].label,
							chart: this.chart,
							ctx: this.chart.ctx,
							custom: this.options.customTooltips
						}).draw();

					} else {
						each(ChartElements, function(Element) {
							var tooltipPosition = Element.tooltipPosition();
							new Chart.Tooltip({
								x: Math.round(tooltipPosition.x),
								y: Math.round(tooltipPosition.y),
								xPadding: this.options.tooltipXPadding,
								yPadding: this.options.tooltipYPadding,
								fillColor: this.options.tooltipFillColor,
								textColor: this.options.tooltipFontColor,
								fontFamily: this.options.tooltipFontFamily,
								fontStyle: this.options.tooltipFontStyle,
								fontSize: this.options.tooltipFontSize,
								caretHeight: this.options.tooltipCaretSize,
								cornerRadius: this.options.tooltipCornerRadius,
								text: template(this.options.tooltipTemplate, Element),
								chart: this.chart,
								custom: this.options.customTooltips
							}).draw();
						}, this);
					}
				}
				return this;
			},
			toBase64Image : function(){
				return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
			}
		});

		Chart.Type.extend = function(extensions){

			var parent = this;

			var ChartType = function(){
				return parent.apply(this,arguments);
			};

			//Copy the prototype object of the this class
			ChartType.prototype = clone(parent.prototype);
			//Now overwrite some of the properties in the base class with the new extensions
			extend(ChartType.prototype, extensions);

			ChartType.extend = Chart.Type.extend;

			if (extensions.name || parent.prototype.name){

				var chartName = extensions.name || parent.prototype.name;
				//Assign any potential default values of the new chart type

				//If none are defined, we'll use a clone of the chart type this is being extended from.
				//I.e. if we extend a line chart, we'll use the defaults from the line chart if our new chart
				//doesn't define some defaults of their own.

				var baseDefaults = (Chart.defaults[parent.prototype.name]) ? clone(Chart.defaults[parent.prototype.name]) : {};

				Chart.defaults[chartName] = extend(baseDefaults,extensions.defaults);

				Chart.types[chartName] = ChartType;

				//Register this new chart type in the Chart prototype
				Chart.prototype[chartName] = function(data,options){
					var config = merge(Chart.defaults.global, Chart.defaults[chartName], options || {});
					return new ChartType(data,config,this);
				};
			} else{
				warn("Name not provided for this chart, so it hasn't been registered");
			}
			return parent;
		};

		Chart.Element = function(configuration){
			extend(this,configuration);
			this.initialize.apply(this,arguments);
			this.save();
		};
		extend(Chart.Element.prototype,{
			initialize : function(){},
			restore : function(props){
				if (!props){
					extend(this,this._saved);
				} else {
					each(props,function(key){
						this[key] = this._saved[key];
					},this);
				}
				return this;
			},
			save : function(){
				this._saved = clone(this);
				delete this._saved._saved;
				return this;
			},
			update : function(newProps){
				each(newProps,function(value,key){
					this._saved[key] = this[key];
					this[key] = value;
				},this);
				return this;
			},
			transition : function(props,ease){
				each(props,function(value,key){
					this[key] = ((value - this._saved[key]) * ease) + this._saved[key];
				},this);
				return this;
			},
			tooltipPosition : function(){
				return {
					x : this.x,
					y : this.y
				};
			},
			hasValue: function(){
				return isNumber(this.value);
			}
		});

		Chart.Element.extend = inherits;


		Chart.Point = Chart.Element.extend({
			display: true,
			inRange: function(chartX,chartY){
				var hitDetectionRange = this.hitDetectionRadius + this.radius;
				return ((Math.pow(chartX-this.x, 2)+Math.pow(chartY-this.y, 2)) < Math.pow(hitDetectionRange,2));
			},
			draw : function(){
				if (this.display){
					var ctx = this.ctx;
					ctx.beginPath();

					ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
					ctx.closePath();

					ctx.strokeStyle = this.strokeColor;
					ctx.lineWidth = this.strokeWidth;

					ctx.fillStyle = this.fillColor;

					ctx.fill();
					ctx.stroke();
				}


				//Quick debug for bezier curve splining
				//Highlights control points and the line between them.
				//Handy for dev - stripped in the min version.

				// ctx.save();
				// ctx.fillStyle = "black";
				// ctx.strokeStyle = "black"
				// ctx.beginPath();
				// ctx.arc(this.controlPoints.inner.x,this.controlPoints.inner.y, 2, 0, Math.PI*2);
				// ctx.fill();

				// ctx.beginPath();
				// ctx.arc(this.controlPoints.outer.x,this.controlPoints.outer.y, 2, 0, Math.PI*2);
				// ctx.fill();

				// ctx.moveTo(this.controlPoints.inner.x,this.controlPoints.inner.y);
				// ctx.lineTo(this.x, this.y);
				// ctx.lineTo(this.controlPoints.outer.x,this.controlPoints.outer.y);
				// ctx.stroke();

				// ctx.restore();



			}
		});

		Chart.Arc = Chart.Element.extend({
			inRange : function(chartX,chartY){

				var pointRelativePosition = helpers.getAngleFromPoint(this, {
					x: chartX,
					y: chartY
				});

				//Check if within the range of the open/close angle
				var betweenAngles = (pointRelativePosition.angle >= this.startAngle && pointRelativePosition.angle <= this.endAngle),
					withinRadius = (pointRelativePosition.distance >= this.innerRadius && pointRelativePosition.distance <= this.outerRadius);

				return (betweenAngles && withinRadius);
				//Ensure within the outside of the arc centre, but inside arc outer
			},
			tooltipPosition : function(){
				var centreAngle = this.startAngle + ((this.endAngle - this.startAngle) / 2),
					rangeFromCentre = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
				return {
					x : this.x + (Math.cos(centreAngle) * rangeFromCentre),
					y : this.y + (Math.sin(centreAngle) * rangeFromCentre)
				};
			},
			draw : function(animationPercent){

				var easingDecimal = animationPercent || 1;

				var ctx = this.ctx;

				ctx.beginPath();

				ctx.arc(this.x, this.y, this.outerRadius, this.startAngle, this.endAngle);

				ctx.arc(this.x, this.y, this.innerRadius, this.endAngle, this.startAngle, true);

				ctx.closePath();
				ctx.strokeStyle = this.strokeColor;
				ctx.lineWidth = this.strokeWidth;

				ctx.fillStyle = this.fillColor;

				ctx.fill();
				ctx.lineJoin = 'bevel';

				if (this.showStroke){
					ctx.stroke();
				}
			}
		});

		Chart.Rectangle = Chart.Element.extend({
			draw : function(){
				var ctx = this.ctx,
					halfWidth = this.width/2,
					leftX = this.x - halfWidth,
					rightX = this.x + halfWidth,
					top = this.base - (this.base - this.y),
					halfStroke = this.strokeWidth / 2;

				// Canvas doesn't allow us to stroke inside the width so we can
				// adjust the sizes to fit if we're setting a stroke on the line
				if (this.showStroke){
					leftX += halfStroke;
					rightX -= halfStroke;
					top += halfStroke;
				}

				ctx.beginPath();

				ctx.fillStyle = this.fillColor;
				ctx.strokeStyle = this.strokeColor;
				ctx.lineWidth = this.strokeWidth;

				// It'd be nice to keep this class totally generic to any rectangle
				// and simply specify which border to miss out.
				ctx.moveTo(leftX, this.base);
				ctx.lineTo(leftX, top);
				ctx.lineTo(rightX, top);
				ctx.lineTo(rightX, this.base);
				ctx.fill();
				if (this.showStroke){
					ctx.stroke();
				}
			},
			height : function(){
				return this.base - this.y;
			},
			inRange : function(chartX,chartY){
				return (chartX >= this.x - this.width/2 && chartX <= this.x + this.width/2) && (chartY >= this.y && chartY <= this.base);
			}
		});

		Chart.Tooltip = Chart.Element.extend({
			draw : function(){

				var ctx = this.chart.ctx;

				ctx.font = fontString(this.fontSize,this.fontStyle,this.fontFamily);

				this.xAlign = "center";
				this.yAlign = "above";

				//Distance between the actual element.y position and the start of the tooltip caret
				var caretPadding = this.caretPadding = 2;

				var tooltipWidth = ctx.measureText(this.text).width + 2*this.xPadding,
					tooltipRectHeight = this.fontSize + 2*this.yPadding,
					tooltipHeight = tooltipRectHeight + this.caretHeight + caretPadding;

				if (this.x + tooltipWidth/2 >this.chart.width){
					this.xAlign = "left";
				} else if (this.x - tooltipWidth/2 < 0){
					this.xAlign = "right";
				}

				if (this.y - tooltipHeight < 0){
					this.yAlign = "below";
				}


				var tooltipX = this.x - tooltipWidth/2,
					tooltipY = this.y - tooltipHeight;

				ctx.fillStyle = this.fillColor;

				// Custom Tooltips
				if(this.custom){
					this.custom(this);
				}
				else{
					switch(this.yAlign)
					{
					case "above":
						//Draw a caret above the x/y
						ctx.beginPath();
						ctx.moveTo(this.x,this.y - caretPadding);
						ctx.lineTo(this.x + this.caretHeight, this.y - (caretPadding + this.caretHeight));
						ctx.lineTo(this.x - this.caretHeight, this.y - (caretPadding + this.caretHeight));
						ctx.closePath();
						ctx.fill();
						break;
					case "below":
						tooltipY = this.y + caretPadding + this.caretHeight;
						//Draw a caret below the x/y
						ctx.beginPath();
						ctx.moveTo(this.x, this.y + caretPadding);
						ctx.lineTo(this.x + this.caretHeight, this.y + caretPadding + this.caretHeight);
						ctx.lineTo(this.x - this.caretHeight, this.y + caretPadding + this.caretHeight);
						ctx.closePath();
						ctx.fill();
						break;
					}

					switch(this.xAlign)
					{
					case "left":
						tooltipX = this.x - tooltipWidth + (this.cornerRadius + this.caretHeight);
						break;
					case "right":
						tooltipX = this.x - (this.cornerRadius + this.caretHeight);
						break;
					}

					drawRoundedRectangle(ctx,tooltipX,tooltipY,tooltipWidth,tooltipRectHeight,this.cornerRadius);

					ctx.fill();

					ctx.fillStyle = this.textColor;
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(this.text, tooltipX + tooltipWidth/2, tooltipY + tooltipRectHeight/2);
				}
			}
		});

		Chart.MultiTooltip = Chart.Element.extend({
			initialize : function(){
				this.font = fontString(this.fontSize,this.fontStyle,this.fontFamily);

				this.titleFont = fontString(this.titleFontSize,this.titleFontStyle,this.titleFontFamily);

				this.height = (this.labels.length * this.fontSize) + ((this.labels.length-1) * (this.fontSize/2)) + (this.yPadding*2) + this.titleFontSize *1.5;

				this.ctx.font = this.titleFont;

				var titleWidth = this.ctx.measureText(this.title).width,
					//Label has a legend square as well so account for this.
					labelWidth = longestText(this.ctx,this.font,this.labels) + this.fontSize + 3,
					longestTextWidth = max([labelWidth,titleWidth]);

				this.width = longestTextWidth + (this.xPadding*2);


				var halfHeight = this.height/2;

				//Check to ensure the height will fit on the canvas
				if (this.y - halfHeight < 0 ){
					this.y = halfHeight;
				} else if (this.y + halfHeight > this.chart.height){
					this.y = this.chart.height - halfHeight;
				}

				//Decide whether to align left or right based on position on canvas
				if (this.x > this.chart.width/2){
					this.x -= this.xOffset + this.width;
				} else {
					this.x += this.xOffset;
				}


			},
			getLineHeight : function(index){
				var baseLineHeight = this.y - (this.height/2) + this.yPadding,
					afterTitleIndex = index-1;

				//If the index is zero, we're getting the title
				if (index === 0){
					return baseLineHeight + this.titleFontSize/2;
				} else{
					return baseLineHeight + ((this.fontSize*1.5*afterTitleIndex) + this.fontSize/2) + this.titleFontSize * 1.5;
				}

			},
			draw : function(){
				// Custom Tooltips
				if(this.custom){
					this.custom(this);
				}
				else{
					drawRoundedRectangle(this.ctx,this.x,this.y - this.height/2,this.width,this.height,this.cornerRadius);
					var ctx = this.ctx;
					ctx.fillStyle = this.fillColor;
					ctx.fill();
					ctx.closePath();

					ctx.textAlign = "left";
					ctx.textBaseline = "middle";
					ctx.fillStyle = this.titleTextColor;
					ctx.font = this.titleFont;

					ctx.fillText(this.title,this.x + this.xPadding, this.getLineHeight(0));

					ctx.font = this.font;
					helpers.each(this.labels,function(label,index){
						ctx.fillStyle = this.textColor;
						ctx.fillText(label,this.x + this.xPadding + this.fontSize + 3, this.getLineHeight(index + 1));

						//A bit gnarly, but clearing this rectangle breaks when using explorercanvas (clears whole canvas)
						//ctx.clearRect(this.x + this.xPadding, this.getLineHeight(index + 1) - this.fontSize/2, this.fontSize, this.fontSize);
						//Instead we'll make a white filled block to put the legendColour palette over.

						ctx.fillStyle = this.legendColorBackground;
						ctx.fillRect(this.x + this.xPadding, this.getLineHeight(index + 1) - this.fontSize/2, this.fontSize, this.fontSize);

						ctx.fillStyle = this.legendColors[index].fill;
						ctx.fillRect(this.x + this.xPadding, this.getLineHeight(index + 1) - this.fontSize/2, this.fontSize, this.fontSize);


					},this);
				}
			}
		});

		Chart.Scale = Chart.Element.extend({
			initialize : function(){
				this.fit();
			},
			buildYLabels : function(){
				this.yLabels = [];

				var stepDecimalPlaces = getDecimalPlaces(this.stepValue);

				for (var i=0; i<=this.steps; i++){
					this.yLabels.push(template(this.templateString,{value:(this.min + (i * this.stepValue)).toFixed(stepDecimalPlaces)}));
				}
				this.yLabelWidth = (this.display && this.showLabels) ? longestText(this.ctx,this.font,this.yLabels) : 0;
			},
			addXLabel : function(label){
				this.xLabels.push(label);
				this.valuesCount++;
				this.fit();
			},
			removeXLabel : function(){
				this.xLabels.shift();
				this.valuesCount--;
				this.fit();
			},
			// Fitting loop to rotate x Labels and figure out what fits there, and also calculate how many Y steps to use
			fit: function(){
				// First we need the width of the yLabels, assuming the xLabels aren't rotated

				// To do that we need the base line at the top and base of the chart, assuming there is no x label rotation
				this.startPoint = (this.display) ? this.fontSize : 0;
				this.endPoint = (this.display) ? this.height - (this.fontSize * 1.5) - 5 : this.height; // -5 to pad labels

				// Apply padding settings to the start and end point.
				this.startPoint += this.padding;
				this.endPoint -= this.padding;

				// Cache the starting height, so can determine if we need to recalculate the scale yAxis
				var cachedHeight = this.endPoint - this.startPoint,
					cachedYLabelWidth;

				// Build the current yLabels so we have an idea of what size they'll be to start
				/*
				 *	This sets what is returned from calculateScaleRange as static properties of this class:
				 *
					this.steps;
					this.stepValue;
					this.min;
					this.max;
				 *
				 */
				this.calculateYRange(cachedHeight);

				// With these properties set we can now build the array of yLabels
				// and also the width of the largest yLabel
				this.buildYLabels();

				this.calculateXLabelRotation();

				while((cachedHeight > this.endPoint - this.startPoint)){
					cachedHeight = this.endPoint - this.startPoint;
					cachedYLabelWidth = this.yLabelWidth;

					this.calculateYRange(cachedHeight);
					this.buildYLabels();

					// Only go through the xLabel loop again if the yLabel width has changed
					if (cachedYLabelWidth < this.yLabelWidth){
						this.calculateXLabelRotation();
					}
				}

			},
			calculateXLabelRotation : function(){
				//Get the width of each grid by calculating the difference
				//between x offsets between 0 and 1.

				this.ctx.font = this.font;

				var firstWidth = this.ctx.measureText(this.xLabels[0]).width,
					lastWidth = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width,
					firstRotated,
					lastRotated;


				this.xScalePaddingRight = lastWidth/2 + 3;
				this.xScalePaddingLeft = (firstWidth/2 > this.yLabelWidth + 10) ? firstWidth/2 : this.yLabelWidth + 10;

				this.xLabelRotation = 0;
				if (this.display){
					var originalLabelWidth = longestText(this.ctx,this.font,this.xLabels),
						cosRotation,
						firstRotatedWidth;
					this.xLabelWidth = originalLabelWidth;
					//Allow 3 pixels x2 padding either side for label readability
					var xGridWidth = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6;

					//Max label rotate should be 90 - also act as a loop counter
					while ((this.xLabelWidth > xGridWidth && this.xLabelRotation === 0) || (this.xLabelWidth > xGridWidth && this.xLabelRotation <= 90 && this.xLabelRotation > 0)){
						cosRotation = Math.cos(toRadians(this.xLabelRotation));

						firstRotated = cosRotation * firstWidth;
						lastRotated = cosRotation * lastWidth;

						// We're right aligning the text now.
						if (firstRotated + this.fontSize / 2 > this.yLabelWidth + 8){
							this.xScalePaddingLeft = firstRotated + this.fontSize / 2;
						}
						this.xScalePaddingRight = this.fontSize/2;


						this.xLabelRotation++;
						this.xLabelWidth = cosRotation * originalLabelWidth;

					}
					if (this.xLabelRotation > 0){
						this.endPoint -= Math.sin(toRadians(this.xLabelRotation))*originalLabelWidth + 3;
					}
				}
				else{
					this.xLabelWidth = 0;
					this.xScalePaddingRight = this.padding;
					this.xScalePaddingLeft = this.padding;
				}

			},
			// Needs to be overidden in each Chart type
			// Otherwise we need to pass all the data into the scale class
			calculateYRange: noop,
			drawingArea: function(){
				return this.startPoint - this.endPoint;
			},
			calculateY : function(value){
				var scalingFactor = this.drawingArea() / (this.min - this.max);
				return this.endPoint - (scalingFactor * (value - this.min));
			},
			calculateX : function(index){
				var isRotated = (this.xLabelRotation > 0),
					// innerWidth = (this.offsetGridLines) ? this.width - offsetLeft - this.padding : this.width - (offsetLeft + halfLabelWidth * 2) - this.padding,
					innerWidth = this.width - (this.xScalePaddingLeft + this.xScalePaddingRight),
					valueWidth = innerWidth/Math.max((this.valuesCount - ((this.offsetGridLines) ? 0 : 1)), 1),
					valueOffset = (valueWidth * index) + this.xScalePaddingLeft;

				if (this.offsetGridLines){
					valueOffset += (valueWidth/2);
				}

				return Math.round(valueOffset);
			},
			update : function(newProps){
				helpers.extend(this, newProps);
				this.fit();
			},
			draw : function(){
				var ctx = this.ctx,
					yLabelGap = (this.endPoint - this.startPoint) / this.steps,
					xStart = Math.round(this.xScalePaddingLeft);
				if (this.display){
					ctx.fillStyle = this.textColor;
					ctx.font = this.font;
					each(this.yLabels,function(labelString,index){
						var yLabelCenter = this.endPoint - (yLabelGap * index),
							linePositionY = Math.round(yLabelCenter),
							drawHorizontalLine = this.showHorizontalLines;

						ctx.textAlign = "right";
						ctx.textBaseline = "middle";
						if (this.showLabels){
							ctx.fillText(labelString,xStart - 10,yLabelCenter);
						}

						// This is X axis, so draw it
						if (index === 0 && !drawHorizontalLine){
							drawHorizontalLine = true;
						}

						if (drawHorizontalLine){
							ctx.beginPath();
						}

						if (index > 0){
							// This is a grid line in the centre, so drop that
							ctx.lineWidth = this.gridLineWidth;
							ctx.strokeStyle = this.gridLineColor;
						} else {
							// This is the first line on the scale
							ctx.lineWidth = this.lineWidth;
							ctx.strokeStyle = this.lineColor;
						}

						linePositionY += helpers.aliasPixel(ctx.lineWidth);

						if(drawHorizontalLine){
							ctx.moveTo(xStart, linePositionY);
							ctx.lineTo(this.width, linePositionY);
							ctx.stroke();
							ctx.closePath();
						}

						ctx.lineWidth = this.lineWidth;
						ctx.strokeStyle = this.lineColor;
						ctx.beginPath();
						ctx.moveTo(xStart - 5, linePositionY);
						ctx.lineTo(xStart, linePositionY);
						ctx.stroke();
						ctx.closePath();

					},this);

					each(this.xLabels,function(label,index){
						var xPos = this.calculateX(index) + aliasPixel(this.lineWidth),
							// Check to see if line/bar here and decide where to place the line
							linePos = this.calculateX(index - (this.offsetGridLines ? 0.5 : 0)) + aliasPixel(this.lineWidth),
							isRotated = (this.xLabelRotation > 0),
							drawVerticalLine = this.showVerticalLines;

						// This is Y axis, so draw it
						if (index === 0 && !drawVerticalLine){
							drawVerticalLine = true;
						}

						if (drawVerticalLine){
							ctx.beginPath();
						}

						if (index > 0){
							// This is a grid line in the centre, so drop that
							ctx.lineWidth = this.gridLineWidth;
							ctx.strokeStyle = this.gridLineColor;
						} else {
							// This is the first line on the scale
							ctx.lineWidth = this.lineWidth;
							ctx.strokeStyle = this.lineColor;
						}

						if (drawVerticalLine){
							ctx.moveTo(linePos,this.endPoint);
							ctx.lineTo(linePos,this.startPoint - 3);
							ctx.stroke();
							ctx.closePath();
						}


						ctx.lineWidth = this.lineWidth;
						ctx.strokeStyle = this.lineColor;


						// Small lines at the bottom of the base grid line
						ctx.beginPath();
						ctx.moveTo(linePos,this.endPoint);
						ctx.lineTo(linePos,this.endPoint + 5);
						ctx.stroke();
						ctx.closePath();

						ctx.save();
						ctx.translate(xPos,(isRotated) ? this.endPoint + 12 : this.endPoint + 8);
						ctx.rotate(toRadians(this.xLabelRotation)*-1);
						ctx.font = this.font;
						ctx.textAlign = (isRotated) ? "right" : "center";
						ctx.textBaseline = (isRotated) ? "middle" : "top";
						ctx.fillText(label, 0, 0);
						ctx.restore();
					},this);

				}
			}

		});

		Chart.RadialScale = Chart.Element.extend({
			initialize: function(){
				this.size = min([this.height, this.width]);
				this.drawingArea = (this.display) ? (this.size/2) - (this.fontSize/2 + this.backdropPaddingY) : (this.size/2);
			},
			calculateCenterOffset: function(value){
				// Take into account half font size + the yPadding of the top value
				var scalingFactor = this.drawingArea / (this.max - this.min);

				return (value - this.min) * scalingFactor;
			},
			update : function(){
				if (!this.lineArc){
					this.setScaleSize();
				} else {
					this.drawingArea = (this.display) ? (this.size/2) - (this.fontSize/2 + this.backdropPaddingY) : (this.size/2);
				}
				this.buildYLabels();
			},
			buildYLabels: function(){
				this.yLabels = [];

				var stepDecimalPlaces = getDecimalPlaces(this.stepValue);

				for (var i=0; i<=this.steps; i++){
					this.yLabels.push(template(this.templateString,{value:(this.min + (i * this.stepValue)).toFixed(stepDecimalPlaces)}));
				}
			},
			getCircumference : function(){
				return ((Math.PI*2) / this.valuesCount);
			},
			setScaleSize: function(){
				/*
				 * Right, this is really confusing and there is a lot of maths going on here
				 * The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
				 *
				 * Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
				 *
				 * Solution:
				 *
				 * We assume the radius of the polygon is half the size of the canvas at first
				 * at each index we check if the text overlaps.
				 *
				 * Where it does, we store that angle and that index.
				 *
				 * After finding the largest index and angle we calculate how much we need to remove
				 * from the shape radius to move the point inwards by that x.
				 *
				 * We average the left and right distances to get the maximum shape radius that can fit in the box
				 * along with labels.
				 *
				 * Once we have that, we can find the centre point for the chart, by taking the x text protrusion
				 * on each side, removing that from the size, halving it and adding the left x protrusion width.
				 *
				 * This will mean we have a shape fitted to the canvas, as large as it can be with the labels
				 * and position it in the most space efficient manner
				 *
				 * https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif
				 */


				// Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
				// Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
				var largestPossibleRadius = min([(this.height/2 - this.pointLabelFontSize - 5), this.width/2]),
					pointPosition,
					i,
					textWidth,
					halfTextWidth,
					furthestRight = this.width,
					furthestRightIndex,
					furthestRightAngle,
					furthestLeft = 0,
					furthestLeftIndex,
					furthestLeftAngle,
					xProtrusionLeft,
					xProtrusionRight,
					radiusReductionRight,
					radiusReductionLeft,
					maxWidthRadius;
				this.ctx.font = fontString(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily);
				for (i=0;i<this.valuesCount;i++){
					// 5px to space the text slightly out - similar to what we do in the draw function.
					pointPosition = this.getPointPosition(i, largestPossibleRadius);
					textWidth = this.ctx.measureText(template(this.templateString, { value: this.labels[i] })).width + 5;
					if (i === 0 || i === this.valuesCount/2){
						// If we're at index zero, or exactly the middle, we're at exactly the top/bottom
						// of the radar chart, so text will be aligned centrally, so we'll half it and compare
						// w/left and right text sizes
						halfTextWidth = textWidth/2;
						if (pointPosition.x + halfTextWidth > furthestRight) {
							furthestRight = pointPosition.x + halfTextWidth;
							furthestRightIndex = i;
						}
						if (pointPosition.x - halfTextWidth < furthestLeft) {
							furthestLeft = pointPosition.x - halfTextWidth;
							furthestLeftIndex = i;
						}
					}
					else if (i < this.valuesCount/2) {
						// Less than half the values means we'll left align the text
						if (pointPosition.x + textWidth > furthestRight) {
							furthestRight = pointPosition.x + textWidth;
							furthestRightIndex = i;
						}
					}
					else if (i > this.valuesCount/2){
						// More than half the values means we'll right align the text
						if (pointPosition.x - textWidth < furthestLeft) {
							furthestLeft = pointPosition.x - textWidth;
							furthestLeftIndex = i;
						}
					}
				}

				xProtrusionLeft = furthestLeft;

				xProtrusionRight = Math.ceil(furthestRight - this.width);

				furthestRightAngle = this.getIndexAngle(furthestRightIndex);

				furthestLeftAngle = this.getIndexAngle(furthestLeftIndex);

				radiusReductionRight = xProtrusionRight / Math.sin(furthestRightAngle + Math.PI/2);

				radiusReductionLeft = xProtrusionLeft / Math.sin(furthestLeftAngle + Math.PI/2);

				// Ensure we actually need to reduce the size of the chart
				radiusReductionRight = (isNumber(radiusReductionRight)) ? radiusReductionRight : 0;
				radiusReductionLeft = (isNumber(radiusReductionLeft)) ? radiusReductionLeft : 0;

				this.drawingArea = largestPossibleRadius - (radiusReductionLeft + radiusReductionRight)/2;

				//this.drawingArea = min([maxWidthRadius, (this.height - (2 * (this.pointLabelFontSize + 5)))/2])
				this.setCenterPoint(radiusReductionLeft, radiusReductionRight);

			},
			setCenterPoint: function(leftMovement, rightMovement){

				var maxRight = this.width - rightMovement - this.drawingArea,
					maxLeft = leftMovement + this.drawingArea;

				this.xCenter = (maxLeft + maxRight)/2;
				// Always vertically in the centre as the text height doesn't change
				this.yCenter = (this.height/2);
			},

			getIndexAngle : function(index){
				var angleMultiplier = (Math.PI * 2) / this.valuesCount;
				// Start from the top instead of right, so remove a quarter of the circle

				return index * angleMultiplier - (Math.PI/2);
			},
			getPointPosition : function(index, distanceFromCenter){
				var thisAngle = this.getIndexAngle(index);
				return {
					x : (Math.cos(thisAngle) * distanceFromCenter) + this.xCenter,
					y : (Math.sin(thisAngle) * distanceFromCenter) + this.yCenter
				};
			},
			draw: function(){
				if (this.display){
					var ctx = this.ctx;
					each(this.yLabels, function(label, index){
						// Don't draw a centre value
						if (index > 0){
							var yCenterOffset = index * (this.drawingArea/this.steps),
								yHeight = this.yCenter - yCenterOffset,
								pointPosition;

							// Draw circular lines around the scale
							if (this.lineWidth > 0){
								ctx.strokeStyle = this.lineColor;
								ctx.lineWidth = this.lineWidth;

								if(this.lineArc){
									ctx.beginPath();
									ctx.arc(this.xCenter, this.yCenter, yCenterOffset, 0, Math.PI*2);
									ctx.closePath();
									ctx.stroke();
								} else{
									ctx.beginPath();
									for (var i=0;i<this.valuesCount;i++)
									{
										pointPosition = this.getPointPosition(i, this.calculateCenterOffset(this.min + (index * this.stepValue)));
										if (i === 0){
											ctx.moveTo(pointPosition.x, pointPosition.y);
										} else {
											ctx.lineTo(pointPosition.x, pointPosition.y);
										}
									}
									ctx.closePath();
									ctx.stroke();
								}
							}
							if(this.showLabels){
								ctx.font = fontString(this.fontSize,this.fontStyle,this.fontFamily);
								if (this.showLabelBackdrop){
									var labelWidth = ctx.measureText(label).width;
									ctx.fillStyle = this.backdropColor;
									ctx.fillRect(
										this.xCenter - labelWidth/2 - this.backdropPaddingX,
										yHeight - this.fontSize/2 - this.backdropPaddingY,
										labelWidth + this.backdropPaddingX*2,
										this.fontSize + this.backdropPaddingY*2
									);
								}
								ctx.textAlign = 'center';
								ctx.textBaseline = "middle";
								ctx.fillStyle = this.fontColor;
								ctx.fillText(label, this.xCenter, yHeight);
							}
						}
					}, this);

					if (!this.lineArc){
						ctx.lineWidth = this.angleLineWidth;
						ctx.strokeStyle = this.angleLineColor;
						for (var i = this.valuesCount - 1; i >= 0; i--) {
							if (this.angleLineWidth > 0){
								var outerPosition = this.getPointPosition(i, this.calculateCenterOffset(this.max));
								ctx.beginPath();
								ctx.moveTo(this.xCenter, this.yCenter);
								ctx.lineTo(outerPosition.x, outerPosition.y);
								ctx.stroke();
								ctx.closePath();
							}
							// Extra 3px out for some label spacing
							var pointLabelPosition = this.getPointPosition(i, this.calculateCenterOffset(this.max) + 5);
							ctx.font = fontString(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily);
							ctx.fillStyle = this.pointLabelFontColor;

							var labelsCount = this.labels.length,
								halfLabelsCount = this.labels.length/2,
								quarterLabelsCount = halfLabelsCount/2,
								upperHalf = (i < quarterLabelsCount || i > labelsCount - quarterLabelsCount),
								exactQuarter = (i === quarterLabelsCount || i === labelsCount - quarterLabelsCount);
							if (i === 0){
								ctx.textAlign = 'center';
							} else if(i === halfLabelsCount){
								ctx.textAlign = 'center';
							} else if (i < halfLabelsCount){
								ctx.textAlign = 'left';
							} else {
								ctx.textAlign = 'right';
							}

							// Set the correct text baseline based on outer positioning
							if (exactQuarter){
								ctx.textBaseline = 'middle';
							} else if (upperHalf){
								ctx.textBaseline = 'bottom';
							} else {
								ctx.textBaseline = 'top';
							}

							ctx.fillText(this.labels[i], pointLabelPosition.x, pointLabelPosition.y);
						}
					}
				}
			}
		});

		// Attach global event to resize each chart instance when the browser resizes
		helpers.addEvent(window, "resize", (function(){
			// Basic debounce of resize function so it doesn't hurt performance when resizing browser.
			var timeout;
			return function(){
				clearTimeout(timeout);
				timeout = setTimeout(function(){
					each(Chart.instances,function(instance){
						// If the responsive flag is set in the chart instance config
						// Cascade the resize event down to the chart.
						if (instance.options.responsive){
							instance.resize(instance.render, true);
						}
					});
				}, 50);
			};
		})());


		if (amd) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
				return Chart;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module === 'object' && module.exports) {
			module.exports = Chart;
		}

		root.Chart = Chart;

		Chart.noConflict = function(){
			root.Chart = previous;
			return Chart;
		};

	}).call(this);

	(function(){
		"use strict";

		var root = this,
			Chart = root.Chart,
			helpers = Chart.helpers;


		var defaultConfig = {
			//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
			scaleBeginAtZero : true,

			//Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines : true,

			//String - Colour of the grid lines
			scaleGridLineColor : "rgba(0,0,0,.05)",

			//Number - Width of the grid lines
			scaleGridLineWidth : 1,

			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,

			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,

			//Boolean - If there is a stroke on each bar
			barShowStroke : true,

			//Number - Pixel width of the bar stroke
			barStrokeWidth : 2,

			//Number - Spacing between each of the X value sets
			barValueSpacing : 5,

			//Number - Spacing between data sets within X values
			barDatasetSpacing : 1,

			//String - A legend template
			legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

		};


		Chart.Type.extend({
			name: "Bar",
			defaults : defaultConfig,
			initialize:  function(data){

				//Expose options as a scope variable here so we can access it in the ScaleClass
				var options = this.options;

				this.ScaleClass = Chart.Scale.extend({
					offsetGridLines : true,
					calculateBarX : function(datasetCount, datasetIndex, barIndex){
						//Reusable method for calculating the xPosition of a given bar based on datasetIndex & width of the bar
						var xWidth = this.calculateBaseWidth(),
							xAbsolute = this.calculateX(barIndex) - (xWidth/2),
							barWidth = this.calculateBarWidth(datasetCount);

						return xAbsolute + (barWidth * datasetIndex) + (datasetIndex * options.barDatasetSpacing) + barWidth/2;
					},
					calculateBaseWidth : function(){
						return (this.calculateX(1) - this.calculateX(0)) - (2*options.barValueSpacing);
					},
					calculateBarWidth : function(datasetCount){
						//The padding between datasets is to the right of each bar, providing that there are more than 1 dataset
						var baseWidth = this.calculateBaseWidth() - ((datasetCount - 1) * options.barDatasetSpacing);

						return (baseWidth / datasetCount);
					}
				});

				this.datasets = [];

				//Set up tooltip events on the chart
				if (this.options.showTooltips){
					helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
						var activeBars = (evt.type !== 'mouseout') ? this.getBarsAtEvent(evt) : [];

						this.eachBars(function(bar){
							bar.restore(['fillColor', 'strokeColor']);
						});
						helpers.each(activeBars, function(activeBar){
							activeBar.fillColor = activeBar.highlightFill;
							activeBar.strokeColor = activeBar.highlightStroke;
						});
						this.showTooltip(activeBars);
					});
				}

				//Declare the extension of the default point, to cater for the options passed in to the constructor
				this.BarClass = Chart.Rectangle.extend({
					strokeWidth : this.options.barStrokeWidth,
					showStroke : this.options.barShowStroke,
					ctx : this.chart.ctx
				});

				//Iterate through each of the datasets, and build this into a property of the chart
				helpers.each(data.datasets,function(dataset,datasetIndex){

					var datasetObject = {
						label : dataset.label || null,
						fillColor : dataset.fillColor,
						strokeColor : dataset.strokeColor,
						bars : []
					};

					this.datasets.push(datasetObject);

					helpers.each(dataset.data,function(dataPoint,index){
						//Add a new point for each piece of data, passing any required data to draw.
						datasetObject.bars.push(new this.BarClass({
							value : dataPoint,
							label : data.labels[index],
							datasetLabel: dataset.label,
							strokeColor : dataset.strokeColor,
							fillColor : dataset.fillColor,
							highlightFill : dataset.highlightFill || dataset.fillColor,
							highlightStroke : dataset.highlightStroke || dataset.strokeColor
						}));
					},this);

				},this);

				this.buildScale(data.labels);

				this.BarClass.prototype.base = this.scale.endPoint;

				this.eachBars(function(bar, index, datasetIndex){
					helpers.extend(bar, {
						width : this.scale.calculateBarWidth(this.datasets.length),
						x: this.scale.calculateBarX(this.datasets.length, datasetIndex, index),
						y: this.scale.endPoint
					});
					bar.save();
				}, this);

				this.render();
			},
			update : function(){
				this.scale.update();
				// Reset any highlight colours before updating.
				helpers.each(this.activeElements, function(activeElement){
					activeElement.restore(['fillColor', 'strokeColor']);
				});

				this.eachBars(function(bar){
					bar.save();
				});
				this.render();
			},
			eachBars : function(callback){
				helpers.each(this.datasets,function(dataset, datasetIndex){
					helpers.each(dataset.bars, callback, this, datasetIndex);
				},this);
			},
			getBarsAtEvent : function(e){
				var barsArray = [],
					eventPosition = helpers.getRelativePosition(e),
					datasetIterator = function(dataset){
						barsArray.push(dataset.bars[barIndex]);
					},
					barIndex;

				for (var datasetIndex = 0; datasetIndex < this.datasets.length; datasetIndex++) {
					for (barIndex = 0; barIndex < this.datasets[datasetIndex].bars.length; barIndex++) {
						if (this.datasets[datasetIndex].bars[barIndex].inRange(eventPosition.x,eventPosition.y)){
							helpers.each(this.datasets, datasetIterator);
							return barsArray;
						}
					}
				}

				return barsArray;
			},
			buildScale : function(labels){
				var self = this;

				var dataTotal = function(){
					var values = [];
					self.eachBars(function(bar){
						values.push(bar.value);
					});
					return values;
				};

				var scaleOptions = {
					templateString : this.options.scaleLabel,
					height : this.chart.height,
					width : this.chart.width,
					ctx : this.chart.ctx,
					textColor : this.options.scaleFontColor,
					fontSize : this.options.scaleFontSize,
					fontStyle : this.options.scaleFontStyle,
					fontFamily : this.options.scaleFontFamily,
					valuesCount : labels.length,
					beginAtZero : this.options.scaleBeginAtZero,
					integersOnly : this.options.scaleIntegersOnly,
					calculateYRange: function(currentHeight){
						var updatedRanges = helpers.calculateScaleRange(
							dataTotal(),
							currentHeight,
							this.fontSize,
							this.beginAtZero,
							this.integersOnly
						);
						helpers.extend(this, updatedRanges);
					},
					xLabels : labels,
					font : helpers.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
					lineWidth : this.options.scaleLineWidth,
					lineColor : this.options.scaleLineColor,
					showHorizontalLines : this.options.scaleShowHorizontalLines,
					showVerticalLines : this.options.scaleShowVerticalLines,
					gridLineWidth : (this.options.scaleShowGridLines) ? this.options.scaleGridLineWidth : 0,
					gridLineColor : (this.options.scaleShowGridLines) ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
					padding : (this.options.showScale) ? 0 : (this.options.barShowStroke) ? this.options.barStrokeWidth : 0,
					showLabels : this.options.scaleShowLabels,
					display : this.options.showScale
				};

				if (this.options.scaleOverride){
					helpers.extend(scaleOptions, {
						calculateYRange: helpers.noop,
						steps: this.options.scaleSteps,
						stepValue: this.options.scaleStepWidth,
						min: this.options.scaleStartValue,
						max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
					});
				}

				this.scale = new this.ScaleClass(scaleOptions);
			},
			addData : function(valuesArray,label){
				//Map the values array for each of the datasets
				helpers.each(valuesArray,function(value,datasetIndex){
					//Add a new point for each piece of data, passing any required data to draw.
					this.datasets[datasetIndex].bars.push(new this.BarClass({
						value : value,
						label : label,
						x: this.scale.calculateBarX(this.datasets.length, datasetIndex, this.scale.valuesCount+1),
						y: this.scale.endPoint,
						width : this.scale.calculateBarWidth(this.datasets.length),
						base : this.scale.endPoint,
						strokeColor : this.datasets[datasetIndex].strokeColor,
						fillColor : this.datasets[datasetIndex].fillColor
					}));
				},this);

				this.scale.addXLabel(label);
				//Then re-render the chart.
				this.update();
			},
			removeData : function(){
				this.scale.removeXLabel();
				//Then re-render the chart.
				helpers.each(this.datasets,function(dataset){
					dataset.bars.shift();
				},this);
				this.update();
			},
			reflow : function(){
				helpers.extend(this.BarClass.prototype,{
					y: this.scale.endPoint,
					base : this.scale.endPoint
				});
				var newScaleProps = helpers.extend({
					height : this.chart.height,
					width : this.chart.width
				});
				this.scale.update(newScaleProps);
			},
			draw : function(ease){
				var easingDecimal = ease || 1;
				this.clear();

				var ctx = this.chart.ctx;

				this.scale.draw(easingDecimal);

				//Draw all the bars for each dataset
				helpers.each(this.datasets,function(dataset,datasetIndex){
					helpers.each(dataset.bars,function(bar,index){
						if (bar.hasValue()){
							bar.base = this.scale.endPoint;
							//Transition then draw
							bar.transition({
								x : this.scale.calculateBarX(this.datasets.length, datasetIndex, index),
								y : this.scale.calculateY(bar.value),
								width : this.scale.calculateBarWidth(this.datasets.length)
							}, easingDecimal).draw();
						}
					},this);

				},this);
			}
		});


	}).call(this);

	(function(){
		"use strict";

		var root = this,
			Chart = root.Chart,
			//Cache a local reference to Chart.helpers
			helpers = Chart.helpers;

		var defaultConfig = {
			//Boolean - Whether we should show a stroke on each segment
			segmentShowStroke : true,

			//String - The colour of each segment stroke
			segmentStrokeColor : "#fff",

			//Number - The width of each segment stroke
			segmentStrokeWidth : 2,

			//The percentage of the chart that we cut out of the middle.
			percentageInnerCutout : 50,

			//Number - Amount of animation steps
			animationSteps : 100,

			//String - Animation easing effect
			animationEasing : "easeOutBounce",

			//Boolean - Whether we animate the rotation of the Doughnut
			animateRotate : true,

			//Boolean - Whether we animate scaling the Doughnut from the centre
			animateScale : false,

			//String - A legend template
			legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

		};


		Chart.Type.extend({
			//Passing in a name registers this chart in the Chart namespace
			name: "Doughnut",
			//Providing a defaults will also register the deafults in the chart namespace
			defaults : defaultConfig,
			//Initialize is fired when the chart is initialized - Data is passed in as a parameter
			//Config is automatically merged by the core of Chart.js, and is available at this.options
			initialize:  function(data){

				//Declare segments as a static property to prevent inheriting across the Chart type prototype
				this.segments = [];
				this.outerRadius = (helpers.min([this.chart.width,this.chart.height]) -	this.options.segmentStrokeWidth/2)/2;

				this.SegmentArc = Chart.Arc.extend({
					ctx : this.chart.ctx,
					x : this.chart.width/2,
					y : this.chart.height/2
				});

				//Set up tooltip events on the chart
				if (this.options.showTooltips){
					helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
						var activeSegments = (evt.type !== 'mouseout') ? this.getSegmentsAtEvent(evt) : [];

						helpers.each(this.segments,function(segment){
							segment.restore(["fillColor"]);
						});
						helpers.each(activeSegments,function(activeSegment){
							activeSegment.fillColor = activeSegment.highlightColor;
						});
						this.showTooltip(activeSegments);
					});
				}
				this.calculateTotal(data);

				helpers.each(data,function(datapoint, index){
					this.addData(datapoint, index, true);
				},this);

				this.render();
			},
			getSegmentsAtEvent : function(e){
				var segmentsArray = [];

				var location = helpers.getRelativePosition(e);

				helpers.each(this.segments,function(segment){
					if (segment.inRange(location.x,location.y)) segmentsArray.push(segment);
				},this);
				return segmentsArray;
			},
			addData : function(segment, atIndex, silent){
				var index = atIndex || this.segments.length;
				this.segments.splice(index, 0, new this.SegmentArc({
					value : segment.value,
					outerRadius : (this.options.animateScale) ? 0 : this.outerRadius,
					innerRadius : (this.options.animateScale) ? 0 : (this.outerRadius/100) * this.options.percentageInnerCutout,
					fillColor : segment.color,
					highlightColor : segment.highlight || segment.color,
					showStroke : this.options.segmentShowStroke,
					strokeWidth : this.options.segmentStrokeWidth,
					strokeColor : this.options.segmentStrokeColor,
					startAngle : Math.PI * 1.5,
					circumference : (this.options.animateRotate) ? 0 : this.calculateCircumference(segment.value),
					label : segment.label
				}));
				if (!silent){
					this.reflow();
					this.update();
				}
			},
			calculateCircumference : function(value){
				return (Math.PI*2)*(Math.abs(value) / this.total);
			},
			calculateTotal : function(data){
				this.total = 0;
				helpers.each(data,function(segment){
					this.total += Math.abs(segment.value);
				},this);
			},
			update : function(){
				this.calculateTotal(this.segments);

				// Reset any highlight colours before updating.
				helpers.each(this.activeElements, function(activeElement){
					activeElement.restore(['fillColor']);
				});

				helpers.each(this.segments,function(segment){
					segment.save();
				});
				this.render();
			},

			removeData: function(atIndex){
				var indexToDelete = (helpers.isNumber(atIndex)) ? atIndex : this.segments.length-1;
				this.segments.splice(indexToDelete, 1);
				this.reflow();
				this.update();
			},

			reflow : function(){
				helpers.extend(this.SegmentArc.prototype,{
					x : this.chart.width/2,
					y : this.chart.height/2
				});
				this.outerRadius = (helpers.min([this.chart.width,this.chart.height]) -	this.options.segmentStrokeWidth/2)/2;
				helpers.each(this.segments, function(segment){
					segment.update({
						outerRadius : this.outerRadius,
						innerRadius : (this.outerRadius/100) * this.options.percentageInnerCutout
					});
				}, this);
			},
			draw : function(easeDecimal){
				var animDecimal = (easeDecimal) ? easeDecimal : 1;
				this.clear();
				helpers.each(this.segments,function(segment,index){
					segment.transition({
						circumference : this.calculateCircumference(segment.value),
						outerRadius : this.outerRadius,
						innerRadius : (this.outerRadius/100) * this.options.percentageInnerCutout
					},animDecimal);

					segment.endAngle = segment.startAngle + segment.circumference;

					segment.draw();
					if (index === 0){
						segment.startAngle = Math.PI * 1.5;
					}
					//Check to see if it's the last segment, if not get the next and update the start angle
					if (index < this.segments.length-1){
						this.segments[index+1].startAngle = segment.endAngle;
					}
				},this);

			}
		});

		Chart.types.Doughnut.extend({
			name : "Pie",
			defaults : helpers.merge(defaultConfig,{percentageInnerCutout : 0})
		});

	}).call(this);
	(function(){
		"use strict";

		var root = this,
			Chart = root.Chart,
			helpers = Chart.helpers;

		var defaultConfig = {

			///Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines : true,

			//String - Colour of the grid lines
			scaleGridLineColor : "rgba(0,0,0,.05)",

			//Number - Width of the grid lines
			scaleGridLineWidth : 1,

			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,

			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,

			//Boolean - Whether the line is curved between points
			bezierCurve : true,

			//Number - Tension of the bezier curve between points
			bezierCurveTension : 0.4,

			//Boolean - Whether to show a dot for each point
			pointDot : true,

			//Number - Radius of each point dot in pixels
			pointDotRadius : 4,

			//Number - Pixel width of point dot stroke
			pointDotStrokeWidth : 1,

			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius : 20,

			//Boolean - Whether to show a stroke for datasets
			datasetStroke : true,

			//Number - Pixel width of dataset stroke
			datasetStrokeWidth : 2,

			//Boolean - Whether to fill the dataset with a colour
			datasetFill : true,

			//String - A legend template
			legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

		};


		Chart.Type.extend({
			name: "Line",
			defaults : defaultConfig,
			initialize:  function(data){
				//Declare the extension of the default point, to cater for the options passed in to the constructor
				this.PointClass = Chart.Point.extend({
					strokeWidth : this.options.pointDotStrokeWidth,
					radius : this.options.pointDotRadius,
					display: this.options.pointDot,
					hitDetectionRadius : this.options.pointHitDetectionRadius,
					ctx : this.chart.ctx,
					inRange : function(mouseX){
						return (Math.pow(mouseX-this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius,2));
					}
				});

				this.datasets = [];

				//Set up tooltip events on the chart
				if (this.options.showTooltips){
					helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
						var activePoints = (evt.type !== 'mouseout') ? this.getPointsAtEvent(evt) : [];
						this.eachPoints(function(point){
							point.restore(['fillColor', 'strokeColor']);
						});
						helpers.each(activePoints, function(activePoint){
							activePoint.fillColor = activePoint.highlightFill;
							activePoint.strokeColor = activePoint.highlightStroke;
						});
						this.showTooltip(activePoints);
					});
				}

				//Iterate through each of the datasets, and build this into a property of the chart
				helpers.each(data.datasets,function(dataset){

					var datasetObject = {
						label : dataset.label || null,
						fillColor : dataset.fillColor,
						strokeColor : dataset.strokeColor,
						pointColor : dataset.pointColor,
						pointStrokeColor : dataset.pointStrokeColor,
						points : []
					};

					this.datasets.push(datasetObject);


					helpers.each(dataset.data,function(dataPoint,index){
						//Add a new point for each piece of data, passing any required data to draw.
						datasetObject.points.push(new this.PointClass({
							value : dataPoint,
							label : data.labels[index],
							datasetLabel: dataset.label,
							strokeColor : dataset.pointStrokeColor,
							fillColor : dataset.pointColor,
							highlightFill : dataset.pointHighlightFill || dataset.pointColor,
							highlightStroke : dataset.pointHighlightStroke || dataset.pointStrokeColor
						}));
					},this);

					this.buildScale(data.labels);


					this.eachPoints(function(point, index){
						helpers.extend(point, {
							x: this.scale.calculateX(index),
							y: this.scale.endPoint
						});
						point.save();
					}, this);

				},this);


				this.render();
			},
			update : function(){
				this.scale.update();
				// Reset any highlight colours before updating.
				helpers.each(this.activeElements, function(activeElement){
					activeElement.restore(['fillColor', 'strokeColor']);
				});
				this.eachPoints(function(point){
					point.save();
				});
				this.render();
			},
			eachPoints : function(callback){
				helpers.each(this.datasets,function(dataset){
					helpers.each(dataset.points,callback,this);
				},this);
			},
			getPointsAtEvent : function(e){
				var pointsArray = [],
					eventPosition = helpers.getRelativePosition(e);
				helpers.each(this.datasets,function(dataset){
					helpers.each(dataset.points,function(point){
						if (point.inRange(eventPosition.x,eventPosition.y)) pointsArray.push(point);
					});
				},this);
				return pointsArray;
			},
			buildScale : function(labels){
				var self = this;

				var dataTotal = function(){
					var values = [];
					self.eachPoints(function(point){
						values.push(point.value);
					});

					return values;
				};

				var scaleOptions = {
					templateString : this.options.scaleLabel,
					height : this.chart.height,
					width : this.chart.width,
					ctx : this.chart.ctx,
					textColor : this.options.scaleFontColor,
					fontSize : this.options.scaleFontSize,
					fontStyle : this.options.scaleFontStyle,
					fontFamily : this.options.scaleFontFamily,
					valuesCount : labels.length,
					beginAtZero : this.options.scaleBeginAtZero,
					integersOnly : this.options.scaleIntegersOnly,
					calculateYRange : function(currentHeight){
						var updatedRanges = helpers.calculateScaleRange(
							dataTotal(),
							currentHeight,
							this.fontSize,
							this.beginAtZero,
							this.integersOnly
						);
						helpers.extend(this, updatedRanges);
					},
					xLabels : labels,
					font : helpers.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
					lineWidth : this.options.scaleLineWidth,
					lineColor : this.options.scaleLineColor,
					showHorizontalLines : this.options.scaleShowHorizontalLines,
					showVerticalLines : this.options.scaleShowVerticalLines,
					gridLineWidth : (this.options.scaleShowGridLines) ? this.options.scaleGridLineWidth : 0,
					gridLineColor : (this.options.scaleShowGridLines) ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
					padding: (this.options.showScale) ? 0 : this.options.pointDotRadius + this.options.pointDotStrokeWidth,
					showLabels : this.options.scaleShowLabels,
					display : this.options.showScale
				};

				if (this.options.scaleOverride){
					helpers.extend(scaleOptions, {
						calculateYRange: helpers.noop,
						steps: this.options.scaleSteps,
						stepValue: this.options.scaleStepWidth,
						min: this.options.scaleStartValue,
						max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
					});
				}


				this.scale = new Chart.Scale(scaleOptions);
			},
			addData : function(valuesArray,label){
				//Map the values array for each of the datasets

				helpers.each(valuesArray,function(value,datasetIndex){
					//Add a new point for each piece of data, passing any required data to draw.
					this.datasets[datasetIndex].points.push(new this.PointClass({
						value : value,
						label : label,
						x: this.scale.calculateX(this.scale.valuesCount+1),
						y: this.scale.endPoint,
						strokeColor : this.datasets[datasetIndex].pointStrokeColor,
						fillColor : this.datasets[datasetIndex].pointColor
					}));
				},this);

				this.scale.addXLabel(label);
				//Then re-render the chart.
				this.update();
			},
			removeData : function(){
				this.scale.removeXLabel();
				//Then re-render the chart.
				helpers.each(this.datasets,function(dataset){
					dataset.points.shift();
				},this);
				this.update();
			},
			reflow : function(){
				var newScaleProps = helpers.extend({
					height : this.chart.height,
					width : this.chart.width
				});
				this.scale.update(newScaleProps);
			},
			draw : function(ease){
				var easingDecimal = ease || 1;
				this.clear();

				var ctx = this.chart.ctx;

				// Some helper methods for getting the next/prev points
				var hasValue = function(item){
					return item.value !== null;
				},
				nextPoint = function(point, collection, index){
					return helpers.findNextWhere(collection, hasValue, index) || point;
				},
				previousPoint = function(point, collection, index){
					return helpers.findPreviousWhere(collection, hasValue, index) || point;
				};

				this.scale.draw(easingDecimal);


				helpers.each(this.datasets,function(dataset){
					var pointsWithValues = helpers.where(dataset.points, hasValue);

					//Transition each point first so that the line and point drawing isn't out of sync
					//We can use this extra loop to calculate the control points of this dataset also in this loop

					helpers.each(dataset.points, function(point, index){
						if (point.hasValue()){
							point.transition({
								y : this.scale.calculateY(point.value),
								x : this.scale.calculateX(index)
							}, easingDecimal);
						}
					},this);


					// Control points need to be calculated in a seperate loop, because we need to know the current x/y of the point
					// This would cause issues when there is no animation, because the y of the next point would be 0, so beziers would be skewed
					if (this.options.bezierCurve){
						helpers.each(pointsWithValues, function(point, index){
							var tension = (index > 0 && index < pointsWithValues.length - 1) ? this.options.bezierCurveTension : 0;
							point.controlPoints = helpers.splineCurve(
								previousPoint(point, pointsWithValues, index),
								point,
								nextPoint(point, pointsWithValues, index),
								tension
							);

							// Prevent the bezier going outside of the bounds of the graph

							// Cap puter bezier handles to the upper/lower scale bounds
							if (point.controlPoints.outer.y > this.scale.endPoint){
								point.controlPoints.outer.y = this.scale.endPoint;
							}
							else if (point.controlPoints.outer.y < this.scale.startPoint){
								point.controlPoints.outer.y = this.scale.startPoint;
							}

							// Cap inner bezier handles to the upper/lower scale bounds
							if (point.controlPoints.inner.y > this.scale.endPoint){
								point.controlPoints.inner.y = this.scale.endPoint;
							}
							else if (point.controlPoints.inner.y < this.scale.startPoint){
								point.controlPoints.inner.y = this.scale.startPoint;
							}
						},this);
					}


					//Draw the line between all the points
					ctx.lineWidth = this.options.datasetStrokeWidth;
					ctx.strokeStyle = dataset.strokeColor;
					ctx.beginPath();

					helpers.each(pointsWithValues, function(point, index){
						if (index === 0){
							ctx.moveTo(point.x, point.y);
						}
						else{
							if(this.options.bezierCurve){
								var previous = previousPoint(point, pointsWithValues, index);

								ctx.bezierCurveTo(
									previous.controlPoints.outer.x,
									previous.controlPoints.outer.y,
									point.controlPoints.inner.x,
									point.controlPoints.inner.y,
									point.x,
									point.y
								);
							}
							else{
								ctx.lineTo(point.x,point.y);
							}
						}
					}, this);

					ctx.stroke();

					if (this.options.datasetFill && pointsWithValues.length > 0){
						//Round off the line by going to the base of the chart, back to the start, then fill.
						ctx.lineTo(pointsWithValues[pointsWithValues.length - 1].x, this.scale.endPoint);
						ctx.lineTo(pointsWithValues[0].x, this.scale.endPoint);
						ctx.fillStyle = dataset.fillColor;
						ctx.closePath();
						ctx.fill();
					}

					//Now draw the points over the line
					//A little inefficient double looping, but better than the line
					//lagging behind the point positions
					helpers.each(pointsWithValues,function(point){
						point.draw();
					});
				},this);
			}
		});


	}).call(this);

	(function(){
		"use strict";

		var root = this,
			Chart = root.Chart,
			//Cache a local reference to Chart.helpers
			helpers = Chart.helpers;

		var defaultConfig = {
			//Boolean - Show a backdrop to the scale label
			scaleShowLabelBackdrop : true,

			//String - The colour of the label backdrop
			scaleBackdropColor : "rgba(255,255,255,0.75)",

			// Boolean - Whether the scale should begin at zero
			scaleBeginAtZero : true,

			//Number - The backdrop padding above & below the label in pixels
			scaleBackdropPaddingY : 2,

			//Number - The backdrop padding to the side of the label in pixels
			scaleBackdropPaddingX : 2,

			//Boolean - Show line for each value in the scale
			scaleShowLine : true,

			//Boolean - Stroke a line around each segment in the chart
			segmentShowStroke : true,

			//String - The colour of the stroke on each segement.
			segmentStrokeColor : "#fff",

			//Number - The width of the stroke value in pixels
			segmentStrokeWidth : 2,

			//Number - Amount of animation steps
			animationSteps : 100,

			//String - Animation easing effect.
			animationEasing : "easeOutBounce",

			//Boolean - Whether to animate the rotation of the chart
			animateRotate : true,

			//Boolean - Whether to animate scaling the chart from the centre
			animateScale : false,

			//String - A legend template
			legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
		};


		Chart.Type.extend({
			//Passing in a name registers this chart in the Chart namespace
			name: "PolarArea",
			//Providing a defaults will also register the deafults in the chart namespace
			defaults : defaultConfig,
			//Initialize is fired when the chart is initialized - Data is passed in as a parameter
			//Config is automatically merged by the core of Chart.js, and is available at this.options
			initialize:  function(data){
				this.segments = [];
				//Declare segment class as a chart instance specific class, so it can share props for this instance
				this.SegmentArc = Chart.Arc.extend({
					showStroke : this.options.segmentShowStroke,
					strokeWidth : this.options.segmentStrokeWidth,
					strokeColor : this.options.segmentStrokeColor,
					ctx : this.chart.ctx,
					innerRadius : 0,
					x : this.chart.width/2,
					y : this.chart.height/2
				});
				this.scale = new Chart.RadialScale({
					display: this.options.showScale,
					fontStyle: this.options.scaleFontStyle,
					fontSize: this.options.scaleFontSize,
					fontFamily: this.options.scaleFontFamily,
					fontColor: this.options.scaleFontColor,
					showLabels: this.options.scaleShowLabels,
					showLabelBackdrop: this.options.scaleShowLabelBackdrop,
					backdropColor: this.options.scaleBackdropColor,
					backdropPaddingY : this.options.scaleBackdropPaddingY,
					backdropPaddingX: this.options.scaleBackdropPaddingX,
					lineWidth: (this.options.scaleShowLine) ? this.options.scaleLineWidth : 0,
					lineColor: this.options.scaleLineColor,
					lineArc: true,
					width: this.chart.width,
					height: this.chart.height,
					xCenter: this.chart.width/2,
					yCenter: this.chart.height/2,
					ctx : this.chart.ctx,
					templateString: this.options.scaleLabel,
					valuesCount: data.length
				});

				this.updateScaleRange(data);

				this.scale.update();

				helpers.each(data,function(segment,index){
					this.addData(segment,index,true);
				},this);

				//Set up tooltip events on the chart
				if (this.options.showTooltips){
					helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
						var activeSegments = (evt.type !== 'mouseout') ? this.getSegmentsAtEvent(evt) : [];
						helpers.each(this.segments,function(segment){
							segment.restore(["fillColor"]);
						});
						helpers.each(activeSegments,function(activeSegment){
							activeSegment.fillColor = activeSegment.highlightColor;
						});
						this.showTooltip(activeSegments);
					});
				}

				this.render();
			},
			getSegmentsAtEvent : function(e){
				var segmentsArray = [];

				var location = helpers.getRelativePosition(e);

				helpers.each(this.segments,function(segment){
					if (segment.inRange(location.x,location.y)) segmentsArray.push(segment);
				},this);
				return segmentsArray;
			},
			addData : function(segment, atIndex, silent){
				var index = atIndex || this.segments.length;

				this.segments.splice(index, 0, new this.SegmentArc({
					fillColor: segment.color,
					highlightColor: segment.highlight || segment.color,
					label: segment.label,
					value: segment.value,
					outerRadius: (this.options.animateScale) ? 0 : this.scale.calculateCenterOffset(segment.value),
					circumference: (this.options.animateRotate) ? 0 : this.scale.getCircumference(),
					startAngle: Math.PI * 1.5
				}));
				if (!silent){
					this.reflow();
					this.update();
				}
			},
			removeData: function(atIndex){
				var indexToDelete = (helpers.isNumber(atIndex)) ? atIndex : this.segments.length-1;
				this.segments.splice(indexToDelete, 1);
				this.reflow();
				this.update();
			},
			calculateTotal: function(data){
				this.total = 0;
				helpers.each(data,function(segment){
					this.total += segment.value;
				},this);
				this.scale.valuesCount = this.segments.length;
			},
			updateScaleRange: function(datapoints){
				var valuesArray = [];
				helpers.each(datapoints,function(segment){
					valuesArray.push(segment.value);
				});

				var scaleSizes = (this.options.scaleOverride) ?
					{
						steps: this.options.scaleSteps,
						stepValue: this.options.scaleStepWidth,
						min: this.options.scaleStartValue,
						max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
					} :
					helpers.calculateScaleRange(
						valuesArray,
						helpers.min([this.chart.width, this.chart.height])/2,
						this.options.scaleFontSize,
						this.options.scaleBeginAtZero,
						this.options.scaleIntegersOnly
					);

				helpers.extend(
					this.scale,
					scaleSizes,
					{
						size: helpers.min([this.chart.width, this.chart.height]),
						xCenter: this.chart.width/2,
						yCenter: this.chart.height/2
					}
				);

			},
			update : function(){
				this.calculateTotal(this.segments);

				helpers.each(this.segments,function(segment){
					segment.save();
				});
				
				this.reflow();
				this.render();
			},
			reflow : function(){
				helpers.extend(this.SegmentArc.prototype,{
					x : this.chart.width/2,
					y : this.chart.height/2
				});
				this.updateScaleRange(this.segments);
				this.scale.update();

				helpers.extend(this.scale,{
					xCenter: this.chart.width/2,
					yCenter: this.chart.height/2
				});

				helpers.each(this.segments, function(segment){
					segment.update({
						outerRadius : this.scale.calculateCenterOffset(segment.value)
					});
				}, this);

			},
			draw : function(ease){
				var easingDecimal = ease || 1;
				//Clear & draw the canvas
				this.clear();
				helpers.each(this.segments,function(segment, index){
					segment.transition({
						circumference : this.scale.getCircumference(),
						outerRadius : this.scale.calculateCenterOffset(segment.value)
					},easingDecimal);

					segment.endAngle = segment.startAngle + segment.circumference;

					// If we've removed the first segment we need to set the first one to
					// start at the top.
					if (index === 0){
						segment.startAngle = Math.PI * 1.5;
					}

					//Check to see if it's the last segment, if not get the next and update the start angle
					if (index < this.segments.length - 1){
						this.segments[index+1].startAngle = segment.endAngle;
					}
					segment.draw();
				}, this);
				this.scale.draw();
			}
		});

	}).call(this);
	(function(){
		"use strict";

		var root = this,
			Chart = root.Chart,
			helpers = Chart.helpers;



		Chart.Type.extend({
			name: "Radar",
			defaults:{
				//Boolean - Whether to show lines for each scale point
				scaleShowLine : true,

				//Boolean - Whether we show the angle lines out of the radar
				angleShowLineOut : true,

				//Boolean - Whether to show labels on the scale
				scaleShowLabels : false,

				// Boolean - Whether the scale should begin at zero
				scaleBeginAtZero : true,

				//String - Colour of the angle line
				angleLineColor : "rgba(0,0,0,.1)",

				//Number - Pixel width of the angle line
				angleLineWidth : 1,

				//String - Point label font declaration
				pointLabelFontFamily : "'Arial'",

				//String - Point label font weight
				pointLabelFontStyle : "normal",

				//Number - Point label font size in pixels
				pointLabelFontSize : 10,

				//String - Point label font colour
				pointLabelFontColor : "#666",

				//Boolean - Whether to show a dot for each point
				pointDot : true,

				//Number - Radius of each point dot in pixels
				pointDotRadius : 3,

				//Number - Pixel width of point dot stroke
				pointDotStrokeWidth : 1,

				//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
				pointHitDetectionRadius : 20,

				//Boolean - Whether to show a stroke for datasets
				datasetStroke : true,

				//Number - Pixel width of dataset stroke
				datasetStrokeWidth : 2,

				//Boolean - Whether to fill the dataset with a colour
				datasetFill : true,

				//String - A legend template
				legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

			},

			initialize: function(data){
				this.PointClass = Chart.Point.extend({
					strokeWidth : this.options.pointDotStrokeWidth,
					radius : this.options.pointDotRadius,
					display: this.options.pointDot,
					hitDetectionRadius : this.options.pointHitDetectionRadius,
					ctx : this.chart.ctx
				});

				this.datasets = [];

				this.buildScale(data);

				//Set up tooltip events on the chart
				if (this.options.showTooltips){
					helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
						var activePointsCollection = (evt.type !== 'mouseout') ? this.getPointsAtEvent(evt) : [];

						this.eachPoints(function(point){
							point.restore(['fillColor', 'strokeColor']);
						});
						helpers.each(activePointsCollection, function(activePoint){
							activePoint.fillColor = activePoint.highlightFill;
							activePoint.strokeColor = activePoint.highlightStroke;
						});

						this.showTooltip(activePointsCollection);
					});
				}

				//Iterate through each of the datasets, and build this into a property of the chart
				helpers.each(data.datasets,function(dataset){

					var datasetObject = {
						label: dataset.label || null,
						fillColor : dataset.fillColor,
						strokeColor : dataset.strokeColor,
						pointColor : dataset.pointColor,
						pointStrokeColor : dataset.pointStrokeColor,
						points : []
					};

					this.datasets.push(datasetObject);

					helpers.each(dataset.data,function(dataPoint,index){
						//Add a new point for each piece of data, passing any required data to draw.
						var pointPosition;
						if (!this.scale.animation){
							pointPosition = this.scale.getPointPosition(index, this.scale.calculateCenterOffset(dataPoint));
						}
						datasetObject.points.push(new this.PointClass({
							value : dataPoint,
							label : data.labels[index],
							datasetLabel: dataset.label,
							x: (this.options.animation) ? this.scale.xCenter : pointPosition.x,
							y: (this.options.animation) ? this.scale.yCenter : pointPosition.y,
							strokeColor : dataset.pointStrokeColor,
							fillColor : dataset.pointColor,
							highlightFill : dataset.pointHighlightFill || dataset.pointColor,
							highlightStroke : dataset.pointHighlightStroke || dataset.pointStrokeColor
						}));
					},this);

				},this);

				this.render();
			},
			eachPoints : function(callback){
				helpers.each(this.datasets,function(dataset){
					helpers.each(dataset.points,callback,this);
				},this);
			},

			getPointsAtEvent : function(evt){
				var mousePosition = helpers.getRelativePosition(evt),
					fromCenter = helpers.getAngleFromPoint({
						x: this.scale.xCenter,
						y: this.scale.yCenter
					}, mousePosition);

				var anglePerIndex = (Math.PI * 2) /this.scale.valuesCount,
					pointIndex = Math.round((fromCenter.angle - Math.PI * 1.5) / anglePerIndex),
					activePointsCollection = [];

				// If we're at the top, make the pointIndex 0 to get the first of the array.
				if (pointIndex >= this.scale.valuesCount || pointIndex < 0){
					pointIndex = 0;
				}

				if (fromCenter.distance <= this.scale.drawingArea){
					helpers.each(this.datasets, function(dataset){
						activePointsCollection.push(dataset.points[pointIndex]);
					});
				}

				return activePointsCollection;
			},

			buildScale : function(data){
				this.scale = new Chart.RadialScale({
					display: this.options.showScale,
					fontStyle: this.options.scaleFontStyle,
					fontSize: this.options.scaleFontSize,
					fontFamily: this.options.scaleFontFamily,
					fontColor: this.options.scaleFontColor,
					showLabels: this.options.scaleShowLabels,
					showLabelBackdrop: this.options.scaleShowLabelBackdrop,
					backdropColor: this.options.scaleBackdropColor,
					backdropPaddingY : this.options.scaleBackdropPaddingY,
					backdropPaddingX: this.options.scaleBackdropPaddingX,
					lineWidth: (this.options.scaleShowLine) ? this.options.scaleLineWidth : 0,
					lineColor: this.options.scaleLineColor,
					angleLineColor : this.options.angleLineColor,
					angleLineWidth : (this.options.angleShowLineOut) ? this.options.angleLineWidth : 0,
					// Point labels at the edge of each line
					pointLabelFontColor : this.options.pointLabelFontColor,
					pointLabelFontSize : this.options.pointLabelFontSize,
					pointLabelFontFamily : this.options.pointLabelFontFamily,
					pointLabelFontStyle : this.options.pointLabelFontStyle,
					height : this.chart.height,
					width: this.chart.width,
					xCenter: this.chart.width/2,
					yCenter: this.chart.height/2,
					ctx : this.chart.ctx,
					templateString: this.options.scaleLabel,
					labels: data.labels,
					valuesCount: data.datasets[0].data.length
				});

				this.scale.setScaleSize();
				this.updateScaleRange(data.datasets);
				this.scale.buildYLabels();
			},
			updateScaleRange: function(datasets){
				var valuesArray = (function(){
					var totalDataArray = [];
					helpers.each(datasets,function(dataset){
						if (dataset.data){
							totalDataArray = totalDataArray.concat(dataset.data);
						}
						else {
							helpers.each(dataset.points, function(point){
								totalDataArray.push(point.value);
							});
						}
					});
					return totalDataArray;
				})();


				var scaleSizes = (this.options.scaleOverride) ?
					{
						steps: this.options.scaleSteps,
						stepValue: this.options.scaleStepWidth,
						min: this.options.scaleStartValue,
						max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
					} :
					helpers.calculateScaleRange(
						valuesArray,
						helpers.min([this.chart.width, this.chart.height])/2,
						this.options.scaleFontSize,
						this.options.scaleBeginAtZero,
						this.options.scaleIntegersOnly
					);

				helpers.extend(
					this.scale,
					scaleSizes
				);

			},
			addData : function(valuesArray,label){
				//Map the values array for each of the datasets
				this.scale.valuesCount++;
				helpers.each(valuesArray,function(value,datasetIndex){
					var pointPosition = this.scale.getPointPosition(this.scale.valuesCount, this.scale.calculateCenterOffset(value));
					this.datasets[datasetIndex].points.push(new this.PointClass({
						value : value,
						label : label,
						x: pointPosition.x,
						y: pointPosition.y,
						strokeColor : this.datasets[datasetIndex].pointStrokeColor,
						fillColor : this.datasets[datasetIndex].pointColor
					}));
				},this);

				this.scale.labels.push(label);

				this.reflow();

				this.update();
			},
			removeData : function(){
				this.scale.valuesCount--;
				this.scale.labels.shift();
				helpers.each(this.datasets,function(dataset){
					dataset.points.shift();
				},this);
				this.reflow();
				this.update();
			},
			update : function(){
				this.eachPoints(function(point){
					point.save();
				});
				this.reflow();
				this.render();
			},
			reflow: function(){
				helpers.extend(this.scale, {
					width : this.chart.width,
					height: this.chart.height,
					size : helpers.min([this.chart.width, this.chart.height]),
					xCenter: this.chart.width/2,
					yCenter: this.chart.height/2
				});
				this.updateScaleRange(this.datasets);
				this.scale.setScaleSize();
				this.scale.buildYLabels();
			},
			draw : function(ease){
				var easeDecimal = ease || 1,
					ctx = this.chart.ctx;
				this.clear();
				this.scale.draw();

				helpers.each(this.datasets,function(dataset){

					//Transition each point first so that the line and point drawing isn't out of sync
					helpers.each(dataset.points,function(point,index){
						if (point.hasValue()){
							point.transition(this.scale.getPointPosition(index, this.scale.calculateCenterOffset(point.value)), easeDecimal);
						}
					},this);



					//Draw the line between all the points
					ctx.lineWidth = this.options.datasetStrokeWidth;
					ctx.strokeStyle = dataset.strokeColor;
					ctx.beginPath();
					helpers.each(dataset.points,function(point,index){
						if (index === 0){
							ctx.moveTo(point.x,point.y);
						}
						else{
							ctx.lineTo(point.x,point.y);
						}
					},this);
					ctx.closePath();
					ctx.stroke();

					ctx.fillStyle = dataset.fillColor;
					ctx.fill();

					//Now draw the points over the line
					//A little inefficient double looping, but better than the line
					//lagging behind the point positions
					helpers.each(dataset.points,function(point){
						if (point.hasValue()){
							point.draw();
						}
					});

				},this);

			}

		});





	}).call(this);

/***/ },

/***/ 248:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },

/***/ 249:
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(246);

	module.exports = vars.createClass('Doughnut', ['getSegmentsAtEvent']);


/***/ },

/***/ 250:
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(246);

	module.exports = vars.createClass('Line', ['getPointsAtEvent']);


/***/ },

/***/ 251:
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(246);

	module.exports = vars.createClass('Pie', ['getSegmentsAtEvent']);


/***/ },

/***/ 252:
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(246);

	module.exports = vars.createClass('PolarArea', ['getSegmentsAtEvent']);


/***/ },

/***/ 253:
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(246);

	module.exports = vars.createClass('Radar', ['getPointsAtEvent']);


/***/ }

});