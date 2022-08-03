export function getRandomNumberInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomColor(): string {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
}
