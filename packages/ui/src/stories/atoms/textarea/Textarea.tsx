import styles from "./Textarea.module.css";
import { classNames } from "@helpers/website";
import {
  useLayoutEffect,
  useRef,
  type RefCallback,
  type TextareaHTMLAttributes,
} from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: "bordered" | "ghost" | "title";
  autogrow?: boolean;
  ref?: RefCallback<HTMLTextAreaElement>;
};

export function Textarea(props: Props) {
  const { autogrow, variant, ref: propsRef, ...restProps } = props;
  const ref = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (!autogrow || !ref.current) return;
    ref.current.style.height = "inherit";
    const paddingY = 2;
    ref.current.style.height = `${ref.current.scrollHeight + paddingY * 2}px`;
  };

  useLayoutEffect(() => adjustHeight(), []);

  return (
    <textarea
      ref={(node) => {
        ref.current = node;
        propsRef?.(node);
      }}
      onInput={(e) => {
        adjustHeight();
        props.onInput?.(e);
      }}
      className={classNames(styles.Textarea, props.className)}
      {...restProps}
    >
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis sit
      ducimus consectetur dolorem excepturi consequuntur, repellat facere quia
      eum vitae fuga voluptatum quam, doloremque illo totam dolore? Modi,
      repellat officia.
    </textarea>
  );
}
