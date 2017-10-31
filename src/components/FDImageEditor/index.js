import React from 'react';
import { message } from 'antd';
import classnames from 'classnames';

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

  upImg = (bolb) => {
    let { studentUpImg } = this.props.actions
    var fd = new FormData();
    fd.append("image", bolb, "image.png");
    studentUpImg(fd).then(r => {
      let { ifSuccess, msg } = r.payload;
      if (ifSuccess) {
        message.success('修改图片成功');
        this.getImage(msg);
      }
    });
  }

  close = () => {
    this.fileInput.value = '';
    this.setState({ imageFile: '', visible: false });
  }

  getImage = (msg) => {
    let { toParent } = this.props;
    this.fileInput.value = '';
    this.setState({ imageFile: '', imagePreview: msg, visible: false }, () => toParent({ image: msg }));
  }

  onChange = (e) => {
    let imageFile = e.target.files[0];
    this.setState({ imageFile, visible: true });
  }

  componentWillReceiveProps(nextProps) {
    let preImagePreview = this.props.imagePreview;
    let { imagePreview } = nextProps;
    if (imagePreview !== preImagePreview) {
      this.setState({ imagePreview });
    }
  }

  render() {
    let { imageFile, visible, imagePreview } = this.state;
    return (
      <div className={classnames('FDImageEditor-preview', {['FDImageEditor-hover']: imagePreview})}>
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
          visible ? <Wrapper upImg={this.upImg} close={this.close} imageFile={imageFile} getImage={this.getImage} /> : null
        }
      </div>
    )
  }
}
export default connect(state => state.login, loginActions)(FDImageEditor);

