import { describe, expect, it } from "vitest";
import { caseConverters, toWords } from "@/lib/free-tools/cases";

function convert(label: string, text: string): string {
  const converter = caseConverters.find((c) => c.label === label);
  if (!converter) throw new Error(`Unknown case: ${label}`);
  return converter.convert(text);
}

describe("case conversions", () => {
  it("UPPERCASE and lowercase are trivially correct", () => {
    expect(convert("UPPERCASE", "Hello World")).toBe("HELLO WORLD");
    expect(convert("lowercase", "Hello World")).toBe("hello world");
  });

  it("capitalizes each sentence in sentence case", () => {
    expect(convert("Sentence case", "hello there. general kenobi!")).toBe(
      "Hello there. General kenobi!"
    );
  });

  it("keeps minor words lowercase in Title Case except first and last", () => {
    expect(convert("Title Case", "the quick brown fox jumps over the lazy dog")).toBe(
      "The Quick Brown Fox Jumps Over the Lazy Dog"
    );
  });

  it("splits existing camelCase boundaries", () => {
    expect(toWords("userSignUpFlow")).toEqual(["user", "Sign", "Up", "Flow"]);
  });

  it("converts to developer naming conventions", () => {
    expect(convert("camelCase", "User sign-up flow")).toBe("userSignUpFlow");
    expect(convert("PascalCase", "user sign up flow")).toBe("UserSignUpFlow");
    expect(convert("snake_case", "Sign-up (v2)")).toBe("sign_up_v2");
    expect(convert("kebab-case", "Hello World")).toBe("hello-world");
    expect(convert("CONSTANT_CASE", "env variable name")).toBe("ENV_VARIABLE_NAME");
  });

  it("handles empty input without throwing", () => {
    for (const converter of caseConverters) {
      expect(converter.convert("")).toBeTypeOf("string");
    }
  });
});
