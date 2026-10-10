/**
 * Returns the saved and current selected options that are not part of `availableOptions`,
 * e.g. because they have been removed from the field config after being saved.
 *
 * - Note: The saved options are included, so that unselected options that are no longer available are kept
 *         until the entry is saved (and can be selected again until then).
 *
 *         The current options are included, as the current value may contain options that aren't saved yet,
 *         e.g. after the i18n action "Fill in from another locale". So they are rendered and can be unselected.
 *
 * @param savedSelectedOptions - The selected options of the last saved value.
 * @param selectedOptions - The currently selected options.
 * @param availableOptions - The options in their configured order.
 *
 * @returns The selected options that are no longer available, without duplicates.
 *          Saved options come first, followed by the options that are only part of the current selection.
 *
 * @example
 * // Keeps a saved option that is no longer available, even though it has been unselected.
 * getUnavailableSelectedOptions({
 *   savedSelectedOptions: ['a', 'removed'],
 *   selectedOptions: ['a'],
 *   availableOptions: ['a', 'b', 'c'],
 * }) // ['removed']
 *
 * // Includes an unavailable option that is only part of the current selection.
 * getUnavailableSelectedOptions({
 *   savedSelectedOptions: [],
 *   selectedOptions: ['a', 'removed'],
 *   availableOptions: ['a', 'b', 'c'],
 * }) // ['removed']
 */
export const getUnavailableSelectedOptions = ({
  savedSelectedOptions,
  selectedOptions,
  availableOptions,
}: {
  savedSelectedOptions: string[];
  selectedOptions: string[];
  availableOptions: string[];
}): string[] => {
  // Combines the saved and current selected options (see note above).
  // We use a `Set` to drop options that are part of both, so they are only rendered once.
  const savedAndCurrentSelectedOptions = [
    ...new Set([...savedSelectedOptions, ...selectedOptions]),
  ];

  return savedAndCurrentSelectedOptions.filter(
    (selectedOption) => !availableOptions.includes(selectedOption)
  );
};
