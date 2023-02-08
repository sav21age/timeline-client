export const isEmpty = (value: any) => {
  if (value) {
    if (Array.isArray(value)) {
      if (value.length === 0) return true;
      return false;
    } else if (typeof value === "object") {
      if (
        Object.keys(value).length === 0 &&
        Object.getPrototypeOf(value) === Object.prototype
      ) {
        return true;
      }
      return false;
    } else {
      new Error("Variable is not array or object.");
    }
  } else {
    new Error("Variable is not array or object.");
  }
};

export const isEmptyObject = (obj: Record<string, any>) => {
  if (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  ) {
    return true;
  }
  return false;
};

export const isEmptyArray = <T>(arr: T[]) => {
  if (arr) {
    if (Array.isArray(arr)) {
      if (arr.length === 0) return true;
    }
    return false;
  }
  return true;
};

// export default { isEmptyObject, isEmptyArray };
