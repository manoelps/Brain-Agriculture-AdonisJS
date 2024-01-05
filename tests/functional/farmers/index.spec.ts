import { test } from '@japa/runner'

test.group('Farmers index', () => {
  const resource = '/api/v1/farmers?page=1'

  test('should access the farmers route', async ({ client }) => {
    const response = await client.get(resource)

    response.assertStatus(200)
  })
})
