import { render } from "@testing-library/react-native";
import { Button } from "react-native";
// describe("Example", () => {
//   it("works", () => {
//     expect(1).toBe(1);
//   });
// });

test('accessing queries using "render" result', () => {
  const { getByRole } = render(<Button title="Start" onPress={() => {}} />);
  getByRole("button", { name: "Start" });
});
