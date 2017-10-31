import React from 'react';
import { Button } from 'antd';
import AvatarEditor from 'react-avatar-editor';

export default class Wrapper extends React.Component {

  state = {
    range: 1,
    rotate: 0
  }

  range = (e) => {
    this.setState({ range: Number(e.target.value) });
  }

  rotateLeft = () => {
    let { rotate } = this.state;
    rotate = rotate === 360 ? 90 : rotate+=90;
    this.setState({ rotate });
  }

  rotateRight = () => {
    let { rotate } = this.state;
    rotate = rotate === 0 ? 270 : rotate-=90;
    this.setState({ rotate });
  }

  save = () => {
    let { upImg } = this.props;
    let canvas = this.editor.canvas;
    let imgCanvas = document.createElement('canvas');
    imgCanvas.width = 150;
    imgCanvas.height = 150;
    imgCanvas.getContext('2d').drawImage(canvas, 42, 42, 180, 180, 0, 0, 150, 150);
    imgCanvas.toBlob(bolb => upImg(bolb),'image.png', .9);
  }

  render() {
    let { imageFile } = this.props;
    let { range, rotate } = this.state;
    return (
      <div className="FDImageEditor-wrapper">
        <div>
          <div className="close">
            <i onClick={this.props.close} className="iconfont icon-close"></i>
          </div>
          <h2>编辑头像</h2>
          <AvatarEditor
            ref={ele => this.editor = ele}
            image={imageFile}
            width={160}
            height={160}
            border={40}
            color={[0, 0, 0, 0.2]}
            scale={range}
            rotate={rotate}
          />
          <div className="range">
            <input onChange={this.range} type="range" min="1" max="3" step="0.01" defaultValue="1"/>
          </div>
          <div className="rotate">
            <Button onClick={this.rotateLeft} type="dashed">左转</Button>
            <Button onClick={this.rotateRight} type="dashed">右转</Button>
          </div>
          <div className="submit">
            <Button onClick={this.save} type="primary">提交</Button>
          </div>
        </div>
      </div>
    )
  }
}
