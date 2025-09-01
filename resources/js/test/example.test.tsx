import PrimaryButton from "@/Components/PrimaryButton";
import { render, screen } from "@testing-library/react";
import { assert, describe, expect, test } from "vitest";

describe("example test", () => {
    test("ini example test", () => {
        render(<PrimaryButton>jancok</PrimaryButton>);
        expect(screen.getByText("jancok"));
    });
});
