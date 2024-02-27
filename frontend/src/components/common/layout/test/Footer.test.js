import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import Footer from "../Footer"

describe("Footer renders correctly", () => {
    test("Footer is displayed in footer", () => {
        render(<Footer />)
        const text = screen.getByTestId("text")
        expect(text).toBeInTheDocument()
    })
    test("ProShop text is displayed in footer", () => {
        render(<Footer />)
        expect(screen.getByTestId("text").textContent).toMatch("ProShop")
    })
    test("Current year is displayed in footer", () => {
        render(<Footer />)
        expect(screen.getByTestId("text").textContent).toMatch(new Date().getFullYear().toString())
    })
})