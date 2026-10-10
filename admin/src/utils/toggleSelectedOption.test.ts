import { describe, it, expect } from 'vitest';
import { toggleSelectedOption } from './toggleSelectedOption';

//
// Tests
//

describe(`test method "toggleSelectedOption()"`, () => {
  it('should add the option to an empty selection.', () => {
    // Given
    const selectedOptions: string[] = [];
    const option = 'b';
    const isSelected = true;
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption({
      selectedOptions,
      option,
      isSelected,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['b']);
  });

  it('should add the option in the order of `availableOptions`.', () => {
    // Given
    const selectedOptions = ['c'];
    const option = 'a';
    const isSelected = true;
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption({
      selectedOptions,
      option,
      isSelected,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['a', 'c']);
  });

  it('should remove the option from the selection.', () => {
    // Given
    const selectedOptions = ['a', 'b', 'c'];
    const option = 'b';
    const isSelected = false;
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption({
      selectedOptions,
      option,
      isSelected,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['a', 'c']);
  });

  it('should return an empty selection after removing the last option.', () => {
    // Given
    const selectedOptions = ['a'];
    const option = 'a';
    const isSelected = false;
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption({
      selectedOptions,
      option,
      isSelected,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual([]);
  });

  it('should restore the order of `availableOptions` for an unordered selection.', () => {
    // Given
    const selectedOptions = ['c', 'a'];
    const option = 'b';
    const isSelected = true;
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption({
      selectedOptions,
      option,
      isSelected,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['a', 'b', 'c']);
  });

  it('should keep options that are not part of `availableOptions` at the end.', () => {
    // Given
    const selectedOptions = ['removed', 'a'];
    const option = 'c';
    const isSelected = true;
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption({
      selectedOptions,
      option,
      isSelected,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['a', 'c', 'removed']);
  });

  it('should keep the previous order of options that are not part of `availableOptions`.', () => {
    // Given
    const selectedOptions = ['removed-2', 'a', 'removed-1'];
    const option = 'b';
    const isSelected = true;
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption({
      selectedOptions,
      option,
      isSelected,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['a', 'b', 'removed-2', 'removed-1']);
  });

  it('should remove an option that is not part of `availableOptions`.', () => {
    // Given
    const selectedOptions = ['a', 'removed'];
    const option = 'removed';
    const isSelected = false;
    const availableOptions = ['a', 'b', 'c'];

    // When
    const result = toggleSelectedOption({
      selectedOptions,
      option,
      isSelected,
      availableOptions,
    });

    // Then
    expect(result).toStrictEqual(['a']);
  });
});
