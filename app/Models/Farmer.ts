import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Farmer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cpf_cnpj: string

  @column()
  public nome_produtor: string

  @column()
  public nome_fazenda: string

  @column()
  public cidade: string

  @column()
  public estado: string

  @column()
  public area_total_hectares: number

  @column()
  public area_agricultavel_hectares: number

  @column()
  public area_vegetacao_hectares: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
