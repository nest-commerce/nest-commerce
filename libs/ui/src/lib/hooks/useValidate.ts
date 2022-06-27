import { validateSync, ValidationError } from 'class-validator';
import { FormErrors } from '@mantine/form';
import { IConstructable } from '../types';

export const useValidate = <T>(type: IConstructable<T>) => {
  const mapErrors = (errors: ValidationError[]) =>
    errors.reduce(
      (errObj, error) => ({
        ...errObj,
        [error.property]: Object.values(error.constraints ?? {})[0],
      }),
      {} as Record<keyof T, string>
    );

  return (payload: T): FormErrors => {
    const obj = Object.assign(new type(), payload);
    const errors = validateSync(obj as unknown as object);
    return mapErrors(errors);
  };
};
