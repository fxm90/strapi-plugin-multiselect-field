import { describe, it, expect } from 'vitest';
import { normalizeAvailableOptions } from './normalizeAvailableOptions';

//
// Tests
//

describe(`test method "normalizeAvailableOptions()"`, () => {
  it('should return an empty array for empty available options.', () => {
    // Given
    const availableOptions: string[] = [];

    // When
    const result = normalizeAvailableOptions(availableOptions);

    // Then
    expect(result).toStrictEqual([]);
  });

  it('should keep the available options and their order unchanged, if already normalized.', () => {
    // Given
    const availableOptions = ['Option-2', 'Option-1', 'Option-3'];

    // When
    const result = normalizeAvailableOptions(availableOptions);

    // Then
    expect(result).toStrictEqual(['Option-2', 'Option-1', 'Option-3']);
  });

  it('should remove surrounding whitespace from each option.', () => {
    // Given
    const availableOptions = [' Option-1', 'Option-2 ', '  Option-3  '];

    // When
    const result = normalizeAvailableOptions(availableOptions);

    // Then
    expect(result).toStrictEqual(['Option-1', 'Option-2', 'Option-3']);
  });

  it('should remove carriage returns caused by Windows line endings.', () => {
    // Given
    const availableOptions = ['Option-1\r', 'Option-2\r', 'Option-3'];

    // When
    const result = normalizeAvailableOptions(availableOptions);

    // Then
    expect(result).toStrictEqual(['Option-1', 'Option-2', 'Option-3']);
  });

  it('should drop empty entries and entries that only contain whitespace.', () => {
    // Given
    const availableOptions = ['', 'Option-1', ' ', 'Option-2', '\r'];

    // When
    const result = normalizeAvailableOptions(availableOptions);

    // Then
    expect(result).toStrictEqual(['Option-1', 'Option-2']);
  });

  it('should drop duplicate entries after trimming, keeping the first occurrence.', () => {
    // Given
    const availableOptions = ['Option-1', 'Option-2', 'Option-1 '];

    // When
    const result = normalizeAvailableOptions(availableOptions);

    // Then
    expect(result).toStrictEqual(['Option-1', 'Option-2']);
  });
});
