import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { Index } from "elasticlunr";
import { GoSearch, GoX } from "react-icons/go";
import styles from "./Search.module.css";
import QuickListButton from "./QuickListButton";

function Search() {
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
    <div className={styles.container}>
      <div className={styles.searchInput}>
        <input
          type="text"
          aria-label="Search field"
          className={styles.searchInput__field}
          placeholder="Search recipes &hellip;"
          value={query}
          onChange={handleSearch}
        />
        <GoSearch className={styles.searchInput__icon} />
        <GoX className={styles.searchInput__icon} onClick={handleClear} />
      </div>
      <ul className={styles.searchResults}>
        {results.map(({ id, title, category, slug }) => {
          return (
            <li key={id}>
              <Link to={slug}>{title}</Link>
              <QuickListButton />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Search;
