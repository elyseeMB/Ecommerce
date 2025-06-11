export function classNames(
  ...classnames: (string | null | undefined | boolean)[]
) {
  return classnames.filter(Boolean).join(" ");
}
