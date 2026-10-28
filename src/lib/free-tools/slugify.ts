/** URL slug generation — pure function, unit-tested. */

export function slugify(
  input: string,
  separator: "-" | "_" = "-",
  lowerCase = true,
  maxLength = 80
): string {
  let text = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (lowerCase) text = text.toLowerCase();
  text = text
    .replace(/['’""]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, separator);
  if (maxLength > 0 && text.length > maxLength) {
    text = text.slice(0, maxLength);
    const lastSeparator = text.lastIndexOf(separator);
    if (lastSeparator > 0) text = text.slice(0, lastSeparator);
  }
  return text;
}
