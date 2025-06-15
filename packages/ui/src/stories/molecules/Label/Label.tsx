import { Label as LabelComponent } from "radix-ui";
import styles from "./Label.module.css";
import { Field } from "../field/Field.tsx";

export function Label({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string | undefined;
}) {
  return (
    <div
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
        name={name}
        className={styles.Input}
        type="text"
        id={name}
        placeholder={placeholder}
      />
    </div>
  );
}
