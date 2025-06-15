import Organization from '#models/organization'
import User from '#models/user'
import { organizationValidator } from '#validators/organization'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'
import Roles from '../../enums/roles.js'

type Params = {
  user: User
  data: Infer<typeof organizationValidator>
}

export default class StoreOrganization {
  static handle({ user, data }: Params) {
    return db.transaction(async (trx) => {
      // 1. Create our organization
      const organization = await Organization.create(data, { client: trx })

      // 2. make this user the admin
      const rolePromise = this.#assignAdmin(organization, user)
      //   const defaultsPromise = this.#createDefaults(organization)

      await Promise.all([rolePromise])

      return organization
    })
  }

  static async #assignAdmin(organization: Organization, user: User) {
    if (!user) {
      return
    }
    return await organization.related('users').attach({
      [user.id]: {
        role_id: Roles.ADMIN,
      },
    })
  }

  static async #createDefaults(organization: Organization) {
    return [Promise.resolve({ difficulties: 1 }), Promise.resolve({ statues: 1 })]
  }
}
