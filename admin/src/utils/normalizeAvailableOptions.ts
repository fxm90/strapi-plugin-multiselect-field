/**
 * Normalizes the `availableOptions` from the field config, so they can be compared against the parsed selected options.
 *
 * - Note: Strapi's `textarea-enum` only splits the entered options by `\n`, so entries can contain surrounding whitespace
 *         (e.g. a trailing space or a `\r` from Windows line endings).
 *         As `parseSelectedOptions` trims the stored values, we have to trim the available options as well, otherwise they'd never match.
 *
 * @param availableOptions - The available options from the field config.
 *
 * @returns The list of available options, with surrounding whitespace, empty and duplicate entries removed.
 *
 * @example
 * normalizeAvailableOptions(['Option-1 ', 'Option-2\r', '']) // ['Option-1', 'Option-2']
 */
export const normalizeAvailableOptions = (availableOptions: string[]): string[] => {
  const trimmedOptions = availableOptions
    .map((option) => option.trim())
    // Drop empty entries, e.g. caused by blank lines in the field config.
    .filter((option) => option.length > 0);

  // Drop duplicates, e.g. `Option-1` and `Option-1 `,
  // which would otherwise be rendered twice with the same `key`.
  return [...new Set(trimmedOptions)];
};
