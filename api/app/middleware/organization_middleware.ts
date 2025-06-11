import { activeCookieName } from '#config/organization'
import Organization from '#models/organization'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import GetActiveOrganization from '../actions/organizations/http/get_active_organization.js'
import GetOrganizationUserRoleId from '../actions/organizations/get_organization_user_role_id.js'

@inject()
export default class OrganizationMiddleware {
  constructor(protected getActiveOrganization: GetActiveOrganization) {}

  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.use('api').user!

    try {
      ctx.organizationId = ctx.request.cookie(activeCookieName)

      const organization = await this.getActiveOrganization.handle()
      const roleId = await GetOrganizationUserRoleId.handle({
        organizationId: organization.id,
        userId: user.id,
      })

      ctx.organization = organization
      ctx.roleId = roleId
    } catch (_) {}
    /**
     * Middleware logic goes here (before the next call)
     */

    /**
     * Call next method in the pipeline and return its output
     */

    const organizations = await user.related('organizations').query().orderBy('name')
    ctx.organizations = organizations

    ctx.response.send({
      organization: ctx.organization,
      organizations: organizations,
    })

    const output = await next()
    return output
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    organizationId?: number
    organizations: Organization[]
    organization: Organization
    roleId: number
  }
}
