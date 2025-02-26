

import React from 'react'

function SearchBar({searchText, placeholderText, setSearchText}) {
 
  const updateSearchInput = (value) => {
    setSearchText(value)
  }
    return (
        <input type="search" value={searchText} placeholder={placeholderText || "Buscar"} onChange={(e) => updateSearchInput(e.target.value)} className="input input-sm input-bordered w-full" />
  )
}

export default SearchBar
