import { accessLevelValidator } from '#validators/access_level'
import type { HttpContext } from '@adonisjs/core/http'
import StoreAccessLevel from '../actions/access_levels/store_access_level.js'

export default class AccessLevelsController {
  async index({ organization, response }: HttpContext) {
    const accessLevels = await organization.getAccessLevels().withCount('courses')
    return response.json(accessLevels)
  }

  async store({ request, response, organization }: HttpContext) {
    const data = await request.validateUsing(accessLevelValidator)
    try {
      await StoreAccessLevel.handle({ organization, data })
      return response.status(200).json('ok')
    } catch (error) {
      console.error('Error storeAccess_level')
      return response.status(404).json('error action_access_level')
    }
  }
}
