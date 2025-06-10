import vine from '@vinejs/vine'

const emailRule = vine.string().maxLength(254).email().normalizeEmail()

export const newEmailRule = emailRule.clone().unique(async (db, value) => {
  const exists = await db.from('users').where('email', value).select('id').first()
  return !exists
})

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(254),
    email: newEmailRule.clone(),
    password: vine.string().minLength(8),
  })
)
