import React, { useEffect } from 'react'
import Breadcrumb, { BreadcrumbItem } from "@components/other/breadcrumb";
import SubscribeBanner from '@components/other/subscribeBanner';
import SearchContent from '@components/search/content';
import SearchInput from '@components/control/search-input';
import { useRouter } from 'next/router';

const Search = () => {
    const router = useRouter();

    useEffect(() => {

    }, [router.query])


    return (
        <div className="searchPage">
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                        Accueil
                    </BreadcrumbItem>
                    <BreadcrumbItem>Recherche</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className='container search'>
                <div className='row '>
                    <div className="col-lg-6 col-md-6 col-sm-12 search_header ">
                        <h3 className='search_header-h3' >Recherche</h3>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <SearchInput />
                    </div>


                </div>
                <div className="my-2 row">
                    <div className="col-lg-9 col-md-8 col-sm-12 ">
                        <SearchContent />
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-12 ">
                        <SubscribeBanner />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Search