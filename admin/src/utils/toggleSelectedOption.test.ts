import { describe, it, expect } from 'vitest';
import { toggleSelectedOption } from './toggleSelectedOption';

//
// Tests
//

describe(`test method "toggleSelectedOption()"`, () => {
  it('should add the option to an empty selection.', () => {
    // Given
    const selectedOptions: string[] = [];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption(selectedOptions, 'b', true, availableOptions);

    // Then
    expect(result).toStrictEqual(['b']);
  });

  it('should add the option in the order of `availableOptions`.', () => {
    // Given
    const selectedOptions = ['c'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption(selectedOptions, 'a', true, availableOptions);

    // Then
    expect(result).toStrictEqual(['a', 'c']);
  });

  it('should remove the option from the selection.', () => {
    // Given
    const selectedOptions = ['a', 'b', 'c'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption(selectedOptions, 'b', false, availableOptions);

    // Then
    expect(result).toStrictEqual(['a', 'c']);
  });

  it('should return an empty selection after removing the last option.', () => {
    // Given
    const selectedOptions = ['a'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption(selectedOptions, 'a', false, availableOptions);

    // Then
    expect(result).toStrictEqual([]);
  });

  it('should restore the order of `availableOptions` for an unordered selection.', () => {
    // Given
    const selectedOptions = ['c', 'a'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption(selectedOptions, 'b', true, availableOptions);

    // Then
    expect(result).toStrictEqual(['a', 'b', 'c']);
  });

  it('should keep options that are not part of `availableOptions` at the beginning.', () => {
    // Given
    const selectedOptions = ['a', 'removed'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption(selectedOptions, 'c', true, availableOptions);

    // Then
    expect(result).toStrictEqual(['removed', 'a', 'c']);
  });

  it('should not mutate the given `selectedOptions`.', () => {
    // Given
    const selectedOptions = ['c', 'a'];
    const availableOptions = ['a', 'b', 'c'];

    // When
    toggleSelectedOption(selectedOptions, 'b', true, availableOptions);

    // Then
    expect(selectedOptions).toStrictEqual(['c', 'a']);
  });
});
