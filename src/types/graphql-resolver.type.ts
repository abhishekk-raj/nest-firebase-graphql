/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Graphql resolver function signature
 */
export type GraphQLResolverResult<T> = null | undefined | any[] | Promise<T> | string | number | {};

