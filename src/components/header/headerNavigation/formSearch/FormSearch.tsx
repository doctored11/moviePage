import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./formSearch.module.css";
import { getMovieByTitle } from "../../../../api/filmApi";
import { DropDownList } from "./dropDownList/DropDownList";
import { Movie } from "../../../hero/Hero";

export function FormSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);

  function handleClick() {
    setResults([]);
    
  }

  const debouncedFetchResults = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery) {
        const res = await getMovieByTitle(searchQuery);
        console.log(res);
        setResults(res);
      }
    }, 600),
    []
  );

  function debounce(func: (...args: any[]) => void, waitTime: number) {
    //ну а как  Timeout затипизировать
    let timeout: any;
    return (...args: any[]) => {
      if (timeout != undefined) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args), waitTime);
    };
  }

  useEffect(() => {
    debouncedFetchResults(query);
  }, [query, debouncedFetchResults]);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value.trim());
  }
  function handleClear(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("Blur")
    if (results.length >0 ) return
    setQuery("");
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const formBlock = (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Поиск"
        className={styles.searchInput}
        value={query} 
        onChange={handleOnChange}
        onBlur={handleClear}
      />
      <button type="submit" className={styles.searchButton} tabIndex={-1}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
            fill="#ffffff55"
          />
        </svg>
      </button>
      {results.length > 0 && (
        <DropDownList
          movies={results}
          click={handleClick}
          handleToClose={() => {setResults([]);setQuery("");}}
        ></DropDownList>
      )}
    </form>
  );
  return formBlock;
}
