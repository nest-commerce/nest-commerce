import { validate as validateClass, ValidationError } from 'class-validator';

const useValidate = <T>(validationClass: T) => {
  const mapErrors = (errors: ValidationError[]) =>
    errors.reduce(
      (errObj, error) => ({
        ...errObj,
        [error.property]: Object.values(error.constraints ?? {})[0],
      }),
      {} as Record<keyof T, string>
    );

  const validate = async (
    payload: Record<string, unknown>
  ): Promise<{ errors: Record<keyof T, string>; hasErrors: boolean }> => {
    const obj = Object.assign(new (validationClass as any)(), payload);
    const errors = await validateClass(obj);
    return {
      errors: mapErrors(errors),
      hasErrors: errors.length > 0,
    };
  };

  return {
    validate,
  };
};

export default useValidate;
