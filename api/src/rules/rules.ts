// deno-lint-ignore-file no-explicit-any
import { Validity, invalid, Rule } from "../../deps.ts";

export const optionlaLengthBetween = (
  minLength: number,
  maxLength: number
): Rule => {
  return function optionlaLengthRule(value: string): Validity {
    if (!value || value.length < minLength || value.length > maxLength) {
      return invalid("lengthBetween", { value, minLength, maxLength }, false);
    }
  };
};
