/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const SessionController = () => import('#controllers/session_controller')
const OrganizationsController = () => import('#controllers/organizations_controller')
const CoursesController = () => import('#controllers/courses_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/me', [SessionController, 'index']).as('session.user')

    router
      .get('/organizations/create', [OrganizationsController, 'create'])
      .as('organizations.create')

    router.post('/organizations', [OrganizationsController, 'store']).as('organizations.store')
  })
  .use(middleware.auth({ guards: ['web'] }))

router
  .group(() => {
    /* COURSES */
    router.get('/courses', [CoursesController, 'index']).as('course.index')
    router.post('/courses', [CoursesController, 'store']).as('courses.store')
  })
  .use([middleware.auth({ guards: ['web'] }), middleware.organization()])
