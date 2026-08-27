/** Strip spaces/dashes; keep leading + if present. */
export function normalizePhoneInput(value: string) {
  const trimmed = (value ?? "").trim();
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";
  if (trimmed.startsWith("+")) return `+${digits}`;
  return digits;
}

/** Formats to try when looking up bookings (handles +250, spaces, etc.). */
export function phoneLookupVariants(value: string) {
  const normalized = normalizePhoneInput(value);
  const digits = normalized.replace(/\D/g, "");
  if (!digits) return [];

  const tail9 = digits.slice(-9);
  const withCountry = digits.startsWith("250")
    ? `+${digits}`
    : `+250${tail9}`;

  return [...new Set([normalized, digits, `+${digits}`, withCountry].filter(Boolean))];
}
