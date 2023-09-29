export type validatorFactory = (message: string) => (value: string) => string | undefined
