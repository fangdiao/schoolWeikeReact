import StudentDetails from 'containers/Details/StudentDetails'
import TeacherDetails from 'containers/Details/TeacherDetails'

export default {
  path: "/details",
  childRoutes: [
    {
      path: "/details/studentDetails",
      component: StudentDetails
    },
    {
      path: "/details/teacherDetails",
      component: TeacherDetails
    }
  ]
}
