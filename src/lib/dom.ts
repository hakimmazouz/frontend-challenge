export const cls = (
  ...args: (string | Record<string, boolean> | undefined | null | false)[]
): string =>
  args.filter(Boolean).reduce<string>((total, current) => {
    if (typeof current === "object") {
      for (const key in current) {
        if (current[key]) total += " " + key;
      }
    } else if (typeof current === "string") {
      total += " " + current;
    }

    return total.trim();
  }, "");

export const domArray = <T = HTMLElement>(
  collection: HTMLCollection | NodeList
): T[] => {
  return [...collection] as T[];
};
