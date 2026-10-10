import { describe, it, expect } from 'vitest';
import { getUnavailableSelectedOptions } from './getUnavailableSelectedOptions';

//
// Tests
//

describe(`test method "getUnavailableSelectedOptions()"`, () => {
  it('should return an empty array for no selected options.', () => {
    // Given
    const savedSelectedOptions: string[] = [];
    const selectedOptions: string[] = [];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = getUnavailableSelectedOptions({
      savedSelectedOptions,
      selectedOptions,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual([]);
  });

  it('should return an empty array if all selected options are available.', () => {
    // Given
    const savedSelectedOptions = ['a', 'b'];
    const selectedOptions = ['a', 'c'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = getUnavailableSelectedOptions({
      savedSelectedOptions,
      selectedOptions,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual([]);
  });

  it('should return the saved selected options that are not available.', () => {
    // Given
    const savedSelectedOptions = ['removed-1', 'a', 'removed-2'];
    const selectedOptions = ['removed-1', 'a', 'removed-2'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = getUnavailableSelectedOptions({
      savedSelectedOptions,
      selectedOptions,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['removed-1', 'removed-2']);
  });

  it('should keep saved unavailable options that have been unselected.', () => {
    // Given
    const savedSelectedOptions = ['a', 'removed'];
    const selectedOptions = ['a'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = getUnavailableSelectedOptions({
      savedSelectedOptions,
      selectedOptions,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['removed']);
  });

  it('should return unavailable options that are only part of the current selection.', () => {
    // Given
    // E.g. after the i18n action "Fill in from another locale", which only updates the current value.
    const savedSelectedOptions: string[] = [];
    const selectedOptions = ['a', 'removed'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = getUnavailableSelectedOptions({
      savedSelectedOptions,
      selectedOptions,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['removed']);
  });

  it('should return the saved options first, followed by the current-only options.', () => {
    // Given
    const savedSelectedOptions = ['removed-saved'];
    const selectedOptions = ['removed-current', 'removed-saved'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = getUnavailableSelectedOptions({
      savedSelectedOptions,
      selectedOptions,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['removed-saved', 'removed-current']);
  });

  it('should return all selected options if no options are available.', () => {
    // Given
    const savedSelectedOptions = ['a', 'b'];
    const selectedOptions = ['a', 'b'];
    const availableOptions: string[] = [];

    // When
    const result = getUnavailableSelectedOptions({
      savedSelectedOptions,
      selectedOptions,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['a', 'b']);
  });

  it('should compare options case-sensitively.', () => {
    // Given
    const savedSelectedOptions = ['Option-1'];
    const selectedOptions = ['Option-1'];
    const availableOptions = ['option-1'];

    // When
    const result = getUnavailableSelectedOptions({
      savedSelectedOptions,
      selectedOptions,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['Option-1']);
  });
});
