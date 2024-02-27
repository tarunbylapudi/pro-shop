import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormLayout from "../FormLayout";
describe("Test FormLayout", () => {
  test("props children is diaplayed in component", () => {
    render(<FormLayout>Test</FormLayout>);
    const text = screen.getByText("Test");
    expect(text).toBeInTheDocument();
  });
});
