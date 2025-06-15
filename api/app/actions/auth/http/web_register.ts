import User from '#models/user'
import { registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'

type Params = {
  data: Infer<typeof registerValidator>
}

@inject()
export class WebRegister {
  constructor(protected ctx: HttpContext) {}

  async handle({ data }: Params) {
    const user = await User.create(data)

    await this.ctx.auth.use('web').login(user)

    return { user }
  }

  // async #createToken(user: User) {
  //   const userAgent = this.ctx.request.header('user-agent', 'Unknow')
  //   const clientIp = this.ctx.request.ip()

  //   const accessToken = await User.accessTokens.create(user, [], {
  //     name: `Access - ${userAgent} - ${clientIp}`.toString(),
  //   })

  //   return accessToken
  // }

  #checkForOrganizationInvite(user: User) {}
}
