import vine from '@vinejs/vine'
import { existsInOrganization } from './helpers/organizations.js'

export const accessLevelValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    color: vine.string().maxLength(50).hexCode(),
  })
)

export const accessLevelOrderValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.number()),
  })
)

export const accessLevelDestroyValidator = vine.compile(
  vine.object({
    replacementId: vine.number().exists(existsInOrganization('access_levels')),
  })
)
