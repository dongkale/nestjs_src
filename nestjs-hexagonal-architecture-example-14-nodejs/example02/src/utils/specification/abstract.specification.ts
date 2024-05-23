import { AndSpecification } from 'src/utils/specification/and.specification';
import { Specification } from 'src/utils/specification/specification';

export abstract class AbstractSpecification<T> implements Specification<T> {
  abstract isSatisfiedBy(t: T): boolean;

  and(specification: Specification<T>): Specification<T> {
    return new AndSpecification<T>(this, specification);
  }
}
