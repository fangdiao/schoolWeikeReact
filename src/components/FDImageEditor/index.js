import React from 'react';

import Wrapper from './Wrapper';

import './style';

export default class FDImageEditor extends React.Component {

  state = {
    imageFile: '',
    visible: false,
    imagePreview: ''
  }

  close = () => {
    this.fileInput.value = '';
    this.setState({ imageFile: '', visible: false });
  }

  getImage = (imagePreview) => {
    this.fileInput.value = '';
    this.setState({ imageFile: '', imagePreview, visible: false });
  }

  onChange = (e) => {
    let imageFile = e.target.files[0];
    this.setState({ imageFile, visible: true });
  }

  render() {
    let { imageFile, visible, imagePreview } = this.state;
    let backgroundImage = imagePreview ? imagePreview : '';
    return (
      <div className="FDImageEditor-preview" style={{backgroundImage}}>
        {
          imagePreview ? <img src={imagePreview} /> : null
        }
        <div className="mask"></div>
        <div className="text">
          <i className="iconfont icon-camera"></i>
          <h5>修改头像</h5>
        </div>
        <input ref={ele => this.fileInput = ele} accept="image/*" onChange={this.onChange} type="file" />
        {
          visible ? <Wrapper close={this.close} imageFile={imageFile} getImage={this.getImage} /> : null
        }
      </div>
    )
  }
}
