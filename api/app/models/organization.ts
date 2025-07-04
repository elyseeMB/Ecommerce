import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import AccessLevel from './access_level.js'
import Difficulty from './difficulty.js'
import Status from './status.js'
import Module from './module.js'
import Course from './course.js'
import Lesson from './lesson.js'

export default class Organization extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => User, {
    pivotTable: 'organization_users',
    pivotColumns: ['role_id'],
  })
  declare users: ManyToMany<typeof User>

  @hasMany(() => AccessLevel)
  declare accessLevels: HasMany<typeof AccessLevel>

  @hasMany(() => Difficulty)
  declare difficulties: HasMany<typeof Difficulty>

  @hasMany(() => Status)
  declare Statuses: HasMany<typeof Status>

  @hasMany(() => Module)
  declare modules: HasMany<typeof Module>

  @hasMany(() => Course)
  declare courses: HasMany<typeof Course>

  @hasMany(() => Lesson)
  declare lessons: HasMany<typeof Lesson>

  getAccessLevels() {
    return (<Organization>this).related('accessLevels').query().orderBy('order')
  }

  getDifficulties() {
    return (<Organization>this).related('difficulties').query().orderBy('order')
  }

  getStatuses() {
    return (<Organization>this).related('Statuses').query().orderBy('order')
  }
}
