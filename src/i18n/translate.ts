/* eslint-disable @typescript-eslint/no-explicit-any */

/** Safe for Client Components: no `server-only` import. Dictionaries are
 * passed down from a Server Component as plain props / React Context. */
export function translate(
  dict: Record<string, any>,
  key: string,
  vars?: Record<string, string | number>
): string {
  const parts = key.split(".");
  let value: any = dict;
  for (const part of parts) {
    value = value?.[part];
  }
  if (typeof value !== "string") return key;
  if (!vars) return value;
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
    value
  );
}
