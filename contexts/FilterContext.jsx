// src/contexts/FilterContext.js
import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState(null);
    const [search, setSearch] = useState("");

    return (
        <FilterContext.Provider value={{ filter, setFilter, search, setSearch }}>
            {children}
        </FilterContext.Provider>
    );
};
