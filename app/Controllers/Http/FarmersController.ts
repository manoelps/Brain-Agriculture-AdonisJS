import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Helpers from 'App/Helpers/Functions'
import Farmer from 'App/Models/Farmer'
import PlantedCrop from 'App/Models/PlantedCrop'
import RegisterValidator from 'App/Validators/RegisterValidator'
import UpdateValidator from 'App/Validators/UpdateValidator'

import { handleRowNotFoundError } from '../Utils/ErrorHandlers'

export default class FarmersController {
  private helpers = new Helpers()

  public async store({ request, response }: HttpContextContract) {
    await request.validate(RegisterValidator)

    const body = request.body()
    const culturasPlantadas = body.culturas_plantadas
    const areaTotalHectares = body.area_total_hectares
    const areaAgricultavelHectares = body.area_agricultavel_hectares
    const areaVegetacaoHectares = body.area_vegetacao_hectares
    delete body.culturas_plantadas

    const areaValidate = this.helpers.calculateArea(
      areaTotalHectares,
      areaAgricultavelHectares,
      areaVegetacaoHectares
    )

    if (areaValidate) {
      return response.status(400).json(areaValidate)
    }

    const farmer = await Farmer.create(body)

    culturasPlantadas.map(async (culturas) => {
      const plantedCrop = {
        cultura: culturas.cultura,
        farmerId: farmer.id,
      }

      await PlantedCrop.create(plantedCrop)
    })

    response.status(201)

    return {
      message: 'Cadastro realizado com sucesso!',
    }
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 5

    const farmers = await Farmer.query().preload('plantedCrops').paginate(page, limit)

    return {
      data: farmers,
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const farmer = await Farmer.query()
        .where('id', params.id)
        .preload('plantedCrops')
        .firstOrFail()

      return { data: farmer }
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        handleRowNotFoundError(response)
      }
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      await (await Farmer.query().where('id', params.id).firstOrFail()).delete()

      return {
        message: 'Registro exluído com sucesso!',
      }
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        handleRowNotFoundError(response)
      }
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const farmer = await Farmer.findOrFail(params.id)

    await request.validate(UpdateValidator)

    const body = request.body()

    farmer.cpf_cnpj = body.cpf_cnpj
    farmer.nome_produtor = body.nome_produtor
    farmer.nome_fazenda = body.nome_fazenda
    farmer.cidade = body.cidade
    farmer.estado = body.estado
    farmer.area_total_hectares = body.area_total_hectares
    farmer.area_agricultavel_hectares = body.area_agricultavel_hectares
    farmer.area_vegetacao_hectares = body.area_vegetacao_hectares

    const areaTotalHectares = body.area_total_hectares
    const areaAgricultavelHectares = body.area_agricultavel_hectares
    const areaVegetacaoHectares = body.area_vegetacao_hectares

    const areaValidate = this.helpers.calculateArea(
      areaTotalHectares,
      areaAgricultavelHectares,
      areaVegetacaoHectares
    )

    if (areaValidate) {
      return response.status(400).json(areaValidate)
    }

    await farmer.save()

    await PlantedCrop.query().where('farmer_id', params.id).delete()

    body.culturas_plantadas.map(async (culturas) => {
      const plantedCrop = {
        cultura: culturas.cultura,
        farmerId: params.id,
      }

      await PlantedCrop.create(plantedCrop)
    })

    return {
      message: 'Registro atualizado com sucesso!',
    }
  }

  public async destroyPlantedCrop({ params, response }: HttpContextContract) {
    try {
      const plantedCrop = await PlantedCrop.findOrFail(params.id)
      await plantedCrop.delete()
      return {
        message: 'Cultura removida com sucesso!',
      }
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        handleRowNotFoundError(response)
      }
    }
  }
}
