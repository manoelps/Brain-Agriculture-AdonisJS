import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import BaseValidator from './BaseValidator'

export default class UpdateValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public refs = schema.refs({
    id: this.ctx.params.id,
  })

  public schema = schema.create({
    cpf_cnpj: schema.string({ trim: true }, [
      rules.regex(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/g),
      rules.minLength(11),
      rules.maxLength(20),
      rules.unique({
        table: 'farmers',
        column: 'cpf_cnpj',
        whereNot: { id: this.refs.id },
      }),
    ]),
    nome_produtor: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    nome_fazenda: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    cidade: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(100)]),
    estado: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(2)]),
    area_total_hectares: schema.number(),
    area_agricultavel_hectares: schema.number(),
    area_vegetacao_hectares: schema.number(),
    culturas_plantadas: schema.array().members(
      schema.object().members({
        cultura: schema.string(),
      })
    ),
  })
}
