import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import WebLogin from '../../actions/auth/http/web_login.js'
import { loginValidator } from '#validators/auth'

export default class LoginController {
  @inject()
  async store({ request, response }: HttpContext, webLogin: WebLogin) {
    const data = await request.validateUsing(loginValidator)

    const user = await webLogin.handle({ data })

    if (!user) {
      throw new Error('user not found.')
    }
    return response.json(user)
  }
}
