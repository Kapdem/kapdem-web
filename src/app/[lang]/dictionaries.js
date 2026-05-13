import "server-only";

const dictionaries = {
  en: () =>
    import("../../dictionaries/en.json").then((module) => module.default),
  tr: () =>
    import("../../dictionaries/tr.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  if (!dictionaries[locale]) {
    return dictionaries["tr"](); // fallback to Turkish
  }
  return dictionaries[locale]();
};
