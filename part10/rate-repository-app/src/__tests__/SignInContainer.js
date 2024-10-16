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

      // Filling the text inputs
      await act(async () => {
        fireEvent.changeText(getByPlaceholderText("Username"), "testuser");
        fireEvent.changeText(getByPlaceholderText("Password"), "password");
      });

      // Pressing the submit button
      await act(async () => {
        fireEvent.press(getByText("Login"));
      });

      // Waiting for the expectation
      await waitFor(() => {
        // Check that onSubmit was called once
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // Verificar que onSubmit fue llamado con los valores correctos de username y password
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "testuser",
          password: "password",
        });
      });
    });
  });
});
