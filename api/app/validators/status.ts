import vine from '@vinejs/vine'

export const statusValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    color: vine.string().maxLength(50).hexCode(),
  })
)
