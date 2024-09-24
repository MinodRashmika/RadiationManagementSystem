import {React, useState} from "react";

const SearchFunc = ({onSearch}) => {

    const [searchTerm, setSearchTerm] = ('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    }

    return(
    <div>
        <input type="text" 
        class="px-4 py-2 border rounded-md" 
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch} 
        />
    </div>
    )

}

export default SearchFunc;