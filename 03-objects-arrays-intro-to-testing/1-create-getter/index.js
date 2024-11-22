/**
 * createGetter_1 - creates function getter which allows select value from object
 * решение с рекурсией и нечистой функцией
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter1(path) {
  let keys = path.split(".");

  const getter = (obj) => {
    const currentKey = keys.shift();
    const currentValue = obj.hasOwnProperty(currentKey)
      ? obj[currentKey]
      : undefined;
    const isLastKey = keys.length === 0;
    const isObject = typeof currentValue === "object" && currentValue !== null;

    if (isObject && !isLastKey) {
      return getter(currentValue);
    }

    keys = path.split(".");

    return currentValue;
  };

  return getter;
}

/**
 * createGetter2 - creates function getter which allows select value from object
 * решение с рекурсией и чистой функцией
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter2(path) {
  const keys = path.split(".");

  const getter = (obj, localKeys = keys) => {
    if (!obj || !localKeys.length) {
      return obj;
    }

    const [currentKey, ...otherKeys] = localKeys;
    const currentValue = obj.hasOwnProperty(currentKey)
      ? obj[currentKey]
      : undefined;

    return getter(currentValue, otherKeys);
  };

  return getter;
}

/**
 * createGetter - creates function getter which allows select value from object
 * решение через итерации
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(path) {
  const keys = path.split(".");

  const getter = (obj) => {
    let currentObj = obj;
    for (const currentKey of keys) {
      if (!currentObj.hasOwnProperty(currentKey)) {
        return;
      }

      currentObj = currentObj[currentKey];
    }

    return currentObj;
  };

  return getter;
}
