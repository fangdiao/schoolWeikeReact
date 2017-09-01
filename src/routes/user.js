import User from 'containers/User';
import Info from 'containers/User/Info';

export default {
  path: "/user",
  component: User,
  childRoutes:  [
    {
      path: "/user/info",
      component: Info,
    },
  ]
}
