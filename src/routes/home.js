import Home from 'containers/Home';

export default {
  path: "/dist",
  component: Home,
  childRoutes: [
    {
      path: "/dist/search/:query",
      component: Home,
    },
    {
      path: "/dist/recommend",
      component: Home,
    },
  ]
}
