/**
 * Adds or removes the given `option` from the `selectedOptions`, and orders the result by
 * the position of each option in `availableOptions`, followed by `unavailableSelectedOptions`.
 *
 * - Note: Selected options that are not part of `availableOptions` (e.g. because they have been
 *         removed from the field config afterwards) are kept and placed at the end of the result,
 *         in the order of `unavailableSelectedOptions`.
 *         This matches the order in which they are rendered in the edit view, so that unselecting and
 *         selecting such an option again restores the previous value.
 *
 * @param selectedOptions - The currently selected options.
 * @param option - The option to add or remove.
 * @param isSelected - If `true`, the option is added; if `false`, it is removed.
 * @param availableOptions - The options in their configured order.
 * @param unavailableSelectedOptions - The selected options that are no longer available, in their rendered order.
 *
 * @returns A new list of selected options.
 *
 * @example
 * // Adds an option in the order of `availableOptions`.
 * toggleSelectedOption({
 *   selectedOptions: ['c'],
 *   option: 'a',
 *   isSelected: true,
 *   availableOptions: ['a', 'b', 'c'],
 *   unavailableSelectedOptions: [],
 * }) // ['a', 'c']
 *
 * // Removes an option.
 * toggleSelectedOption({
 *   selectedOptions: ['a', 'c'],
 *   option: 'a',
 *   isSelected: false,
 *   availableOptions: ['a', 'b', 'c'],
 *   unavailableSelectedOptions: [],
 * }) // ['c']
 *
 * // Adds an unavailable option in the order of `unavailableSelectedOptions`.
 * toggleSelectedOption({
 *   selectedOptions: ['removed-2'],
 *   option: 'removed-1',
 *   isSelected: true,
 *   availableOptions: ['a', 'b', 'c'],
 *   unavailableSelectedOptions: ['removed-1', 'removed-2'],
 * }) // ['removed-1', 'removed-2']
 */
export const toggleSelectedOption = ({
  selectedOptions,
  option,
  isSelected,
  availableOptions,
  unavailableSelectedOptions,
}: {
  selectedOptions: string[];
  option: string;
  isSelected: boolean;
  availableOptions: string[];
  unavailableSelectedOptions: string[];
}): string[] => {
  const nextSelectedOptions = isSelected
    ? selectedOptions.concat(option)
    : selectedOptions.filter((selectedOption) => selectedOption !== option);

  // Unavailable options are ranked after all available ones, in the order they are rendered (see note above).
  // Options that are part of neither list are ranked last. As `Array.prototype.sort()` is stable, they keep their previous order among each other.
  const orderedOptions = [...availableOptions, ...unavailableSelectedOptions];
  const rank = (selectedOption: string) => {
    const index = orderedOptions.indexOf(selectedOption);
    return index === -1 ? orderedOptions.length : index;
  };

  // Ensure the selected options follow the order of the rendered options.
  return nextSelectedOptions.sort((lhs, rhs) => rank(lhs) - rank(rhs));
};
