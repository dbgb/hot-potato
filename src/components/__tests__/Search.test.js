import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useStaticQuery } from "gatsby";
import { Index } from "elasticlunr";
import Search from "../Search";

beforeEach(() => {
  useStaticQuery.mockImplementation(() => {
    // Mocked from GraphQL query return data
    return {
      siteSearchIndex: {
        index: {
          version: "0.9.5",
          fields: ["title", "category", "wip"],
          ref: "id",
          documentStore: {
            docs: {},
          },
          index: {
            title: {},
            category: {},
            wip: {},
          },
        },
      },
    };
  });
});

function setupMockSearchIndex() {
  // Mock elasticlunr API to avoid hitting the actual search index during tests
  const testDocumentStore = {
    docs: {
      "test-result-hash": {
        category: "test-result-category",
        id: "test-result-id",
        slug: "/test-result-slug/",
        title: "test-result-title",
        wip: false,
      },
    },
  };

  // output: {docs}
  Index.prototype.documentStore = jest.fn().mockReturnValue(testDocumentStore);

  // input: docRef, output: docs[docRef] || null
  Index.prototype.documentStore.getDoc = jest.fn(
    () => testDocumentStore.docs["test-result-hash"]
  );

  // input: Index, output: [] || [{ref: String, ...} x N]
  Index.prototype.search = jest.fn().mockReturnValue([{ ref: "test-ref" }]);

  // input: SerialisedIndexData, output: Index
  Index.load = jest.fn().mockReturnValue(new Index());
}

test("[WIP] Search results are rendered only when user query matches an indexed object", () => {
  setupMockSearchIndex();
  render(<Search />);
  const searchField = screen.getByRole("textbox", { name: /search/i });

  expect(searchField).toHaveAttribute(
    "placeholder",
    expect.stringMatching(/search/i)
  );

  const searchTerm = "test search term";
  userEvent.type(searchField, searchTerm);
  expect(searchField).toHaveValue(searchTerm);

  // scenario 1: match found
  const searchResult = screen.getByRole("link", { name: /test-result/i });
  expect(searchResult).toHaveAttribute("href", "/test-result-slug/");

  // TODO: scenario 2: no match found
  // search results should not be present
});

test("Search field is clearable via an assigned button", () => {
  setupMockSearchIndex();
  render(<Search />);
  const searchField = screen.getByRole("textbox", { name: /search/i });

  const clearButton = screen.getByRole("button", {
    name: /^clear search field$/i,
  });
  expect(clearButton).toBeInTheDocument();
  expect(searchField).toBeInTheDocument();

  const searchTerm = "test search term";
  userEvent.type(searchField, searchTerm);
  expect(searchField).toHaveValue(searchTerm);
  userEvent.clear(searchField);
  expect(searchField).toHaveValue("");
});

test("Filter buttons are rendered and appropriately named", () => {
  render(<Search />);

  const filterLabels = [
    /add.*filters/i,
    /clear.*filters/i,
    /search.*by\singredient/i,
    /include work in progress recipes/i,
  ];

  filterLabels.forEach((label) => {
    expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
  });
});
