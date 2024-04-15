import { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found.') // -> forma de chamar o construtor de Error (classe estendida)
  }
}
