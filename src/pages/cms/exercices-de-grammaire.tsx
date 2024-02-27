import React from 'react';
import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';
import styled from 'styled-components';
import AddBanner from '@components/other/ad-baner';
import PostTrending from '@components/post/post-trending';
import ExercisesContent from '@components/pages/exercises/exercises-content';
import { getLessons } from '@services/lesson';
import { GetStaticProps } from 'next';
import RelatedPosts from '@components/sections/sidebars/relatedPosts';
import { NextSeo } from 'next-seo';
import { getCmsPageContent, getPageSlug } from "@services/layout";
import SubscribeBanner from '@components/other/subscribeBanner';

const StyledPostTrending = styled(PostTrending)`
  &:not(:last-child) {
    margin-bottom: ${20 / 14}rem;
  }
`;

const GuideContainer = styled.div`
margin-bottom: ${80 / 14}rem;
margin-top: ${80 / 14}rem;
`

//Sever Side fetching data
export const getStaticProps: GetStaticProps = async (context) => {
    const res = await getLessons();
    const pageSlug = await getPageSlug("Exercices de grammaire")
    const pageContent = await getCmsPageContent(pageSlug.data.data.slug);

    const lessons = res.data.data.lessons;
    const featured = res.data.data.lessonsFeatured;
    return {
        props: {
            featured,
            content: pageContent.data.data[0]
        },
        revalidate: 10
    }
}

const Exercise = ({ featured, content }: any) => {
    return (
        <>
            <NextSeo title={content?.meta_title} description={content?.meta_description} additionalMetaTags={[
                { name: "keywords", content: content?.keywords }
            ]}
                openGraph={{
                    title: content?.meta_title,
                    description: content?.meta_description,
                    site_name: "F&V - Le Français et vous",


                }}
            />

            <div className='container resourcesPage'>
                <Breadcrumb>
                    <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                        Accueil
                    </BreadcrumbItem>
                    <BreadcrumbItem>{content?.title}</BreadcrumbItem>

                </Breadcrumb>
                <GuideContainer>
                    <div className='exercises'>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6 col-lg-9'>
                                <ExercisesContent content={content} />

                            </div>
                            <div className='col-sm-12 col-md-4 col-lg-3'>
                                <div className='guide-feature'>
                                    {featured && featured.length > 0 && <div className="featuredBlock">

                                        <RelatedPosts featured={featured} />
                                    </div>}


                                </div>
                                <SubscribeBanner />
                            </div>
                        </div>
                        <div className='newsletter-add'>
                            <AddBanner banner="exercices" />
                        </div>
                    </div>
                </GuideContainer>
            </div>
        </>
    )
}

export default Exercise