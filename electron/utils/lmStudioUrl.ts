/** Default LM Studio OpenAI-compatible API root (see https://lmstudio.ai/docs/developer/openai-compat) */
export const LM_STUDIO_DEFAULT_V1_BASE = "http://127.0.0.1:1234/v1"

/**
 * Normalize user input to exactly `scheme://host:port/v1` (no trailing slash, no /models suffix).
 * Handles common mistakes: pasting `/v1/models`, `/v1/chat/completions`, or trailing slashes.
 */
export function normalizeLmStudioV1Base(raw: string): string {
  let u = (raw || LM_STUDIO_DEFAULT_V1_BASE).trim()
  if (!u) u = LM_STUDIO_DEFAULT_V1_BASE
  u = u.replace(/\/+$/, "")
  const lower = u.toLowerCase()
  const marker = "/v1"
  const idx = lower.indexOf(marker)
  if (idx !== -1) {
    u = u.slice(0, idx + marker.length)
  } else {
    u = `${u}${marker}`
  }
  return u.replace(/localhost/gi, "127.0.0.1")
}
