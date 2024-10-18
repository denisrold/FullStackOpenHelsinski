import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import SignInContainer from "../components/SignInContainer";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit with correct arguments when the form is submitted", async () => {
      const onSubmit = jest.fn(); // Mocks the onSubmit function
      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={onSubmit} />
      );

      await act(async () => {
        fireEvent.changeText(getByPlaceholderText("Username"), "testuser");
        fireEvent.changeText(getByPlaceholderText("Password"), "password");
      });
      await act(async () => {
        fireEvent.press(getByText("Login"));
      });
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "testuser",
          password: "password",
        });
      });
    });
  });
});
