import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { getSearchResults } from '@services/search';
import Link from 'next/link';


const TAB_MENU = [
    {
        key: "all",
        title: "TOUS",
    },
    {
        key: "posts",
        title: "ARTICLES BLOG",
    },
    {
        key: "games",
        title: "JEUX",
    },
    {
        key: "lessons",
        title: "FICHES PÉDAGO"
    }
];

const SearchContent = () => {
    const router = useRouter();
    const [tabIndex, setTabIndex] = useState(0);
    const [searchType, setSearchType] = useState("all");
    const [results, setResults] = useState<any>(null)
    const [availableTabs, setAvailableTabs] = useState<string[]>([])

    let query = router.query.q || " ";

    const searchResults = async () => {
        try {
            const response = await getSearchResults(searchType, query);
            const data = response.data.data;
            setResults(data);
            setAvailableTabs(Object.keys(data.result))

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (query || query == "") {
            searchResults()

        }

    }, [query]);



    useEffect(() => {
        if (results != null) {
            if (Object.keys(results?.result).length == 2) {
                setTabIndex(1)
            }
        }
    }, [results?.result])

    const renderResults: any = () => {
        if (results?.result) {
            return results?.result[searchType].map((result: any) => {
                const { page, slug, title1, title2, id } = result
                return <li className='search_content_result_list-item'>
                    <Link href={`/${page}/${id}/${slug}`}>
                        <a>
                            <h3>{title1}</h3>
                        </a>
                    </Link>
                    <h4>{title2}</h4>
                </li >
            })
        }

    }

    return (
        <div className='search_content'>
            <div className='search_content_tab'>
                <div className='search_content_tab-buttons'  >
                    {TAB_MENU.map((tab: any, index) => {
                        return availableTabs.includes(tab.key) && <button
                            onClick={() => {
                                setTabIndex(index)
                                setSearchType(tab.key)
                            }}
                            className={classnames({ 'selected': index == tabIndex })}>
                            {tab.title}
                        </button>
                    })}
                </div>
            </div>

            <h3 className='search_content-count'>{results?.result[searchType]?.length > 0 ? `${results?.result[searchType]?.length} résultat(s) ${query != " " ? ` pour " ${query}"` : ""}` : "Pas de résultat pour cette recherche"} </h3>
            <ul className='search_content_result_list'>
                {
                    renderResults()
                }

            </ul>
        </div>
    )
}

export default SearchContent