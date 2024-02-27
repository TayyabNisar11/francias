import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/router';

const SearchInput = () => {
    const router = useRouter()
    const [query, setQuery] = useState(router.query.q);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        router.push({
            pathname: "/recherche",
            query: `q=${query}`
        })
    }
    return (
        <form onSubmit={handleSubmit} className='search-input'>
            <input value={query} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} />
            <i onClick={handleSubmit}><FaSearch /></i>
        </form>
    )
}

export default SearchInput