import { slice } from "../slice";

test("only start", () => {
  const arr = [1, 2, 3];
  expect(slice(arr, 1)).toEqual([2, 3]);
});

test("only have start that is a negative number", () => {
  const arr = [1, 2, 3];
  expect(slice(arr, -1)).toEqual([3]);
});

test("have start end end, they are positive integer", () => {
  const arr = [1, 2, 3];
  expect(slice(arr, 1, 2)).toEqual([2]);
});

test("have start and end, end is a negative number", () => {
  const arr = [1, 2, 3];
  expect(slice(arr, 0, -1)).toEqual([1, 2]);
});

test("have start and end, start is a negative number", () => {
  const arr = [1, 2, 3];
  expect(slice(arr, -2, 3)).toEqual([2, 3]);
});

test("have start and end ,they are negative number", () => {
  const arr = [1, 2, 3];
  expect(slice(arr, -2, -1)).toEqual([2]);
});
