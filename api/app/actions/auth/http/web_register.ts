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
    const token = await this.ctx.auth.use('api').createToken(user)

    return { type: 'bearer', value: token.value!.release() }
  }

  #checkForOrganizationInvite(user: User) {}
}
