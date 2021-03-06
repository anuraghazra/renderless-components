import * as React from "react";
import { Meta } from "@storybook/react";
import { addDays, addWeeks, subWeeks } from "date-fns";

import "./index.css";
import { DateValue } from "../../calendar/index.d";
import { DatePickerStateInitialProps } from "../index.d";
import { CalendarComp } from "../../calendar/stories/CalendarComponent";
import {
  DatePicker,
  DateSegment,
  DateSegmentField,
  DatePickerContent,
  DatePickerTrigger,
  useDatePickerState,
} from "../index";

export default {
  title: "Component/DatePicker",
} as Meta;

const DatePickerComp: React.FC<DatePickerStateInitialProps> = props => {
  const state = useDatePickerState({
    formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
    ...props,
  });

  return (
    <>
      <DatePicker className="datepicker" {...state}>
        <div className="datepicker__header">
          <DateSegmentField {...state} className="datepicker__field">
            {state.segments.map((segment, i) => (
              <DateSegment
                key={i}
                segment={segment}
                className="datepicker__field--item"
                {...state}
              />
            ))}
          </DateSegmentField>

          <DatePickerTrigger className="datepicker__trigger" {...state}>
            <CalendarIcon />
          </DatePickerTrigger>
        </div>
      </DatePicker>
      <DatePickerContent {...state}>
        <CalendarComp {...state.calendar} />
      </DatePickerContent>
    </>
  );
};

const CalendarIcon = () => (
  <svg viewBox="0 0 36 36" focusable="false" aria-hidden="true" role="img">
    <path d="M33 6h-5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H10V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H1a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 26H2V8h4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h14v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h4z"></path>
    <path d="M6 12h4v4H6zM12 12h4v4h-4zM18 12h4v4h-4zM24 12h4v4h-4zM6 18h4v4H6zM12 18h4v4h-4zM18 18h4v4h-4zM24 18h4v4h-4zM6 24h4v4H6zM12 24h4v4h-4zM18 24h4v4h-4zM24 24h4v4h-4z"></path>
  </svg>
);

export const Default = () => <DatePickerComp />;

export const InitialDate = () => (
  <DatePickerComp defaultValue={new Date(2001, 0, 1)} />
);

export const ControllableState = () => {
  const [value, setValue] = React.useState<DateValue>(addDays(new Date(), 1));

  return (
    <div>
      <input
        type="date"
        onChange={e => setValue(new Date(e.target.value))}
        value={new Date(value).toISOString().slice(0, 10)}
      />
      <DatePickerComp value={value} onChange={setValue} />
    </div>
  );
};

export const MinMaxDate = () => (
  <DatePickerComp minValue={new Date()} maxValue={addWeeks(new Date(), 1)} />
);

export const InValidDate = () => (
  <DatePickerComp
    defaultValue={addWeeks(new Date(), 2)}
    minValue={subWeeks(new Date(), 1)}
    maxValue={addWeeks(new Date(), 1)}
  />
);

export const isDisabled = () => (
  <DatePickerComp defaultValue={addDays(new Date(), 1)} isDisabled />
);

export const isReadOnly = () => (
  <DatePickerComp defaultValue={addDays(new Date(), 1)} isReadOnly />
);

export const autoFocus = () => (
  // eslint-disable-next-line jsx-a11y/no-autofocus
  <DatePickerComp defaultValue={addDays(new Date(), 1)} autoFocus />
);
