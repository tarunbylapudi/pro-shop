import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Header from "../Header";

const mockStore = configureStore([]);

describe("Header Component", () => {
  describe("renders the header correctly when user is not logged in", () => {
    test("renders the header correctly when user is not logged in", () => {
      const store = mockStore({
        auth: { user: null },
        cart: { cartItems: [], totalCartItems: 0 },
      });
      render(
        <Provider store={store}>
          <Router>
            <Header />
          </Router>
        </Provider>
      );
      expect(screen.getByAltText("ProShop")).toBeInTheDocument();
      expect(screen.getByText("ProShop")).toBeInTheDocument();
      expect(screen.getByText("Sign In")).toBeInTheDocument();
    });
  });

  describe("renders the header correctly when user is logged In", () => {
    test("renders the header correctly when user is logged in and not admin", () => {
      const store = mockStore({
        auth: { user: { name: "John Doe", isAdmin: false } },
        cart: { cartItems: [], totalCartItems: 0 },
      });

      render(
        <Provider store={store}>
          <Router>
            <Header />
          </Router>
        </Provider>
      );

      expect(screen.getByAltText("ProShop")).toBeInTheDocument();
      expect(screen.getByText("ProShop")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  test("renders the header correctly when user is logged in and admin", () => {
    const store = mockStore({
      auth: { user: { name: "John Doe", isAdmin: true } },
      cart: { cartItems: [], totalCartItems: 0 },
    });

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByAltText("ProShop")).toBeInTheDocument();
    expect(screen.getByText("ProShop")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("logs out the user when logout link is clicked", async () => {
    const store = mockStore({
      auth: { user: { name: "John Doe", isAdmin: false } },
      cart: { cartItems: [], totalCartItems: 0 },
    });

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText("John Doe"));
    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(store.getActions()).toEqual([
        { type: "cart/clearCart", payload: undefined },
        { type: "auth/deleteUserFromLocal", payload: undefined },
      ]);
    });
  });
});
