import React from "react";
import { Meta } from "@storybook/react";
import { useForm, Controller } from "react-hook-form";

import { NumberInput } from "../NumberInput";
import { NumberInputDecrementButton } from "../NumberInputDecrementButton";
import { NumberInputIncrementButton } from "../NumberInputIncrementButton";
import { UseNumberInputProps, useNumberInputState } from "../NumberInputState";

const NumberInputComp = (props: UseNumberInputProps) => {
  const state = useNumberInputState(props);
  console.log("%c state", "color: #5200cc", state);

  return (
    <div>
      <NumberInputDecrementButton {...state}>-</NumberInputDecrementButton>
      <NumberInput {...state} />
      <NumberInputIncrementButton {...state}>+</NumberInputIncrementButton>
    </div>
  );
};

export default {
  title: "Component/NumberInput",
  component: NumberInput,
} as Meta;

export const Default = () => {
  const props = {};

  return <NumberInputComp {...props} />;
};

const NumberComponent: React.FC<any> = ({ onChange, value, name }) => {
  const state = useNumberInputState({
    onChange,
    value,
  });
  return (
    <>
      <NumberInputDecrementButton {...state}>-</NumberInputDecrementButton>
      <NumberInput name={name} {...state} />
      <NumberInputIncrementButton {...state}>+</NumberInputIncrementButton>
    </>
  );
};

export const ReactHookForm = () => {
  const { control, handleSubmit } = useForm<{
    num: number;
  }>({ defaultValues: { num: 20 } });

  return (
    <form
      onSubmit={handleSubmit(values => {
        alert(JSON.stringify(values));
      })}
    >
      <div>
        <Controller
          name="num"
          control={control}
          render={NumberComponent as any}
        />
      </div>
    </form>
  );
};

export const DefaultValue = () => {
  const props = {
    defaultValue: 15,
    min: 10,
    max: 20,
  };

  return <NumberInputComp {...props} />;
};

export const Step = () => {
  const props = {
    defaultValue: 15,
    min: 10,
    max: 30,
    step: 5,
  };

  return <NumberInputComp {...props} />;
};

export const Precision = () => {
  const props = {
    defaultValue: 15,
    min: 10,
    max: 30,
    step: 0.2,
    precision: 2,
  };

  return <NumberInputComp {...props} />;
};

export const ClampValueOnBlurFalse = () => {
  const props = {
    defaultValue: 15,
    min: 10,
    max: 30,
    step: 0.2,
    precision: 2,
    clampValueOnBlur: false,
    keepWithinRange: false,
  };

  return <NumberInputComp {...props} />;
};

export const KeepWithinRangeFalse = () => {
  const props = {
    defaultValue: 15,
    min: 10,
    max: 30,
    step: 0.2,
    precision: 2,
    clampValueOnBlur: false,
    keepWithinRange: false,
  };

  return <NumberInputComp {...props} />;
};

export const Disabled = () => {
  const props = {
    defaultValue: 15,
    min: 10,
    max: 20,
    isDisabled: true,
  };

  return <NumberInputComp {...props} />;
};

export const ReadOnly = () => {
  const props = {
    defaultValue: 15,
    min: 10,
    max: 20,
    isReadOnly: true,
  };

  return <NumberInputComp {...props} />;
};
