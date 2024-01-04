export default class PlantedCropsController {
  public async index() {
    const plantedCrops = [
      {
        id: 1,
        cultura: 'Soja',
      },
      {
        id: 2,
        cultura: 'Milho',
      },
      {
        id: 3,
        cultura: 'Algodão',
      },
      {
        id: 4,
        cultura: 'Café',
      },
      {
        id: 5,
        cultura: 'Cana de Açucar',
      },
    ]

    return {
      data: plantedCrops,
    }
  }
}
