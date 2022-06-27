export const getDiff = <T>(oldObj: T, newObj: T): Partial<T> =>
  Object.entries(oldObj).reduce((diff, [key, value]) => {
    const newValue = newObj[key as keyof T];
    if (Object.is(newValue, value)) return diff;
    return {
      ...diff,
      [key]: typeof newValue === 'object' ? getDiff(value, newValue) : newValue,
    };
  }, {} as Partial<T>);
