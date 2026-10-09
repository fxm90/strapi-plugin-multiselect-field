/**
 * Adds or removes the given `option` from the `selectedOptions`,
 * and orders the result by the position of each option in `availableOptions`.
 *
 * - Note: Selected options that are not part of `availableOptions` (e.g. because they have been removed from the
 *         field config afterwards) are kept and placed at the end of the result, matching the order in which they are
 *         rendered in the edit view.
 *
 * @param selectedOptions - The currently selected options.
 * @param option - The option to add or remove.
 * @param isSelected - If `true`, the option is added; if `false`, it is removed.
 * @param availableOptions - The options in their configured order.
 *
 * @returns A new list of selected options.
 *
 * @example
 * toggleSelectedOption(['c'], 'a', true, ['a', 'b', 'c']) // ['a', 'c']
 * toggleSelectedOption(['a', 'c'], 'a', false, ['a', 'b', 'c']) // ['c']
 */
export const toggleSelectedOption = (
  selectedOptions: string[],
  option: string,
  isSelected: boolean,
  availableOptions: string[]
): string[] => {
  const nextSelectedOptions = isSelected
    ? selectedOptions.concat(option)
    : selectedOptions.filter((selectedOption) => selectedOption !== option);

  // Options that are not part of `availableOptions` are ranked after all available ones.
  // As `Array.prototype.sort()` is stable, they keep their previous order among each other.
  const rank = (selectedOption: string) => {
    const index = availableOptions.indexOf(selectedOption);
    return index === -1 ? availableOptions.length : index;
  };

  // Ensure the selected options follow the order of the available options.
  return nextSelectedOptions.sort((lhs, rhs) => rank(lhs) - rank(rhs));
};
