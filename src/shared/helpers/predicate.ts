export const eq = <T extends Record<string, any>>(
  key: keyof T,
  val: T[typeof key],
) => {
  return (obj: T) => obj[key] === val;
};
