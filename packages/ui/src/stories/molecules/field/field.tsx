import styles from "./field.module.css";
import type { ComponentProps, HTMLInputTypeAttribute, ReactNode } from "react";
import { Input } from "../../atoms/input/Input.tsx";
import type React from "react";
import { Textarea } from "../../atoms/textarea/Textarea.tsx";
import { Select } from "../../atoms/select/Select.tsx";

type BaseProps<
  T extends HTMLInputTypeAttribute | keyof React.JSX.IntrinsicElements,
  P,
> = {
  name?: string;
  id?: string;
  label?: string;
  help?: string;
  error?: string;
  onValueChange?: (s: string) => void;
  type?: T;
  placeholder?: string;
  message?: boolean;
  children?: ReactNode;
} & P;

type Props =
  | BaseProps<never, ComponentProps<typeof Input>>
  | BaseProps<"text", ComponentProps<typeof Input>>
  | BaseProps<"email", ComponentProps<typeof Input>>
  | BaseProps<"password", ComponentProps<typeof Input>>
  | BaseProps<"textarea", ComponentProps<typeof Textarea>>
  | BaseProps<"select", ComponentProps<typeof Select>>;

export function Field(props: Props) {
  const showHelp = props.help && !props.error;
  const childrenAsInput = !props.type && props.children;
  return (
    <div className={styles.Wrapper}>
      {props.label && <label htmlFor={props.name}> {props.label} </label>}
      {childrenAsInput ? props.children : getInput(props)}
      {showHelp && <span className={styles.Help}> {props.help} </span>}
      {props.error && <span className={styles.Error}> {props.error} </span>}
    </div>
  );
}

function getInput(props: Props) {
  const { type, onValueChange, ...restPros } = props;

  const baseProps = {
    name: props.name,
    id: props.id,
    placeholder: props.placeholder,
  };

  switch (type) {
    case "select":
      return (
        // @ts-expect-error Select is too dynamic
        <Select {...baseProps} {...restPros} />
      );
    case "textarea":
      return (
        // @ts-expect-error Textarea is too dynamic
        <Textarea {...baseProps} {...restPros} />
      );
    default:
      return (
        <Input
          type={type}
          // @ts-expect-error Input is too dynamic
          onChange={(e) => onValueChange?.(e.currentTarget.value)}
          {...baseProps}
          {...restPros}
        />
      );
  }
}
