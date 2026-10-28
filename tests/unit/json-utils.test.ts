import { describe, expect, it } from "vitest";
import { locateJsonError } from "@/lib/free-tools/json-utils";

describe("locateJsonError", () => {
  it("computes line and column from a single-line document", () => {
    const error = locateJsonError(
      '{"name": "test",}',
      "Unexpected token } in JSON at position 17"
    );
    expect(error).toContain("line 1");
    expect(error).toContain("column 18");
  });

  it("computes the correct line for multi-line documents", () => {
    const json = '{\n  "a": 1,\n  "b": ,\n}';
    // "b" value starts at line 3, column 8
    const error = locateJsonError(json, "Unexpected token , in JSON at position 18");
    expect(error).toContain("line 3");
  });

  it("strips the raw position from the returned message", () => {
    const error = locateJsonError('{"a":}', "Unexpected token } in JSON at position 5");
    expect(error).not.toMatch(/position \d+/i);
  });

  it("passes through messages without a position", () => {
    expect(locateJsonError("{}", "Something else went wrong")).toBe(
      "Something else went wrong"
    );
  });

  it("clamps positions beyond the end of input", () => {
    const error = locateJsonError("{}", "Unexpected end of JSON input in JSON at position 9999");
    expect(error).toContain("line 1");
  });
});
