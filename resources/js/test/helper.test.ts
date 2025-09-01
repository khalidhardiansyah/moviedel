import { formatDate } from "@/helpers/helper";
import { describe, test, expect } from "vitest";

describe("Format Date Testing", () => {
    test("formatDate should return 'day month year'", () => {
        expect(formatDate("2002-10-20")).toBe("20 Okt 2002");
    });

    test("it should return wrong format when parameter is empty", () => {
        expect(formatDate("")).toBe("wrong format");
    });
    test("it should return wrong format when parameter filled with wrong format", () => {
        expect(formatDate("10-10-2005")).toBe("wrong format");
    });
});
