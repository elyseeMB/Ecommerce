import { Form } from "radix-ui";
import styles from "./field.module.css";
import type { HTMLInputTypeAttribute, JSX } from "react";

type Params = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute | undefined;
} & JSX.IntrinsicElements["input"];

export function FieldForm({ name, label, type = "text", ...props }: Params) {
  return (
    <Form.Field className={styles.Field} name={name} {...props}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Form.Label className={styles.Label}> {label}</Form.Label>
        <Form.Message className={styles.Message} match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message className={styles.Message} match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input className={styles.Input} type={type} required />
      </Form.Control>
    </Form.Field>
  );
}
