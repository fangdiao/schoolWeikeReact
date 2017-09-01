import React from 'react';

import Name from './item/Name';
import Sex from './item/Sex';
import EduBackground from './item/EduBackground';
import University from './item/University';
import Academy from './item/Academy';
import Major from './item/Major';
import EntryUniversity from './item/EntryUniversity';
import LeaveUniversity from './item/LeaveUniversity';
import Skills from './item/Skills';
import Experience from './item/Experience';
import Qq from './item/Qq';
import SelfFeel from './item/SelfFeel';
import Submit from './item/Submit';


import STYLE from './style';

export default class StudentInfo extends React.Component {
  render() {
    return (
      <form className={STYLE.student}>
        <Name />
        <Sex />
        <EduBackground />
        <University />
        <Academy />
        <Major />
        <EntryUniversity />
        <LeaveUniversity />
        <Skills />
        <Experience />
        <Qq />
        <SelfFeel />
        <Submit />
      </form>
    )
  }
}
