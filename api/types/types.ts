import { accessLevelValidator } from '#validators/access_level'
import { difficultyValidator } from '#validators/difficulty'
import { statusValidator } from '#validators/status'
import { Infer } from '@vinejs/vine/types'

export type AccessLevels = Infer<typeof accessLevelValidator> & { id: number; order: number }
export type Difficulties = Infer<typeof difficultyValidator>
export type Statuses = Infer<typeof statusValidator>
