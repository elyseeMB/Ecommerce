import Course from '#models/course'
import Organization from '#models/organization'
import { moduleValidator } from '#validators/module'
import { Infer } from '@vinejs/vine/types'

type Params = {
  courseId: number
  organization: Organization
  data: Infer<typeof moduleValidator>
}

export default class StoreModule {
  static async handle({ courseId, organization, data }: Params) {
    const course = await organization.related('courses').query().where('id', courseId).firstOrFail()

    return course.related('modules').create({
      ...data,
      organizationId: organization.id,
      order: await this.#findNextOrder(course),
    })
  }

  static async #findNextOrder(course: Course) {
    const lastModule = await course.related('modules').query().first()

    return lastModule ? lastModule.order + 1 : 1
  }
}
