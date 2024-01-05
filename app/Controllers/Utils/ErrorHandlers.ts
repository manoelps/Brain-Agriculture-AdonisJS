import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export function handleRowNotFoundError(response: HttpContextContract['response']): void {
  response.status(404).json({
    message: 'Registro não encontrado.',
  })
}
