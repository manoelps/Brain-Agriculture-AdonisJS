export default class BaseValidator {
  public messages = {
    minLength: '{{ field }} deve ter pelo menos {{ options.minLength }} caracteres',
    maxLength: '{{ field }} deve ter menos de {{ options.maxLength }} caracteres',
    required: '{{ field }} é obrigatório',
    unique: '{{ field }} deve ser exclusivo e este valor já está em uso',
    regex: '{{ field }} inválido',
    string: '{{ field }} deve ser preenchido apenas com texto',
    number: '{{ field }} deve ser preenchido apenas com numeros',
    enum: '{{ field }} deve ser uma das seguintes opções: {{ options.choices }}',
  }
}
