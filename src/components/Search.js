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
import { commonButtonStyling, commonFocusStyling } from "../styles/buttons";
import { ModalContext } from "./ModalContext";
import QuickListButton from "./QuickListButton";

const SearchContainer = styled.div`
  margin: 0 1rem;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 80%;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  ${commonFocusStyling};
`;

const ClearButton = styled.button`
  font-size: 1.5rem;
  margin-left: 0.5rem;
  padding-top: 0.5rem;
  ${commonButtonStyling};
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
  padding-top: 0.5rem;
  ${commonButtonStyling};
`;

const FilterWipIcon = styled(RiTestTubeFill)`
  color: ${(props) => !props.$active && "var(--color-highlight)"};
`;

const SearchResults = styled.ul`
  list-style: none;
  margin: 0.5rem;
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

const Search = () => {
  const data = useStaticQuery(graphql`
    {
      siteSearchIndex {
        index
      }
    }
  `);

  const serialIndex = data.siteSearchIndex.index;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
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

    setResults(matches);
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

  const calculateSearchResults = () => {
    let searchResults = results;
    if (filterWip) {
      searchResults = results.filter(({ wip }) => !wip);
    }

    return searchResults.map(({ id, title, category, slug }) => {
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
    });
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
          title="Search recipes by ingredient"
          aria-label="Search recipes by ingredient"
          onClick={() => handleFeedback("Coming soon!")}
        >
          <RiRestaurantFill />
        </SearchFilter>
        <SearchFilter
          title="Include work in progress recipes"
          aria-label="Include work in progress recipes"
          aria-pressed={!filterWip}
          onClick={toggleFilterWip}
        >
          <FilterWipIcon $active={filterWip} />
        </SearchFilter>
      </SearchFilterRow>
      <SearchInputContainer>
        <SearchInput
          type="text"
          aria-label="Search field"
          placeholder="Search recipes &hellip;"
          value={query}
          onChange={handleSearch}
        />
        <ClearButton
          title="Clear search field"
          aria-label="Clear search field"
          onClick={handleClear}
        >
          <RiArrowGoBackLine />
        </ClearButton>
      </SearchInputContainer>
      <SearchResults>
        {feedbackMsg && (
          <ResultContainer style={{ margin: "1rem 0" }}>
            {feedbackMsg}
          </ResultContainer>
        )}
        {calculateSearchResults()}
      </SearchResults>
    </SearchContainer>
  );
};

export default Search;
