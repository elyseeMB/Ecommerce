import { withOrganizationMetaData } from '#validators/helpers/organizations'
import { moduleValidator } from '#validators/module'
import type { HttpContext } from '@adonisjs/core/http'
import StoreModule from '../actions/modules/store_module.js'

export default class ModulesController {
  async store({ organization, response, request, params }: HttpContext) {
    const data = await request.validateUsing(
      moduleValidator,
      withOrganizationMetaData(organization.id)
    )

    try {
      const module = await StoreModule.handle({
        courseId: params.courseId,
        organization,
        data,
      })
      return response.status(200).json(module)
    } catch (error) {
      console.error(error)
      return response.status(404).json('error_modulesController')
    }
  }
}
