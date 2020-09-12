import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { Index } from "elasticlunr";
import { GoSearch, GoX } from "react-icons/go";
import styled from "styled-components";
import QuickListButton from "./QuickListButton";

const SearchContainer = styled.div`
  padding: 1.45rem;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0 1.5rem 0;
`;

const SearchIcon = styled(GoSearch)`
  font-size: 1.5rem;
  margin-left: 0.5rem;
`;

const ClearIcon = styled(GoX)`
  font-size: 1.5rem;
  margin-left: 0.5rem;
`;

const SearchField = styled.input`
  flex: 1;
  min-width: 80%;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
`;

const SearchResults = styled.ul`
  list-style: none;
  margin: 0.5rem;

  li > a {
    color: #373737;
    text-decoration: none;
    line-height: 1.7rem;
  }
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
        <SearchIcon />
        <ClearIcon onClick={handleClear} />
      </SearchInput>
      <SearchResults>
        {results.map(({ id, title, category, slug }) => {
          return (
            <li key={id}>
              <Link to={slug}>{title}</Link>
              <QuickListButton />
            </li>
          );
        })}
      </SearchResults>
    </SearchContainer>
  );
};

export default Search;
