import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { existsInOrganization } from './helpers/organizations.js'

export const lessonValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(150),
    publishAt: vine
      .date({
        formats: {
          utc: true,
        },
      })
      .nullable()
      .optional()
      .transform((value) => (value ? DateTime.fromJSDate(value) : null)),

    moduleId: vine.number().exists(existsInOrganization('modules')),
    accessLevelId: vine.number().exists(existsInOrganization('access_levels')),
    statusId: vine.number().exists(existsInOrganization('statuses')),
  })
)
