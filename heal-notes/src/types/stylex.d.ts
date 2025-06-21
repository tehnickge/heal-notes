declare module "@stylexjs/stylex" {
  import { CSSProperties } from "react";

  export type StyleXStyles = { [key: string]: string };
  export function create(styles: {
    [key: string]: CSSProperties;
  }): StyleXStyles;
  export function props(...styles: Array<StyleXStyles | null | undefined>): {
    className: string;
  };
}
