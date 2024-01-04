export default class Helpers {
  public areaCalculate = (total, areaAgricultavel, areaVegetacao) => {
    if (areaAgricultavel + areaVegetacao > total) {
      return {
        errors: [
          {
            rule: 'area',
            field: 'area_total',
            message:
              'a soma de área agrícola e vegetação não deve ser maior que a área total da fazenda.',
          },
        ],
      }
    }

    return null
  }
}
