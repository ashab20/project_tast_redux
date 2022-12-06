import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchQuery } from "../../features/project/projectApi";
import { clearSearch, keySearch } from "../../features/project/projectSlice";

function Search() {
  const [search, setSearch] = useState("");
  const [action, setAction] = useState(false);
  const dispatch = useDispatch();
  const { data:searchResult, isLoading,isError } = useSearchQuery(search, { skip: !action });


  useEffect(() => {
    if (!isLoading && !isError && searchResult?.length > 0) {
      dispatch(keySearch(searchResult))
    }else{
      dispatch(clearSearch())
    }
       
}, [dispatch, isError, isLoading, searchResult]);


  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (q) => {
    if(q !==""){
      setSearch(q)
      setAction(true)
    }else{
      setSearch("")
      setAction(false)
      dispatch(clearSearch())
    }
  };

  const handleSearch = debounceHandler(doSearch, 1000);

  return (
    <input
      className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
      type="search"
      placeholder="Search for anything…"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}

export default Search;
