import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
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

// --------------------------
// -- Styled Subcomponents --
// --------------------------
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
  border-radius: 0.5rem;
  font-size: 1.1rem;
  ${commonFocusStyling};
`;

const ClearSearchButton = styled.button`
  font-size: 1.5rem;
  margin-left: 0.5rem;
  padding-top: 0.5rem;
  ${commonButtonStyling};
`;

const SearchResults = styled.ul`
  list-style: none;
  margin: 0.5rem;
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed var(--color-primary);
  padding-bottom: 0.5rem;

  a {
    color: var(--color-link);
    text-decoration: none;
    line-height: 1.5rem;
  }
`;

// --------------------
// -- Filter Toolbar --
// --------------------
const FilterToolbar = styled.div`
  display: flex;
  justify-content: space-around;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const FilterButton = styled.button`
  font-size: 2rem;
  padding-top: 0.5rem;
  ${commonButtonStyling};
`;

const FilterByWipIcon = styled(RiTestTubeFill)`
  color: ${(props) => !props.$active && "var(--color-highlight)"};
`;

// ---------------------
// -- Category Filter --
// ---------------------
const FilterByCategoryIcon = styled(RiFilterFill)`
  color: ${(props) => props.$active && "var(--color-highlight)"};
`;

const CategoryFilterContainer = styled.div`
  border: 1px dotted var(--color-primary);
  padding: 1rem;
  margin-bottom: 1rem;
`;

const CategoryFilterControls = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
`;

const CategoryFilterHeading = styled.h2``;

const CategoryFilterApply = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px var(--color-primary);
  ${commonButtonStyling};
  border: 2px solid var(--color-primary);

  &:focus {
    outline-offset: 0.25rem;
  }

  &:active {
    outline: none;
    background-color: var(--color-highlight);
    box-shadow: none;
    transform: translate(2px, 3px);
  }
`;

const CategoryFilterOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(33%, 1fr));
`;

const CategoryFilterOption = styled.div`
  height: 3rem;

  & > input {
    cursor: pointer;
  }
`;

const CategoryFilterLabel = styled.label`
  text-transform: capitalize;
  color: ${(props) => props.$active && "var(--color-highlight)"};
