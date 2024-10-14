import { render } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };
      // Renderizar el componente con los repositorios de prueba
      const { queryByTestId, getAllByTestId, getByTestId, getByText } = render(
        <RepositoryListContainer repositories={repositories} />
      );
      expect(getByText("jaredpalmer/formik")).toBeTruthy();
      // Obtiene todos los elementos renderizados por el testID asignado en el componente
      const repositoryItems = getAllByTestId("jaredpalmer.formik");
      expect(repositoryItems.length).toBeGreaterThan(0); // Asegúrate de que hay elementos
      // Verifica que el primer elemento del arreglo tenga el contenido esperado
      expect(getByText("jaredpalmer/formik")).toBeTruthy();
      expect(getByText("Build forms in React, without the tears")).toBeTruthy();
      expect(getByText("TypeScript")).toBeTruthy();
      expect(getByText("1.6k")).toBeTruthy(); // forksCount
      expect(getByText("21.9k")).toBeTruthy(); // stargazersCount
      expect(getByText("88")).toBeTruthy(); // ratingAverage

      expect(queryByTestId("Reviews-jaredpalmer.formik")).toHaveTextContent(
        "3"
      );
      // //repositorio numero dos.
      // expect(repositoryItems[1]).toHaveTextContent("async-library/react-async");
      // expect(repositoryItems[1]).toHaveTextContent(
      //   "Flexible promise-based React data loader"
      // );
      // expect(repositoryItems[1]).toHaveTextContent("JavaScript");
      // expect(repositoryItems[1]).toHaveTextContent("69"); // forksCount
      // expect(repositoryItems[1]).toHaveTextContent("1.8k"); // stargazersCount
      // expect(repositoryItems[1]).toHaveTextContent("72"); // ratingAverage
      // expect(repositoryItems[1]).toHaveTextContent("3"); // reviewCount
    });
  });
});
