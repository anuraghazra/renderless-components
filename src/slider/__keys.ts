// Automatically generated
const SLIDER_STATE_KEYS = [
  "actions",
  "state",
  "refs",
  "handlers",
  "styles",
] as const;
export const SLIDER_KEYS = SLIDER_STATE_KEYS;
export const SLIDER_FILLED_TRACK_KEYS = SLIDER_KEYS;
export const SLIDER_INPUT_KEYS = SLIDER_FILLED_TRACK_KEYS;
export const SLIDER_THUMB_KEYS = [
  ...SLIDER_INPUT_KEYS,
  "id",
  "getAriaValueText",
] as const;
export const SLIDER_TRACK_KEYS = [...SLIDER_INPUT_KEYS, "id"] as const;
