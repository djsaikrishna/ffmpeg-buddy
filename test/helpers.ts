export function assertEquals<T>(a: T, b: T) {
  if (a !== b) {
    throw new Error(`${JSON.stringify(a)} !== ${JSON.stringify(b)}`);
  }
}
