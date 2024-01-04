import Database from '@ioc:Adonis/Lucid/Database'

export default class DashboardController {
  public async index() {
    const fazendasDetalhes = await Database.from('farmers')
      .select(
        'estado',
        Database.raw('count(*) as quantidade'),
        Database.raw('sum(area_total_hectares) as area_total'),
        Database.raw('sum(area_vegetacao_hectares) as area_vegetacao'),
        Database.raw('sum(area_agricultavel_hectares) as area_agricultavel')
      )
      .groupBy('estado')

    const fazendas = await Database.from('farmers').select(
      Database.raw('count(*) as quantidade'),
      Database.raw('sum(area_total_hectares) as  area_total'),
      Database.raw('sum(area_vegetacao_hectares) as area_vegetacao'),
      Database.raw('sum(area_agricultavel_hectares) as area_agricultavel')
    )

    const culturas = await Database.from('planted_crops')
      .select('cultura', Database.raw('count(*) as quantidade'))
      .groupBy('cultura')

    return {
      fazendas,
      fazendas_detalhes: fazendasDetalhes,
      culturas,
    }
  }
}
