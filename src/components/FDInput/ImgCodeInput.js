import React from 'react'
import { Button, Icon } from 'antd';
import loginActions from 'actions/login';
import { connect } from 'utils/helper';

import STYLE from './style';

class ImgCodeInput extends React.Component {

  static defaultProps = {
    toParent: () => {}
  }

  state = {
    err: false,
  }

  componentWillMount() {
    this.getImgCode();
  }

  getImgCode = () => {
    let { actions } = this.props;
    actions.getImgCode();
  }

  onChange = (e) => {
    let text = e.target.value;
    let { toParent } = this.props;
    this.setState({
      err: text.length < 6
    }, () => toParent({ imgCode: text }, { imgCode: !!text && !this.state.err })
    );

  }

  render() {

    let { imgCode } = this.props.data.login;
    let className = this.props.height ? "img-code height" : "img-code";

    return (
      <div className={className}>
        <input
          type="text"
          maxLength="6"
          placeholder="验证码"
          onChange={this.onChange}
        />
        {
          this.state.err ? <Icon className="img-code-error error" type="close" /> : null
        }
        {
          imgCode ? <span onClick={this.getImgCode} style={{"backgroundImage": `url(${imgCode})`}}></span> :
          <Icon type="loading" className="loading" />
        }
      </div>
    )
  }
}

export default connect(state => state, loginActions)(ImgCodeInput);
