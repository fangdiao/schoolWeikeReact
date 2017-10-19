import ProDetails from 'containers/Details/ProDetails';
import Student from 'containers/Details/Student';
import Teacher from 'containers/Details/Teacher';

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
