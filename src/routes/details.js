import ProDetails from 'components/FDProDetails';
import Student from 'containers/UserDetails/Student';
import Teacher from 'containers/UserDetails/Teacher';

export default {
  path: "/details",
  childRoutes: [
    {
      path: "/details/project/:query",
      component: ProDetails,
    },
    {
      path: "/details/teacher/:query",
      component: Teacher,
    },
    {
      path: "/details/student/:query",
      component: Student,
    }
  ]
}
