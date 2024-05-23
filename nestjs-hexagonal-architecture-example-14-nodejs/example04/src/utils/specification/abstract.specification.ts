import { Specification } from 'src/utils/specification/specification';

export abstract class AbstractSpecification<T> implements Specification<T> {
  abstract isSatisfiedBy(t: T): boolean;

  and(specification: Specification<T>): Specification<T> {
    return new AndSpecification<T>(this, specification);
  }
}

// 다른 파일에 생성시 순환 참조 문제가 발생하여 한 파일에 선언
export class AndSpecification<T> extends AbstractSpecification<T> {
  constructor(private readonly _spec1: Specification<T>, private readonly _spec2: Specification<T>) {
    super();
  }

  public isSatisfiedBy(t: T): boolean {
    return this._spec1.isSatisfiedBy(t) && this._spec2.isSatisfiedBy(t);
  }
}
