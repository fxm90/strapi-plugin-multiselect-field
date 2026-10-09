/**
 * Parses the stored, delimiter-separated `value` into a list of selected options.
 *
 * @param value - The stored value, or `undefined` as long as nothing has been selected yet.
 * @param delimiter - The delimiter used to separate the options.
 *
 * @returns The list of selected options, with surrounding whitespace and empty entries removed.
 *
 * @example
 * parseSelectedOptions('Option-1, Option-2', ',') // ['Option-1', 'Option-2']
 * parseSelectedOptions(undefined, ',') // []
 */
export const parseSelectedOptions = (value: string | undefined, delimiter: string): string[] => {
  if (!value) {
    return [];
  }

  return (
    value
      .split(delimiter)
      .map((option) => option.trim())
      // Drop empty entries, e.g. caused by a trailing or doubled delimiter (`Option-1,,Option-2,`).
      .filter((option) => option.length > 0)
  );
};
