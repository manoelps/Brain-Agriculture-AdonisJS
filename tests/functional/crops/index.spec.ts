import { test } from '@japa/runner'

test.group('Crops index', () => {
  const resource = '/api/v1/crops'

  test('should list all planted crops', async ({ client }) => {
    const response = await client.get(resource)

    response.assertStatus(200)

    response.assertBodyContains({
      data: [
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
      ],
    })
  })
})
