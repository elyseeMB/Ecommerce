import { classNames } from "@helpers/website";
import styles from "./Input.module.css";
import React, { useState, type FC } from "react";

const variant = ["bordered", "ghost", "title"] as const;

type Props = {
  icon?: FC<
    Partial<{ size: number | undefined; className: string | undefined }>
  >;
  variant?: (typeof variant)[number];
  invalid?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  disabled,
  invalid,
  onValueChange,
  icon: IconComponent,
  ...props
}: Props) {
  if (IconComponent) {
    const [focus, setFocus] = useState(false);
    return (
      <div data-focus={focus} className={styles.Wrapper}>
        <IconComponent />
        <input
          type="text"
          aria-invalid={invalid}
          {...props}
          className={classNames(styles.Input, props.className)}
          onChange={(e) => {
            onValueChange?.(e.currentTarget.value);
            props.onChange?.(e);
          }}
          onFocus={(e) => {
            setFocus(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            props.onBlur?.(e);
          }}
        />
      </div>
    );
  }

  return (
    <input
      type="text"
      aria-invalid={invalid}
      {...props}
      className={styles.Input}
      onChange={(e) => {
        onValueChange?.(e.currentTarget.value);
        props.onChange?.(e);
      }}
    />
  );
}
