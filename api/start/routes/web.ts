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
const AccessLevelsController = () => import('#controllers/access_levels_controller')
const DifficultiesController = () => import('#controllers/difficulties_controller')
const LessonsController = () => import('#controllers/lessons_controller')
const ModulesController = () => import('#controllers/modules_controller')
const StatusesController = () => import('#controllers/statuses_controller')
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
    /* STATUSES */
    router.get('/statuses', [StatusesController, 'index']).as('statuses.index')
    router.post('/statuses', [StatusesController, 'store']).as('statuses.store')

    /* DIFFICULTIES */
    router.get('/difficulties', [DifficultiesController, 'index']).as('difficulties.index')
    router.post('/difficulties', [DifficultiesController, 'store']).as('difficulties.store')
    router.put('/difficulties/order', [DifficultiesController, 'order']).as('difficulties.order')
    router.put('/difficulties/:id', [DifficultiesController, 'update']).as('difficulties.update')
    router
      .delete('/difficulties/:id', [DifficultiesController, 'destroy'])
      .as('difficulties.destroy')

    /* ACCESS_LEVELS */
    router.get('/access-levels', [AccessLevelsController, 'index']).as('access-levels.index')
    router.post('/access-levels', [AccessLevelsController, 'store']).as('access-levels.store')
    router.put('/access-levels/order', [AccessLevelsController, 'order']).as('access-levels.order')
    router.put('/access-levels/:id', [AccessLevelsController, 'update']).as('access-levels.update')
    router
      .delete('/access-levels/:id', [AccessLevelsController, 'destroy'])
      .as('access-levels.destroy')

    /* COURSES */
    router.get('/courses', [CoursesController, 'index']).as('course.index')
    router.post('/courses', [CoursesController, 'store']).as('courses.store')

    /* MODULES */
    router.post('/courses/:courseId/modules', [ModulesController, 'store']).as('modules.stores')

    /* LESSONS */
    router.post('/lessons', [LessonsController, 'store']).as('lessons.store')
  })
  .use([middleware.auth({ guards: ['web'] }), middleware.organization()])
