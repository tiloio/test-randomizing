export const jestAsymmetricMatcherSymbol = Symbol.for("jest.asymmetricMatcher");
// deno-lint-ignore no-explicit-any
export const isJestAsymmetricMatcher = (newElement: any) =>
  newElement?.$$typeof === jestAsymmetricMatcherSymbol;

export const createJestAsymmetricMatcher = () => ({
  $$typeof: jestAsymmetricMatcherSymbol,
});
