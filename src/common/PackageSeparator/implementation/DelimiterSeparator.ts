import { IPackageSeparator } from "../../../definition/PackageSeparator/IPackageSeparator";

/**
 *
 * Props to: https://codereview.stackexchange.com/questions/20136/uint8array-indexof-method-that-allows-to-search-for-byte-sequences
 *
 * @param pattern The pattern to look for.
 * @returns
 */
function boyerMoore(pattern: Uint8Array) {
  // Implementation of Boyer-Moore substring search ported from page 772 of
  // Algorithms Fourth Edition (Sedgewick, Wayne)
  // http://algs4.cs.princeton.edu/53substring/BoyerMoore.java.html
  /*
    USAGE:
       // needle should be ASCII string, ArrayBuffer, or Uint8Array
       // haystack should be an ArrayBuffer or Uint8Array
       var search = boyerMoore(needle);
       var skip = search.byteLength;
       var indexes = [];
       for (var i = search(haystack); i !== -1; i = search(haystack, i + skip)) {
         indexes.push(i);
       }
    */
  //var pattern = asUint8Array(patternBuffer);
  const M = pattern.length;
  if (M === 0) {
    throw new TypeError('patternBuffer must be at least 1 byte long');
  }
  // radix
  const R = 256;
  const rightmost_positions = new Int32Array(R);
  // position of the rightmost occurrence of the byte c in the pattern
  for (let c = 0; c < R; c++) {
    // -1 for bytes not in pattern
    rightmost_positions[c] = -1;
  }
  for (let j = 0; j < M; j++) {
    // rightmost position for bytes in pattern
    rightmost_positions[pattern[j]] = j;
  }
  function boyerMooreSearch(txt: Uint8Array, start?: number, end?: number) {
    // Return offset of first match, -1 if no match.
    //var txt = asUint8Array(txtBuffer);
    if (start === undefined) start = 0;
    if (end === undefined) end = txt.length;

    const lastIndex = end - pattern.length;
    const lastPatIndex = pattern.length - 1;

    let skip;

    for (let i = start; i <= lastIndex; i += skip) {
      skip = 0;
      for (let j = lastPatIndex; j >= 0; j--) {
        const c = txt[i + j];
        if (pattern[j] !== c) {
          skip = Math.max(1, j - rightmost_positions[c]);
          break;
        }
      }
      if (skip === 0) {
        return i;
      }
    }
    return -1;
  }
  //boyerMooreSearch.byteLength = pattern.byteLength;
  return boyerMooreSearch;
}

export class DelimiterSeparator implements IPackageSeparator {
  private search: ReturnType<typeof boyerMoore>;
  private searchLength: number;

  constructor(pattern: Uint8Array) {
    this.search = boyerMoore(pattern);
    this.searchLength = pattern.length;
  }

  private merge(arr0: Uint8Array, arr1: Uint8Array): Uint8Array {
    const newArr = new Uint8Array(arr0.length + arr1.length);

    newArr.set(arr0);
    newArr.set(arr1, arr0.length);

    return newArr;
  }

  separate(previous: Uint8Array, current: Uint8Array): Uint8Array[] {
    const results: Uint8Array[] = [];

    let index;
    let previous_index = 0;

    while ((index = this.search(current, previous_index)) !== -1) {
      if (previous_index === 0 && previous.length !== 0) {
        results.push(
          this.merge(previous, current.subarray(previous_index, index)),
        );
      } else {
        results.push(current.subarray(previous_index, index));
      }
      previous_index = index + 1;
    }

    // Omit one more, so that all the others can get triggered as events.
    if (previous_index === current.length - (this.searchLength - 1)) {
      results.push(new Uint8Array());
    }

    if (results.length !== 0) {
      console.log(previous_index, current.length, this.searchLength);
      return results;
    }

    return [this.merge(previous, current)];
  }

  formatMessage(message: Uint8Array): Uint8Array {
    return message; // TODO: Implement.
  }
}
