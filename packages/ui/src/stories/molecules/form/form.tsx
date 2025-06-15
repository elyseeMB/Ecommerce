import * as React from "react";
import { Form } from "radix-ui";
import styles from "./form.module.css";
import { Field } from "../field/Field.tsx";
import { Button } from "../../atoms/button/button.tsx";

type Params = {
  children: React.ReactNode;
  className?: string;
} & React.JSX.IntrinsicElements["form"];

const FormDemo = () => (
  <FormComponent className={styles.Root}>
    <Field name="email" label="Please enter your email" type="email" message />

    <Field autogrow label="Question" type="textarea">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum possimus,
      deserunt natus fugit omnis ex totam aperiam sapiente dolorum iure
      repudiandae accusantium neque laboriosam officiis aliquam velit cumque.
      Itaque, tempora.
    </Field>
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
