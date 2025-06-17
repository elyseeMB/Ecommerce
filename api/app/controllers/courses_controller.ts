import { HttpContext } from '@adonisjs/core/http'

export default class CoursesController {
  async index({ organization, response }: HttpContext) {
    return response.json({ organization })
  }
}
