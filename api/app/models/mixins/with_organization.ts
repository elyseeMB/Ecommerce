import Organization from '#models/organization'
import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export const WithOrganization = <T extends NormalizeConstructor<typeof BaseModel>>(
  superclass: T
) => {
  class MixinCalss extends superclass {
    @column()
    declare organizationId: number

    @belongsTo(() => Organization)
    declare organization: BelongsTo<typeof Organization>
  }

  return MixinCalss
}
