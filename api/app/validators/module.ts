import vine from '@vinejs/vine'
import { existsInOrganization } from './helpers/organizations.js'

export const moduleValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(100),
    statusId: vine.number().exists(existsInOrganization('statuses')),
  })
)
