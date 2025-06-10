/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const OrganizationsController = () => import('#controllers/organizations_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router
      .get('/organizations/create', [OrganizationsController, 'create'])
      .as('organizations.create')

    router.post('/organizations', [OrganizationsController, 'store']).as('organizations.store')
  })
  .use([middleware.auth({ guards: ['api'] }), middleware.organization()])

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
