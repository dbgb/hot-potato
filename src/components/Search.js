import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { Index } from "elasticlunr";
import {
  RiTestTubeFill,
  RiRestaurantFill,
  RiFilterFill,
  RiFilterOffFill,
} from "react-icons/ri";
import styled from "styled-components";
import { commonButtonStyling, commonOutlineStyling } from "../styles/common";
import { breakpoints } from "../styles/breakpoints";
import { ModalContext } from "./ModalContext";
import { QuickListContext } from "./QuickListContext";
import QuickListToggle from "./QuickListToggle";

// --------------------------
// -- Styled Subcomponents --
// --------------------------
const SearchContainer = styled.div`
  margin: 0 1rem;
`;

const SearchInputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SearchInputLabel = styled.label`
  font-size: 0.7rem;
  margin-right: 0.5rem;
  display: inline-block;
  width: 3rem;
  transition: color var(--ease);
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;

  &:focus {
    ${commonOutlineStyling}
  }

  @media screen and (min-width: ${breakpoints.xl}em) and (max-width: calc(${breakpoints.xl}em + 10em)) {
    /* 
     * Prevent input placeholder text overflow
     */
    font-size: .9rem;
  }
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
  transition: border var(--ease);

  a {
    text-decoration: none;
    color: var(--color-link);
    transition: color var(--ease);
  }

  button {
    font-size: 1.2rem;
    padding-top: 0.2rem;
    margin-left: 1.5rem;
  }
`;

// --------------------
// -- Filter Toolbar --
// --------------------
const FilterToolbar = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 1rem 1.5rem 1rem;
`;

const FilterButtonGroup = styled.div`
  display: grid;
  grid-gap: 0.4rem;
  grid-template-columns: max-content;
  /* Ensures focus outline hugs child button */
  justify-items: center;
  color: var(--color-text-main);
  transition: color var(--ease);

  @media screen and (min-width: calc(${breakpoints.lg}em)) and (max-width: calc(${breakpoints.xl}em + 10em)) {
    /*
     * Wrap labels when small desktop sidebar
     */
    grid-template-columns: min-content;
    align-content: start;
  }

  @media screen and (max-width: calc(${breakpoints.xs}em - 5em)) {
    /* 
     * Wrap labels when below xs breakpoint
     */
    grid-template-columns: min-content;
    align-content: start;
  }
`;

const FilterButton = styled.button`
  font-size: 2rem;
  padding-top: 0.5rem;
  ${commonButtonStyling};

  &:focus {
    ${commonOutlineStyling}
    outline-offset: initial;
  }
`;

const FilterButtonLabel = styled.label`
  text-align: center;
  font-size: 0.8rem;
`;

const FilterByWipIcon = styled(RiTestTubeFill)`
  /* Transition effect applied from within parent button */
  color: ${(props) => !props.$active && "var(--color-highlight)"};
`;

// ---------------------
// -- Category Filter --
// ---------------------
const FilterByCategoryIcon = styled(RiFilterFill)`
  /* Transition effect applied from within parent button */
  color: ${(props) => props.$active && "var(--color-highlight)"};
`;

const CategoryFilterContainer = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px dotted var(--color-primary);
  transition: border var(--ease);
`;

const CategoryFilterControls = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
`;

const CategoryFilterHeading = styled.h2`
  transition: color var(--ease);
`;

const CategoryFilterApply = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px var(--color-primary);
  ${commonButtonStyling};
  border: 2px solid var(--color-primary);
  transition: box-shadow var(--ease), border var(--ease), color var(--ease);

  &:focus {
    ${commonOutlineStyling}
    outline-offset: 0.25rem;
  }

  &:active {
    outline: none;
    box-shadow: none;
    transform: translate(2px, 3px);
    background-color: var(--color-highlight);
    transition: background-color var(--ease);
  }
`;

const CategoryFilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
`;

const CategoryFilterOption = styled.div`
  height: 3rem;

  & > * {
    cursor: pointer;
  }
