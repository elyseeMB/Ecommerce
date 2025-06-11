import { FieldForm } from "../../molecules/field/field.tsx";
import { Icon } from "../../atoms/icon/Icon.tsx";
import { FormComponent } from "../../molecules/form/form.tsx";
import styles from "./SearchBar.module.css";

type Params = {
  size?: number;
};

export function SearchBar({ size = 16 }: Params) {
  return (
    <div className={styles.SearchBar}>
      <Icon size={size} name="SearchLine" />
      <FormComponent>
        <FieldForm
          className={styles.Input}
          name="search"
          placeholder="Search here..."
        />
      </FormComponent>
      <div className={styles.Control}>
        <span className={styles.Item}>
          <Icon size={size} name="CommandLine" />
        </span>
        <span className={styles.Item}>K</span>
      </div>
    </div>
  );
}
