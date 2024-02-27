import React from 'react';
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring"
import renderContent from "html-react-parser";
import { getCmsPageContent } from "@services/layout"
import { NextSeo } from "next-seo";
import Breadcrumb, { BreadcrumbItem } from "@components/other/breadcrumb";

interface IParams extends ParsedUrlQuery {
    id: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as IParams
    const response = await getCmsPageContent(id);
    return {
        props: {
            content: response.data.data[0]
        }
    }
}


const CMSPages = ({ content }: any) => {
    return (
        <>
            <NextSeo title={content?.meta_title} description={content?.meta_description} additionalMetaTags={[
                { name: "keywords", content: content?.keywords }
            ]} />
            <div className="aboutPage">
                <div className="container">
                    <Breadcrumb>
                        <BreadcrumbItem href="/" startIcon={<i className="fas fa-home"></i>}>
                            Accueil
                        </BreadcrumbItem>
                        <BreadcrumbItem>{content?.title}</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="container">
                    {renderContent(content?.content || "")}

                </div>
            </div>
        </>
    )
}

export default CMSPages