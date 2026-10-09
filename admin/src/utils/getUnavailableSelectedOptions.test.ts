import { describe, it, expect } from 'vitest';
import { getUnavailableSelectedOptions } from './getUnavailableSelectedOptions';

//
// Tests
//

describe(`test method "getUnavailableSelectedOptions()"`, () => {
  it('should return an empty array for no selected options.', () => {
    // Given
    const selectedOptions: string[] = [];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = getUnavailableSelectedOptions(selectedOptions, availableOptions);

    // Then
    expect(result).toStrictEqual([]);
  });

  it('should return an empty array if all selected options are available.', () => {
    // Given
    const selectedOptions = ['a', 'c'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = getUnavailableSelectedOptions(selectedOptions, availableOptions);

    // Then
    expect(result).toStrictEqual([]);
  });

  it('should return the selected options that are not available.', () => {
    // Given
    const selectedOptions = ['removed-1', 'a', 'removed-2'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = getUnavailableSelectedOptions(selectedOptions, availableOptions);

    // Then
    expect(result).toStrictEqual(['removed-1', 'removed-2']);
  });

  it('should return all selected options if no options are available.', () => {
    // Given
    const selectedOptions = ['a', 'b'];
    const availableOptions: string[] = [];

    // When
    const result = getUnavailableSelectedOptions(selectedOptions, availableOptions);

    // Then
    expect(result).toStrictEqual(['a', 'b']);
  });

  it('should compare options case-sensitively.', () => {
    // Given
    const selectedOptions = ['Option-1'];
    const availableOptions = ['option-1'];

    // When
    const result = getUnavailableSelectedOptions(selectedOptions, availableOptions);

    // Then
    expect(result).toStrictEqual(['Option-1']);
  });
});
