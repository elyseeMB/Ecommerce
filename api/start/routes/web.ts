/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const OrganizationsController = () => import('#controllers/organizations_controller')
import User from '#models/user'
import { middleware } from '#start/kernel'
import { registerValidator } from '#validators/auth'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router
      .get('/organizations/create', [OrganizationsController, 'create'])
      .as('organizations.create')

    router.post('/organizations', [OrganizationsController, 'store']).as('organizations.store')
  })
  .use([middleware.auth({ guards: ['api'] }), middleware.organization()])

router
  .get('/me', async ({ auth, response }) => {
    if (auth.isAuthenticated) {
      return auth.use('api').user
    }
    return response.status(401).unauthorized()
  })
  .use(middleware.auth({ guards: ['api'] }))

router
  .post('/login', async ({ auth, response, request }) => {
    const data = await request.validateUsing(registerValidator)

    const user = await User.verifyCredentials(data.email, data.password)

    console.log(data)

    return

    if (auth.isAuthenticated) {
      return auth.use('api').user
    }
    return response.status(401).unauthorized()
  })
  .use(middleware.guest())

router.get('/', async () => {
  return {
    hello: 'world',
    doc: [
      {
        id: 1,
        name: 'je suis le name 1',
      },
      {
        id: 2,
        name: 'je suis le name 2',
      },
    ],
  }
})
