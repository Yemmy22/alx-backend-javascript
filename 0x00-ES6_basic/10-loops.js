/* eslint-disable no-param-reassign */
export default function appendToEachArrayValue(array, appendString) {
  for (const idx of array) {
    const index = array.indexOf(idx);
    array[index] = appendString + idx;
  }

  return array;
}
