import { courseValidator } from '#validators/course'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
import { HttpContext } from '@adonisjs/core/http'

export default class CoursesController {
  async index({ organization, response }: HttpContext) {
    return response.json({ organization })
  }

  async store({ request, response, organization }: HttpContext) {
    const data = await request.validateUsing(
      courseValidator,
      withOrganizationMetaData(organization.id)
    )

    console.log(data)
    return response.json(data)
  }
}
