export function map(
  n: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

export function constrain(n: number, low: number, high: number) {
  return Math.max(Math.min(n, high), low);
}

export function mapConstrain(
  n: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
) {
  const start = start2 !== undefined ? start2 : start1;
  const stop = stop2 !== undefined ? stop2 : stop1;
  const min = Math.min(start, stop);
  const max = Math.max(start, stop);
  return constrain(map(n, start1, stop1, start, stop), min, max);
}

export function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}
