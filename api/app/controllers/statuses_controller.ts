import { statusDestroyValidator, statusOrderValidator, statusValidator } from '#validators/status'
import type { HttpContext } from '@adonisjs/core/http'
import StoreStatus from '../actions/statuses/store_status.js'
import UpdateStatus from '../actions/statuses/update_status.js'
import UpdateStatusOrder from '../actions/statuses/update_status_order.js'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
import DestroyStatus from '../actions/statuses/destroy_status.js'

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

  async update({ organization, request, response, params }: HttpContext) {
    const data = await request.validateUsing(statusValidator)

    try {
      const info = await UpdateStatus.handle({ organization, data, id: params.id })
      return response.json(info)
    } catch (error) {
      console.error(error)
      return response.status(404).json('error statusesController.update')
    }
  }

  async order({ request, organization, response }: HttpContext) {
    const { ids } = await request.validateUsing(statusOrderValidator)

    try {
      const info = await UpdateStatusOrder.handle({ organization, ids })
      return response.json(info)
    } catch (error) {
      console.error(error)
      return response.status(404).json('error statusesController.order')
    }
  }

  async destroy({ request, params, organization, response }: HttpContext) {
    const data = await request.validateUsing(
      statusDestroyValidator,
      withOrganizationMetaData(organization.id)
    )

    try {
      const { id } = await DestroyStatus.handle({ organization, id: params.id, data })
      return response.json(id)
    } catch (error) {
      console.error(error)
      return response.status(404).json('error statusesController.order')
    }
  }
}
