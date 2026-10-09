/**
 * Returns the selected options that are not part of `availableOptions`,
 * e.g. because they have been removed from the field config after being selected.
 *
 * @param selectedOptions - The currently selected options.
 * @param availableOptions - The options in their configured order.
 *
 * @returns The selected options that are no longer available, in their selected order.
 *
 * @example
 * getUnavailableSelectedOptions(['a', 'removed'], ['a', 'b', 'c']) // ['removed']
 */
export const getUnavailableSelectedOptions = (
  selectedOptions: string[],
  availableOptions: string[]
): string[] => {
  return selectedOptions.filter((selectedOption) => !availableOptions.includes(selectedOption));
};
