function deepEqual(objA, objB) {
  if (objA === objB) {
    return true; // If they are the same instance, they are equal
  }

  if (typeof objA !== "object" || typeof objB !== "object") {
    return false; // If either is not an object, they are not equal
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false; // If they have a different number of properties, they are not equal
  }

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(objA[key], objB[key])) {
      return false; // If any property value is not equal, they are not equal
    }
  }

  return true; // All checks passed, they are equal
}
export default deepEqual;
