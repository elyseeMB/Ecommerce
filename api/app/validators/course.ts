import vine from '@vinejs/vine'
import { existsInOrganization } from './helpers/organizations.js'

export const courseValidator = vine.compile(
  vine.object({
    accessLevelId: vine.number().exists(existsInOrganization('access_levels')),
    difficultyId: vine.number().exists(existsInOrganization('difficulty')),
    statusId: vine.number().exists(existsInOrganization('statuses')),

    name: vine.string().maxLength(150),
    notes: vine.string().optional(),
  })
)
