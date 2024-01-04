import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class PlantedCrop extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cultura: string

  @column()
  public farmerId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
