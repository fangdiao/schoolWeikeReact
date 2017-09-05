import User from 'containers/User';
import Info from 'containers/User/Info';
import Release from 'containers/User/Release';

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
      component: Release,
    },
  ]
}
