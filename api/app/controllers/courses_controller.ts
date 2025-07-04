import { courseValidator } from '#validators/course'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
import { HttpContext } from '@adonisjs/core/http'
import GetCourses from '../actions/courses/get_courses.js'
import StoreCourse from '../actions/courses/store_course.js'

export default class CoursesController {
  async index({ organization, response }: HttpContext) {
    const courses = await GetCourses.handle({ organization })
    return response.json({ courses })
  }

  async store({ request, response, organization }: HttpContext) {
    const data = await request.validateUsing(
      courseValidator,
      withOrganizationMetaData(organization.id)
    )

    try {
      const courses = await StoreCourse.handle({ organization, data })
      return response.status(200).json(courses)
    } catch (error) {
      console.error('error courses_controller')
      return response.status(404).json('error courses_controller')
    }
  }
}
