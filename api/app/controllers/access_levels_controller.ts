import {
  accessLevelDestroyValidator,
  accessLevelOrderValidator,
  accessLevelValidator,
} from '#validators/access_level'
import type { HttpContext } from '@adonisjs/core/http'
import StoreAccessLevel from '../actions/access_levels/store_access_level.js'
import UpdateAccessLevelOrder from '../actions/access_levels/update_access_level_order.js'
import UpdateAccessLevel from '../actions/access_levels/update_access_level.js'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
import DestroyAccessLevel from '../actions/access_levels/destroy_access_level.js'

export default class AccessLevelsController {
  async index({ organization, response }: HttpContext) {
    const accessLevels = await organization.getAccessLevels().withCount('courses')
    return response.json(accessLevels)
  }

  async store({ request, response, organization }: HttpContext) {
    const data = await request.validateUsing(accessLevelValidator)
    try {
      const doc = await StoreAccessLevel.handle({ organization, data })
      return response.status(200).json(doc)
    } catch (error) {
      console.error('Error storeAccess_level')
      return response.status(404).json('error action_access_level')
    }
  }

  async order({ organization, request, response }: HttpContext) {
    const { ids } = await request.validateUsing(accessLevelOrderValidator)

    try {
      const newItems = await UpdateAccessLevelOrder.handle({ organization, ids })
      return response.status(200).json(newItems)
    } catch (error) {
      console.error(error)
      return response.status(404)
    }
  }

  async update({ organization, request, response, params }: HttpContext) {
    const data = await request.validateUsing(accessLevelValidator)

    try {
      const newItems = await UpdateAccessLevel.handle({ organization, data, id: params.id })
      return response.status(200).json(newItems)
    } catch (error) {
      console.error(error)
      return response.status(404)
    }
  }

  async destroy({ organization, params, request, response }: HttpContext) {
    const data = await request.validateUsing(
      accessLevelDestroyValidator,
      withOrganizationMetaData(organization.id)
    )

    try {
      const { id } = await DestroyAccessLevel.handle({ organization, data, id: params.id })
      return response.status(200).json(id)
    } catch (error) {
      console.error(error)
      return response.status(404)
    }
  }
}
