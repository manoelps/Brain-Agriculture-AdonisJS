import { test } from '@japa/runner'

test.group('Farmers store', () => {
  const resource = '/api/v1/farmers'

  test('should fail with status 422 - invalid cpf_cnpj', async ({ client }) => {
    const response = await client.post(resource).json({
      cpf_cnpj: '61.479.106/01-80',
      nome_produtor: 'Manoel Pereira dos Santos',
      nome_fazenda: 'Fazenda Ouro Preto',
      cidade: 'Palmópolis',
      estado: 'MG',
      area_total_hectares: 5,
      area_agricultavel_hectares: 2,
      area_vegetacao_hectares: 3,
      culturas_plantadas: [],
    })

    response.assertStatus(422)

    response.assertBodyContains({
      errors: [
        {
          rule: 'regex',
          field: 'cpf_cnpj',
          message: 'cpf_cnpj inválido',
        },
      ],
    })
  })

  test('should fail with status 400 - agricultural area + vegetation greater than the value of the farm', async ({
    assert,
    client,
  }) => {
    const response = await client.post(resource).json({
      cpf_cnpj: '037.568.975-32',
      nome_produtor: 'Manoel Pereira dos Santos',
      nome_fazenda: 'Fazenda Ouro Preto',
      cidade: 'Palmópolis',
      estado: 'MG',
      area_total_hectares: 5,
      area_agricultavel_hectares: 30,
      area_vegetacao_hectares: 3,
      culturas_plantadas: [],
    })

    response.assertStatus(400)

    response.assertBodyContains({
      errors: [
        {
          rule: 'area',
          field: 'area_total',
          message:
            'a soma de área agrícola e vegetação não deve ser maior que a área total da fazenda.',
        },
      ],
    })
  })
})
