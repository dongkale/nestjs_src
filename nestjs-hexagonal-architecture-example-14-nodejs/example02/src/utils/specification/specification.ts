export interface Specification<T> {
  isSatisfiedBy(t: T): boolean;
  and(specification: Specification<T>): Specification<T>;
}
