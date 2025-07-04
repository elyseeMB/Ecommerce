import { difficultyValidator } from '#validators/difficulty'
import type { HttpContext } from '@adonisjs/core/http'
import StoreDifficulty from '../actions/difficultites/store_difficulty.js'

export default class DifficultiesController {
  async index({ organization, response }: HttpContext) {
    const difficulties = await organization.getDifficulties().withCount('courses')
    return response.json(difficulties)
  }

  async store({ organization, request, response }: HttpContext) {
    const data = await request.validateUsing(difficultyValidator)

    try {
      const info = await StoreDifficulty.handle({ organization, data })
      return response.status(200).json(info)
    } catch (error) {
      console.error(error)
      return response.status(404).json('error difficulty_controller')
    }
  }
}
