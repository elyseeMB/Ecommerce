import { Form } from "radix-ui";
import React, { useMemo, type JSX, type ReactNode } from "react";
import styles from "./button.module.css";
import { classNames } from "@helpers/website";

const buttonVariants = ["primary", "secondary"] as const;
const size = ["small", "medium", "large"] as const;

type ButtonSize = (typeof size)[number];
type ButtonVariants = (typeof buttonVariants)[number];

type Params = {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children: ReactNode;
  component?: (() => JSX.Element) | null;
  variant?: ButtonVariants;
  size?: ButtonSize;
} & JSX.IntrinsicElements["button"];

export function Button({
  type = "button",
  children,
  component = null,
  variant = "secondary",
  size = "medium",
  className,
  ...props
}: Params) {
  const ButtonElement = useMemo(() => {
    if (component) {
      return component;
    }
    switch (type) {
      case "submit":
        return ButtonFormSubmit;
      default:
        return BaseButton;
    }
  }, [type, component]);

  const variantClass = styles[variant] ?? "secondary";
  const sizeClass = styles[size] ?? "medium";

  const attr = {
    type,
    children,
    variant,
    className: classNames(styles.Button, variantClass, sizeClass, className),
    ...props,
  };

  return (
    <>
      <ButtonElement {...attr} />
    </>
  );
}

export function BaseButton({
  children,
  className,
  variant = "secondary",
  size = "medium",
  ...props
}: Params) {
  const variantClass = styles[variant] ?? "secondary";
  const sizeClass = styles[size] ?? "medium";

  return (
    <button
      className={classNames(styles.Button, variantClass, sizeClass, className)}
      {...props}
      type="button"
    >
      {children}
    </button>
  );
}

export function ButtonFormSubmit({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Form.Submit asChild>
      <button className={styles.Button} {...props}>
        {children}
      </button>
    </Form.Submit>
  );
}
