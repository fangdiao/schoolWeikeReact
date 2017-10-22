import Info from 'containers/User/Info';
import ReleaseChange from 'containers/User/ReleaseChange';
import Projects from 'containers/User/Projects';
import Message from 'containers/User/Message';

export default [
  {
    path: "info",
    component: Info,
  },
  {
    path: "release",
    component: ReleaseChange,
  },
  {
    path: "changePro/:query",
    component: ReleaseChange,
  },
  {
    path: "projects",
    component: Projects,
  },
  {
    path: "message",
    component: Message,
  },
]
