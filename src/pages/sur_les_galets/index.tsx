import React from 'react'
import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';
import styled from 'styled-components';
import GamesSideBar from '@components/games/games-side-bar';
import GamesContent from '@components/games/games-content';
import { GetStaticProps } from 'next'
import { getGames } from '@services/game';
import { NextSeo } from 'next-seo';


const GameListingContainer = styled.div`
margin-bottom: ${80 / 14}rem;
`

export const getStaticProps: GetStaticProps = async (context) => {
    const response = await getGames();
    return {
        props: {
            categories: response.data.data.categories,
            featured: response.data.data.gamesFeatured
        },
        revalidate: 10
    }
}

const GameListing = ({ categories, featured }: any) => {

    return (
        <>
            <NextSeo
                title='Jeux et exercices de français  en ligne -  Apprendre  le français'
                description='Testez vos connaissances au travers d&#39;exercices et de jeux pour adultes et adolescents'
                additionalMetaTags={[
                    {
                        name: "author",
                        content: "Le Français et vous"
                    }
                ]}
                openGraph={{
                    title: "Sur les galets - Jeux - F&V",
                    description: "Testez vos connaissances au travers d&#39;exercices et de jeux pour adultes et adolescents",
                    site_name: "F&V - Le Français et vous",
                    type: "article"
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}

            />
            <div className='container'>
                <Breadcrumb>
                    <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                        Accueil
                    </BreadcrumbItem>
                    <BreadcrumbItem>Sur les galets</BreadcrumbItem>
                </Breadcrumb>
                <GameListingContainer>
                    <div className='game-listing'>
                        <div className='my-2 row'>
                            <div className='col-lg-9 col-md-8 col-sm-12 '>
                                <GamesContent categories={categories} />
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-12'>
                                <GamesSideBar featured={featured} />
                            </div>

                        </div>
                    </div>
                </GameListingContainer>
            </div>
        </>
    )
}

export default GameListing