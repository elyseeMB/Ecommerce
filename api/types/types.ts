import { accessLevelValidator } from '#validators/access_level'
import { courseValidator } from '#validators/course'
import { difficultyValidator } from '#validators/difficulty'
import { statusValidator } from '#validators/status'
import { Infer } from '@vinejs/vine/types'

export type AccessLevels = Infer<typeof accessLevelValidator> &
  Partial<{ order: number }> & { id: number }
export type Difficulties = Infer<typeof difficultyValidator> &
  Partial<{ order: number }> & { id: number }
export type Statuses = Infer<typeof statusValidator> & Partial<{ order: number }> & { id: number }
export type Courses = Infer<typeof courseValidator> & {
  id: number
  organizationId: number
  accessLevelId: number
  difficultyId: number
  statusId: number
  meta: Record<string, any>
  notes: string
  order: number
}
