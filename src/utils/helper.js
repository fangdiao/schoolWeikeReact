
import React from 'react';
import { connect as rrConnect } from 'react-redux';
import { bindActionCreators } from 'redux';


export const connect = (dataMaker = () => {}, actions = () => {}) => Component => {
  const mapStateToProps = state => ({data: dataMaker(state)});
  const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)});

  Component = rrConnect(mapStateToProps, mapDispatchToProps)(Component);
  return Component;
};


export const request = (url, params = '', method = 'get', token = false) => {
  if (token) {
    token = `Bearer ${ localStorage.weike.token }`;
  }
  let header = token ?
    { 'Content-Type': 'application/json;charset=UTF-8' } :
    { 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': token };
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: header,
      body: params
    }).then(response => response.json())
    .then(responseData => {
      resolve(responseData);
    }).catch(err => {
      reject(err);
    });
  });
}
