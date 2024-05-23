export type Predicate<T> = (value: T) => boolean;

export enum Compare {
  GREATER = 1,
  EQUAL = 0,
  LESSER = -1,
}

export interface Comparable<T> {
  compareTo(target: T): Compare;
}
