/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

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
