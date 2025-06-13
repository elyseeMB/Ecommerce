import * as React from "react";
import { Form } from "radix-ui";
import styles from "./form.module.css";
import { FieldForm } from "../field/field.tsx";
import { Button } from "../../atoms/button/button.tsx";

type Params = {
  children: React.ReactNode;
  className?: string;
} & React.JSX.IntrinsicElements["form"];

const FormDemo = () => (
  <FormComponent className={styles.Root}>
    <FieldForm
      name="email"
      label="Please enter your email"
      type="email"
      message
    />
    <Form.Field className={styles.Field} name="question">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Form.Label className={styles.Label}>Question</Form.Label>
        <Form.Message className={styles.Message} match="valueMissing">
          Please enter a question
        </Form.Message>
      </div>
      <Form.Control asChild>
        <textarea className={styles.Textarea} required />
      </Form.Control>
    </Form.Field>
    <Button
      variant="primary"
      style={{ width: "100%", textAlign: "center" }}
      type="submit"
    >
      Post question
    </Button>
  </FormComponent>
);

export function FormComponent({ children, className, ...props }: Params) {
  return (
    <Form.Root className={className} {...props}>
      {children}
    </Form.Root>
  );
}

export { FormDemo };
