export const jestAsymmetricMatcherSymbol = Symbol.for('jest.asymmetricMatcher');
export const isJestAsymmetricMatcher = (newElement: any) =>
    newElement?.$$typeof !== jestAsymmetricMatcherSymbol;

export const createJestAsymmetricMatcher = () => ({
    $$typeof: jestAsymmetricMatcherSymbol
});