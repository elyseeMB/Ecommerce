import { ModelQueryBuilder } from '@adonisjs/lucid/orm'
import { LucidRow } from '@adonisjs/lucid/types/model'

// .query()
// .orderBy('order', 'desc')
// .first()

declare module '@adonisjs/lucid/types/model' {
  interface ModelQueryBuilderContract<Model extends LucidModel, Result = InstanceType<Model>> {
    getCount(): Promise<BigInt>
  }
}

declare module '@adonisjs/lucid/orm' {
  interface ModelQueryBuilder {
    getCount(): Promise<BigInt>
  }
}

ModelQueryBuilder.macro('getCount', async function (this: ModelQueryBuilder) {
  return this.count('* as total')
    .first()
    .then((res: LucidRow) => res.$extras.total)
})
