/** JSON error location — pure function, unit-tested. */

/**
 * Converts a browser parse error message with "position N" into a
 * line-and-column location so users can jump straight to the problem.
 */
export function locateJsonError(raw: string, message: string): string {
  const positionMatch = message.match(/position (\d+)/i);
  if (!positionMatch) return message;
  const position = Math.min(Number(positionMatch[1]), raw.length);
  const upTo = raw.slice(0, position);
  const line = upTo.split("\n").length;
  const column = position - upTo.lastIndexOf("\n");
  return `${message.replace(/\s*in JSON at position \d+.*/i, "")} at line ${line}, column ${column}`;
}
