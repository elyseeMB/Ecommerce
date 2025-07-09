import Organization from '#models/organization'
import { difficultyDestroyValidator } from '#validators/difficulty'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'

type Params = {
  id: number
  organization: Organization
  data: Infer<typeof difficultyDestroyValidator>
}

export default class DestroyDifficulty {
  static async handle({ id, organization, data }: Params) {
    const result = await db.transaction(async (trx) => {
      organization.useTransaction(trx)

      await organization.related('courses').query().where('difficultyId', id).update({
        difficultyId: data.replacementId,
      })

      const difficulty = await organization
        .related('difficulties')
        .query()
        .where({ id })
        .firstOrFail()

      await difficulty.delete()

      return difficulty
    })
    return result
  }
}
