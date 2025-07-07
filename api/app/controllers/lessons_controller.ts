import { withOrganizationMetaData } from '#validators/helpers/organizations'
import { lessonValidator } from '#validators/lesson'
import type { HttpContext } from '@adonisjs/core/http'
import StoreLesson from '../actions/lessons/store_lesson.js'

export default class LessonsController {
  async store({ organization, request, response }: HttpContext) {
    const data = await request.validateUsing(
      lessonValidator,
      withOrganizationMetaData(organization.id)
    )
    try {
      const lesson = await StoreLesson.handle({
        organization,
        data,
      })
      return response.status(200).json(lesson)
    } catch (error) {
      console.error(error)
      return response.status(404).json('error lessons_controller')
    }
  }
}
