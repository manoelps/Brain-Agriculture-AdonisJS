import PlantedCropsMock from 'App/Mocks/plantedCrops'

export default class PlantedCropsController {
  public async index() {
    const plantedCrops = new PlantedCropsMock()

    return {
      data: plantedCrops.mock_culture_crops,
    }
  }
}
