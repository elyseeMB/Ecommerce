import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { WithOrganization } from './mixins/with_organization.js'
import Status from './status.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import AccessLevel from './access_level.js'
import Module from './module.js'

export default class Lesson extends compose(BaseModel, WithOrganization) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accessLevelId: number

  @column()
  declare statusId: number

  @column()
  declare moduleId: number

  @column()
  declare name: string

  @column()
  declare notes: string | null

  @column()
  declare order: number

  @column.dateTime()
  declare publish_at: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => AccessLevel)
  declare course: BelongsTo<typeof AccessLevel>

  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>

  @belongsTo(() => Module)
  declare modules: BelongsTo<typeof Module>
}
