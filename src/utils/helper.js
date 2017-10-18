
import React from 'react';
import { connect as rrConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import qs from 'query-string';
import { hashHistory } from 'react-router';

// const ADDRESS = 'http://182.150.37.74:88';
const ADDRESS = '';

//页面跳转
export const jump = path => {
  hashHistory.push(path);
};

//用户信息检查
let weike = localStorage.weike;
export const checker = (nextState, replace, cb = () => {}) => {
  if (!weike) {
    replace(`/login/loginIn`);
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
  if (body && method === 'get') {
    url = `${url}?${qs.stringify(body)}`;
  }
  // url = body && method === 'get' ? `${url}?username=${body.username}&email=${body.email}` : url;
  token = token ? `Bearer ${ JSON.parse(localStorage.weike).token }` : false;
  let headers = token ?
    { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json', 'Authorization': token } :
    { 'Content-Type': 'application/json;charset=UTF-8' };
  body = body ? JSON.stringify(body) : body;
  let params = body && method === 'post' ? { method, headers, body } :
    { method, headers };

  return new Promise((resolve, reject) => {
    fetch(ADDRESS + url, params).then(r => r.json())
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
    fetch(ADDRESS + url, params).then(r => r.json())
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
    fetch(ADDRESS + url, params).then(response => {
      captchaCode = response.headers.get('captcha-code');
      return response;
    }).then(response => response.json())
      .then(responseData => {
        resolve({ ...responseData, captchaCode });
    }).catch(err => {
      console.log(err)
      reject(err);
    });
  });
}

/**
  *
  *排序
  *@param array
  *@param type  需要排序的值
  */

export const range = (array, type) => {
  if (type === 'projectStart') {
    return array.sort((a, b) => a.projectDetails[type] > b.projectDetails[type]);
  }
  if (type === 'followPros' || type === 'joinSuccess') {
    return array.sort((a, b) => a[type].length < b[type].length);
  }
  return array.sort((a, b) => a[type] < b[type])
}
