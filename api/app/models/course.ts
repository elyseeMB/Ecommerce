import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { WithOrganization } from './mixins/with_organization.js'
import Difficulty from './difficulty.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Module from 'module'
import Status from './status.js'
import AccessLevel from './access_level.js'

export default class Course extends compose(BaseModel, WithOrganization) {
  serializeExtras = true

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accessLevelId: number
  @column()
  declare difficultyId: number
  @column()
  declare statusId: number
  @column()
  declare name: string
  @column()
  declare notes: string | null
  @column()
  declare order: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => AccessLevel)
  declare accessLevel: BelongsTo<typeof AccessLevel>

  @belongsTo(() => Difficulty)
  declare difficulty: BelongsTo<typeof Difficulty>

  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>
}
