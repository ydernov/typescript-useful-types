/**
 * Works as regilar Pick, but selects keys by type, not by keyName - from TObj picks all keys matching type TUnion
 *
 * NOTE: doesn't work with  multitype keys - { keyName: string|null; } and with partial keys - { keyName?: any; }
 */

export type PickByType<TObj, TUnion, K extends keyof TObj = keyof TObj> = {
  [key in K extends K
    ? TObj[K] extends TUnion
      ? K
      : never
    : never]: TObj[key];
};

/**
 * Replaces undefined types in provided TUnion with null.
 *
 * Example: string|number|undefined => string|number|null
 */
export type NullifyUndefined<TUnion> = Extract<TUnion, undefined> extends never
  ? TUnion
  : Exclude<TUnion, undefined> | null;

/**
 * Replaces partial ({ keyName?: any; }) and undefined keys with null.
 *
 * Example: { a?: string; b: number | undefined; c: string; } => { a: string | null ; b: number | null; c: string; }
 */
export type NullifyPartial<TObj> = {
  [K in keyof TObj]-?: NullifyUndefined<TObj[K]>;
};

/**
 * An analogue of Partial, but makes properties null.
 *
 * Example: {a: string; b: number} => {a: string | null; b: number | null;}
 */
export type PartialNull<T extends object> = NullifyPartial<Partial<T>>;

/**
 * Returns first symbol of literal string S
 */

export type FirstInString<S extends string> = S extends `${infer H}${string}`
  ? H
  : never;

/**
 * Splits literal string S by symbols
 */

export type SplitString<S extends string> = S extends `${infer H}${infer R}`
  ? H | SplitString<R>
  : never;
