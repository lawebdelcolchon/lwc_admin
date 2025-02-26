// src/components/TopSideButtons.js
import { useEffect, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import SearchBar from "./Input/SearchBar"; // Ruta corregida

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("");
    const [searchText, setSearchText] = useState("");
    
    const showFiltersAndApply = (params) => {
        applyFilter(params);
        setFilterParam(params);
    };

    const removeAppliedFilter = () => {
        removeFilter();
        setFilterParam("");
        setSearchText("");
    };

    useEffect(() => {
        if (searchText === "") {
            removeAppliedFilter();
        } else {
            applySearch(searchText);
        }
    }, [searchText]);

    
    return (
        <div className="inline-block w-full">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
            {filterParam !== "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2" /></button>}
        </div>
    );
};

export default TopSideButtons;
