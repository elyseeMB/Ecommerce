import { Field } from "../../molecules/field/Field.tsx";
import { Icon } from "../../atoms/icon/Icon.tsx";
import styles from "./SearchBar.module.css";

type Params = {
  size?: number;
};

export function SearchBar({ size = 16 }: Params) {
  return (
    <div className={styles.SearchBar}>
      <Icon size={size} name="SearchLine" />
      <Field name="search" placeholder="Search here..." />
      <div className={styles.Control}>
        <span className={styles.Item}>
          <Icon size={size} name="CommandLine" />
        </span>
        <span className={styles.Item}>K</span>
      </div>
    </div>
  );
}