`;

// --------------------
// -- Main Component --
// --------------------
const Search = () => {
  const data = useStaticQuery(graphql`
    {
      siteSearchIndex {
        index
      }
    }
  `);

  // ------------------
  // -- Search Index --
  // ------------------
  let elasticIndex = null;
  const getOrCreateIndex = () => {
    const serialIndex = data.siteSearchIndex.index;
    // Return existing elasticlunr index instance, or create and hydrate new
    // instance from JSON serialised index data retrieved by static query
    if (!elasticIndex) {
      elasticIndex = Index.load(serialIndex);
    }
    return elasticIndex;
  };

  const { modalOpen, setModalOpen } = useContext(ModalContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const handleFeedback = (msg) => {
    if (feedbackMsg === null) {
      setFeedbackMsg(msg);
      setTimeout(() => {
        setFeedbackMsg(null);
      }, 3000);
    }
  };

  const handleSearch = (e) => {
    let query = e.target.value;
    setQuery(query); // Keep search field text up to date with user input

    if (selectedCategories) {
      // ["a", "b", "c"] -> "a b c"
      query = `${selectedCategories.join(" ")} ${query}`;
    }

    getOrCreateIndex();

    let matches = elasticIndex
      .search(query, {
        expand: true, // Accept partial matches
      })
      .map(({ ref }) => elasticIndex.documentStore.getDoc(ref));

    setResults(matches);
    // Clear results on empty search field
    if (!e.target.value) {
      setResults([]);
    }
  };

  const handleClearSearchField = () => {
    setQuery("");
    setResults([]);
  };

  const handleClickSearchResult = () => {
    setModalOpen(false);
    handleClearSearchField();
  };

  const calculateSearchResults = () => {
    let searchResults = results;

    if (filterByWip) {
      searchResults = results.filter(({ wip }) => !wip);
    }

    return searchResults.map(({ id, title, category, slug }) => {
      return (
        <li key={id}>
          <SearchResult>
            <Link to={slug} onClick={handleClickSearchResult}>
              {title}
            </Link>
            <QuickListButton />
          </SearchResult>
        </li>
      );
    });
  };

  // ------------------
  // -- Search Input --
  // ------------------
  let searchInputRef = useRef(null);
  useEffect(() => {
    // Focus search input only when rendered as child of Modal
    modalOpen && searchInputRef.current.focus();
  }, [modalOpen]);

  // --------------------
  // -- Search Filters --
  // --------------------
  const [filterByWip, setFilterByWip] = useState(true);
  const [showCategoryFilters, setShowCategoryFilters] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // As the entire search index documentStore is built from a static file set
  // and is fixed and complete after build time, we can expect its contents to
  // remain stable throughout the lifetime of the component. As such, there is
  // no benefit to retrieving contained category values every render, or more
  // than once per mount.
  const memoizedDocs = useMemo(() => {
    return data.siteSearchIndex.index.documentStore.docs;
  }, [data.siteSearchIndex.index.documentStore]);

  useEffect(() => {
    // Populate category filters on mount
    const docs = memoizedDocs;
    // Ensure no duplicate categories by using a set
    let categorySet = new Set();
    for (const hash in docs) {
      categorySet.add(docs[hash]["category"]);
    }
    // Spread set into an array to give access to array prototype methods
    setCategoryFilters([...categorySet]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fire once, on mount

  useEffect(() => {
    // Persist category filter checkboxes across mounts
    const storedFilters = window.localStorage.getItem("search-filters");
    if (storedFilters) {
      setSelectedCategories(storedFilters.split(","));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fire once, on mount

  const handleApplyFilters = () => {
    setShowCategoryFilters(false);
    // Guard against empty case
    if (selectedCategories.length === 0) {
      window.localStorage.removeItem("search-filters");
      return;
    }
    window.localStorage.setItem("search-filters", selectedCategories);
  };

  const handleClearFilters = () => {
    window.localStorage.removeItem("search-filters");
    setSelectedCategories([]);
    setResults([]);
    setQuery("");
    setShowCategoryFilters(false);
    setFilterByWip(true);
  };

  const toggleCategoryFilters = () => {
    setShowCategoryFilters(!showCategoryFilters);
  };

  const toggleFilterByWip = () => {
    setFilterByWip(!filterByWip);
  };

  const handleChangeCategoryFilter = (e) => {
    const category = e.target.name;

    if (!selectedCategories.includes(category)) {
      setSelectedCategories((prevState) => [...prevState, category]);
      return;
    }

    const categoryPos = selectedCategories.indexOf(category);
    const categoryExistsInState = categoryPos !== -1;
    let newState = Array.from(selectedCategories);
    if (categoryExistsInState) {
      newState.splice(categoryPos, 1);
    }
    setSelectedCategories(newState);
  };

  const renderCategoryFilterOptions = () => {
    return categoryFilters.map((category) => {
      return (
        <CategoryFilterOption key={category}>
          <input
            id={`checkbox-${category}`}
            type="checkbox"
            name={category}
            onChange={handleChangeCategoryFilter}
            checked={selectedCategories.includes(category)}
          />
          <CategoryFilterLabel
            htmlFor={`checkbox-${category}`}
            $active={selectedCategories.includes(category)}
          >
            &nbsp;{category}
          </CategoryFilterLabel>
        </CategoryFilterOption>
      );
    });
  };

  return (
    <SearchContainer>
      <FilterToolbar>
        <FilterButton
          title="Filter recipes by category"
          aria-label="Filter recipes by category"
          aria-pressed={showCategoryFilters}
          onClick={toggleCategoryFilters}
        >
          <FilterByCategoryIcon
            $active={showCategoryFilters || selectedCategories.length !== 0}
          />
        </FilterButton>
        <FilterButton
          title="Clear active search filters"
          aria-label="Clear active search filters"
          onClick={handleClearFilters}
        >
          <RiFilterOffFill />
        </FilterButton>
        <FilterButton
          title="Search recipes by ingredient"
          aria-label="Search recipes by ingredient"
          onClick={() => handleFeedback("Coming soon!")}
        >
          <RiRestaurantFill />
        </FilterButton>
        <FilterButton
          title="Include work in progress recipes"
          aria-label="Include work in progress recipes"
          aria-pressed={!filterByWip}
          onClick={toggleFilterByWip}
        >
          <FilterByWipIcon $active={filterByWip} />
        </FilterButton>
      </FilterToolbar>
      {showCategoryFilters && (
        <CategoryFilterContainer>
          <CategoryFilterControls>
            <CategoryFilterHeading>
              Filter recipes by category
            </CategoryFilterHeading>
            <CategoryFilterApply onClick={handleApplyFilters}>
              Apply Filters
            </CategoryFilterApply>
          </CategoryFilterControls>
          <CategoryFilterOptions>
            {renderCategoryFilterOptions()}
          </CategoryFilterOptions>
        </CategoryFilterContainer>
      )}
      <SearchInputContainer>
        <SearchInput
          type="text"
          aria-label="Search field"
          placeholder="🔍&nbsp;Search recipes&hellip;"
          value={query}
          onChange={handleSearch}
          ref={searchInputRef}
        />
        <ClearSearchButton
          title="Clear search field"
          aria-label="Clear search field"
          onClick={handleClearSearchField}
        >
          <RiArrowGoBackLine />
        </ClearSearchButton>
      </SearchInputContainer>
      <SearchResults>
        {feedbackMsg && (
          <SearchResult style={{ margin: "1rem 0" }}>
            {feedbackMsg}
          </SearchResult>
        )}
        {calculateSearchResults()}
      </SearchResults>
    </SearchContainer>
  );
};

export default Search;
