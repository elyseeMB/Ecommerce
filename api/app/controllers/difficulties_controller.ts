import {
  difficultyDestroyValidator,
  difficultyOrderValidator,
  difficultyValidator,
} from '#validators/difficulty'
import type { HttpContext } from '@adonisjs/core/http'
import StoreDifficulty from '../actions/difficultites/store_difficulty.js'
import UpdateDifficultyOrder from '../actions/difficultites/update_difficulty_order.js'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
import DestroyDifficulty from '../actions/difficultites/destroy_difficulty.js'
import UpdateDifficulty from '../actions/difficultites/update_difficulty.js'

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

  async order({ organization, request, response }: HttpContext) {
    const { ids } = await request.validateUsing(difficultyOrderValidator)

    try {
      const newItems = await UpdateDifficultyOrder.handle({ organization, ids })
      return response.status(200).json(newItems)
    } catch (error) {
      console.error(error)
      return response.status(404).json('error_DifficultiesController.order')
    }
  }

  async update({ organization, request, response, params }: HttpContext) {
    const data = await request.validateUsing(difficultyValidator)

    try {
      const difficulty = await UpdateDifficulty.handle({ id: params.id, organization, data })
      return response.status(200).json(difficulty)
    } catch (error) {
      console.error(error)
      return response.status(404).json('DifficultiesController.udpate')
    }
  }

  async destroy({ organization, request, response, params }: HttpContext) {
    const data = await request.validateUsing(
      difficultyDestroyValidator,
      withOrganizationMetaData(organization.id)
    )

    try {
      const { id } = await DestroyDifficulty.handle({ id: params.id, organization, data })
      return response.status(200).json(id)
    } catch (error) {
      console.error(error)
      return response.status(404).json('DifficultiesController.destroy')
    }
  }
}
