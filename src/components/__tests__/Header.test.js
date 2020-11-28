import React from "react";
import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";
import Header from "../Header";

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    // Mocked from GraphQL query return data
    return {
      file: {
        childImageSharp: {
          fixed: {
            src: "test-source",
            srcSet: "test-source-set",
            height: 50,
            width: 50,
          },
        },
      },
    };
  });
});

test("Renders the title, logo and homepage link by default", () => {
  const testTitle = "test title";
  render(<Header title={testTitle} />);

  const headerLink = screen.getByRole("link", { name: testTitle });
  expect(headerLink).toHaveAttribute("href", "/");
  expect(headerLink).toHaveTextContent(testTitle);

  expect(screen.getByRole("heading", testTitle)).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute("src", "test-source");
});

test.todo("Header link and logo are not visible if spaceOnly prop is true");
