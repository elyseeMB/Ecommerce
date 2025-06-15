import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    if (auth.isAuthenticated) {
      const user = auth.user
      return {
        user,
      }
    }
    throw new Error('Error not Auth')
  }
}
