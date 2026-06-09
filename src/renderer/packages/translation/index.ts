type TranslateOptions = {
  sourceLang?: string
}

/**
 * Translate a batch of texts into the target language.
 *
 * The desktop CE build currently does not bundle a remote translation service,
 * so this safe fallback preserves the original text instead of failing the UI.
 */
export function translateTexts(texts: string[], _targetLang: string, _options: TranslateOptions = {}) {
  return Promise.resolve(texts)
}
