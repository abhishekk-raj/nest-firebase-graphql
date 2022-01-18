// Generic TypeScript utility types used for combining interfaces

/** Remove types from T that are assignable to U */
type Diff<T, U> = T extends U ? never : T;

/** Overwrite types in T with types in U */
export type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;

/** Remove properties that are functions */
export type OmitMethodKeys<T> = Pick<T, ({ [P in keyof T]: T[P] extends Function ? never : P })[keyof T]>;
