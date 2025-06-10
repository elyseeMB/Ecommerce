import { Form } from "radix-ui";
import {
  useMemo,
  type JSX,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import styles from "./button.module.css";

type Params = {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children: ReactNode;
  component?: (() => JSX.Element) | null;
} & JSX.IntrinsicElements["button"];

export function Button({
  type = "button",
  children,
  component = null,
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

  const attr = {
    type,
    children,
    ...props,
  };

  return (
    <>
      <ButtonElement {...attr} />
    </>
  );
}

export function BaseButton({ children }: PropsWithChildren) {
  return <button type="button"> {children} </button>;
}

export function ButtonFormSubmit({ children }: PropsWithChildren) {
  return (
    <Form.Submit asChild>
      <button className={styles.Button} style={{ marginTop: 10 }}>
        {children}
      </button>
    </Form.Submit>
  );
}
