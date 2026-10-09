import { describe, it, expect } from 'vitest';
import { parseSelectedOptions } from './parseSelectedOptions';

//
// Tests
//

describe(`test method "parseSelectedOptions()"`, () => {
  it('should return an empty array for an `undefined` value.', () => {
    // Given
    const value = undefined;

    // When
    const result = parseSelectedOptions(value, ',');

    // Then
    expect(result).toStrictEqual([]);
  });

  it('should return an empty array for an empty value.', () => {
    // Given
    const value = '';

    // When
    const result = parseSelectedOptions(value, ',');

    // Then
    expect(result).toStrictEqual([]);
  });

  it('should return a single option for a value without a delimiter.', () => {
    // Given
    const value = 'Option-1';

    // When
    const result = parseSelectedOptions(value, ',');

    // Then
    expect(result).toStrictEqual(['Option-1']);
  });

  it('should split the value by the given delimiter.', () => {
    // Given
    const value = 'Option-1,Option-2,Option-3';

    // When
    const result = parseSelectedOptions(value, ',');

    // Then
    expect(result).toStrictEqual(['Option-1', 'Option-2', 'Option-3']);
  });

  it('should split the value by a custom, multi-character delimiter.', () => {
    // Given
    const value = 'Option-1 | Option-2 | Option-3';

    // When
    const result = parseSelectedOptions(value, ' | ');

    // Then
    expect(result).toStrictEqual(['Option-1', 'Option-2', 'Option-3']);
  });

  it('should remove surrounding whitespace from each option.', () => {
    // Given
    const value = ' Option-1 ,  Option-2,Option-3  ';

    // When
    const result = parseSelectedOptions(value, ',');

    // Then
    expect(result).toStrictEqual(['Option-1', 'Option-2', 'Option-3']);
  });

  it('should drop empty entries caused by a leading, trailing or doubled delimiter.', () => {
    // Given
    const value = ',Option-1,,Option-2,';

    // When
    const result = parseSelectedOptions(value, ',');

    // Then
    expect(result).toStrictEqual(['Option-1', 'Option-2']);
  });

  it('should drop entries that only contain whitespace.', () => {
    // Given
    const value = 'Option-1, ,Option-2';

    // When
    const result = parseSelectedOptions(value, ',');

    // Then
    expect(result).toStrictEqual(['Option-1', 'Option-2']);
  });

  it('should return an empty array for a value that only contains delimiters.', () => {
    // Given
    const value = ',,';

    // When
    const result = parseSelectedOptions(value, ',');

    // Then
    expect(result).toStrictEqual([]);
  });
});
