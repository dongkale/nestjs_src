export const stringToSnakeCase = (s: string) =>
  s.replace(/[A-Z]/g, w => `_${w.toLowerCase()}`);

export const stringToCamelCase = (s: string) =>
  s.replace(/(_\w)/g, w => w[1].toUpperCase());

export const camelCase: any = (
  obj: { [key: string]: any } | any[],
  keys?: string[],
) =>
  Array.isArray(obj)
    ? obj.map(e => camelCase(e, keys))
    : (keys || Object.keys(obj)).reduce(
        (acc, key) => ({
          ...acc,
          [stringToCamelCase(key)]: obj[key],
        }),
        {},
      );

export const snakeCase: any = (
  obj: { [key: string]: any } | any[],
  keys?: string[],
) =>
  Array.isArray(obj)
    ? obj.map(e => snakeCase(e, keys))
    : (keys || Object.keys(obj)).reduce(
        (acc, key) => ({
          ...acc,
          [stringToSnakeCase(key)]: obj[key],
        }),
        {},
      );
