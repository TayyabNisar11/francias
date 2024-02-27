import React, { useState } from 'react';
import { useRouter } from 'next/router';

const HeaderSearch = (props: any) => {

  const [searchQuery, setSearchQuery] = useState<string>("")

  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault()
    props.onClose()
    router.push({
      pathname: "/recherche",
      query: `q=${searchQuery}`
    })
  }

  return (
    <div {...props} id="search-box">
      <div className="container">
        <form >
          <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value)
          }}
            value={searchQuery}
            type="text"
            placeholder="RECHERCHE: ARTICLE / JEU / FICHE PÉDAGOGIQUE..."
            name="search" />
          <button type='submit' onClick={handleSearch}>
            <i className="fas fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeaderSearch;
