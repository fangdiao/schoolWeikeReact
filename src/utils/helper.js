
import React from 'react';
import { connect as rrConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { message } from 'antd';
import { hashHistory } from 'react-router';

//页面跳转
export const jump = (path, text) => {
  message.success(text);
  const timer = () =>hashHistory.push(path);
  setTimeout(timer, 2000);
}

//用户信息检查
let weike = localStorage.weike;
export const checker = (nextState, replace, cb = () => {}) => {

  console.log(nextState)
  if (!weike) {
    replace(`/login/loginIn`);
  } else {
    cb();
  }
};

//redux connect 函数封装，state统一放进data对象

export const connect = (dataMaker = () => {}, actions = () => {}) => Component => {
  const mapStateToProps = state => ({data: dataMaker(state)});
  const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)});

  Component = rrConnect(mapStateToProps, mapDispatchToProps)(Component);
  return Component;
};

//以下三个request函数待再次封装，有点乱

export const request = (url, body = '', method = 'get', token = false) => {
  url = body && method === 'get' ? `${url}?username=${body.username}&email=${body.email}` : url;
  token = token ? `Bearer ${ JSON.parse(localStorage.weike).token }` : false;
  let headers = token ?
    { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json', 'Authorization': token } :
    { 'Content-Type': 'application/json;charset=UTF-8' };
  body = body ? JSON.stringify(body) : body;
  let params = body && method === 'post' ? { method, headers, body } :
    { method, headers };

  return new Promise((resolve, reject) => {
    fetch(url, params).then(r => r.json())
    .then(responseData => {
      resolve(responseData);
    }).catch(err => {
      console.log(err)
      reject(err);
    });
  });
}

//header中有captchaCode
export const requestLoginIn = (url, data) => {
  let { form, captchaCode } = data;
  let headers = { 'Content-Type': 'application/json;charset=UTF-8', 'captcha-code': captchaCode };
  let method = 'post';
  let body = JSON.stringify(form);
  let params = { body, headers, method };
  return new Promise((resolve, reject) => {
    fetch(url, params).then(r => r.json())
    .then(responseData => {
      resolve(responseData);
    }).catch(err => {
      console.log(err)
      reject(err);
    });
  });
}


export const requestImg = (url) => {
  let params = { method: 'get', headers: { 'Content-Type': 'application/json' } };
  let captchaCode = ''
  return new Promise((resolve, reject) => {
    fetch(url, params).then(response => {
      captchaCode = response.headers.get('captcha-code');
      return response;
    })
    .then(response => response.json())
    .then(responseData => {
      resolve({ ...responseData, captchaCode });
    }).catch(err => {
      console.log(err)
      reject(err);
    });
  });
}


/**
 * 获取moment对象，可以传 moment对象 Date对象 字符串 或 时间戳
 * @param obj {moment | Date | String | Number}
 * @param format 格式化方式，如果obj是一个字符串，那么按format转换后处理
 * @returns {moment}
 */
export const getMoment = (obj) => {
  if(obj === undefined || obj === null) {
    return moment();
  }
  if(/^\d{9,14}$/.test(obj)) {
    return moment(obj * 1);
  }
  if(obj instanceof moment) {
    return obj;
  }
  if(obj instanceof Date) {
    return moment(obj);
  }
  if(typeof obj === 'string') {
    return moment(obj);
  }
  return obj;
};

/**
 * 获取格式化时间，可以传 moment对象 Date对象 或时间戳
 * @param obj {moment | Date | String | Number}
 * @param formatTo 将要转换格式
 * @returns string
 */
export const getFormat = (obj, format = 'YYYY-MM-DD') => {
  let momentObj = getMoment(obj);
  return momentObj.format ? momentObj.format(format) : obj;
};

/**
 * 获取时间戳，可以传 moment对象 Date对象 字符串 或 时间戳
 * @param obj {moment | Date | String | Number}
 * @param fixed 忽略毫秒
 * @returns Number
 */
export const getTimestamp = (obj, fixed = false) => {
  let timestamp = getMoment(obj).format('x') * 1;
  return fixed ? Math.floor(timestamp / 1000) * 1000 : timestamp;
};


/**
  *
  *排序
  *@param array
  *@param type  需要排序的值
  */

export const range = (array, type, userArray) => {
  if (userArray) {
    return array.sort((a, b) => {
      let commonA =  _.intersection(a[type], userArray).length;
      let commonB = _.intersection(b[type], userArray).length;
      return commonA < commonB;
    });
  }
  if (type === 'projectStart') {
    return array.sort((a, b) => a[type] > b[type]);
  }
  if (type === 'attention' || type === 'joinSuccess') {
    return array.sort((a, b) => a[type].length < b[type].length);
  }
  return array.sort((a, b) => a[type] < b[type])
}
