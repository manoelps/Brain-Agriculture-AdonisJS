import { test } from '@japa/runner'

test.group('Dashboard index', () => {
  const resource = '/api/v1/dashboard'

  test('should access the dashboard route', async ({ client }) => {
    const response = await client.get(resource)

    response.assertStatus(200)
  })
})
