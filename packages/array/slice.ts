import { isUndef } from "../../utils";

/**
 *
 *
 * @export
 * @template T
 * @param {T[]} array 需要分割的数组
 * @param {number} [start] 开始位置，如果是负数，则从后往前找
 * @param {number} [end] 结束位置，同上
 * @returns {T[]} 返回一个新数组
 */
function slice<T>(array: T[] = [], start: number = 0, end?: number): T[] {
  let length = array.length;
  if (!length) return [];

  end = isUndef(end) ? length : end;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  // 这里的移位其实是 把值转换成number类型，保证其值有意义，且为整数。
  length = start > end ? 0 : (end - start) >>> 0;
  start >>>= 0;

  let index = -1;
  const result = new Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

export default slice;
