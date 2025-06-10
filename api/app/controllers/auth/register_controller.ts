import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { WebRegister } from '../../actions/auth/http/web_register.js'
import { inject } from '@adonisjs/core'

export default class RegisterController {
  async show({ response }: HttpContext) {
    return response.status(200).json({ message: 'je suis le message' })
  }

  @inject()
  async store({ request, response }: HttpContext, webRegister: WebRegister) {
    const data = await request.validateUsing(registerValidator)

    const { value, type } = await webRegister.handle({ data })

    return response.json({
      token: value,
      type: type,
    })
  }
}
