import React, { useState, useContext } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { Index } from "elasticlunr";
import {
  RiArrowGoBackLine,
  RiTestTubeFill,
  RiRestaurantFill,
  RiFilterFill,
  RiFilterOffFill,
} from "react-icons/ri";
import styled from "styled-components";
import QuickListButton from "./QuickListButton";
import { ModalContext } from "./ModalContext";

const SearchContainer = styled.div`
  margin: 0 1rem;
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

const SearchFilterRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const SearchFilter = styled.button`
  font-size: 2rem;
  margin-top: 0.5rem;
  background: none;
  border: none;
  color: var(--color-text-main);
`;

const FilterWipIcon = styled(RiTestTubeFill)`
  outline: ${(props) => !props.active && "2px solid var(--color-text-main)"};
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
  const { setModalOpen } = useContext(ModalContext);

  const [filterWip, setFilterWip] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

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
      .search(query, {
        expand: true, // Accept partial matches
      })
      .map(({ ref }) => elasticIndex.documentStore.getDoc(ref));

    if (filterWip) {
      setResults(
        matches.filter(({ wip }) => {
          return !wip;
        })
      );
    } else {
      setResults(matches);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  const handleClick = () => {
    setModalOpen(false);
    handleClear();
  };

  const handleFeedback = (msg) => {
    if (feedbackMsg === null) {
      setFeedbackMsg(msg);
      setTimeout(() => {
        setFeedbackMsg(null);
      }, 3000);
    }
  };

  const toggleFilterWip = () => {
    setFilterWip(!filterWip);
  };

  return (
    <SearchContainer>
      <SearchFilterRow>
        <SearchFilter
          title="Add search filters"
          aria-label="Add search filters"
          onClick={() => handleFeedback("Coming soon!")}
        >
          <RiFilterFill />
        </SearchFilter>
        <SearchFilter
          title="Clear active search filters"
          aria-label="Clear active search filters"
          onClick={() => handleFeedback("Coming soon!")}
        >
          <RiFilterOffFill />
        </SearchFilter>
        <SearchFilter
          title="Search by Ingredient"
          aria-label="Search by Ingredient"
          onClick={() => handleFeedback("Coming soon!")}
        >
          <RiRestaurantFill />
        </SearchFilter>
        <SearchFilter
          title="Include WIP Recipes"
          aria-label="Include WIP Recipes"
          aria-pressed={!filterWip}
          onClick={toggleFilterWip}
        >
          <FilterWipIcon active={filterWip} />
        </SearchFilter>
      </SearchFilterRow>
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
          aria-label="Clear Search"
          onClick={handleClear}
        />
      </SearchInput>
      <SearchResults>
        {feedbackMsg && <ResultContainer>{feedbackMsg}</ResultContainer>}
        {results.map(({ id, title, category, slug }) => {
          return (
            <li key={id}>
              <ResultContainer>
                <Link to={slug} onClick={handleClick}>
                  {title}
                </Link>
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
