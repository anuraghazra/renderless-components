import { valueToPercent } from "@chakra-ui/utils";

import { getDefaultOptimumValue, calculateStatus, clamp } from "./__utils";

export interface UseMeterProps {
  /**
   * The `value` of the meter indicator.
   * If `undefined`/`not valid` the meter bar will be equal to `min`
   * @default 0
   */
  value?: number;
  /**
   * The minimum value of the meter
   * @default 0
   */
  min?: number;
  /**
   * The maximum value of the meter
   * @default 1
   */
  max?: number;
  /**
   * The higher limit of min range.
   * Defaults to `min`.
   * @default 0
   */
  low?: number;
  /**
   * The lower limit of max range.
   * Defaults to `max`.
   * @default 1
   */
  high?: number;
  /**
   * The lower limit of max range.
   * Defaults to `median of low & high`.
   * @default 0.5
   */
  optimum?: number;
}

export type TStatus = "safe" | "caution" | "danger" | undefined;

export const useMeterState = (props: UseMeterProps = {}) => {
  const { min = 0, max = 1 } = props;
  let {
    value = 0,
    low = min,
    high = max,
    optimum = getDefaultOptimumValue(low, high),
  } = props;

  value = clamp(value, min, max);
  low = clamp(low, min, max);
  high = clamp(high, min, max);
  optimum = clamp(optimum, min, max);

  // More inequalities handled
  //  low ≤ high (if both low and high are specified)
  if (low >= high) low = high;
  if (high <= low) high = low;

  const status: TStatus = calculateStatus({
    value,
    optimum,
    min,
    max,
    low,
    high,
  });
  const percent = valueToPercent(value, min, max);

  return { value, low, high, optimum, min, max, status, percent };
};

export type MeterStateReturn = ReturnType<typeof useMeterState>;
