export function range(start: number, end: number, step = 1): readonly number[] {
  return Array.from(new Array(Math.floor((end - start) / step)), (_, index) => {
    return start + index * step;
  });
}
