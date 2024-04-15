// LEFT -> Failure
// UI -> CTRL -> CASO DE USO <- ENTIDADE -> CASO DE USO -> REPOSITÓRIO -> BANCO DE DADOS
export class Left<L> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isLeft(): this is Left<L> {
    return true
  }

  isRight(): this is Right<never> {
    return false
  }
}

// RIGHT -> Success
// UI -> CTRL -> CASO DE USO -> ENTIDADE -> CASO DE USO -> REPOSITÓRIO -> BANCO DE DADOS
export class Right<R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isLeft(): this is Left<never> {
    return false
  }

  isRight(): this is Right<R> {
    return true
  }
}

export type Either<L, R> = Left<L> | Right<R>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
