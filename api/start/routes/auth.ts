const RegisterController = () => import('#controllers/auth/register_controller')

const LoginController = () => import('#controllers/auth/login_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/register', [RegisterController, 'show']).as('register.show').use(middleware.guest())
router.post('/register', [RegisterController, 'store']).as('register.store').use(middleware.guest())

router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest())

router
  .group(() => {})
  .prefix('/forgot-password')
  .as('forgot-password')
  .use(middleware.guest())
