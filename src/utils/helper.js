
import React from 'react';
import { connect as rrConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';


export const connect = (dataMaker = () => {}, actions = () => {}) => Component => {
  const mapStateToProps = state => ({data: dataMaker(state)});
  const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)});

  Component = rrConnect(mapStateToProps, mapDispatchToProps)(Component);
  return Component;
};


export const request = (url, body = '', method = 'get', token = false) => {
  token = token ? `Bearer ${ JSON.parse(localStorage.weike).token }` : false;
  let headers = token ?
    { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json', 'Authorization': token } :
    { 'Content-Type': 'application/json;charset=UTF-8' };

  let params = body ? { method: method, headers: headers, body: body } :
    { method: method, headers: headers };

  return new Promise((resolve, reject) => {
    fetch(url, params).then(response => response.json())
    .then(responseData => {
      resolve(responseData);
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
