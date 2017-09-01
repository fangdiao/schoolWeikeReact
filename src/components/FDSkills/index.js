import React from 'react';
import { TreeSelect, message } from 'antd';

import STYLE from './style';

const TreeNode = TreeSelect.TreeNode;

const data = [{
  value: '信息技术',
  children: [{
    value: 'web前端',
    children: [
      { value: 'HTML/CSS' },
      { value: 'Bootstrap' },
      { value: 'CSS3' },
      { value: 'javaScript' },
      { value: 'jQuery.js' },
      { value: 'Node.js' },
      { value: 'Less/Sass' },
      { value: 'React.js' },
      { value: 'Angular.js' },
      { value: 'Vue.js' },
      { value: 'Webpack.js' },
    ]
  },{
    value: '后端开发',
    children: [
      { value: 'java' },
      { value: 'Spring' },
      { value: 'Spring boot' },
      { value: 'PHP' },
      { value: 'Python' },
      { value: 'C#' },
      { value: 'C++' },
    ]
  },{
    value: '数据库',
    children: [
      { value: 'MySql' },
      { value: 'MongoDB' },
      { value: 'Oracel' },
      { value: 'SQL Server' },
    ]
  },{
    value: 'UI设计',
    children: [
      { value: 'PhotoShop' },
      { value: 'AI' },
    ]
  },{
    value: '移动开发',
    children: [
      { value: 'IOS' },
      { value: 'Android' },
      { value: 'Unity 3D' },
      { value: 'Cocos2d-x' },
    ]
  }]
},{
  value: '敬请期待'
}];

export default class FDSkills extends React.Component {

  state = {
    visible: false,
    firstUl: '', //第一列选中的词条
    secondUl: [], //第二列真个数组
    thridUl: {}, //第三列对象
    skills: []  //选中的数组
  }

  clickDrect = (e) => {
    let { secondUl } = this.state;
    let direct = e.target.dataset.direct;
    let item = secondUl.filter(item => item['value'] === direct)[0];
    this.setState({ thridUl: item })
  }

  clickSubject = (e) => {
    let subject = e.target.dataset.subject;
    let item = data.filter(item => item['value'] === subject)[0].children;
    item ? this.setState({ firstUl: subject, secondUl: item }) : this.setState({ firstUl: subject, secondUl: [],thridUl: [] });
  }

  remove = (e) => {
    e.stopPropagation ? window.event.cancelBubble = true : e.stopPropagation();
    let { skills } = this.state;
    let skill = e.target.dataset.skill;
    skills = skills.filter(o => o !== skill);
    this.setState({ skills });
  }

  show = () => {
    this.setState(previousState => ({ visible: !previousState.visible }));
  }

  clickLanguage = (e) => {
    let { skills } = this.state;
    let language = e.target.dataset.language;
    if (skills.filter(o => o === language).length) {
      skills = skills.filter(o => o !== language);
    } else {
      if (skills.length <= 8) {
        skills = [ ...skills, language ];
      } else {
        message.destroy();
        message.error('最多选取九个');
      }
    }
    this.setState({ skills });
  }

  render() {
    let { visible, firstUl, secondUl, thridUl, skills } = this.state;
    let { width } = this.props;
    let classNameHover = 'background-hover';
    let classNameSelect = 'background-white';
    return (
      <span className="FDSkills" style={{"width": width}}>
        <div className="show" onClick={this.show}>
          {/* <input type="text" /> */}
          {
            !skills.length ? null : (
              <ul>
                {
                  skills.map(o =>
                    (
                      <li key={o}>{o}<i data-skill={o} onClick={this.remove} className="iconfont icon-close"></i></li>
                    )
                  )
                }
              </ul>
            )
          }
          {/* {
            !skills.length ? null: (
              skills.map(o => <span key={o}>{o}<i data-skill={o} onClick={this.remove} className="iconfont icon-close"></i></span>)
            )
          } */}
        </div>
        {
          !visible ? null : (
            <div className="select">
              <ul>
                {
                  data.map(item => (
                      <li
                        className={firstUl === item.value ? classNameSelect : classNameHover}
                        data-subject={item.value}
                        key={item.value}
                        onClick={this.clickSubject}
                      >{item.value}</li>
                    )
                  )
                }
              </ul>
              {
                !secondUl.length ? null: (
                  <ul>
                    {
                      secondUl.map(item =>
                        (
                          <li
                            className={thridUl.value === item.value ? classNameSelect : classNameHover}
                            onClick={this.clickDrect}
                            data-direct={item.value}
                            key={item.value}
                          >{item.value}</li>
                        )
                      )
                    }
                  </ul>
                )
              }
              {
                !thridUl.value ? null: (
                  <ul>
                    {
                      thridUl.children.map(item => (
                          <li
                            className={skills.filter(o => o === item.value).length ? classNameSelect : classNameHover}
                            data-language={item.value}
                            onClick={this.clickLanguage}
                            key={item.value}
                          >{item.value}</li>
                        )
                      )
                    }
                  </ul>
                )
              }
            </div>
          )
        }
      </span>
    )
  }
}
