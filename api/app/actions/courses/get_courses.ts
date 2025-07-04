import Organization from '#models/organization'

type Params = {
  organization: Organization
}

export default class GetCourses {
  static handle({ organization }: Params) {
    return organization
      .related('courses')
      .query()
      .preload('accessLevel')
      .preload('difficulty')
      .preload('status')
      .orderBy('order')
  }
}
