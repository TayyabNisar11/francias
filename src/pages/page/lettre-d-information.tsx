import React from 'react';
import Breadcrumb, { BreadcrumbItem } from '@components/other/breadcrumb';
import DownloadSidebar from '@components/sections/sidebars/downloadSidebar';
import styled from 'styled-components';
import NewsletterContent from '@components/pages/newsletter/newsletter-content';
import AddBanner from '@components/other/ad-baner';
import { NextSeo } from 'next-seo';

const NewsletterContainer = styled.div`
margin-bottom: ${80 / 14}rem;
margin-top: ${80 / 14}rem;
`

const Newsletter = () => {
    return (
        <>
            <NextSeo
                title='Inscription à notre lettre d&#39;informations'
                description='Restez en contact avec nous ! Abonnez vous à notre newsletter en remplissant le formulaire ici !'
                additionalMetaTags={[
                    {
                        name: "author",
                        content: "Le Français et vous"
                    }
                ]}
                openGraph={{
                    title: "Inscription à notre lettre d&#39;informations - Text",
                    description: "",
                    site_name: "F&V - Le Français et vous",


                }}
            />
            <div className='container'>

                <Breadcrumb>
                    <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                        Accueil
                    </BreadcrumbItem>
                    <BreadcrumbItem>Resources Pedagogiques</BreadcrumbItem>
                    <BreadcrumbItem>Lettre d'informations</BreadcrumbItem>
                </Breadcrumb>
                <NewsletterContainer>
                    <div className='newsletter'>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6 col-lg-9'>
                                <NewsletterContent />

                            </div>
                            <div className='col-sm-12 col-md-4 col-lg-3'>
                                <DownloadSidebar />
                            </div>
                        </div>
                        <div className='newsletter-add'>
                            <AddBanner banner="newsletter" />
                        </div>
                    </div>
                </NewsletterContainer>

            </div>
        </>
    )
}

export default Newsletter