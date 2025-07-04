import { statusValidator } from '#validators/status'
import type { HttpContext } from '@adonisjs/core/http'
import StoreStatus from '../actions/statuses/store_status.js'

export default class StatusesController {
  async index({ response, organization }: HttpContext) {
    const statuses = await organization.getStatuses().withCount('courses')
    return response.json(statuses)
  }

  async store({ organization, request, response }: HttpContext) {
    const data = await request.validateUsing(statusValidator)

    try {
      const info = await StoreStatus.handle({ organization, data })
      return response.json(info)
    } catch (error) {
      console.error(error)
      return response.status(404).json('error statuses_controller')
    }
  }
}
