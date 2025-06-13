export function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration * 1000));
}
