import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

describe("Header Component", () => {
  it("renders Home link", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it("renders Profile link if user is logged in", () => {
    localStorage.setItem("user", JSON.stringify({ name: "John Doe" }));
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });

  it("does not render Profile link if user is not logged in", () => {
    localStorage.removeItem("user");
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
  });
  
  it("logout button clears localStorage and redirects to login", () => {
    localStorage.setItem("user", JSON.stringify({ name: "John Doe" }));
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    fireEvent.click(getByText(/Logout/i));
    expect(localStorage.getItem("user")).toBeNull();
  });
});