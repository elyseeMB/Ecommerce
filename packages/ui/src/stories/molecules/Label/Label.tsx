import { Label as LabelComponent } from "radix-ui";
import styles from "./Label.module.css";
import { Field } from "../field/Field.tsx";
import { classNames } from "@helpers/website";
import type { ChangeEvent } from "react";

export function Label({
  label,
  name,
  value,
  placeholder,
  className,
  type = "text",
  onChange,
}: {
  label: string;
  name: string;
  type?:
    | "color"
    | "email"
    | "password"
    | "text"
    | "select"
    | "textarea"
    | undefined;
  placeholder?: string | undefined;
  className?: string;
  value?: string;
  onChange?: (ev: ChangeEvent) => void;
}) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        padding: "0 20px",
        gap: 15,
        alignItems: "center",
      }}
    >
      <LabelComponent.Root className={styles.Root} htmlFor="firstName">
        {label}
      </LabelComponent.Root>
      <Field
        value={value}
        name={name}
        className={styles.Input}
        type={type}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
