import React from 'react';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';
import Wrapper from './Wrapper';

import './style';

class FDImageEditor extends React.Component {

  state = {
    imageFile: '',
    visible: false,
    imagePreview: ''
  }


  getBolb = (b64Data, contentType, sliceSize) => {
    b64Data = b64Data.substr(22);
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  upImg = (compressed) => {
    let { studentUpImg } = this.props.actions
    var fileBlob = this.getBolb(compressed, "image/jpeg");
    var fd = new FormData();
    fd.append("image", fileBlob);
    console.log(fileBlob);
    console.log(fd);
    studentUpImg(fd).then(r => console.log(r));
  }

  close = () => {
    this.fileInput.value = '';
    this.setState({ imageFile: '', visible: false });
  }

  getImage = (imagePreview) => {
    this.upImg(imagePreview);
    let { toParent } = this.props;
    this.fileInput.value = '';
    this.setState({ imageFile: '', imagePreview, visible: false }, () => toParent({ image: imagePreview }));
  }

  onChange = (e) => {
    let imageFile = e.target.files[0];
    this.setState({ imageFile, visible: true });
  }

  render() {
    console.log(this.props)
    let { imageFile, visible, imagePreview } = this.state;
    return (
      <div className="FDImageEditor-preview">
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
export default connect(state => state.login, loginActions)(FDImageEditor);

