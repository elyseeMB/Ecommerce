import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async show({ response }: HttpContext) {
    return response.status(200).json({ message: 'je suis le message' })
  }

  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    console.log(data)
    return response.json({ server: data })
  }
}
