import React from 'react';
import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';
import styled from 'styled-components';
import GuideContent from '@components/pages/guide/guide-content';
import AddBanner from '@components/other/ad-baner';
import PostTrending from '@components/post/post-trending';
import { NextSeo } from 'next-seo';
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



const Guide = () => {
    return (
        <>
            <NextSeo
                title='Guide grammatical 2018'
                description='Restez en contact avec nous ! Abonnez vous à notre newsletter en remplissant le formulaire ici !'
                noindex
                additionalMetaTags={[
                    {
                        name: "author",
                        content: "Le Français et vous"
                    }
                ]}
                openGraph={{
                    title: "Guide grammatical 2018 - Guide grammatical",
                    description: "",
                    site_name: "F&V - Le Français et vous",


                }}
            />
            <div className='container'>
                <Breadcrumb>
                    <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                        Accueil
                    </BreadcrumbItem>
                    <BreadcrumbItem>Resources Pédagogiques</BreadcrumbItem>
                    <BreadcrumbItem>Notre Guide Grammatical</BreadcrumbItem>
                </Breadcrumb>
                <GuideContainer>
                    <div className='guide'>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6 col-lg-9'>
                                <GuideContent />
                            </div>
                            <div className='col-sm-12 col-md-4 col-lg-3'>
                                <SubscribeBanner />
                            </div>
                        </div>
                        <div className='newsletter-add'>
                            <AddBanner banner="guide" />
                        </div>
                    </div>
                </GuideContainer>
            </div>
        </>
    )
}

export default Guide