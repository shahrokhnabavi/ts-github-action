export type ResolverOption = { lifetime?: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericClass<U> = new (...args: any[]) => U;
