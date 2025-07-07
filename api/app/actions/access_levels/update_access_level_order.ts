import Organization from '#models/organization'
import { accessLevelOrderValidator, accessLevelValidator } from '#validators/access_level'
import { Infer } from '@vinejs/vine/types'
import { AccessLevels } from '../../../types/types.js'
import AccessLevel from '#models/access_level'

type Params = {
  organization: Organization
  ids: Infer<typeof accessLevelOrderValidator>['ids']
}

export default class UpdateAccessLevelOrder {
  static async handle({ organization, ids }: Params) {
    const accessLevels = await organization.getAccessLevels()
    return this.#updateOrder(accessLevels, ids)
  }

  static #updateOrder(accessLevels: AccessLevel[], ids: number[]) {
    const promises = ids.map((id, order) => {
      const accessLevel = accessLevels.find((record) => record.id === id)
      const isDefault = order === 0

      accessLevel?.merge({
        order,
        isDefault,
      })

      return accessLevel?.save()
    })

    return Promise.all(promises)
  }
}
