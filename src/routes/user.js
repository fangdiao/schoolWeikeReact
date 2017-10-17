import User from 'containers/User';
import Info from 'containers/User/Info';
import ReleaseChange from 'containers/User/ReleaseChange';
import Projects from 'containers/User/Projects';
import Message from 'containers/User/Message';

export default {
  path: "/user",
  component: User,
  childRoutes:  [
    {
      path: "/user/info",
      component: Info,
    },
    {
      path: "/user/release",
      component: ReleaseChange,
    },
    {
      path: "/user/changePro/:query",
      component: ReleaseChange,
    },
    {
      path: "/user/projects",
      component: Projects,
    },
    {
      path: "/user/message",
      component: Message,
    },
  ]
}
