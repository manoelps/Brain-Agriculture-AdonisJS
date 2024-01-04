import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Helpers from 'App/Helpers/Functions'
import Farmer from 'App/Models/Farmer'
import PlantedCrop from 'App/Models/PlantedCrop'
import RegisterValidator from 'App/Validators/RegisterValidator'
import UpdateValidator from 'App/Validators/UpdateValidator'

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

    const areaValidate = this.helpers.areaCalculate(
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
        cultura_plantada: culturas.cultura,
        farmerId: farmer.id,
      }

      await PlantedCrop.create(plantedCrop)
    })

    response.status(201)

    return {
      message: 'Cadastro realizado com sucesso!',
    }
  }

  public async index() {
    const farmers = await Farmer.query().preload('plantedCrops')
    return {
      data: farmers,
    }
  }

  public async show({ params }: HttpContextContract) {
    const farmer = await Farmer.findOrFail(params.id)

    await farmer.load('plantedCrops')

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

  public async update({ params, request, response }: HttpContextContract) {
    await request.validate(UpdateValidator)

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

    const areaTotalHectares = body.area_total_hectares
    const areaAgricultavelHectares = body.area_agricultavel_hectares
    const areaVegetacaoHectares = body.area_vegetacao_hectares

    const areaValidate = this.helpers.areaCalculate(
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
        cultura_plantada: culturas.cultura,
        farmerId: params.id,
      }

      await PlantedCrop.create(plantedCrop)
    })

    return {
      message: 'Registro atualizado com sucesso!',
    }
  }

  public async destroyPlantedCrop({ params }: HttpContextContract) {
    const plantedCrop = await PlantedCrop.findOrFail(params.id)
    await plantedCrop.delete()
    return {
      message: 'Cultura removida com sucesso!',
    }
  }
}
