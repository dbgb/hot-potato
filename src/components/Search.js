import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { Index } from "elasticlunr";
import { RiArrowGoBackLine } from "react-icons/ri";
import styled from "styled-components";
import QuickListButton from "./QuickListButton";

const SearchContainer = styled.div`
  margin: 0 1.5rem;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ClearIcon = styled(RiArrowGoBackLine)`
  font-size: 1.5rem;
  margin-left: 0.5rem;
  color: var(--color-text-main);
  transition: var(--ease);
`;

const ResultContainer = styled.div`
  display: flex;
  align-items: center;

  a {
    color: var(--color-link);
    text-decoration: none;
    line-height: 1.7rem;
  }
`;

const SearchField = styled.input`
  flex: 1;
  min-width: 80%;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  outline: none;
`;

const SearchResults = styled.ul`
  list-style: none;
  margin: 0.5rem;
`;

const Search = () => {
  const data = useStaticQuery(graphql`
    {
      siteSearchIndex {
        index
      }
    }
  `);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const serialIndex = data.siteSearchIndex.index;

  let elasticIndex = null;
  const getOrCreateIndex = () => {
    // Return existing elasticlunr index instance, or create new one and hydrate
    // it from JSON serialised index data returned from static query
    if (!elasticIndex) {
      elasticIndex = Index.load(serialIndex);
    }
    return elasticIndex;
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setQuery(query); // Keep search field text up to date with user input
    getOrCreateIndex();
    let matches = elasticIndex
      .search(query, { expand: true }) // Accept partial matches
      .map(({ ref }) => elasticIndex.documentStore.getDoc(ref));
    setResults(matches);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <SearchContainer>
      <SearchInput>
        <SearchField
          type="text"
          aria-label="Search field"
          placeholder="Search recipes &hellip;"
          value={query}
          onChange={handleSearch}
        />
        <ClearIcon
          title="Clear Search"
          aria-label="Search field clear button"
          onClick={handleClear}
        />
      </SearchInput>
      <SearchResults>
        {results.map(({ id, title, category, slug }) => {
          return (
            <li key={id}>
              <ResultContainer>
                <Link to={slug}>{title}</Link>
                <QuickListButton />
              </ResultContainer>
            </li>
          );
        })}
      </SearchResults>
    </SearchContainer>
  );
};

export default Search;