`;

const CategoryFilterLabel = styled.label`
  text-transform: capitalize;
  color: ${(props) => props.$active && "var(--color-highlight)"};
  transition: color var(--ease);
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

  const { modalOpen, setModalOpen } = useContext(ModalContext);

  // ----------------------------
  // -- Search Index & Results --
  // ----------------------------
  let elasticIndex = null;
  const getOrCreateIndex = () => {
    /*
     * Return existing elasticlunr index instance, or create and hydrate new
     * instance from JSON serialised index data retrieved by static query
     */
    const serialIndex = data.siteSearchIndex.index;
    if (!elasticIndex) {
      elasticIndex = Index.load(serialIndex);
    }
    return elasticIndex;
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const handleFeedback = (msg) => {
    if (!feedbackMsg) {
      setFeedbackMsg(msg);
      setTimeout(() => {
        setFeedbackMsg(null);
      }, 3000);
    }
  };

  const updateSearchResults = (queryString) => {
    /*
     * Update search results by applying given query string along with any
     * currently active category filters
     */
    let query = "";
    if (selectedCategories) {
      // ["a", "b", "c"] -> "a b c"
      query = `${selectedCategories.join(" ")} ${queryString}`;
    }

    getOrCreateIndex();

    let matches = elasticIndex
      .search(query, {
        expand: true, // Accept partial matches
      })
      .map(({ ref }) => elasticIndex.documentStore.getDoc(ref));

    setResults(matches);
  };

  const handleSearch = (e) => {
    let query = e.target.value;
    setQuery(query); // Keep search field text up to date with user input
    updateSearchResults(query);

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

  // ---------------------------
  // -- QuickList Integration --
  // ---------------------------
  const { quickItems, setQuickItems } = useContext(QuickListContext);

  const isInQuickList = (key, value) => {
    // [{ key: "", title: "", slug: ""}, ...]
    return quickItems.some((item) => item[key] === value);
  };

  const toggleQuickItem = (id, title, slug) => {
    const newItem = {
      key: id,
      title: title,
      slug: slug,
    };

    if (!isInQuickList("slug", slug)) {
      // Add item if not in QuickList already
      setQuickItems((prevItems) => [...prevItems, newItem]);
    } else {
      // Remove item
      setQuickItems((prevItems) => {
        const newItems = prevItems.filter(
          (item) => item.title !== newItem.title
        );

        return [...newItems];
      });
    }
  };

  const calculateSearchResults = () => {
    let searchResults = results;

    // By default, filter out recipes marked as WIP
    if (filterByWip) {
      searchResults = results.filter(({ wip }) => !wip);
    }

    return searchResults.map(({ id, title, category, slug }) => {
      const inQuickList = isInQuickList("slug", slug);

      return (
        <li key={id}>
          <SearchResult>
            <Link to={slug} onClick={handleClickSearchResult}>
              {title}
            </Link>
            <QuickListToggle
              inQuickList={inQuickList}
              onClick={() => toggleQuickItem(id, title, slug)}
            />
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
    /*
     *  On mount, focus search input when rendered as child of Modal
     */
    modalOpen && searchInputRef.current.focus();
  }, [modalOpen]);

  // --------------------
  // -- Search Filters --
  // --------------------
  const [filterByWip, setFilterByWip] = useState(true);
  const [showCategoryFilters, setShowCategoryFilters] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  /*
   * As the entire search index documentStore is built from a static file set
   * and is fixed and complete after build time, we can expect its contents to
   * remain stable throughout the lifetime of the component. As such, there is
   * no benefit to retrieving contained category values every render, or more
   * than once per mount.
   */
  const memoizedDocs = useMemo(() => {
    return data.siteSearchIndex.index.documentStore.docs;
  }, [data.siteSearchIndex.index.documentStore]);

  useEffect(() => {
    /*
     * Populate category filters on mount
     */
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

  const handleApplyFilters = () => {
    setShowCategoryFilters(false);
    updateSearchResults(query);
  };

  const handleClearFilters = () => {
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

    // Add category filter
    if (!selectedCategories.includes(category)) {
      setSelectedCategories((prevState) => [...prevState, category]);
      return;
    }

    // Remove category filter
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
        {/* Filter: By Category */}
        <FilterButtonGroup>
          <FilterButton
            id="category-filter"
            title="Filter recipes by category"
            aria-label="Filter recipes by category"
            aria-pressed={showCategoryFilters}
            onClick={toggleCategoryFilters}
          >
            <FilterByCategoryIcon
              $active={showCategoryFilters || selectedCategories.length !== 0}
            />
          </FilterButton>
          <FilterButtonLabel htmlFor="category-filter">
            By Category
          </FilterButtonLabel>
        </FilterButtonGroup>
        {/* Filter: By Ingredient */}
        <FilterButtonGroup>
          <FilterButton
            id="ingredient-filter"
            title="Search recipes by ingredient"
            aria-label="Search recipes by ingredient"
            onClick={() => handleFeedback("Coming soon!")}
          >
            <RiRestaurantFill />
          </FilterButton>
          <FilterButtonLabel htmlFor="ingredient-filter">
            By Ingredient
          </FilterButtonLabel>
        </FilterButtonGroup>
        {/* Filter: By WIP */}
        <FilterButtonGroup>
          <FilterButton
            id="wip-filter"
            title="Include work in progress recipes"
            aria-label="Include work in progress recipes"
            aria-pressed={!filterByWip}
            onClick={toggleFilterByWip}
          >
            <FilterByWipIcon $active={filterByWip} />
          </FilterButton>
          <FilterButtonLabel htmlFor="wip-filter">By WIP</FilterButtonLabel>
        </FilterButtonGroup>
        {/* Filter: Clear filters */}
        <FilterButtonGroup>
          <FilterButton
            id="clear-filters"
            title="Clear active search filters"
            aria-label="Clear active search filters"
            onClick={handleClearFilters}
          >
            <RiFilterOffFill />
          </FilterButton>
          <FilterButtonLabel htmlFor="clear-filters">
            Clear Filters
          </FilterButtonLabel>
        </FilterButtonGroup>
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
          <CategoryFilterGrid>
            {renderCategoryFilterOptions()}
          </CategoryFilterGrid>
        </CategoryFilterContainer>
      )}
      <SearchInputGroup>
        <SearchInputLabel htmlFor="search-input">
          Recipe Search
        </SearchInputLabel>
        <SearchInput
          id="search-input"
          type="text"
          aria-label="Search field"
          placeholder="🔍&nbsp;What would you like to cook?"
          value={query}
          onChange={handleSearch}
          ref={searchInputRef}
        />
      </SearchInputGroup>
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
