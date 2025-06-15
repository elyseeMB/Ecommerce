import { loginValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'
import limiter from '@adonisjs/limiter/services/main'
import User from '#models/user'

@inject()
export default class WebLogin {
  constructor(protected ctx: HttpContext) {}

  get limit() {
    return limiter.use({
      requests: 3,
      duration: '3 hours',
      blockDuration: '24 hours',
    })
  }

  async handle({ data }: { data: Infer<typeof loginValidator> }) {
    const key = this.getRateKey(data.email)

    const [error, user] = await this.limit.penalize(key, () => {
      return User.verifyCredentials(data.email, data.password)
    })

    if (error) {
      this.ctx.session.flashAll()
      this.ctx.session.flashErrors({
        E_TOO_MANY_REQUESTS: `Too many login requests. Try again after ${error.response.availableIn} seconds`,
      })
      return this.ctx.response.redirect().back()
    }

    await this.ctx.auth.use('web').login(user, data.remember)

    return user
  }

  getRateKey(email: string) {
    return `login_${this.ctx.request.ip()}_${email}`
  }
}
