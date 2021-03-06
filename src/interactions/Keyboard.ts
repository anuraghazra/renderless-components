import { useLiveRef } from "reakit-utils";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import {
  KeyboardProps,
  useKeyboard as useAriaKeyboard,
} from "@react-aria/interactions";

import { INTERACTION_KEYS } from "./__keys";

export const useKeyboard = createHook<KeyboardProps, BoxHTMLProps>({
  name: "Keyboard",
  compose: useBox,
  keys: INTERACTION_KEYS,

  useProps(
    options,
    { onKeyDown: htmlOnKeonKeyDown, onKeyUp: htmlOnKeyUp, ...htmlProps },
  ) {
    const onKeyDownRef = useLiveRef(htmlOnKeonKeyDown);
    const onKeyUpRef = useLiveRef(htmlOnKeyUp);
    const props = {
      ...options,
      onKeyDown: onKeyDownRef.current,
      onKeyUp: onKeyUpRef.current,
    };

    const { keyboardProps } = useAriaKeyboard(props);

    return mergeProps(keyboardProps, htmlProps);
  },
});

export const Keyboard = createComponent({
  as: "div",
  memo: true,
  useHook: useKeyboard,
});
