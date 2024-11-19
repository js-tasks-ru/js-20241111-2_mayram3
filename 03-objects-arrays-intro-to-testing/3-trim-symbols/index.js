/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) {
    return string;
  }

  if (string === "" || size === 0) {
    return "";
  }

  let result = "";
  let lastAddedChar = "";
  let lastAddedCharCount = 0;

  for (let i = 0; i < string.length; i++) {
    const currChar = string[i];

    if (currChar === lastAddedChar && lastAddedCharCount === size) {
      continue;
    }

    if (currChar !== lastAddedChar) {
      lastAddedCharCount = 0;
      lastAddedChar = currChar;
    }

    ++lastAddedCharCount;
    result += currChar;
  }

  return result;
}
