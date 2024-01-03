import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farmer from 'App/Models/Farmer'

export default class FarmersController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const farmer = await Farmer.create(body)

    response.status(201)

    return {
      message: 'Cadastro realizado com sucesso!',
      data: farmer,
    }
  }

  public async index() {
    const farmers = await Farmer.all()
    return {
      data: farmers,
    }
  }
  public async show({ params }: HttpContextContract) {
    const farmer = await Farmer.findOrFail(params.id)

    return {
      data: farmer,
    }
  }
  public async destroy({ params }: HttpContextContract) {
    const farmer = await Farmer.findOrFail(params.id)

    await farmer.delete()

    return {
      message: 'Registro exluído com sucesso!',
    }
  }
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const farmer = await Farmer.findOrFail(params.id)

    farmer.cpf_cnpj = body.cpf_cnpj
    farmer.nome_produtor = body.nome_produtor
    farmer.nome_fazenda = body.nome_fazenda
    farmer.cidade = body.cidade
    farmer.estado = body.estado
    farmer.area_total_hectares = body.area_total_hectares
    farmer.area_agricultavel_hectares = body.area_agricultavel_hectares
    farmer.area_vegetacao_hectares = body.area_vegetacao_hectares

    await farmer.save()

    return {
      message: 'Registro atualizado com sucesso!',
      data: farmer,
    }
  }
}
