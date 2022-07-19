/**
 * CASE
 * https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats
 */

/**
 *
 * @example notFound => NotFound
 */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function uncapitalizeFirstLetter(string: string): string {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 *
 * @example notFound or NotFound => not_found
 */
export function pascalToSnake(str: string): string {
  return str
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase();
}

/**
 *
 * @example notFound or NotFound => not-found
 */
export function pascalToKebab(str: string): string {
  return str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}
