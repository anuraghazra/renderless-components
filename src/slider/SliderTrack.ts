/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useSlider](https://github.com/chakra-ui/chakra-ui/blob/af613020125265914a9dcb74c92a07a16aa4ff8e/packages/slider/src/use-slider.ts)
 * to work with Reakit System
 */
import { useId } from "@chakra-ui/hooks";
import { useForkRef } from "reakit-utils";
import { dataAttr } from "@chakra-ui/utils";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { SLIDER_TRACK_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export type SliderTrackOptions = BoxOptions &
  Pick<SliderStateReturn, "refs" | "state" | "styles"> & {
    /**
     * The base `id` to use for the sliderTrack
     */
    id?: string;
  };

export type SliderTrackHTMLProps = BoxHTMLProps;

export type SliderTrackProps = SliderTrackOptions & SliderTrackHTMLProps;

export const useSliderTrack = createHook<
  SliderTrackOptions,
  SliderTrackHTMLProps
>({
  name: "SliderTrack",
  compose: useBox,
  keys: SLIDER_TRACK_KEYS,

  useProps(options, { ref: htmlRef, style: htmlStyle, ...htmlProps }) {
    const { refs, state, styles } = options;

    const id = useId(options.id, "slider-track");

    return {
      id,
      "data-disabled": dataAttr(state.isDisabled),
      ref: useForkRef(htmlRef, refs.trackRef),
      style: { ...styles.trackStyle, ...htmlStyle },
      ...htmlProps,
    };
  },
});

export const SliderTrack = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderTrack,
});
