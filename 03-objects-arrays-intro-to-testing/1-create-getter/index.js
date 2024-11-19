/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  let keys = path.split(".");

  const getter = (obj) => {
    const currentKey = keys.shift();
    const currentValue = obj.hasOwnProperty(currentKey)
      ? obj[currentKey]
      : undefined;
    const isLastKey = keys.length === 0;
    const isObject =
      typeof currentValue === "object" &&
      !Array.isArray(currentValue) &&
      currentValue !== null;

    if (isObject && !isLastKey) {
      return getter(currentValue);
    }

    keys = path.split(".");

    return currentValue;
  };

  return getter;
}
