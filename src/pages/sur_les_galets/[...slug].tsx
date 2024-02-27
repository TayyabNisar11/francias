import React from 'react'
import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';
import styled from 'styled-components';
import GamesSideBar from '@components/games/games-side-bar';
import GameDetails from '@components/games/game-detail';
import { ParsedUrlQuery } from "querystring";
import { getGameDetails, getGameSlugs } from '@services/game';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';


const GameDetailContainer = styled.div`
margin-bottom: ${80 / 14}rem;
`
interface IParams extends ParsedUrlQuery {
    slug: string[]
}


export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as IParams
    try {
        const res = await getGameDetails(slug[1]);
        return {
            props: {
                detail: res.data.data[0],
            },
            revalidate: 10,
        }
    } catch (error) {
        return { notFound: true };
    }

}

export async function getStaticPaths() {
    const res = await getGameSlugs()
    const games = res.data.data.mostPopuler
    const paths = games.map((game: any) => ({
        params: { slug: [`${game.id}`, game.slug] },
    }))


    return { paths, fallback: "blocking" }
}


const GameDetail = ({ detail }: any) => {
    const { featured, game } = detail;
    console.log('test test test', game.slug)

    return (
        <>
            <NextSeo
                title={game.meta_title}
                description={game.meta_description}
                additionalMetaTags={[
                    {
                        name: "author",
                        content: "Le Français et vous"
                    }
                ]}
                openGraph={{
                    title: game.meta_title,
                    description: game.meta_description,
                    site_name: "F&V - Le Français et vous",
                    type: "article",
                    images: [
                        {
                            url: game.featured_images[0]?.path
                        }
                    ]
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
                    <BreadcrumbItem href='/sur_les_galets'>Sur le galets - Jeux et exercices</BreadcrumbItem>
                    <BreadcrumbItem>{game?.title}</BreadcrumbItem>

                </Breadcrumb>
                <GameDetailContainer>
                    <div className='game-detail'>
                        <div className='my-2 row'>
                            <div className='col-lg-9 col-md-8 col-sm-12 '>
                                <GameDetails game={game} />
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-12'>
                                <GamesSideBar featured={featured || []} hideAdd={true} />
                            </div>

                        </div>
                    </div>
                </GameDetailContainer>

            </div>
        </>
    )
}

export default GameDetail