import React from "react";
import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";
import Header from "../Header";

/*
 * Stub matchMedia as it is not currently implemented in JSDOM
 * ref: https://stackoverflow.com/questions/39830580/
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    // Mocked from GraphQL query return data
    return {
      standardLogo: {
        childImageSharp: {
          fixed: {
            src: "test-source-standard",
            srcSet: "test-set-standard",
            height: 50,
            width: 50,
          },
        },
      },
      tinyLogo: {
        childImageSharp: {
          fixed: {
            src: "test-source-tiny",
            srcSet: "test-source-set-tiny",
            height: 36,
            width: 36,
          },
        },
      },
    };
  });
});

/*
test("Renders the title, logo and homepage link by default", () => {
  const testTitle = "test title";
  render(<Header title={testTitle} />);

const headerLink = screen.getByRole("link", { name: testTitle });
expect(headerLink).toHaveAttribute("href", "/");
expect(headerLink).toHaveTextContent(testTitle);

expect(screen.getByRole("heading", testTitle)).toBeInTheDocument();
Tiny image is the default where window object is not defined eg. in SSR
expect(screen.getByRole("img")).toHaveAttribute("src", "test-source-tiny");
});
*/

test.todo("Header link and logo are not visible if spaceOnly prop is true");
