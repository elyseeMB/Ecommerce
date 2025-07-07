import { accessLevelValidator } from '#validators/access_level'
import { difficultyValidator } from '#validators/difficulty'
import { statusValidator } from '#validators/status'
import { Infer } from '@vinejs/vine/types'

export type AccessLevels = Infer<typeof accessLevelValidator> &
  Partial<{ id: number; order: number }>
export type Difficulties = Infer<typeof difficultyValidator> &
  Partial<{ id: number; order: number }>
export type Statuses = Infer<typeof statusValidator> & Partial<{ id: number; order: number }>
