import { organizationValidator } from '#validators/organization'
import { CookieClient, type HttpContext } from '@adonisjs/core/http'
import StoreOrganization from '../actions/organizations/store_organization.js'
import { inject } from '@adonisjs/core'
import setActiveOrganization from '../actions/organizations/http/set_active_organization.js'
import { activeCookieName } from '#config/organization'
import { Encryption } from '@adonisjs/core/encryption'

@inject()
export default class OrganizationsController {
  constructor(protected setActiveOrganization: setActiveOrganization) {}

  async create({
    auth,
    response,
    organizationId,
    organization,
    roleId,
    organizations,
  }: HttpContext) {
    const a = auth.user
    return response.json({ a, organization: organization, organizationId, roleId, organizations })
  }

  async store({ request, response, auth, organizationId }: HttpContext) {
    const data = await request.validateUsing(organizationValidator)
    const organization = await StoreOrganization.handle({
      user: auth.use('api').user,
      data,
    })

    this.setActiveOrganization.handle({ id: organization.id })

    return response.json({ organization })
  }
}
