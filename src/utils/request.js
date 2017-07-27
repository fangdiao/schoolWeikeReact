import {message} from 'antd';
import qs from 'query-string';
import localStore from 'store';

window.qs = qs;

var hide = () => {};

var _resCache = {};
const getCache = (url, options) => {
	var key = url + '$$' + JSON.stringify(options);
	var cached = _resCache[key] || {};
	if(cached !== undefined && cached.expires < Date.now()) {
		return _resCache[key] = undefined;
	} else {
		return cached.data;
	}
};
const setCache = (url, options, data, cacheTime) => {
	if(cacheTime > 0) {
		var key = url + '$$' + JSON.stringify(options);
		var expires = cacheTime * 1000 + Date.now();
		_resCache[key] = {data, expires};
	}
	return data;
};


export const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
};

// 包装微服务接口
export const requestMicroServiceWrapper = apiPrefix => (...params) => {
	params[0] = _G.MICRO_SERVICE_API_PREFIX + apiPrefix + params[0];
	return request(...params);
};

// 包装本地接口(nAdmin YII处理)
// todo params optimize
export const requestLocalServiceWrapper = (apiPrefix, cacheTime) => (url, params, method, options) => {
	options = {hideMsg: false, ...options};
	//params[0] = _G.LOCAL_SERVICE_API_PREFIX + apiPrefix + '?' + qs.stringify({r: params[0]});
	const checker = resPromise => checkLocalServiceResponse(resPromise, options.hideMsg);
	url = requestLocalApi(url, null, apiPrefix);
	return request(url, params, method, true, checker, cacheTime);
};

// 包装本地透传接口(nAdmin YII处理，统一透传到dmsdk）
export const requestLocalDmsdkProxyWrapper = (apiPrefix, cacheTime) => (url, params, method = METHODS.POST, options) => {
	options = {hideMsg: false, ...options};
	const checker = resPromise => checkLocalServiceResponse(resPromise, options.hideMsg);
	url = _G.LOCAL_SERVICE_API_PREFIX + apiPrefix + '?' + qs.stringify({r: 'api/proxy', dmsdk: url});
	return request(url, params, method, true, checker, cacheTime);
}

// 获取请求接口地址，后面待参数
export const requestLocalApi = (r, params, apiPrefix = _G.ADM_INDEX) => {
	return _G.LOCAL_SERVICE_API_PREFIX +
		apiPrefix + '?' + qs.stringify({r}) +
		(params ? ('&' + qs.stringify(params, {arrayFormat: 'bracket'})) : '');
}

// 本地接口的请求
export const requestLocal = requestLocalServiceWrapper(_G.ADM_INDEX);

// 本地代理接口请求
export const requestLocalProxy = requestLocalDmsdkProxyWrapper(_G.ADM_INDEX);

// 可缓存数据的接口请求，默认缓存180秒
requestLocal.cache = (cacheTime = 180) => requestLocalServiceWrapper(_G.ADM_INDEX, cacheTime);
requestLocalProxy.cache = (cacheTime = 180) => requestLocalDmsdkProxyWrapper(_G.ADM_INDEX, cacheTime);

/**
 * 统一发起请求
 * @param url
 * @param params
 * @param method
 * @param jsonType 是否为json类型
 * @param checker 响应检查器
 * @param cacheTime 接口数据缓存时间（默认不缓存）
 * @returns {*}
 */
const request = (url, params, method = METHODS.GET, jsonType = true, checker = checkMicroServiceResponse, cacheTime = 0) => {
	let userInfo = localStore.get('userInfo');
	var options = {
		headers: {
			'Content-Type': jsonType ? 'application/json' : 'application/x-www-form-urlencoded',
			'token':userInfo ? userInfo.token : '',
			'X-Requested-With': 'XMLHttpRequest'
		},
		method: method,
		credentials: 'same-origin'
	};

	if(params !== undefined && params !== null) {
		if (method === METHODS.GET) {
			url += (url.indexOf('?') !== -1 ? '&' : '?') + qs.stringify(params, {arrayFormat: 'bracket'});
		} else {
			options.body = jsonType ? JSON.stringify(params) : qs.stringify(params, {arrayFormat: 'bracket'});
		}
	}
	var res = getCache(url, options);
	if(res === undefined) {
		return fetch(url, options).then(checker).then(res => {
				setCache(url, options, {resolved: res}, cacheTime);
				return res;
		}).catch(error => {
			setCache(url, options, {reject: error}, cacheTime);
			return Promise.reject(error);
		});
	} else {
		if(__DEV__) {
			console.info('Request Cached:', {url, options, res});
		}
		return res.resolved !== undefined ? Promise.resolve(res.resolved) : Promise.reject(res.reject);
	}
};

/**
 * 统一上传请求，支持blob或url
 */
export const uploadImageRequest = data => {

	var body = null;
	var url = '';
	var headers = {};

	if(typeof data === 'string') {
		body = JSON.stringify({url: data});
		url = 'upload/keep-image-by-url';
		headers = {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json'};
	} else {
		body = new FormData();
		body.append('file', data, 'blob.png');
		url = 'upload/multi-upload';
		headers = {'X-Requested-With': 'XMLHttpRequest'};
	}

	var options = {
		headers,
		body,
		method: METHODS.POST,
		credentials: 'same-origin',
	};
	return fetch(requestLocalApi(url), options)
		.then(checkLocalServiceResponse).catch(error => {
			return Promise.reject(error);
		});
}

/**
 * 统一检查微服务的响应
 * @param respPromise
 * @returns {*}
 */
const checkMicroServiceResponse = resPromise => {
	const printError = function (res) {
		hide();
		hide = message.error( res.error ? res.error : `服务器开小差了${__DEV__? ' (Micro Service)' : ''}`);
	};

	if(resPromise.status === 200) {
		return resPromise.text().then(res => {
			let resParse = JSON.parse(res || 'null');
			if(resParse && resParse.error) {
				printError(resParse);
				return Promise.reject(res);
			} else {
				return Promise.resolve(JSON.parse(res || 'null'));
			}
		});
	} else {
		return resPromise.text().then(res => {
			let resParse = JSON.parse(res || 'null');
			printError(resParse);
			return Promise.reject(res);
		});
	}
};

/**
 * 统一检查本地接口(nAdmin YII处理)的响应
 * @param respPromise
 * @returns {*}
 */
const checkLocalServiceResponse = (resPromise, hideMsg = false) => {
	if(resPromise.status === 200) {
		return resPromise.json().then(res => {
			// status 为 YII controller success 返回状态
			if(res.status === 1) {
				return Promise.resolve(res.data);
			} else {
				hide();
				!hideMsg && (hide = message.error(`${res.msg}${__DEV__? ' (Local Service)' : ''}`));
				return Promise.reject(res.msg);
			}
		});
	}
	return resPromise.text().then(res => {
		hide();
		!hideMsg && (hide = message.error(`服务器开小差了${__DEV__? ' (Local Service)' : ''}`));
		console.error(resPromise);
		return Promise.reject(res);
	});
};

export default request;
