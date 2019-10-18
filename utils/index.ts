type FnValBool = <T extends number>(val: T) => boolean;

// export function isUndef<T>(val: T): boolean {
//   return typeof val === "undefined";
// }

export const isUndef: FnValBool = function(val) {
  return typeof val === "undefined";
};

export function isValid(val: any): boolean {
  return val != null;
}
