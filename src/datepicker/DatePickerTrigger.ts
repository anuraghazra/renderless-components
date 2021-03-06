import { callAllHandlers } from "@chakra-ui/utils";
import { createComponent, createHook } from "reakit-system";
import {
  usePopoverDisclosure,
  PopoverDisclosureHTMLProps,
  PopoverDisclosureOptions,
} from "reakit";

import { DATE_PICKER_TRIGGER_KEYS } from "./__keys";
import { DatePickerStateReturn } from "./DatePickerState";

export type DatePickerTriggerOptions = PopoverDisclosureOptions &
  Pick<DatePickerStateReturn, "isDisabled" | "isReadOnly">;

export type DatePickerTriggerHTMLProps = PopoverDisclosureHTMLProps;

export type DatePickerTriggerProps = DatePickerTriggerOptions &
  DatePickerTriggerHTMLProps;

export const useDatePickerTrigger = createHook<
  DatePickerTriggerOptions,
  DatePickerTriggerHTMLProps
>({
  name: "DatePickerTrigger",
  compose: usePopoverDisclosure,
  keys: DATE_PICKER_TRIGGER_KEYS,

  useOptions(options, htmlProps) {
    return {
      disabled: options.isDisabled || options.isReadOnly,
      ...options,
    };
  },

  useProps(_, { onMouseDown: htmlOnMouseDown, ...htmlProps }) {
    const onMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return {
      tabIndex: -1,
      onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
      ...htmlProps,
    };
  },
});

export const DatePickerTrigger = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerTrigger,
});
