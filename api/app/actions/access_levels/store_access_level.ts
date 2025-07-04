import Organization from '#models/organization'
import { accessLevelValidator } from '#validators/access_level'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  data: Infer<typeof accessLevelValidator>
}

export default class StoreAccessLevel {
  static async handle({ organization, data }: Params) {
    const lastAcessLevel = await organization
      .related('accessLevels')
      .query()
      .orderBy('order', 'desc')
      .first()

    return organization.related('accessLevels').create({
      ...data,
      order: lastAcessLevel ? lastAcessLevel.order + 1 : 0,
    })
  }
}
