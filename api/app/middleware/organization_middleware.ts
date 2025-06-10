import { activeCookieName } from '#config/organization'
import Organization from '#models/organization'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

@inject()
export default class OrganizationMiddleware {
  constructor(protected getActiveOrganization: any) {}

  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.use('web').user!

    try {
      ctx.organizationId = ctx.request.cookie(activeCookieName)
    } catch (_) {}
    /**
     * Middleware logic goes here (before the next call)
     */
    console.log(ctx)

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    organizationId?: number
    organization: Organization
    roleId: number
  }
}
